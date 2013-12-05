describe.skip('M.SearchfieldView', function () {

    it('general', function () {

        // Basic
        assert.isDefined(M.SearchfieldView);
        assert.isFunction(M.SearchfieldView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.SearchfieldView.create()));

    });

    it('instance simple with default parameters', function () {
        var testView = M.SearchfieldView.create();

        assert.isDefined(testView._type);
        assert.equal(testView._type, 'M.SearchfieldView');

        assert.isDefined(testView.placeholder);
        assert.equal(testView.placeholder, 'Search');

        assert.isDefined(testView._template);
        assert.isFunction(testView._template);

        testView = null;

    });

    it('instance simple with all parameters', function () {
        /**
         * Test noch nicht fertig
         */
        var GRID = 'abcdEFGH1234LMNO';
        var VALUE = 'ASDFKjfdklajkjsfdlökjgk';
        var LABEL = 'ASDHAHFöklnhjuznqpomfdakjf';
        var PLACEHOLDER = 'qwerertzASDFFGHJTZbvn';

        var testView = M.SearchfieldView.extend({
            grid: GRID,
            label: LABEL,
            value: VALUE,
            placeholder: PLACEHOLDER
        }).create().render();

        assert.isDefined(testView._type);
        assert.equal(testView._type, 'M.SearchfieldView');

        assert.isDefined(testView.grid);
        assert.equal(testView.grid, GRID);
        assert.isTrue(testView.$el.hasClass(GRID));

        assert.isDefined(testView.placeholder);
        assert.equal(testView.placeholder, PLACEHOLDER);

        assert.isDefined(testView.label);
        assert.equal(testView.label, LABEL);

        assert.isDefined(testView.getValue());
        assert.equal(testView.getValue(), VALUE);

        assert.isDefined(testView._template);
        assert.isFunction(testView._template);

        testView = null;

        var GRID = null;
        var VALUE = null;
        var LABEL = null;
        var PLACEHOLDER = null;

    });

});
