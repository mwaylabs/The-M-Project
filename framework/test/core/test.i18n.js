describe('M.I18N', function () {

    var testLocales = [
        {locale: 'en'},
        {locale: 'de'}
    ];

    var localeEn = {
        "global.button": {
            "save": "Save document",
            "emptyTrash": "Empty Trash ({{count}})"
        }
    }
    var localeDe = {
        "global.button": {
            "save": "Dokument speichern",
            "emptyTrash": "Papierkorb leeren ({{count}})"
        }
    }
    var localeStyle2 = {
        "global.button.save": "Save document",
        "global.button.emptyTrash": "Empty Trash ({{count}})"
    }
    var localeStyle3 = {
        "global": {
            "button": {
                "save": "Save document",
                "emptyTrash": "Empty Trash ({{count}})"
            }
        }
    }

    it('M.I18N', function () {

        // Basic
        assert.isDefined(M.I18N);
        assert.isDefined(M.I18N._type);

        assert.isObject(M.I18N);
        assert.isString(M.I18N._type);
        assert.equal(M.I18N._type, 'M.I18N');

        // CONST
        assert.isDefined(M.CONST.I18N.LOCALE_CHANGED);
        assert.isString(M.CONST.I18N.LOCALE_CHANGED);
        assert.equal(M.CONST.I18N.LOCALE_CHANGED, 'locale-changed');

        // METHODS
        assert.isDefined(M.I18N.setLocale);
        assert.isDefined(M.I18N.setLocales);
        assert.isDefined(M.I18N.loadFileForLocale);
        assert.isDefined(M.I18N.l);
        assert.isDefined(M.I18N._parseObject);
        assert.isDefined(M.I18N._assignDictionary);
        assert.isDefined(M.I18N._triggerLocaleChangedEvent);
        assert.isDefined(M.I18N.on);
        assert.isDefined(M.I18N.off);
        assert.isDefined(M.I18N.trigger);

        assert.isFunction(M.I18N.setLocales);
        assert.isFunction(M.I18N.setLocale);
        assert.isFunction(M.I18N.loadFileForLocale);
        assert.isFunction(M.I18N.l);
        assert.isFunction(M.I18N._parseObject);
        assert.isFunction(M.I18N._assignDictionary);
        assert.isFunction(M.I18N._triggerLocaleChangedEvent);
        assert.isFunction(M.I18N.on);
        assert.isFunction(M.I18N.off);
        assert.isFunction(M.I18N.trigger);

        // PROPERTIES
        assert.isDefined(M.I18N._availableLocales);
        assert.isDefined(M.I18N._dictionary);
        assert.isDefined(M.I18N.locale);

        assert.isArray(M.I18N._availableLocales);
        assert.isArray(M.I18N._dictionary);
        assert.isNull(M.I18N.locale);

        // CALLS
        assert.isTrue(M.I18N.setLocales(testLocales), 'Set locales');
        assert.equal(testLocales, M.I18N._availableLocales);

        // TODO load json file

        M.I18N.setLocale('en');
        assert.equal(M.I18N.locale, 'en');
        M.I18N._assignDictionary(localeEn);

        M.I18N.setLocale('de');
        assert.equal(M.I18N.locale, 'de');
        M.I18N._assignDictionary(localeDe);

        assert.equal(M.I18N.l('global.button.save'), 'Dokument speichern');

        M.I18N.setLocale('en');
        assert.equal(M.I18N.l('global.button.save'), 'Save document');

        var testI18NStyles = function (translations) {
            M.I18N._assignDictionary(translations);
            assert.equal(M.I18N.l('global.button.save'), 'Save document');
            assert.equal(M.I18N.l('global.button.emptyTrash', {count: 5}), 'Empty Trash (5)');
        }
        testI18NStyles(localeEn);
        testI18NStyles(localeStyle2);
        testI18NStyles(localeStyle3);

        assert.equal(M.I18N.l('foo.bar'), 'MISSING TRANSLATION en: foo.bar');
    });

});
