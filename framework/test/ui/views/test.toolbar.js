describe('M.ToolbarView', function () {

    it('general', function () {

        // Basic
        assert.isDefined(M.ToolbarView);
        assert.isFunction(M.ToolbarView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.ToolbarView.create()));



    });

});
