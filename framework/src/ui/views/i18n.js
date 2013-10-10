M.I18N = M.Object.extend(/** @scope M.I18N.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.I18N',


    /**
     * The default language code.
     *
     * @type String
     * @private
     */
    _defaultLanguageCode: '',

    /**
     * The current language code.
     *
     * @type String
     * @private
     */
    _currentLanguageCode: '',


    /**
     * The current language object.
     *
     * @type Object
     * @private
     */
    _currentLanguage: null,

    /**
     *
     * @type {Object}
     * @private
     */
    _languages: {},

    /**
     * This property is used to map the navigator's language to an ISO standard
     * if necessary. E.g. 'de' will be mapped to 'de_de'. Currently we only provide
     * support for english and german. More languages are about to come or can be
     * added by overwriting this property.
     *
     * @type Object
     */
    _languageMapper: {
        en: 'en_us',
        de: 'de_de'
    },

    /**
     * This method returns the localized string for the given key based on
     * the current language.
     *
     * @param {String} key The key to the localized string.
     * @param {Object} context An object containing value parts for the translated string
     * @returns {String} The localized string based on the current application language.
     */
    l: function( key, context ) {
        var that = this;
        return (function(){
            that._localize(key, context);
        })
    },

    /**
     * This method sets the applications current language.
     *
     * @param {String} language The language to be set.
     */
    setCurrentLanguageCode: function( languageCode ) {

        if( languageCode && languageCode == this._currentLanguageCode ) {
            M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_UTILITY, 'Language \'' + languageCode + '\' already selected');
            return;
        }

        if( !this.isLanguageAvailable(languageCode) ) {
            M.Logger.warn(M.CONST.LOGGER.TAG_FRAMEWORK_UTILITY, 'There is no language \'' + languageCode + '\' specified using default language \'' + this._defaultLanguageCode + '\' instead!');
            this._currentLanguageCode = this._defaultLanguageCode;
        } else {
            this._currentLanguageCode = languageCode;
        }

        this._resetCurrentLanguage();

        // TODO: Save languageCode in local storage

        // TODO: Forces reload
        //location.href = location.protocol + '//' + location.host + location.pathname;
    },

    /**
     * This method is used to get a language for the current user. This process is divided
     * into three steps. If one step leads to a language, this on is returned. The steps are
     * prioritized as follows:
     *
     * - get the user's language by checking his navigator
     * - use the application's default language
     * - use the systems's default language
     *
     * @returns {String} The user's language.
     */
    getCurrentLanguageCode: function() {
        var language = null;

        // TODO: Get languageCode from local storage

        if( language ) {
            return language;
        }

        if( navigator ) {
            var regexResult = /([a-zA-Z]{2,3})[\s_.-]?([a-zA-Z]{2,3})?/.exec(navigator.language);
            if( regexResult && this[regexResult[0]] ) {
                return regexResult[0].toLowerCase();
            } else if( regexResult && regexResult[1] && this._languageMapper[regexResult[1]] ) {
                var language = this._languageMapper[regexResult[1]];
                return language.toLowerCase();
            } else {
                return this._defaultLanguageCode;
            }
        }

        return this._defaultLanguageCode;
    },


    setDefaultLanguageCode: function( languageCode ) {
        this._defaultLanguageCode = languageCode;
    },

    /**
     * This method adds a new language with the given languageCode.
     *
     * @param {String} languageCode
     * @param {Object} language
     */
    addLanguage: function( languageCode, language ) {

        var lang = this._parseObject(language);
        this._languages[languageCode] = _.extend({}, this._languages[languageCode], lang);

        // Force _getLanguage
        this._resetCurrentLanguage();
    },

    /**
     * This method returns a list of all available languages.
     *
     * @returns {Array} The available languages.
     */
    getAvailableLanguages: function() {
        var list = [];
        for( key in this._languages ) {
            list.push(key);
        }
        return list;
    },

    /**
     * This method checks if the passed language is available within the app or not.
     *
     * @param {String} languageCode The language to be checked.
     * @returns {Boolean} Indicates whether the requested language is available or not.
     */
    isLanguageAvailable: function( languageCode ) {

        var lang = this._languages[languageCode];
        if( lang && _.isObject(lang) ) {
            return YES;
        } else {
            M.Logger.warn(M.CONST.LOGGER.TAG_FRAMEWORK_UTILITY, 'No language \'' + languageCode + '\' specified.');
            return NO;
        }
    },

    /**
     * Returns a language with given languageCode.
     *
     * @param {String} languageCode Language which should be returned.
     * @returns {Object} An object containing value parts for the translated string
     */
    _getLanguage: function( languageCode ) {
        if( this.isLanguageAvailable(languageCode) ) {
            return this._languages[languageCode];
        }
        return this._languages[this._defaultLanguageCode];
    },

    /**
     * This method returns the localized string for the given key based on
     * the current language. It is internally used as a wrapper for l() for
     * a better readability.
     *
     * @param {String} key The key to the localized string.
     * @param {Object} context An object containing value parts for the translated string
     * @returns {String} The localized string based on the current application language.
     * @private
     */
    _localize: function( key, context ) {
         debugger;
        var translation;

        if( !this._currentLanguage ) {
            this._currentLanguage = this._getLanguage(this._currentLanguageCode);
        }

        var translation = this._currentLanguage[key];


        if( !translation ) {
            var defaultLanguage = this._getLanguage(this._defaultLanguageCode);
            if( defaultLanguage && defaultLanguage[key] ) {
                M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_UTILITY, 'Key \'' + key + '\' not defined for language \'' + this._currentLanguageCode + '\', switched to default language \'' + this._defaultLanguageCode + '\'');
                translation = defaultLanguage[key];
            }
        }

        if( !translation ) {
            M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_UTILITY, 'Key \'' + key + '\' not defined for both language \'' + this._currentLanguageCode + '\' and the system\'s default language \'' + this._defaultLanguageCode + '\'');
            translation = key;
        }

        if( context ) {
            try {
                translation = _.template(translation, context);
            } catch( e ) {
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_UTILITY, 'Error in I18N: Check your context object and the translation string with key "' + key + '". Error Message: ' , e);
            }
        }

        return translation;
    },

    /**
     * Set the current language to null to force a reassignment.
     *
     * @private
     */
    _resetCurrentLanguage: function() {
        this._currentLanguage = null;
    },

    /**
     * Return a flattened version of an object.
     *
     * @param {Object} obj To flatten object
     * @returns {Object}
     *
     * @private
     */
    _parseObject: function( obj ) {
        var result = {};
        for( var key in obj ) {
            if( !obj.hasOwnProperty(key) ) {
                continue;
            }
            if( _.isObject(obj[key]) ) {
                var flatObject = this._parseObject(obj[key]);
                for( var childKey in flatObject ) {
                    if( !flatObject.hasOwnProperty(childKey) ) {
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