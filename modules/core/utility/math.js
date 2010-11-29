// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      22.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

M.FLOOR = 'floor';
M.CEIL = 'ceil';
M.ROUND = 'round';

/**
 * @class
 *
 * Object for simpler handling of mathematical operations.
 */
M.Math = M.Object.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.Math',

    /**
     * This method returns the value of the base (x) to the power of the exponent (y). So e.g.
     * pow(2, 3) would return 8, pow(3, 2) would return 9.
     *
     * @param base {Number} The base.
     * @param exponent {Number} The exponent.
     */
    pow: function(base, exponent) {
        return Math.pow(base, exponent);
    },

    /**
     * The method returns a random number within the range given by the min property
     * and the max property.
     *
     * A test with 100.000 iterations for random(1, 3) created the following distribution:
     * - 1: 33.2%
     * - 2: 33.2%
     * - 3: 33.6%
     *
     * @param min {Number} The minimal value.
     * @param max {Number} The maximal value.
     */
    random: function(min, max) {
        return Math.ceil(Math.random() * (max - min + 1) + min - 1);
    },

    /**
     * The method returns rounded version of the given input number. There are three
     * types of rounding available:
     *
     * - M.FLOOR: Returns the next lower integer, so 2.1 and 2.9 both would return 2.
     * - M.CEIL: Returns the next higher integer, so 2.1 and 2.9 both would return 3.
     * - M.ROUND: Returns the nearest integer, so 2.1 would return 2 and 2.9 would return 3.
     *
     * With the optional third parameter 'decimals', you can specify the number of decimal digits to be
     * returned. For example round(1.2345, M.FLOOR, 3) would return 1.234. The default for this parameter
     * is 0.
     *
     * @param input {Number} The input value.
     * @param type {String} The type of rounding.
     * @param type {Number} The number of decimals (only available for M.ROUND).
     */
    round: function(input, type, decimals) {
        if(decimals) {
            input = input * (Math.pow(10, decimals));
        }
        var output = 0;
        switch (type) {
            case M.FLOOR:
                output = Math.floor(input);
                break;
            case M.CEIL:
                output = Math.ceil(input);
                break;
            case M.ROUND:
                default:
                output = Math.round(input);
                break;
        }
        if(decimals) {
            var outputStr = String(output / (Math.pow(10, decimals))).split('.');
            if(outputStr.length > 1) {
                output = parseFloat(outputStr[0] + '.' + outputStr[1].substring(0, decimals));
            } else {
                output = parseFloat(outputStr);
            }
        }

        return output;
    }

});