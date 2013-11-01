(function( scope ) {


    M.ListItemView = M.View.extend({
        _type: 'M.ListItemView',
        template: _.tmpl(M.TemplateManager.get('M.ListItemView')),
        initialize: function() {
            M.View.prototype.initialize.apply(this, arguments);
            if( this.templateExtend ) {
                this.template = _.tmpl(this.template({value: this.templateExtend}));
            }
        },

//        _render: function(){

//            var dom = this._template(this._templateValues);
//            this.setElement(dom);
//            return this;
//        }
    });


})(this);