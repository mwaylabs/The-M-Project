(function( scope ) {

    M.LoaderView = M.View.extend({

        _type: 'M.LoaderView',

        _template: _.tmpl(M.TemplateManager.get('M.LoaderView')),

        initialize: function(){
            M.View.prototype.initialize.apply(this, arguments);
        },

        render: function( settings ) {
            //this._assignValue();
            this._preRender(settings);
            this._render(settings);
            this._renderChildViews(settings);
            this._postRender(settings);
            return this;
        }


    });

})(this);