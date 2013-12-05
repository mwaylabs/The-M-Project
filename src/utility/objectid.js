// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

// ===========================================================================
//
// M.ObjectId uses code from meteor.js
// https://github.com/meteor/meteor/blob/master/packages/minimongo
//
// Thanks for sharing!
//
// ===========================================================================

// m_require('core/foundation/object.js');
/**
 *
 * @module M.ObjectID
 *
 */
M.ObjectID = function( hexString ) {
    M.ObjectID.counter   = M.ObjectID.counter   || parseInt(Math.random() * Math.pow(16, 6));
    M.ObjectID.machineId = M.ObjectID.machineId || parseInt(Math.random() * Math.pow(16, 6));
    M.ObjectID.processId = M.ObjectID.processId || parseInt(Math.random() * Math.pow(16, 4));
    this._ObjectID(hexString);
};

M.ObjectID._looksLikeObjectID = function( str ) {
    return str.length === 24 && str.match(/^[0-9a-f]*$/);
};

_.extend(M.ObjectID.prototype, {

    _str: '',

    _ObjectID: function( hexString ) {
        //random-based impl of Mongo ObjectID
        if( hexString ) {
            hexString = hexString.toLowerCase();
            if( !M.ObjectID._looksLikeObjectID(hexString) ) {
                throw new Error('Invalid hexadecimal string for creating an ObjectID');
            }
            // meant to work with _.isEqual(), which relies on structural equality
            this._str = hexString;
        } else {

            this._str =
                this._hexString(8, new Date().getTime()/1000) +     // a 4-byte value from the Unix timestamp
                this._hexString(6, M.ObjectID.machineId) +          // a 3-byte machine identifier
                this._hexString(4, M.ObjectID.processId) +          // a 2-byte process identifier
                this._hexString(6, M.ObjectID.counter++);   // a 3-byte counter, starting with a random value.
        }
        return this._str;
    },

    _hexString: function(len, num) {
        num = num || parseInt(Math.random() * Math.pow(16,len));
        var str = num.toString(16);
        while(str.length < len) {
            str = '0'+str;
        }
        return str.substr(0, len);
    },

    toString: function() {
        return 'ObjectID(\'' + this._str + '\')';
    },

    equals: function( other ) {
        return other instanceof this._ObjectID && this.valueOf() === other.valueOf();
    },

    clone: function() {
        return new M.ObjectID(this._str);
    },

    typeName: function() {
        return 'oid';
    },

    getTimestamp: function() {
        return parseInt(this._str.substr(0, 8), 16)*1000;
    },

    getMachineId: function() {
        return parseInt(this._str.substr(8, 6), 16);
    },

    getProcessId: function() {
        return parseInt(this._str.substr(14, 4), 16);
    },

    getCounter: function() {
        return parseInt(this._str.substr(18, 6), 16);
    },

    valueOf: function() {
        return this._str;
    },

    toJSON: function() {
        return this._str;
    },

    toHexString: function() {
        return this._str;
    },

    // Is this selector just shorthand for lookup by _id?
    _selectorIsId: function( selector ) {
        return (typeof selector === 'string') ||
            (typeof selector === 'number') ||
            selector instanceof M.ObjectId;
    },

    // Is the selector just lookup by _id (shorthand or not)?
    _selectorIsIdPerhapsAsObject: function( selector ) {
        return this._selectorIsId(selector) || (selector && typeof selector === 'object' && selector._id && this._selectorIsId(selector._id) && _.size(selector) === 1);
    },

    // If this is a selector which explicitly constrains the match by ID to a finite
    // number of documents, returns a list of their IDs.  Otherwise returns
    // null. Note that the selector may have other restrictions so it may not even
    // match those document!  We care about $in and $and since those are generated
    // access-controlled update and remove.
    _idsMatchedBySelector: function( selector ) {
        // Is the selector just an ID?
        if( this._selectorIsId(selector) ) {
            return [selector];
        }
        if( !selector ) {
            return null;
        }

        // Do we have an _id clause?
        if( _.has(selector, '_id') ) {
            // Is the _id clause just an ID?
            if( this._selectorIsId(selector._id) ) {
                return [selector._id];
            }
            // Is the _id clause {_id: {$in: ["x", "y", "z"]}}?
            if( selector._id && selector._id.$in && _.isArray(selector._id.$in) && !_.isEmpty(selector._id.$in) && _.all(selector._id.$in, this._selectorIsId) ) {
                return selector._id.$in;
            }
            return null;
        }

        // If this is a top-level $and, and any of the clauses constrain their
        // documents, then the whole selector is constrained by any one clause's
        // constraint. (Well, by their intersection, but that seems unlikely.)
        if( selector.$and && _.isArray(selector.$and) ) {
            for( var i = 0; i < selector.$and.length; ++i ) {
                var subIds = this._idsMatchedBySelector(selector.$and[i]);
                if( subIds ) {
                    return subIds;
                }
            }
        }

        return null;
    }
});