(function() {

    if(typeof _ === 'undefined'){
        _ = require('underscore')._;
        Backbone = require('backbone');
    }


    /**
     * Defines the general namespace
     * @type {Object}
     */
    M = {};

    /**
     * Version number of current release
     * @type {String}
     */
    M.Version = M.version = '2.0';

    /**
     * Empty function to be used when
     * no functionality is needed
     *
     * @type {Function}
     */
    M.f = function() {};

    /**
     * Readable alias for true
     *
     * @type {Boolean}
     */
    YES = true;

    /**
     * Readable alias for false
     *
     * @type {Boolean}
     */
    NO = false;

    return M;

})();