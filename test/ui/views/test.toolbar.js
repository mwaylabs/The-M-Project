describe('M.ToolbarView', function() {

    it('general', function() {

        // Basic
        assert.isDefined(M.ToolbarView);
        assert.isFunction(M.ToolbarView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.ToolbarView.create()));

        var toolbarTemplate = M.TemplateManager.get('toolbar.ejs');

        var regex = /data-childviews="first"/gi;
        var test = regex.exec(toolbarTemplate)
        assert.isTrue(test.length === 1, toolbarTemplate);

        regex = /data-childviews="second"/gi;
        assert.isTrue(regex.exec(toolbarTemplate).length === 1);
    });
});
