Todos.LanguageController = M.Controller.extend({

   changeLanguage: function() {

       var language = M.ViewManager.getView('page3', 'langSelection').getSelection();
       console.log(language);

   }

});