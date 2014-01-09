describe('M.TextView', function () {

    it('general', function () {

        // Basic
        assert.isDefined(M.TextView);
        assert.isFunction(M.TextView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.TextView.create()));
    });

    it('instance simple with default parameters', function () {

        var testView = M.TextView.create();
        assert.equal(testView._type, 'M.TextView');

        assert.isDefined(testView.label);
        assert.isNull(testView.label);

        assert.isDefined(testView.icon);
        assert.isNull(testView.icon);

        assert.isDefined(testView._templateString);
        assert.isString(testView._templateString);

        testView = null;

    });

    it('instance simple with all parameters', function () {
        var LABELTEXT = '1234ABCD';
        var VALUETEXT = 'abcdEFGH1234LMNO';
        var CSSCLASS = 'asdf';
        var ICON = 'iiiicccccooooonnnn';
        var testView = M.TextView.extend({
            grid: 'col-xs-12',
            label: LABELTEXT,
            value: VALUETEXT,
            cssClass: CSSCLASS,
            icon: ICON
        }).create().render();

        assert.isDefined(testView._type);
        assert.equal(testView._type, 'M.TextView');

        assert.isTrue(testView.$el.hasClass('col-xs-12'));

        assert.isTrue(testView.$el.hasClass(CSSCLASS));

        assert.isDefined(testView.value);

        assert.equal(testView.$el.find('.input-icon-addon').text(), VALUETEXT);

        assert.isDefined(testView.label);
        assert.equal(testView.$el.find('.label').text(), LABELTEXT);

        assert.isDefined(testView.icon);
        assert.equal(testView.icon, ICON);
        assert.isTrue((testView.$el).find('div').hasClass('input-icon-addon'));
        assert.isTrue((testView.$el).find('i').hasClass(ICON));

        assert.isDefined(testView._template);
        assert.isFunction(testView._template);

        testView = null;
        ICON = null;
        CSSCLASS = null;
        VALUETEXT = null;
        LABELTEXT = null;

    });


    it('instance simple without parameters', function () {
        var testView = M.TextView.extend({
        }).create().render();

        assert.isDefined(testView._type);
        assert.equal(testView._type, 'M.TextView');

        assert.isUndefined(testView.value);

        assert.isNull(testView.getValue(), '');
        assert.equal(testView.$el.find('.input').text(), '');

        assert.isNull(testView.label);
        assert.equal(testView.$el.find('label').text(), '');

        assert.isNull(testView.icon);
        assert.isFalse((testView.$el).find('div').hasClass('input-icon-addon'));
        assert.lengthOf(testView.$el.find('i'), 0);

        assert.isDefined(testView._template);
        assert.isFunction(testView._template);

        testView = null;

    });

    it('_addLabelToTemplateValues', function () {
        var testView = M.TextView.extend({}).create().render();
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

    it('_addIconToTemplateValues', function () {
        var testView = M.TextView.extend({}).create().render();
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
        var testView = M.TextView.extend({}).create().render();
        var test = function (testText) {
            testView.icon = testText;
            testView.type = testText;
            testView.placeholder = testText;
            testView.label = testText;

            testView._assignTemplateValues();

            assert.equal(testView._templateValues.label, testText);
            assert.equal(testView._templateValues.label, testView.label);

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

    it('_attachToDom', function(){
        var testView = M.TextView.extend({}).create();
        assert.isTrue(testView._attachToDom());
    });

});
