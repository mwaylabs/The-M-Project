// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      11.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/cypher_algorithms/base64.js');
m_require('core/utility/cypher_algorithms/sha256.js');

/**
 * @class
 *
 * Object for decoding and encoding.
 *
 */
M.Cypher = M.Object.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.Cypher',

    defaultDecoder: M.Base64,

    defaultEncoder: M.Base64,

    defaultHasher: M.SHA256,

    decode: function(input, algorithm) {

        if(algorithm && algorithm.decode) {
            return algorithm.decode(input);
        } else {
            return this.defaultDecoder.decode(input);
        }
        
    },

    encode: function(input, algorithm) {

        if(algorithm && algorithm.encode) {
            return algorithm.encode(input);
        } else {
            return this.defaultEncoder.encode(input);
        }

    },

    hash: function(input, algorithm) {

        if(algorithm && algorithm.hash) {
            return algorithm.hash(input);
        } else {
            return this.defaultHasher.hash(input);
        }

    },

    /**
     * Private method for UTF-8 encoding
     *
     * @private
     * @param {String} string The string to be encoded.
     */
    utf8_encode : function (string) {
        string = string.replace(/\r\n/g, '\n');
        var utf8String = '';

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utf8String += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utf8String += String.fromCharCode((c >> 6) | 192);
                utf8String += String.fromCharCode((c & 63) | 128);
            }
            else {
                utf8String += String.fromCharCode((c >> 12) | 224);
                utf8String += String.fromCharCode(((c >> 6) & 63) | 128);
                utf8String += String.fromCharCode((c & 63) | 128);
            }

        }

        return utf8String;
    },

    /**
     * Private method for UTF-8 decoding
     *
     * @private
     * @param {String} string The string to be decoded.
     */
    utf8_decode : function (utf8String) {
        var string = '';
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utf8String.length ) {

            c = utf8String.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }  else if((c > 191) && (c < 224)) {
                c2 = utf8String.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utf8String.charCodeAt(i+1);
                c3 = utf8String.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

});