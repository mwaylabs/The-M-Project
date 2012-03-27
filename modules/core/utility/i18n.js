// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      29.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * @class
 *
 * M.I18N defines a prototype for internationalisation and localisation within
 * The M-Project. It is used to set and get the application's language and to
 * localize any string within an application.
 *
 * @extends M.Object
 */
M.I18N = M.Object.extend(
/** @scope M.I18N.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.I18N',

    /**
     * The system's default language.
     *
     * @type String
     */
    defaultLanguage: 'en_us',

    /**
     * This property is used to map the navigator's language to an ISO standard
     * if necessary. E.g. 'de' will be mapped to 'de_de'. Currently we only provide
     * support for english and german. More languages are about to come or can be
     * added by overwriting this property.
     *
     * @type Object
     */
    languageMapper: {
        de: 'de_de',
        en: 'en_us'
    },
    
    /**
     * This method returns the localized string for the given key based on
     * the current language.
     *
     * @param {String} key The key to the localized string.
     * @param {Object} context An object containing value parts for the translated string
     * @returns {String} The localized string based on the current application language.
     */
    l: function(key, context) {
        return this.localize(key, context);
    },

    /**
     * This method returns the localized string for the given key based on
     * the current language. It is internally used as a wrapper for l() for
     * a better readability.
     *
     * @private
     * @param {String} key The key to the localized string.
     * @param {Object} context An object containing value parts for the translated string
     * @returns {String} The localized string based on the current application language.
     */
    localize: function(key, context) {
        var translation;
        if(!M.Application.currentLanguage) {
            M.Application.currentLanguage = this.getLanguage();
        }
        if(this[M.Application.currentLanguage] && this[M.Application.currentLanguage][key]) {
            translation = this[M.Application.currentLanguage][key];
        } else if(this[M.Application.defaultLanguage] && this[M.Application.defaultLanguage][key]) {
            M.Logger.log('Key \'' + key + '\' not defined for language \'' + M.Application.currentLanguage + '\', switched to default language \'' + M.Application.defaultLanguage + '\'', M.WARN);
            translation = this[M.Application.defaultLanguage][key];
        }  else if(this[this.defaultLanguage] && this[this.defaultLanguage][key]) {
            M.Logger.log('Key \'' + key + '\' not defined for language \'' + M.Application.currentLanguage + '\', switched to system\'s default language \'' + this.defaultLanguage + '\'', M.WARN);
            translation = this[this.defaultLanguage][key];
        } else {
            M.Logger.log('Key \'' + key + '\' not defined for both language \'' + M.Application.currentLanguage + '\' and the system\'s default language \'' + this.defaultLanguage + '\'', M.WARN);
            return null;
        }
        if(context) {
            try {
                translation = _.template(translation, context);
            } catch(e) {
                M.Logger.log('Error in I18N: Check your context object and the translation string with key "'+ key + '". Error Message: ' + e, M.ERR);
            }
        }
        return translation;
    },

    /**
     * This method sets the applications current language and forces it to reload.
     *
     * @param {String} language The language to be set.
     */
    setLanguage: function(language) {
        if(!this.isLanguageAvailable(language)) {
            M.Logger.log('There is no language \'' + language + '\' specified (using default language \'' + this.defaultLanguage + '\' instead!', M.WARN);
            this.setLanguage(this.defaultLanguage);
            return;
        } else if(language && language === M.Application.currentLanguage) {
            M.Logger.log('Language \'' + language + '\' already selected', M.INFO);
            return;
        }

        if(localStorage) {
            localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'lang', language);
            location.href = location.protocol + '//' + location.host + location.pathname;
        }
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
     * @param {Boolean} returnNavigatorLanguage Specify whether to return the navigator's language even if this language is not supported by this app.
     * @returns {String} The user's language.
     */
    getLanguage: function(returnNavigatorLanguage) {
        var language = null;

        if(localStorage) {
            language = localStorage.getItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'lang');
        }

        if(language) {
            return language;
        } else if(navigator) {
            var regexResult = /([a-zA-Z]{2,3})[\s_.-]?([a-zA-Z]{2,3})?/.exec(navigator.language);
            if(regexResult && this[regexResult[0]]) {
                return regexResult[0].toLowerCase();
            } else if(regexResult && regexResult[1] && this.languageMapper[regexResult[1]]) {
                var language = this.languageMapper[regexResult[1]];
                return language.toLowerCase();
            } else if(M.Application.defaultLanguage) {
                return M.Application.defaultLanguage.toLowerCase();
            } else {
                return this.defaultLanguage;
            }
        } else {
            return this.defaultLanguage;
        }
    },

    /**
     * This method checks if the passed language is available within the app or not. 
     *
     * @param {String} language The language to be checked.
     * @returns {Boolean} Indicates whether the requested language is available or not.
     */
    isLanguageAvailable: function(language) {
        if(this[language] && typeof(this[language]) === 'object') {
            return true;
        } else {
            M.Logger.log('no language \'' + language + '\' specified.', M.WARN);
            return false;
        }
    }

});