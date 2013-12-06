// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * @module M.Security
 *
 * @type {{logon: Function, logonBasicAuth: Function, logonMcapAuth: Function, getHost: Function}}
 */
M.Security = {


    logon: function (options, callback) {
        var credentials = options ? options.credentials : null;
        if (credentials) {
            switch (credentials.type) {
                case 'basic':
                    return this.logonBasicAuth(options, callback);
                case 'mcap':
                    return this.logonMcapAuth(options, callback);
            }
        }
        callback();
    },

    logonBasicAuth: function (options, callback) {
        var credentials = options.credentials;
        options.beforeSend = function (xhr) {
            M.Request.setAuthentication(xhr, credentials);
        };
        callback();
    },

    logonMcapAuth: function (options, callback) {
        var credentials = options.credentials;
        if (credentials) {
            options.beforeSend = function (xhr) {
                if (credentials.cookie) {
                    xhr.setRequestHeader('JSESSIONID', credentials.cookie);
                }
            };
            if (!credentials.cookie) {
                var host = this.getHost(options);
                Backbone.ajax({
                    url: host + '/gofer/security-login' +
                        '?j_username=' + credentials.username +
                        '&j_password=' + credentials.password +
                        '&j_organization=system',
                    success: function (result) {
                        var m = document.cookie.match(/JSESSIONID=([^;]*)/);
                        credentials.cookie = (m && m.length > 1) ? m[1] : '.';
                        callback(result);
                    },
                    error: function (error) {
                        credentials.cookie = '.';
                        callback(error);
                    }
                });
            } else {
                callback();
            }
        }
    },

    getHost: function (options) {
        if (options.credentials && options.credentials.host) {
            return options.credentials.host;
        } else if (options.host) {
            return options.host;
        } else if (options.url) {
            var href = M.Request.getLocation(options.url);
            return href.protocol + '//' + href.host;
        }
        return '';
    }

};