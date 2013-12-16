// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * M.I18N defines a prototype for internationalisation and localisation within
 * The M-Project. It is used to set and get the application's language and to
 * localize any string within an application.
 * @module M.I18N
 *
 * @extends M.Object
 */
M.I18N = _.extend(Backbone.Events, M.Object.design({

    /**
     * The type of this object.
     *
     * @private
     */
    _type: 'M.I18N',

    /**
     * List of available locales.
     *
     * @private
     */
    _availableLocales: [],

    /**
     * The current active locale
     *
     * @private
     */
    _activeLocale: null,

    /**
     * List of loaded dictionaries
     *
     * @private
     */
    _dictionary: [],

    /**
     * Set all available locales.
     *
     * @returns {Array}
     */
    setLocales: function (locales) {
        if (locales && _.isArray(locales) && locales.length > 0) {
            this._availableLocales = locales;
            return true;
        } else {
            console.log('No locales given!');
            return false;
        }
    },

    /**
     * Returns all available locales.
     *
     * @returns {Array}
     */
    getLocales: function () {
        return this._availableLocales;
    },

    /**
     * Changes the active locale.
     *
     * @param {String}
     */
    setLocale: function (locale) {
        this._activeLocale = locale;
        this.loadFileForLocale();
        // TODO store locale
    },

    /**
     * Returns the active locale
     *
     * @returns {String}
     */
    getLocale: function () {
        return this._activeLocale;
    },

    /**
     * This is just a shorthand for M.I18NItem.create
     *
     * @param key
     * @param placeholder
     * @returns {key|*}
     */
    get: function (key, placeholder) {
        return M.I18NItem.create(key, placeholder);
    },

    /**
     * Translates key into current locale, given placeholders
     * in {{placeholderName}} are replaced with the appropriate value.
     *
     * @param key
     * @param placeholder
     * @returns {*}
     */
    l: function (key, placeholder) {
        if (this._dictionary[this._activeLocale] === undefined || key === undefined || key === '' || key === null) {
            return '';
        }

        var translation = this._dictionary[this._activeLocale];
        translation = translation[key];

        if (translation) {
            /**
             * Replace placeholders with actual values
             */
            if (placeholder) {
                _.each(placeholder, function (value, key) {
                    translation = translation.replace('{{' + key + '}}', value);
                });
            }
        } else {
            translation = 'MISSING TRANSLATION ' + this._activeLocale + ': ' + key;
            console.log(translation);
        }

        return translation;
    },

    /**
     * Loads the locale file and puts it into dictionary
     */
    loadFileForLocale: function () {
        var fileUrl = 'i18n/' + this._activeLocale + '.js';

        // set locale for moment.js
        moment.lang(this._activeLocale.substr(0, 2));
        var that = this;

        // Load file only if it's not yet available
        if (this._dictionary[that._activeLocale] === undefined) {
            $.getJSON(fileUrl)
                .success(function (response) {
                    that._setDictionary(response);
                })
                .error(function (jqxhr, textStatus, error ) {
                    // TODO handle error
                    if(textStatus === 'parsererror') {
                        console.log( 'It\'s seem that the i18n file '+ fileUrl +' is corrupt! ' + error.message );
                    } else {
                        console.log( arguments );
                    }
                });
        }
        else {
            this._triggerLocaleChangedEvent();
        }
    },

    /**
     * Keeps the given keys in the dictionary.
     *
     * @param {Object}
     * @private
     */
    _setDictionary: function (locales) {
        var parsed = this._parseObject(locales);
        this._dictionary[this._activeLocale] = parsed;
        this._triggerLocaleChangedEvent();
    },

    /**
     * Triggers the locale changed event.
     *
     * @private
     */
    _triggerLocaleChangedEvent: function () {
        this.trigger(M.CONST.I18N.LOCALE_CHANGED, this._activeLocale);
    },

    /**
     * Return a flattened version of an object.
     *
     * @param {Object}
     * @returns {Object}
     * @private
     */
    _parseObject: function (obj) {
        var result = {};
        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }
            if (_.isObject(obj[key])) {
                var flatObject = this._parseObject(obj[key]);
                for (var childKey in flatObject) {
                    if (!flatObject.hasOwnProperty(childKey)) {
                        continue;
                    }
                    result[key + '.' + childKey] = flatObject[childKey];
                }
            } else {
                result[key] = obj[key];
            }
        }
        return result;
    }
}));

