/*global Addressbook, Backbone*/

Addressbook.Routers = Addressbook.Routers || {};

(function() {

    Addressbook.MainController = M.Controller.extend({

        testModel: null,

        contactCollection: null,

        initialize: function(){

            var that = this;
            var collection = new Addressbook.Collections.ContactsCollection();
            collection.fetch({
                success: function() {
                    //                        listView.render();
                    //Addressbook.testModel.set('lastname', collection.models[0].get('lastname'));
                    //Addressbook.testModel.set('firstname', collection.models[0].get('firstname'));
                    //Addressbook.testModel.set('value', collection.models[0].get('firstname') + ' - ' + collection.models[0].get('lastname'));
                }
            });

            this.contactCollection = collection;

            this.editModel = new Addressbook.Models.ContactsModel({
                firstname: 'aaa',
                lastname: 'aaa'
            });

            this.currentModel = this.editModel;

            this.detailView = Addressbook.Views.DetailView.design(this, null, true);

            $('#main').prepend(this.detailView.render().$el);

        },

        topcoatTheme: function() {
            M.TemplateManager._currentUI = 'topcoat';
            Addressbook.detailView.updateTemplate();
            Addressbook.detailView.render();
        },

        addEntry: function() {
            this.scope.contactCollection.create(this.scope.editModel.attributes);
        },

        removeEntry: function() {
            this.scope.currentModel.destroy();
        },

        updateEntry: function() {
            this.scope.currentModel.save(this.scope.editModel.attributes);
        }
    });

    Addressbook.Routers.MainRouter = Backbone.Router.extend({
        routes: {
            '': 'indexCtrl',
            'edit': 'editCtrl'
        },


        indexCtrl: function(){
            mainctrl = Addressbook.MainController.create();
            return mainctrl;
        },

        editCtrl: function() {

        }
    });

})();