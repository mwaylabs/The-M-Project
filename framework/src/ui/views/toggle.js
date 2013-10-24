(function( scope ) {

    M.ToggleView = M.View.extend({

        _type: 'M.ToggleView',

        _template: _.tmpl(M.TemplateManager.get('M.ToggleView')),

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