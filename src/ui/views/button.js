(function( scope ) {
    /**
     * M.ButtonView inherits from M.View
     * @type {*}
     */
    M.ButtonView = M.View.extend({

        _type: 'M.ButtonView',
        _template: _.tmpl(M.TemplateManager.get('M.ButtonView')),
//        initialize: function(){
//            M.View.prototype.initialize.apply(this, arguments);
//            return this;
//        },
//
//        render: function(){
//            M.View.prototype.render.apply(this, arguments);
//            return this;
//        }

    });
})(this);