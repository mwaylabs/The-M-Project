/*global Addressbook, Backbone*/
Addressbook.Routers = Addressbook.Routers || {};
Addressbook.Controllers = Addressbook.Controllers || {};

(function() {

    Addressbook.Routers.MainRouter = M.Router.extend({
        routes: {
            '': 'indexCtrl',
            'edit': 'editCtrl'
        },


        indexCtrl: function() {
            Addressbook.MainController = Addressbook.Controllers.MainController.create();
            return Addressbook.MainController;
        },

        editCtrl: function() {

        }
    });

    Addressbook.Controllers.MainController = M.Controller.extend({

        testModel: null,

        contactCollection: null,

        applicationStart: function(){

            var that = this;
            var collection = new Addressbook.Collections.ContactsCollection(/*dummy*/);
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
            this.scope.set('currentModel', this.scope.contactCollection.create(this.scope.editModel.attributes));
        },

        removeEntry: function() {
            if (this.scope.currentModel) {
                this.scope.currentModel.destroy();
                this.scope.set('currentModel', null);
            }
            this.scope.editModel.clear();
        },

        updateEntry: function() {
            if (this.scope.currentModel) {
                this.scope.currentModel.save(this.scope.editModel.attributes);
            }
        }
    });

})();