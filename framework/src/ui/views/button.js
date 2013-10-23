(function( scope ) {
    /**
     * M.ButtonView inherits from M.View
     * @type {*}
     */
    M.ButtonView = M.View.extend({

        _type: 'M.ButtonView',
        _template: _.tmpl(M.TemplateManager.get('M.ButtonView'))

    });
})(this);