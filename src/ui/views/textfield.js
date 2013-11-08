(function(scope){

    M.TextfieldView = M.View.extend({

        _type: 'M.TextfieldView',

        label: null,

        type: 'text',

        _template: _.tmpl(M.TemplateManager.get('M.TextfieldView')),

        _assignTemplateValues: function() {
            M.View.prototype._assignTemplateValues.apply(this);
            if( M.isI18NItem(this.label)){
                this._templateValues['label'] = M.I18N.l(this.label.key, this.label.placeholder);
            } else {
                this._templateValues['label'] = this.label || '';
            }

            this._templateValues['type'] = this.type;

        },

        initialize: function() {
            M.View.prototype.initialize.apply(this);
        }

    });

})(this);