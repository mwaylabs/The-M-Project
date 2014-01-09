describe('M.ImageView', function () {

    it('general', function () {

        // Basic
        assert.isDefined(M.ImageView);
        assert.isFunction(M.ImageView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.ImageView.create()));


    });

    it('instance simple with default parameters', function () {
        var testView = M.ImageView.create();
        assert.equal(testView._type, 'M.ImageView');

        assert.isDefined(testView.alt);
        assert.equal(testView.alt, '');

        assert.isDefined(testView._template);
        assert.isString(testView._templateString);

        testView = null;

    });

    it('instance simple with all parameters', function () {
        var ALT = '1234ABCD';
        var GRID = 'abcdEFGH1234LMNO';
        var VALUE = 'ASDFKjfdklajkjsfdlökjgk';

        var testView = M.ImageView.extend({
            value: VALUE,
            alt: ALT,
            grid: GRID

        }).create().render();

        assert.isDefined(testView._type);
        assert.equal(testView._type, 'M.ImageView');

        assert.isDefined(testView.grid);
        assert.equal(testView.grid, GRID);
        assert.isTrue(testView.$el.hasClass(GRID));

        assert.isDefined(testView.value);
        assert.equal(testView.value, VALUE);
        assert.equal(testView.$el.find('img').attr('src'), VALUE);

        assert.isDefined(testView.alt);
        assert.equal(testView.alt, ALT);
        assert.equal(testView.$el.find('img').attr('alt'), ALT);

        assert.isDefined(testView._template);
        assert.isFunction(testView._template);

        testView = null;
        var ALT = null;
        var GRID = null;
        var VALUE = null;

    });

    it('_assignTemplateValues', function () {
        var testView = M.ImageView.extend({}).create().render();

        var test = function (testText) {
            testView._setValue(testText);
            testView.alt = testText;

            testView._assignTemplateValues();

            assert.equal(testView._templateValues.alt, testText);
            assert.equal(testView.getValue(), testText);

        };
        test('asdf');
        test('');
        test([]);
        test({});
        test(1);

        testView = null;
        test = null;

    });

    it('initialize', function(){

        var testView = null;

        var test = function (testText) {
            testView = M.ImageView.extend({
                value:'',
                alt: testText
            }).create();

            testView.initialize();
            if(testText === null){
                assert.equal(testView.alt, '')
            }
            else{
                assert.equal(testView.alt, testText);
            }
        };

        test('asdf');
        test('');
        test([]);
        test({});
        test(1);
        test(null);

        testView = null;
        test = null;
    });

});
