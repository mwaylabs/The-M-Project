// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * @module M.Date
 *
 * @extends M.Object
 */
M.Date = {

    /**
     * This method is used to create a new instance of M.Date based on the data
     * library moment.js.
     *
     * @returns {Object}
     */
    create: function() {
        var m = moment.apply(this, arguments);
        return _.extend(m, this);
    }
};
