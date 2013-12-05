// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

// M.DataSelector uses code from meteor.js
// https://github.com/meteor/meteor/tree/master/packages/minimongo
//
// Thanks for sharing!

/**
 *
 * @module M.DataSelector
 *
 * @type {*}
 * @extends M.Object
 */
M.DataSelector = M.Object.design({

    _type: 'M.DataSelector',

    _selector: null,

    create: function (docSelector) {
        var selector = this.design({
            _selector: null
        });
        selector.init(docSelector);
        return selector;
    },

    init: function (docSelector) {
        this._selector = this.compileSelector(docSelector);
    },

    matches: function (value) {
        if (_.isFunction(this._selector)) {
            return this._selector(value);
        }
        return false;
    },

    hasOperators: function (valueSelector) {
        var theseAreOperators;
        for (var selKey in valueSelector) {
            var thisIsOperator = selKey.substr(0, 1) === '$';
            if (theseAreOperators === undefined) {
                theseAreOperators = thisIsOperator;
            } else if (theseAreOperators !== thisIsOperator) {
                throw new Error('Inconsistent selector: ' + valueSelector);
            }
        }
        return !!theseAreOperators;  // {} has no operators
    },

    // Given a selector, return a function that takes one argument, a
    // document, and returns true if the document matches the selector,
    // else false.
    compileSelector: function (selector) {
        // you can pass a literal function instead of a selector
        if ( _.isFunction(selector)) {
            return function (doc) {
                return selector.call(doc);
            };
        }

        // shorthand -- scalars match _id
        if (this._selectorIsId(selector)) {
            return function (record) {
                var id = _.isFunction(record.getId) ? record.getId() : (record._id || record.id);
                return M.Field.prototype.equals(id, selector);
            };
        }

        // protect against dangerous selectors.  falsey and {_id: falsey} are both
        // likely programmer error, and not what you want, particularly for
        // destructive operations.
        if (!selector || (('_id' in selector) && !selector._id)) {
            return function (doc) {
                return false;
            };
        }

        // Top level can't be an array or true or binary.
        if (_.isBoolean(selector) || _.isArray(selector) || M.Field.prototype.isBinary(selector)) {
            throw new Error('Invalid selector: ' + selector);
        }

        return this.compileDocSelector(selector);
    },

    // The main compilation function for a given selector.
    compileDocSelector: function (docSelector) {
        var that = M.DataSelector;
        var perKeySelectors = [];
        _.each(docSelector, function (subSelector, key) {
            if (key.substr(0, 1) === '$') {
                // Outer operators are either logical operators (they recurse back into
                // this function), or $where.
                if (!_.has(that.LOGICAL_OPERATORS, key)) {
                    throw new Error('Unrecognized logical operator: ' + key);
                }
                perKeySelectors.push(that.LOGICAL_OPERATORS[key](subSelector));
            } else {
                var lookUpByIndex = that._makeLookupFunction(key);
                var valueSelectorFunc = that.compileValueSelector(subSelector);
                perKeySelectors.push(function (doc) {
                    var branchValues = lookUpByIndex(doc);
                    // We apply the selector to each 'branched' value and return true if any
                    // match. This isn't 100% consistent with MongoDB; eg, see:
                    // https://jira.mongodb.org/browse/SERVER-8585
                    return _.any(branchValues, valueSelectorFunc);
                });
            }
        });

        return function (record) {
            var doc = _.isFunction(record.getData) ? record.getData() : record;
            return _.all(perKeySelectors, function (f) {
                return f(doc);
            });
        };
    },

    compileValueSelector: function (valueSelector) {
        var that = M.DataSelector;
        if (valueSelector === null) {  // undefined or null
            return function (value) {
                return that._anyIfArray(value, function (x) {
                    return x === null;  // undefined or null
                });
            };
        }

        // Selector is a non-null primitive (and not an array or RegExp either).
        if (!_.isObject(valueSelector)) {
            return function (value) {
                return that._anyIfArray(value, function (x) {
                    return x === valueSelector;
                });
            };
        }

        if (_.isRegExp(valueSelector)) {
            return function (value) {
                if (_.isUndefined(value)) {
                    return false;
                }
                return that._anyIfArray(value, function (x) {
                    return valueSelector.test(x);
                });
            };
        }

        // Arrays match either identical arrays or arrays that contain it as a value.
        if (_.isArray(valueSelector)) {
            return function (value) {
                if (!_.isArray(value)) {
                    return false;
                }
                return that._anyIfArrayPlus(value, function (x) {
                    return that._equal(valueSelector, x);
                });
            };
        }

        // It's an object, but not an array or regexp.
        if (this.hasOperators(valueSelector)) {
            var operatorFunctions = [];
            _.each(valueSelector, function (operand, operator) {
                if (!_.has(that.VALUE_OPERATORS, operator)) {
                    throw new Error('Unrecognized operator: ' + operator);
                }
                operatorFunctions.push(that.VALUE_OPERATORS[operator](operand, valueSelector.$options));
            });
            return function (value) {
                return _.all(operatorFunctions, function (f) {
                    return f(value);
                });
            };
        }

        // It's a literal; compare value (or element of value array) directly to the
        // selector.
        return function (value) {
            return that._anyIfArray(value, function (x) {
                return that._equal(valueSelector, x);
            });
        };
    },

    // _makeLookupFunction(key) returns a lookup function.
    //
    // A lookup function takes in a document and returns an array of matching
    // values.  This array has more than one element if any segment of the key other
    // than the last one is an array.  ie, any arrays found when doing non-final
    // lookups result in this function 'branching'; each element in the returned
    // array represents the value found at this branch. If any branch doesn't have a
    // final value for the full key, its element in the returned list will be
    // undefined. It always returns a non-empty array.
    //
    // _makeLookupFunction('a.x')({a: {x: 1}}) returns [1]
    // _makeLookupFunction('a.x')({a: {x: [1]}}) returns [[1]]
    // _makeLookupFunction('a.x')({a: 5})  returns [undefined]
    // _makeLookupFunction('a.x')({a: [{x: 1},
    //                                 {x: [2]},
    //                                 {y: 3}]})
    //   returns [1, [2], undefined]
    _makeLookupFunction: function (key) {
        var dotLocation = key.indexOf('.');
        var first, lookupRest, nextIsNumeric;
        if (dotLocation === -1) {
            first = key;
        } else {
            first = key.substr(0, dotLocation);
            var rest = key.substr(dotLocation + 1);
            lookupRest = this._makeLookupFunction(rest);
            // Is the next (perhaps final) piece numeric (ie, an array lookup?)
            nextIsNumeric = /^\d+(\.|$)/.test(rest);
        }

        return function (doc) {
            if (doc === null) { // null or undefined
                return [undefined];
            }
            var firstLevel = doc[first];

            // We don't 'branch' at the final level.
            if (!lookupRest) {
                return [firstLevel];
            }

            // It's an empty array, and we're not done: we won't find anything.
            if (_.isArray(firstLevel) && firstLevel.length === 0) {
                return [undefined];
            }

            // For each result at this level, finish the lookup on the rest of the key,
            // and return everything we find. Also, if the next result is a number,
            // don't branch here.
            //
            // Technically, in MongoDB, we should be able to handle the case where
            // objects have numeric keys, but Mongo doesn't actually handle this
            // consistently yet itself, see eg
            // https://jira.mongodb.org/browse/SERVER-2898
            // https://github.com/mongodb/mongo/blob/master/jstests/array_match2.js
            if (!_.isArray(firstLevel) || nextIsNumeric) {
                firstLevel = [firstLevel];
            }
            return Array.prototype.concat.apply([], _.map(firstLevel, lookupRest));
        };
    },

    _anyIfArray: function (x, f) {
        if (_.isArray(x)) {
            return _.any(x, f);
        }
        return f(x);
    },

    _anyIfArrayPlus: function (x, f) {
        if (f(x)) {
            return true;
        }
        return _.isArray(x) && _.any(x, f);
    },

    // Is this selector just shorthand for lookup by _id?
    _selectorIsId: function (selector) {
        return _.isString(selector) || _.isNumber(selector);
    },

    // deep equality test: use for literal document and array matches
    _equal: function (a, b) {
        return M.Field.prototype._equals(a, b, true);
    },

    _cmp: function (a, b) {
        return M.Field.prototype._cmp(a, b);
    },

    LOGICAL_OPERATORS: {
        '$and': function (subSelector) {
            if (!_.isArray(subSelector) || _.isEmpty(subSelector)) {
                throw new Error('$and/$or/$nor must be nonempty array');
            }
            var subSelectorFunctions = _.map(subSelector, M.DataSelector.compileDocSelector);
            return function (doc) {
                return _.all(subSelectorFunctions, function (f) {
                    return f(doc);
                });
            };
        },

        '$or': function (subSelector) {
            if (!_.isArray(subSelector) || _.isEmpty(subSelector)) {
                throw new Error('$and/$or/$nor must be nonempty array');
            }
            var subSelectorFunctions = _.map(subSelector, M.DataSelector.compileDocSelector);
            return function (doc) {
                return _.any(subSelectorFunctions, function (f) {
                    return f(doc);
                });
            };
        },

        '$nor': function (subSelector) {
            if (!_.isArray(subSelector) || _.isEmpty(subSelector)) {
                throw new Error('$and/$or/$nor must be nonempty array');
            }
            var subSelectorFunctions = _.map(subSelector, M.DataSelector.compileDocSelector);
            return function (doc) {
                return _.all(subSelectorFunctions, function (f) {
                    return !f(doc);
                });
            };
        },

        '$where': function (selectorValue) {
            if (!_.isFunction(selectorValue)) {
                var value = selectorValue;
                selectorValue = function() { return value; };
            }
            return function (doc) {
                return selectorValue.call(doc);
            };
        }
    },

    VALUE_OPERATORS: {
        '$in': function (operand) {
            if (!_.isArray(operand)) {
                throw new Error('Argument to $in must be array');
            }
            return function (value) {
                return M.DataSelector._anyIfArrayPlus(value, function (x) {
                    return _.any(operand, function (operandElt) {
                        return M.DataSelector._equal(operandElt, x);
                    });
                });
            };
        },

        '$all': function (operand) {
            if (!_.isArray(operand)) {
                throw new Error('Argument to $all must be array');
            }
            return function (value) {
                if (!_.isArray(value)) {
                    return false;
                }
                return _.all(operand, function (operandElt) {
                    return _.any(value, function (valueElt) {
                        return M.DataSelector._equal(operandElt, valueElt);
                    });
                });
            };
        },

        '$lt': function (operand) {
            return function (value) {
                return M.DataSelector._anyIfArray(value, function (x) {
                    return M.DataSelector._cmp(x, operand) < 0;
                });
            };
        },

        '$lte': function (operand) {
            return function (value) {
                return M.DataSelector._anyIfArray(value, function (x) {
                    return M.DataSelector._cmp(x, operand) <= 0;
                });
            };
        },

        '$gt': function (operand) {
            return function (value) {
                return M.DataSelector._anyIfArray(value, function (x) {
                    return M.DataSelector._cmp(x, operand) > 0;
                });
            };
        },

        '$gte': function (operand) {
            return function (value) {
                return M.DataSelector._anyIfArray(value, function (x) {
                    return M.DataSelector._cmp(x, operand) >= 0;
                });
            };
        },

        '$ne': function (operand) {
            return function (value) {
                return !M.DataSelector._anyIfArrayPlus(value, function (x) {
                    return M.DataSelector._equal(x, operand);
                });
            };
        },

        '$nin': function (operand) {
            if (!_.isArray(operand)) {
                throw new Error('Argument to $nin must be array');
            }
            var inFunction = this.VALUE_OPERATORS.$in(operand);
            return function (value) {
                // Field doesn't exist, so it's not-in operand
                if (value === undefined) {
                    return true;
                }
                return !inFunction(value);
            };
        },

        '$exists': function (operand) {
            return function (value) {
                return operand === (value !== undefined);
            };
        },
        '$mod': function (operand) {
            var divisor = operand[0], remainder = operand[1];
            return function (value) {
                return M.DataSelector._anyIfArray(value, function (x) {
                    return x % divisor === remainder;
                });
            };
        },

        '$size': function (operand) {
            return function (value) {
                return _.isArray(value) && operand === value.length;
            };
        },

        '$type': function (operand) {
            return function (value) {
                // A nonexistent field is of no type.
                if (_.isUndefined(value)) {
                    return false;
                }
                return M.DataSelector._anyIfArray(value, function (x) {
                    return M.Field.prototype.detectType(x) === operand;
                });
            };
        },

        '$regex': function (operand, options) {

            if (_.isUndefined(options)) {
                // Options passed in $options (even the empty string) always overrides
                // options in the RegExp object itself.

                // Be clear that we only support the JS-supported options, not extended
                // ones (eg, Mongo supports x and s). Ideally we would implement x and s
                // by transforming the regexp, but not today...
                if (/[^gim]/.test(options)) {
                    throw new Error('Only the i, m, and g regexp options are supported');
                }

                var regexSource = _.isRegExp(operand) ? operand.source : operand;
                operand = new RegExp(regexSource, options);
            } else if (!_.isRegExp(operand)) {
                operand = new RegExp(operand);
            }

            return function (value) {
                if (_.isUndefined(value)) {
                    return false;
                }
                return M.DataSelector._anyIfArray(value, function (x) {
                    return operand.test(x);
                });
            };
        },

        '$options': function (operand) {
            // evaluation happens at the $regex function above
            return function (value) {
                return true;
            };
        },

        '$elemMatch': function (operand) {
            var matcher = M.DataSelector.compileDocSelector(operand);
            return function (value) {
                if (!_.isArray(value)) {
                    return false;
                }
                return _.any(value, function (x) {
                    return matcher(x);
                });
            };
        },

        '$not': function (operand) {
            var matcher = M.DataSelector.compileDocSelector(operand);
            return function (value) {
                return !matcher(value);
            };
        }
    },

    // Give a sort spec, which can be in any of these forms:
    //   {'key1': 1, 'key2': -1}
    //   [['key1', 'asc'], ['key2', 'desc']]
    //   ['key1', ['key2', 'desc']]
    //
    // (.. with the first form being dependent on the key enumeration
    // behavior of your javascript VM, which usually does what you mean in
    // this case if the key names don't look like integers ..)
    //
    // return a function that takes two objects, and returns -1 if the
    // first object comes first in order, 1 if the second object comes
    // first, or 0 if neither object comes before the other.

    compileSort: function (spec) {
        var sortSpecParts = [];

        if (_.isArray(spec)) {
            for (var i = 0; i < spec.length; i++) {
                if (typeof spec[i] === 'string') {
                    sortSpecParts.push({
                        lookup: this._makeLookupFunction(spec[i]),
                        ascending: true
                    });
                } else {
                    sortSpecParts.push({
                        lookup: this._makeLookupFunction(spec[i][0]),
                        ascending: spec[i][1] !== 'desc'
                    });
                }
            }
        } else if (typeof spec === 'object') {
            for (var key in spec) {
                sortSpecParts.push({
                    lookup: this._makeLookupFunction(key),
                    ascending: spec[key] >= 0
                });
            }
        } else {
            throw new Error('Bad sort specification: ', JSON.stringify(spec));
        }

        if (sortSpecParts.length === 0) {
            return function () {
                return 0;
            };
        }

        // reduceValue takes in all the possible values for the sort key along various
        // branches, and returns the min or max value (according to the bool
        // findMin). Each value can itself be an array, and we look at its values
        // too. (ie, we do a single level of flattening on branchValues, then find the
        // min/max.)
        var reduceValue = function (branchValues, findMin) {
            var reduced;
            var first = true;
            // Iterate over all the values found in all the branches, and if a value is
            // an array itself, iterate over the values in the array separately.
            _.each(branchValues, function (branchValue) {
                // Value not an array? Pretend it is.
                if (!_.isArray(branchValue)) {
                    branchValue = [branchValue];
                }
                // Value is an empty array? Pretend it was missing, since that's where it
                // should be sorted.
                if (_.isArray(branchValue) && branchValue.length === 0) {
                    branchValue = [undefined];
                }
                _.each(branchValue, function (value) {
                    // We should get here at least once: lookup functions return non-empty
                    // arrays, so the outer loop runs at least once, and we prevented
                    // branchValue from being an empty array.
                    if (first) {
                        reduced = value;
                        first = false;
                    } else {
                        // Compare the value we found to the value we found so far, saving it
                        // if it's less (for an ascending sort) or more (for a descending
                        // sort).
                        var cmp = M.DataSelector._cmp(reduced, value);
                        if ((findMin && cmp > 0) || (!findMin && cmp < 0)) {
                            reduced = value;
                        }
                    }
                });
            });
            return reduced;
        };

        return function (a, b) {
            a = a.attributes ? a.attributes : a;
            b = b.attributes ? b.attributes : b;
            for (var i = 0; i < sortSpecParts.length; ++i) {
                var specPart = sortSpecParts[i];
                var aValue = reduceValue(specPart.lookup(a), specPart.ascending);
                var bValue = reduceValue(specPart.lookup(b), specPart.ascending);
                var compare = M.DataSelector._cmp(aValue, bValue);
                if (compare !== 0) {
                    return specPart.ascending ? compare : -compare;
                }
            }
            return 0;
        };
    }

});
