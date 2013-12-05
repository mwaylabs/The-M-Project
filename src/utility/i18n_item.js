// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * @module M.I18NItem
 *
 * @type {*}
 * @extends M.Object
 */
M.I18NItem = M.Object.design({

    /**
     * The type of this object.
     *
     * @type {String}
     * @private
     */
    _type: 'M.I18NItem',

    /**
     * The translation key. Used to identify the locale item.
     *
     * @type {String}
     */
    key: null,

    /**
     * The translation placeholder as a key-value pair.
     * Used to replace all {{placeholderName}} in the locale string
     * with the appropriate value.
     *
     * Example:
     * {
     *    username: 'Tom',
     *    status: 'offline'
     * }
     *
     * @type {Object}
     */
    placeholder: null,

    /**
     * Creates a new instance with the given key and placeholder.
     * Used to hold the key and placeholder for later use.
     *
     * @param key {String}
     * @param placeholder {String}
     * @returns {M.I18NItem}
     */
    create: function (key, placeholder) {
        if(!key) {
            return null;
        }

        this.key = key;
        if(placeholder) {
            this.placeholder = placeholder;
        }
        return _.extend({}, this);
    }
});