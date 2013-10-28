describe('M.I18N', function () {

    var testLocales = [
        {locale: 'en'},
        {locale: 'de'}
    ];

    var localeStyle1 = {
        "global": {
            "button": {
                "save": "Save document",
                "emptyTrash": "Empty Trash ({{count}})"
            },
            "error": {
                "permissionDenied": "Permission denied"
            }
        }
    }

    var localeStyle2 = {
        "global.button.save": "Save document",
        "global.button.emptyTrash": "Empty Trash ({{count}})",
        "global.error.permissionDenied": "Permission denied"
    }

    var localeStyle3 = {
        "global.button": {
            "save": "Save document",
            "emptyTrash": "Empty Trash ({{count}})"
        },
        "global.error": {
            "permissionDenied": "Permission denied"
        }
    }

    var testI18NStyles = function (translations) {
        M.I18N._assignDictionary(translations);
        assert.equal(M.I18N.l('global.button.save'), 'Save document');
        assert.equal(M.I18N.l('global.button.emptyTrash', {count: 5}), 'Empty Trash (5)');
        assert.equal(M.I18N.l('global.error.permissionDenied'), 'Permission denied');
    }

    it('basic', function () {
        assert.isDefined(M.I18N);
        assert.isDefined(M.I18N._type);

        assert.isObject(M.I18N);
        assert.isString(M.I18N._type);
        assert.equal(M.I18N._type, 'M.I18N');
    });

    it('const', function () {
        assert.isDefined(M.CONST.I18N.LOCALE_CHANGED);

        assert.isString(M.CONST.I18N.LOCALE_CHANGED);
        assert.equal(M.CONST.I18N.LOCALE_CHANGED, 'locale-changed');
    });

    it('properties', function () {
        assert.isDefined(M.I18N._availableLocales);
        assert.isDefined(M.I18N._dictionary);
        assert.isDefined(M.I18N.locale);

        assert.isArray(M.I18N._availableLocales);
        assert.isArray(M.I18N._dictionary);
        assert.isNull(M.I18N.locale);
    });

    it('methods', function () {
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
    });

    it('set locale to en', function (done) {
        assert.isTrue(M.I18N.setLocales(testLocales), 'Set locales');
        assert.equal(testLocales, M.I18N._availableLocales);

        M.I18N.once(M.CONST.I18N.LOCALE_CHANGED, function (e) {
            assert.equal(M.I18N.locale, 'en');
            done();
        });
        M.I18N.setLocale('en');

    });

    it('set locale to de', function (done) {
        M.I18N.once(M.CONST.I18N.LOCALE_CHANGED, function (e) {
            assert.equal(M.I18N.locale, 'de');
            assert.equal(M.I18N.l('global.button.save'), 'Dokument speichern');
            done();
        });
        M.I18N.setLocale('de');
    });

    it('switch back to en', function () {
        M.I18N.setLocale('en');
        assert.equal(M.I18N.locale, 'en');
        assert.equal(M.I18N.l('global.button.save'), 'Save document');
    });

    it('missing translation', function () {
        assert.equal(M.I18N.l('foo.bar'), 'MISSING TRANSLATION en: foo.bar');
    });

    it('object style', function () {
        testI18NStyles(localeStyle1);
    });

    it('key - value style', function () {
        testI18NStyles(localeStyle2);
    });

    it('advanced style', function () {
        testI18NStyles(localeStyle3);
    });
});
