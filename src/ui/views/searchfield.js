(function(scope){

    M.SearchfieldView = M.TextfieldView.extend({

        _type: 'M.SearchfieldView',

        placeholder: 'Search',

        _template: _.tmpl(M.TemplateManager.get('M.SearchfieldView')),

        initialize: function() {
            M.View.prototype.initialize.apply(this);
        },

        _assignTemplateValues: function() {
            M.TextfieldView.prototype._assignTemplateValues.apply(this);
            this._templateValues['placeholder'] = this.placeholder || '';
        }
    });

})(this);