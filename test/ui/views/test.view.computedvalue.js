describe.skip('Computed value', function () {

    it('basic', function () {

        var testview = M.View.create();
        assert.isNull(testview.computedValue);

        var testview = M.View.create({
            value: 'A',
            computedValue: function( val ) {
                return val + 'B'
            }});
        assert.isDefined(testview.computedValue);
        assert.isFunction(testview.computedValue);

        testview.render();
        assert.equal(testview.getV,'AB');




    });

});
