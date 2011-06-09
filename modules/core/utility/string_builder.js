// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      04.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * @class
 *
 * The string builder is a utility object to join multiple strings to one single string.
 *
 * @extends M.Object
 */
M.StringBuilder = M.Object.extend(
/** @scope M.StringBuilder.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.StringBuilder',

    /**
     * An array containing all strings used within this string builder.
     *
     * @type Array
     */
    strings: null,

    /**
     * This method appends the given string, 'value', to its internal list of strings. With
     * an additional parameter 'count', you can force this method to add the string multiple
     * times.
     *
     * @param {String} value The value of the string to be added.
     * @param {Number} count The number to specify how many times the string will be added.
     * @returns {Boolean} The result of this operation: success/YES, error/NO.
     */
    append: function (value, count) {
        count = typeof(count) === 'number' ? count : 1;
        if (value) {
            for(var i = 1; i <= count; i++) {
                this.strings.push(value);
            }
            return YES;
        }
    },

    /**
     * This method clears the string builders internal string list.
     */
    clear: function () {
        this.strings.length = 0;
    },

    /**
     * This method returns a single string, consisting of all previously appended strings. They
     * are concatenated in the order they were appended to the string builder.
     *
     * @returns {String} The concatenated string of all appended strings.
     */
    toString: function () {
        return this.strings.join("");
    },

    /**
     * This method creates a new string builder instance.
     *
     * @param {String} str The initial string for this string builder.
     */
    create: function(str) {
        var stringBuilder = this.extend({
            strings: []
        });
        stringBuilder.append(str);
        
        return stringBuilder;
    }
    
});