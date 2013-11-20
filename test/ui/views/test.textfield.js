describe('M.TextfieldView', function () {

    it('general', function () {

        // Basic
        assert.isDefined(M.TextfieldView);
        assert.isFunction(M.TextfieldView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.TextfieldView.create()));


    });

    it('instance simple with default parameters', function () {

        var testView = M.TextfieldView.create();
        assert.equal(testView._type, 'M.TextfieldView');

        assert.isDefined(testView.label);
        assert.isNull(testView.label);

        assert.isDefined(testView.type);
        assert.equal(testView.type, 'search');

        assert.isDefined(testView.placeholder);
        assert.isNull(testView.placeholder);

        assert.isDefined(testView.icon);
        assert.isNull(testView.icon);

        assert.isDefined(testView._template);
        assert.isFunction(testView._template);

        testView = null;

    });

    it('instance simple with all parameters; input = text', function () {
        var LABELTEXT = '1234ABCD';
        var VALUETEXT = 'abcdEFGH1234LMNO';
        var CSSCLASS = 'asdf';
        var ICON = 'iiiicccccooooonnnn';
        var PLACEHOLDER = 'placeholertext';

        var testView = M.TextfieldView.extend({
            grid: 'col-xs-12',
            label: LABELTEXT,
            value: VALUETEXT,
            type: 'text',
            cssClass: CSSCLASS,
            icon: ICON,
            placeholder: PLACEHOLDER
        }).create().render();

        assert.isDefined(testView._type);
        assert.equal(testView._type, 'M.TextfieldView');

        assert.isTrue(testView.$el.hasClass('col-xs-12'));

        assert.isTrue(testView.$el.hasClass(CSSCLASS));

        assert.isDefined(testView.value);
        assert.equal(testView.$el.find('input').attr('value'), VALUETEXT);
        assert.equal(testView.$el.find('input').attr('data-binding'), '_value_');

        assert.isDefined(testView.label);
        assert.equal(testView.$el.find('label').text(), LABELTEXT);

        assert.isDefined(testView.type);
        assert.equal(testView.type, 'text');
        assert.equal(testView.$el.find('input').attr('type'), 'text');

        assert.isDefined(testView.placeholder);
        assert.equal(testView.$el.find('input').attr('placeholder'), PLACEHOLDER);

        assert.isDefined(testView.icon);
        assert.equal(testView.icon, ICON);
        assert.isTrue((testView.$el).find('div').hasClass('input-icon-addon'));
        assert.isTrue((testView.$el).find('i').hasClass(ICON));

        assert.isDefined(testView._template);
        assert.isFunction(testView._template);

        testView = null;
        PLACEHOLDER = null;
        ICON = null;
        CSSCLASS = null;
        VALUETEXT = null;
        LABELTEXT = null;

    });

    it('instance simple with some parameters; input = date', function () {
        var TEXT1 = '1234ABCD';

        var testView = M.TextfieldView.extend({
            grid: 'col-xs-12',
            value: '',
            type: 'date',
            placeholder: TEXT1
        }).create().render();

        assert.isDefined(testView._type);
        assert.equal(testView._type, 'M.TextfieldView');

        assert.isTrue(testView.$el.hasClass('col-xs-12'));

        assert.isDefined(testView.value);
        assert.isNull(testView.getValue());
        assert.equal(testView.$el.find('input').attr('value'), '');
        assert.equal(testView.$el.find('input').attr('data-binding'), '_value_');

        assert.isDefined(testView.label);
        assert.isNull(testView.label);
        assert.equal(testView.$el.find('label').text(), '');

        assert.isDefined(testView.type);
        assert.equal(testView.type, 'date');
        assert.equal(testView.$el.find('input').attr('type'), 'date');

        assert.isDefined(testView.placeholder);
        assert.isDefined(testView.placeholder, TEXT1);
        assert.equal(testView.$el.find('input').attr('placeholder'), TEXT1);

        assert.isDefined(testView.icon);
        assert.isNull(testView.icon);
        assert.isFalse((testView.$el).find('div').hasClass('input-icon-addon'));
        assert.lengthOf(testView.$el.find('i'), 0);

        assert.isDefined(testView._template);
        assert.isFunction(testView._template);

        testView = null;
        TEXT1 = null;

    });

    it('instance simple with input = search', function () {
        var testView = M.TextfieldView.extend({
            type: 'search'
        }).create().render();

        assert.isDefined(testView._type);
        assert.equal(testView._type, 'M.TextfieldView');

        assert.isUndefined(testView.value);
        assert.equal(testView.getValue(), null);
        assert.equal(testView.$el.find('input').attr('value'), '');
        assert.equal(testView.$el.find('input').attr('data-binding'), '_value_');

        assert.isDefined(testView.label);
        assert.equal(testView.label, null);
        assert.equal(testView.$el.find('label').text(), '');

        assert.isDefined(testView.type);
        assert.equal(testView.type, 'search');
        assert.equal(testView.$el.find('input').attr('type'), 'search');

        assert.isDefined(testView.placeholder);
        assert.isNull(testView.placeholder);
        assert.isUndefined(testView.$el.find('input').attr('placeholder'), '');

        assert.isDefined(testView.icon);
        assert.isNull(testView.icon);
        assert.isFalse((testView.$el).find('div').hasClass('input-icon-addon'));
        assert.lengthOf(testView.$el.find('i'), 0);

        assert.isDefined(testView._template);
        assert.isFunction(testView._template);

        testView = null;

    });

    it('instance simple without parameters', function () {
        var testView = M.TextfieldView.extend({
        }).create().render();

        assert.isDefined(testView._type);
        assert.equal(testView._type, 'M.TextfieldView');

        assert.isUndefined(testView.value);
        assert.isNull(testView.getValue());
        assert.equal(testView.$el.find('input').attr('value'), '');
        assert.equal(testView.$el.find('input').attr('data-binding'), '_value_');

        assert.isDefined(testView.label);
        assert.isNull(testView.label);
        assert.equal(testView.$el.find('label').text(), '');

        assert.isDefined(testView.type);
        assert.equal(testView.type, 'search');
        assert.equal(testView.$el.find('input').attr('type'), 'search');

        assert.isDefined(testView.placeholder);
        assert.isNull(testView.placeholder);
        assert.isUndefined(testView.$el.find('input').attr('placeholder'), '');

        assert.isDefined(testView.icon);
        assert.isNull(testView.icon);
        assert.isFalse((testView.$el).find('div').hasClass('input-icon-addon'));
        assert.lengthOf(testView.$el.find('i'), 0);

        assert.isDefined(testView._template);
        assert.isFunction(testView._template);

        testView = null;

    });

    it('_addLabelToTemplateValues', function () {
        var testView = M.TextfieldView.extend({}).create().render();
        var test = function (testText) {
            testView.label = testText;
            testView._addLabelToTemplateValues();
            assert.equal(testView._templateValues.label, testText);
            assert.equal(testView._templateValues.label, testView.label);
        };
        test('');
        test('asdf');
        test([]);
        test({});
        test(1);

        testView = null;
        test = null;

    });

    it('_addPlaceholderToTemplateValues', function () {
        var testView = M.TextfieldView.extend({}).create().render();
        var test = function (testText) {
            testView.placeholder = testText;
            testView._addPlaceholderToTemplateValues();
            assert.equal(testView._templateValues.placeholder, testText);
            assert.equal(testView._templateValues.placeholder, testView.placeholder);
        };
        test('');
        test('asdf');
        test([]);
        test({});
        test(1);

        testView = null;
        test = null;

    });

    it('_addTypeToTemplateValues', function () {
        var testView = M.TextfieldView.extend({}).create().render();
        var test = function (testText) {
            testView.type = testText;
            testView._addTypeToTemplateValues();
            assert.equal(testView._templateValues.type, testText);
            assert.equal(testView._templateValues.type, testView.type);
        };
        test('');
        test('asdf');
        test([]);
        test({});
        test(1);

        testView = null;
        test = null;

    });

    it('_addIconToTemplateValues', function () {
        var testView = M.TextfieldView.extend({}).create().render();
        var test = function (testText) {
            testView.icon = testText;
            testView._addIconToTemplateValues();
            assert.equal(testView._templateValues.icon, testText);
            assert.equal(testView._templateValues.icon, testView.icon);
        };
        test('');
        test('asdf');
        test([]);
        test({});
        test(1);

        testView = null;
        test = null;

    });

    it('_assignTemplateValues', function () {
        var testView = M.TextfieldView.extend({}).create().render();
        var test = function (testText) {
            testView.icon = testText;
            testView.type = testText;
            testView.placeholder = testText;
            testView.label = testText;

            testView._assignTemplateValues();

            assert.equal(testView._templateValues.label, testText);
            assert.equal(testView._templateValues.label, testView.label);

            assert.equal(testView._templateValues.placeholder, testText);
            assert.equal(testView._templateValues.placeholder, testView.placeholder);

            assert.equal(testView._templateValues.type, testText);
            assert.equal(testView._templateValues.type, testView.type);

            assert.equal(testView._templateValues.icon, testText);
            assert.equal(testView._templateValues.icon, testView.icon);

        };
        test('');
        test('asdf');
        test([]);
        test({});
        test(1);

        testView = null;
        test = null;

    });

});
