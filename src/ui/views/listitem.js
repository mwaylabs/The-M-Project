M.ListItemView = M.View.extend({
    _type: 'M.ListItemView',
    template: _.tmpl(M.TemplateManager.get('M.ListItemView')),
    initialize: function () {
        M.View.prototype.initialize.apply(this, arguments);
        if (this.templateExtend) {
            this.template = _.tmpl(this.template({value: this.templateExtend}));
        }
    }
});