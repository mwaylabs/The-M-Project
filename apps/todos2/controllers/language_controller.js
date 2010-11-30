Todos.LanguageController = M.Controller.extend({

    languages: null,

    init: function() {

        M.Request.init({
            url: 'langs.json',
            isJSON: YES,
            beforeSend: function(req) {
                //...
            },
            onSuccess: function(data){
                Todos.LanguageController.set('languages', data.languages);
            }
        }).send();

    },

    success: function(data) {

    },

    changeLanguage: function() {

       var language = M.ViewManager.getView('page3', 'langSelection').getSelection();
       console.log(language);

    }

});