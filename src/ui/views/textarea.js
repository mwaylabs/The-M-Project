(function(scope){

    M.TextareaView = M.TextfieldView.extend({

        _type: 'M.TextareaView',

        _template: _.tmpl(M.TemplateManager.get('M.TextareaView'))

    });

})(this);