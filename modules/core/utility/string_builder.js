// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 M-Way Solutions GmbH. All rights reserved.
// Creator:   Frank
// Date:      04.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

// Used to build strings

m_require('core/foundation/object.js');



M.StringBuilder = M.Object.extend({

    _StringBuilder: function(value) {

        this.strings = [];

         // Appends the given value for count times to the end of this instance.
        this.append = function (value, count) {
             count = typeof(count) === 'number' ? count : 1;
             if (value) {
                 for(var i=1; i<=count; i++) {
                     this.strings.push(value);
                 }
                 return YES;
             }
        }

         // Clears the string buffer
        this.clear = function () {
             this.strings.length = 0;
        }

         // Converts this instance to a String.
        this.toString = function () {
            return this.strings.join("");
        }

        this.append(value);
    },

    create: function(str) {
        return new this._StringBuilder(str);
    }
});

