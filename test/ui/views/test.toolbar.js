describe('M.ToolbarView', function () {

    it('general', function () {

        var uiTemplates = ['defaultTemplate', 'bootstrap', 'topcoat', 'jqm'];

        // Basic
        assert.isDefined(M.ToolbarView);
        assert.isFunction(M.ToolbarView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.ToolbarView.create()));


        for(var template in uiTemplates){
            var toolbarTemplate = M.TemplateManager.get('M.ToolbarView', uiTemplates[template]);

            var regex = /data-childviews="first"/gi;
            var test = regex.exec(toolbarTemplate)
            assert.isTrue(test.length === 1, uiTemplates[template]);

            regex = /data-childviews="second"/gi;
            assert.isTrue(regex.exec(toolbarTemplate).length === 1 );
        }

    });

});
