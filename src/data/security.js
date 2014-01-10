// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * @module M.Security
 *
 * @type {{logon: Function, logonBasicAuth: Function, logonMcapAuth: Function, getHost: Function}}
 */
M.Security = M.Object.design({


    logon: function (options, callback) {
        var credentials = options ? options.credentials : null;
        if (credentials) {
            switch (credentials.type) {
                case 'basic':
                    return this.logonBasicAuth(options, callback);
            }
        }
        this.handleCallback(callback);
    },

    logonBasicAuth: function (options, callback) {
        var credentials = options.credentials;
        options.beforeSend = function (xhr) {
            M.Security.setBasicAuth(xhr, credentials);
        };
        this.handleCallback(callback);
    },

    setBasicAuth: function( xhr, credentials ) {
        if( credentials && credentials.username && xhr && M.Base64 ) {
            var basicAuth = M.Base64.encode(encodeURIComponent(credentials.username + ':' + (credentials.password || '')));
            xhr.setRequestHeader('Authorization', 'Basic ' + basicAuth);
        }
    }

});
