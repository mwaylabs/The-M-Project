// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * @module M.SqlSelector
 *
 * @type {*}
 * @extends M.DataSelector
 */
M.SqlSelector = M.DataSelector.design({

    _type: 'M.SqlSelector',

    _selector: null,
    _query: null,
    _entity: null,

    create: function (docSelector, entity) {
        var selector = this.extend({
            _entity: entity,
            _selector: null,
            _query: null
        });
        selector.init(docSelector);

        return selector;
    },

    init: function (docSelector) {
        this._selector = this.compileSelector(docSelector);
        this._query = this.buildSqlQuery(docSelector);
    },

    buildStatement: function (obj) {
        return this._query;
    },

    buildSqlQuery: function (selector, connector) {
        // you can pass a literal function instead of a selector
        if (selector instanceof Function) {
            return '';
        }

        // shorthand -- sql
        if (_.isString(selector)) {
            return selector;
        }

        // protect against dangerous selectors.  falsey and {_id: falsey} are both
        // likely programmer error, and not what you want, particularly for
        // destructive operations.
        if (!selector || (('_id' in selector) && !selector._id)) {
            return '1=2';
        }

        // Top level can't be an array or true or binary.
        if (_.isBoolean(selector) || _.isArray(selector) || M.DataField.isBinary(selector)) {
            throw new Error('Invalid selector: ' + selector);
        }

        return this.buildSqlWhere(selector)();
    },

    // The main compilation function for a given selector.
    buildSqlWhere: function (docSelector) {
        var where = '';
        var that = this;
        var perKeySelectors = [];
        _.each(docSelector, function (subSelector, key) {
            if (key.substr(0, 1) === '$') {
                // Outer operators are either logical operators (they recurse back into
                // this function), or $where.
                perKeySelectors.push(that.buildLogicalOperator(key, subSelector));
            } else {
                var valueLookup = that.buildLookup(key);
                var valueSelector = that.buildValueSelector(subSelector);
                if (_.isFunction(valueSelector)) {
                    perKeySelectors.push(function () {
                        return valueSelector(valueLookup);
                    });
                }
            }
        });

        return function () {
            var sql = '';
            _.each(perKeySelectors, function (f) {
                if (_.isFunction(f)) {
                    sql += f.call(that);
                }
            });
            return sql;
        };
    },

    buildValueSelector: function (valueSelector) {
        var that = this;
        if (valueSelector === null) {  // undefined or null
            return function (key) {
                return key + ' IS NULL';
            };
        }

        // Selector is a non-null primitive (and not an array or RegExp either).
        if (!_.isObject(valueSelector)) {
            return function (key) {
                return key + ' = ' + that.buildValue(valueSelector);
            };
        }

        if (_.isRegExp(valueSelector)) {
            var regEx = valueSelector.toString();
            var match = regEx.match(/\/[\^]?([^^.*$'+()]*)[\$]?\//);
            if (match && match.length > 1) {
                var prefix = regEx.indexOf('/^') < 0 ? '%' : '';
                var suffix = regEx.indexOf('$/') < 0 ? '%' : '';
                return function (key) {
                    return key + ' LIKE "' + prefix + match[1] + suffix + '"';
                };
            }
            return null;
        }

        // Arrays match either identical arrays or arrays that contain it as a value.
        if (_.isArray(valueSelector)) {
            return null;
        }

        // It's an object, but not an array or regexp.
        if (this.hasOperators(valueSelector)) {
            var operatorFunctions = [];
            _.each(valueSelector, function (operand, operator) {
                if (!_.has(that.VALUE_OPERATORS, operator)) {
                    throw new Error('Unrecognized operator: ' + operator);
                }
                operatorFunctions.push(that.VALUE_OPERATORS[operator](operand, that));
            });
            return function (key) {
                return that.LOGICAL_OPERATORS.$and(operatorFunctions, key);
            };
        }

        // It's a literal; compare value (or element of value array) directly to the
        // selector.
        return function (key) {
            return key + ' = ' + that.buildValue(valueSelector);
        };
    },

    buildLookup: function (key) {
        var field = this._entity ? this._entity.getField(key) : null;
        key = field && field.name ? field.name : key;
        return '"' + key + '"';
    },

    buildValue: function (value) {
        if (_.isString(value)) {
            return '"' + value.replace(/"/g, '""') + '"';
        }
        return value;
    },

    buildLogicalOperator: function (operator, subSelector) {
        if (!_.has(this.LOGICAL_OPERATORS, operator)) {
            throw new Error('Unrecognized logical operator: ' + operator);
        } else {
            if (!_.isArray(subSelector) || _.isEmpty(subSelector)) {
                throw new Error('$and/$or/$nor must be nonempty array');
            }
            var subSelectorFunction = _.map(subSelector, this.buildSqlWhere, this);
            var that = this;
            return function (key) {
                return that.LOGICAL_OPERATORS[operator](subSelectorFunction, key);
            };
        }
    },

    LOGICAL_OPERATORS: {
        '$and': function (subSelectorFunction, key) {
            var sql = '';
            var count = 0;
            _.each(subSelectorFunction, function (f) {
                var s = f !== null ? f(key) : '';
                if (s) {
                    count++;
                    sql += sql ? ' AND ' + s : s;
                }
            });
            return count > 1 ? '( ' + sql + ' )' : sql;
        },
        '$or': function (subSelectorFunction, key) {
            var sql = '';
            var miss = false;
            _.each(subSelectorFunction, function (f) {
                var s = f !== null ? f(key) : '';
                miss |= !s;
                sql += sql && s ? ' OR ' + s : s;
            });
            return miss ? '' : '( ' + sql + ' )';
        },
        '$nor': function (subSelectorFunction, key) {
            var sql = '';
            var miss = false;
            _.each(subSelectorFunction, function (f) {
                var s = f !== null ? f(key) : '';
                miss |= !s;
                sql += sql && s ? ' OR ' + s : s;
            });
            return miss ? '' : 'NOT ( ' + sql + ' )';
        }
    },

    VALUE_OPERATORS: {

        '$in': function (operand) {
            return null;
        },

        '$all': function (operand) {
            return null;
        },

        '$lt': function (operand, that) {
            return function (key) {
                return key + ' < ' + that.buildValue(operand);
            };
        },

        '$lte': function (operand, that) {
            return function (key) {
                return key + ' <= ' + that.buildValue(operand);
            };
        },

        '$gt': function (operand, that) {
            return function (key) {
                return key + ' > ' + that.buildValue(operand);
            };
        },

        '$gte': function (operand, that) {
            return function (key) {
                return key + '' > '' + that.buildValue(operand);
            };
        },

        '$ne': function (operand, that) {
            return function (key) {
                return key + ' <> ' + that.buildValue(operand);
            };
        },

        '$nin': function (operand) {
            return null;
        },

        '$exists': function (operand, that) {
            return function (key) {
                return key + ' IS NOT NULL';
            };
        },

        '$mod': function (operand) {
            return null;
        },

        '$size': function (operand) {
            return null;
        },

        '$type': function (operand) {
            return null;
        },

        '$regex': function (operand, options) {
            return null;
        },
        '$options': function (operand) {
            return null;
        },

        '$elemMatch': function (operand) {
            return null;
        },

        '$not': function (operand, that) {
            var matcher = that.buildSqlWhere(operand);
            return function (key) {
                return 'NOT (' + matcher(key) + ')';
            };
        }
    }
});