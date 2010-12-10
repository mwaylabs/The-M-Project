Todos.LanguageController = M.Controller.extend({

    languages: null,

    init: function() {

        M.ViewManager.getView('page3', 'langSelection').setSelection(M.Application.currentLanguage);

    },

    success: function(data) {

    },

    changeLanguage: function() {

        var language = M.ViewManager.getView('page3', 'langSelection').getSelection();
        M.LoaderView.show();
        M.I18N.setLanguage(language);

    }

});