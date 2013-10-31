describe('M.ToolbarView', function () {

    it('general', function () {

        var uiTemplates = ['defaultTemplate', 'bootstrap', 'topcoat', 'jqm'];

        // Basic
        assert.isDefined(M.ToolbarView);
        assert.isFunction(M.ToolbarView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.ToolbarView.create()));


        for(var template in uiTemplates){
            var toolbarTemplate = M.TemplateManager.get('M.ToggleView', uiTemplates[template]);
            var regex = /first/gi;
            assert.isTrue(regex.exec(toolbarTemplate).length === 1 );
            regex = /second/gi;
            assert.isTrue(regex.exec(toolbarTemplate).length === 1 );
        }

    });

});
