// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * M.Cypher defines a prototype for handling decoding, encoding and hashing of string
 * based values.
 * @module M.Cypher
 *
 * @extends M.Object
 */
M.Cypher = M.Object.design(/** @scope M.Cypher.prototype */ {

        /**
         * The type of this object.
         *
         * @type String
         */
        type: 'M.Cypher',

        /**
         * The default decoder.
         *
         * @type M.Base64
         */
        defaultDecoder: M.Base64,

        /**
         * The default encoder.
         *
         * @type M.Base64
         */

        defaultEncoder: M.Base64,

        /**
         * The default hash algorithm.
         *
         * @type M.SHA256
         */

        defaultHasher: M.SHA256,

        /**
         * This method is the one that initiates the decoding of a given string, based on either
         * the default decoder or a custom decoder.
         *
         * @param {String} input The input string to be decoded.
         * @param {Object} algorithm The algorithm object containing a decode method.
         * @returns {String} The decoded string.
         */
        decode: function( input, algorithm ) {

            if( algorithm && algorithm.decode ) {
                return algorithm.decode(input);
            } else {
                return this.defaultDecoder.decode(input);
            }

        },

        /**
         * This method is the one that initiates the encoding of a given string, based on either
         * the default encoder or a custom encoder.
         *
         * @param {String} input The input string to be decoded.
         * @param {Object} algorithm The algorithm object containing a encode method.
         * @returns {String} The encoded string.
         */
        encode: function( input, algorithm ) {

            if( algorithm && algorithm.encode ) {
                return algorithm.encode(input);
            } else {
                return this.defaultEncoder.encode(input);
            }

        },

        /**
         * This method is the one that initiates the hashing of a given string, based on either
         * the default hashing algorithm or a custom hashing algorithm.
         *
         * @param {String} input The input string to be hashed.
         * @param {Object} algorithm The algorithm object containing a hash method.
         * @returns {String} The hashed string.
         */
        hash: function( input, algorithm ) {

            if( algorithm && algorithm.hash ) {
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
         * @returns {String} The utf8 encoded string.
         */
        utf8Encode: function( string ) {
            string = string.replace(/\r\n/g, '\n');
            var utf8String = '';

            for( var n = 0; n < string.length; n++ ) {

                var c = string.charCodeAt(n);

                if( c < 128 ) {
                    utf8String += String.fromCharCode(c);
                } else if( (c > 127) && (c < 2048) ) {
                    utf8String += String.fromCharCode((c >> 6) | 192);
                    utf8String += String.fromCharCode((c & 63) | 128);
                } else {
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
         * @returns {String} The utf8 decoded string.
         */
        utf8Decode: function( utf8String ) {
            var string = '';
            var i;
            var c;
            var c1;
            var c2;
            var c3;
            i = c = c1 = c2 = 0;

            while( i < utf8String.length ) {

                c = utf8String.charCodeAt(i);

                if( c < 128 ) {
                    string += String.fromCharCode(c);
                    i++;
                } else if( (c > 191) && (c < 224) ) {
                    c2 = utf8String.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utf8String.charCodeAt(i + 1);
                    c3 = utf8String.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        }

    });