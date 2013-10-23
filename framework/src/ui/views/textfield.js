(function(scope){

    M.TextfieldView = M.View.extend({

        _type: 'M.TextfieldView',

        label: null,

        _template: _.tmpl(M.TemplateManager.get('M.TextfieldView')),

        _assignTemplateValues: function() {
            M.View.prototype._assignTemplateValues.apply(this);
            this._templateData['label'] = this.label;
        }

    });

})(this);