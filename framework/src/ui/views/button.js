M.ButtonView = M.View.extend({

    _type: 'M.ButtonView',

    initialize: function() {
        M.View.prototype.initialize.apply(this, arguments);
    },

    afterRender: function() {
        debugger;
        console.log(this.el);
        //this.setElement(this.$el.children().get(0));
        this._assignBinding();
        this.stickit();
        return this;
    },

    contenteditable: true,

    template: _.tmpl(M.TemplateManager.get('buttonTemplates'))

});