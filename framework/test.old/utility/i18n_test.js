test('M.I18N implementation', function() {

    // CLASS
    ok(M.I18N, 'M.I18N is defined');
    ok(typeof M.I18N === 'object', 'M.I18N is an object');
    ok(M.I18N._type && M.I18N._type === 'M.I18N', 'M.I18N._type is M.I18N');
    ok(typeof M.I18N._type === 'string', 'M.I18N._type is a string');

    // METHODS defined
    ok(M.I18N.hasOwnProperty('l'), 'M.I18N.l is defined.');
    ok(M.I18N.hasOwnProperty('setCurrentLanguageCode'), 'M.I18N.setCurrentLanguageCode is defined.');
    ok(M.I18N.hasOwnProperty('setDefaultLanguageCode'), 'M.I18N.setDefaultLanguageCode is defined.');
    ok(M.I18N.hasOwnProperty('addLanguage'), 'M.I18N.addLanguage is defined.');
    ok(M.I18N.hasOwnProperty('getAvailableLanguages'), 'M.I18N.getAvailableLanguages is defined.');

    ok(typeof M.I18N.l === 'function', 'M.I18N.l is a function.');
    ok(typeof M.I18N.setCurrentLanguageCode === 'function', 'M.I18N.setCurrentLanguageCode is a function.');
    ok(typeof M.I18N.setDefaultLanguageCode === 'function', 'M.I18N.setDefaultLanguageCode is a function.');
    ok(typeof M.I18N.addLanguage === 'function', 'M.I18N.addLanguage is a function.');
    ok(typeof M.I18N.getAvailableLanguages === 'function', 'M.I18N.getAvailableLanguages is a function.');


    var en = {
        'global.button': {
            'back': 'Back',
            'submit': 'Submit'
        }
    }

    var de = {
        global: {
            button: {
                back: 'Zurück',
                close: 'Schließen',
                submit: 'Absenden'
            }
        }
    }

    var fr = {
        'global.button.back': 'Retour',
        'global.button.submit': 'Soumettre'
    }

    /**
     * TEST: Adding langauges
     */
    M.I18N.addLanguage('en_en', en);
    M.I18N.addLanguage('de_de', de);
    M.I18N.addLanguage('fr_fr', fr);

    ok(M.I18N.getAvailableLanguages().length == 3, 'All languages were added.');

    /**
     * TEST: Set current language code
     */
    M.I18N._currentLanguageCode = 'en_en';
    ok(M.I18N._currentLanguageCode == 'en_en', 'Current language code correctly applied.');

    /**
     * TEST: Set default language code
     */
    M.I18N.setDefaultLanguageCode('de_de');
    ok(M.I18N._defaultLanguageCode == 'de_de', 'Default language code correctly applied.');

    /**
     * TEST: Update language en_en
     */
    var en2 = {
        global: {
            button: {
                exit: 'Exit'
            }
        }
    }
    M.I18N.addLanguage('en_en', en2);

    /**
     * TEST: Get translation for language code en_en
     */
    ok(M.I18N.l('global.button.submit') == 'Submit', '"global.button.submit" has translated correctly');
    ok(M.I18N.l('global.button.close') == 'Schließen', '"global.button.close" has translated correctly');
    ok(M.I18N.l('global.button.new') == 'global.button.new', '"global.button.new" has translated correctly');
    ok(M.I18N.l('global.button.exit') == 'Exit', '"global.button.exit" has translated correctly');

    /**
     * TEST: Switch language
     */
    M.I18N.setCurrentLanguageCode('fr_fr');
    ok(M.I18N._currentLanguageCode == 'fr_fr', 'Language correctly switched.');

    /**
     * TEST: Get translation for language code fr_fr
     */
    ok(M.I18N.l('global.button.submit') == 'Soumettre', '"global.button.submit" has translated correctly');
    ok(M.I18N.l('global.button.close') == 'Schließen', '"global.button.close" has translated correctly');
    ok(M.I18N.l('global.button.new') == 'global.button.new', '"global.button.new" has translated correctly');

});