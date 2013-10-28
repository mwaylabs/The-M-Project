/**
 * @class
 *
 * M.I18N defines a prototype for internationalisation and localisation within
 * The M-Project. It is used to set and get the application's language and to
 * localize any string within an application.
 */
M.I18N = _.extend(Backbone.Events, {

    _type: 'M.I18N',
    _availableLocales: [],
    locale: null,
    _dictionary: [],

    setLocales: function (locales) {
        if (locales && _.isArray(locales) && locales.length > 0) {
            this._availableLocales = locales;
            return true;
        } else {
            console.log('No locales given!');
            return false;
        }
    },

    setLocale: function (locale) {
        this.locale = locale;
        this.loadFileForLocale();
        // TODO store locale
    },

    /**
     * Loads file and puts it into dictionary
     */
    loadFileForLocale: function () {
        var fileUrl = 'i18n/' + this.locale + '.json';

        // set locale for moment.js
        moment.lang(this.locale.substr(0, 2));
        var that = this;

        // Load file only if it's not yet available
        if (this._dictionary[that.locale] === undefined) {
            $.getJSON(fileUrl)
                .success(function (response) {
                    that._assignDictionary(response);
                })
                .error(function () {
                    // TODO handle error
                    console.log('locale for ' + that.locale + ' not found');
                });
        }
        else {
            this._triggerLocaleChangedEvent();
        }
    },

    _assignDictionary: function (locales) {
        this._dictionary[this.locale] = this._parseObject(locales);
        this._triggerLocaleChangedEvent();
    },

    _triggerLocaleChangedEvent: function () {
        this.trigger(M.CONST.I18N.LOCALE_CHANGED, this.locale);
    },

    l: function (key, placeholder) {
        return this.get(key, placeholder).toString();
    },

    /**
     * translates key into current locale, given placeholders in {{placeholderName}} are replaced
     */
    get: function (key, placeholder) {
        if (this._dictionary[this.locale] === undefined || key === undefined || key === '' || key === null) {
            return '';
        }

        var translation = this._dictionary[this.locale];
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
            translation = 'MISSING TRANSLATION ' + this.locale + ': ' + key;
        }

        var result = new String(translation);
        result.key = result;
        result.placeholder = placeholder;
        return result;
    },

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
});
