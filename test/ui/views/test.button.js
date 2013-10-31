describe('M.Button', function () {

    it('general', function () {

        // Basic
        assert.isDefined(M.ButtonView);
        assert.isFunction(M.ButtonView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.ButtonView.create()));

    });

});
