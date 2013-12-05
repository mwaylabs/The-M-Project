// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * This prototype defines decoding and encoding mechanisms based on the Base64 algorithm. You
 * normally don't call this object respectively its methods directly, but let M.Cypher handle
 * this.
 * @module M.Base64
 *
 * @extends M.Object
 */
M.Base64 = M.Object.design(/** @scope M.Base64.prototype */ {

        /**
         * The type of this object.
         *
         * @type String
         */
        type: 'M.Base64',

        /**
         * The key string for the base 64 decoding and encoding.
         *
         * @type String
         */
        _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        /**
         * This method encodes a given binary input, using the base64 encoding.
         *
         * @param {String} input The binary to be encoded. (e.g. an requested image)
         * @returns {String} The base64 encoded string.
         */
        encodeBinary: function( input ) {
            var output = '';
            var bytebuffer;
            var encodedCharIndexes = new Array(4);
            var inx = 0;
            var paddingBytes = 0;

            while( inx < input.length ) {
                // Fill byte buffer array
                bytebuffer = new Array(3);
                for( var jnx = 0; jnx < bytebuffer.length; jnx++ ) {
                    if( inx < input.length ) {
                        bytebuffer[jnx] = input.charCodeAt(inx++) & 0xff;
                    } // throw away high-order byte, as documented at: https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
                    else {
                        bytebuffer[jnx] = 0;
                    }
                }

                // Get each encoded character, 6 bits at a time
                // index 1: first 6 bits
                encodedCharIndexes[0] = bytebuffer[0] >> 2;
                // index 2: second 6 bits (2 least significant bits from input byte 1 + 4 most significant bits from byte 2)
                encodedCharIndexes[1] = ((bytebuffer[0] & 0x3) << 4) | (bytebuffer[1] >> 4);
                // index 3: third 6 bits (4 least significant bits from input byte 2 + 2 most significant bits from byte 3)
                encodedCharIndexes[2] = ((bytebuffer[1] & 0x0f) << 2) | (bytebuffer[2] >> 6);
                // index 3: forth 6 bits (6 least significant bits from input byte 3)
                encodedCharIndexes[3] = bytebuffer[2] & 0x3f;

                // Determine whether padding happened, and adjust accordingly
                paddingBytes = inx - (input.length - 1);
                switch( paddingBytes ) {
                    case 2:
                        // Set last 2 characters to padding char
                        encodedCharIndexes[3] = 64;
                        encodedCharIndexes[2] = 64;
                        break;
                    case 1:
                        // Set last character to padding char
                        encodedCharIndexes[3] = 64;
                        break;
                    default:
                        break; // No padding - proceed
                }
                // Now we will grab each appropriate character out of our keystring
                // based on our index array and append it to the output string
                for( jnx = 0; jnx < encodedCharIndexes.length; jnx++ ) {
                    output += this._keyStr.charAt(encodedCharIndexes[jnx]);
                }
            }
            return output;
        },

        /**
         * This method encodes a given input string, using the base64 encoding.
         *
         * @param {String} input The string to be encoded.
         * @returns {String} The base64 encoded string.
         */
        encode: function( input ) {
            var output = '';
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = M.Cypher.utf8Encode(input);

            while( i < input.length ) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if( isNaN(chr2) ) {
                    enc3 = enc4 = 64;
                } else if( isNaN(chr3) ) {
                    enc4 = 64;
                }

                output += this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }

            return output;
        },

        binaryEncode: function( input ) {
            var output = '';
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            while( i < input.length ) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if( isNaN(chr2) ) {
                    enc3 = enc4 = 64;
                } else if( isNaN(chr3) ) {
                    enc4 = 64;
                }

                output += this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }

            return output;
        },

        /**
         * This method decodes a given input string, using the base64 decoding.
         *
         * @param {String} input The string to be decoded.
         * @returns {String} The base64 decoded string.
         */
        decode: function( input ) {
            var output = '';
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

            while( i < input.length ) {
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if( enc3 !== 64 ) {
                    output = output + String.fromCharCode(chr2);
                }

                if( enc4 !== 64 ) {
                    output = output + String.fromCharCode(chr3);
                }
            }

            return M.Cypher.utf8Decode(output);
        }

    });