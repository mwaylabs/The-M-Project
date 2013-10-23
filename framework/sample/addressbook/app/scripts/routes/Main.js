/*global Addressbook, Backbone*/
Addressbook.Routers = Addressbook.Routers || {};
Addressbook.Controllers = Addressbook.Controllers || {};

(function() {


    Addressbook.Controllers.MainController = M.Controller.extend({

        testModel: null,

        contactCollection: null,

        applicationStart: function() {

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

            $('#main').html(this.detailView.render().$el);

        },

        show: function() {
            $('#main').html(this.detailView.render().$el);
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
            if( this.scope.currentModel ) {
                this.scope.currentModel.destroy();
                this.scope.set('currentModel', null);
            }
            this.scope.editModel.clear();
        },

        updateEntry: function() {
            if( this.scope.currentModel ) {
                this.scope.currentModel.save(this.scope.editModel.attributes);
            }
        }
    });

    Addressbook.Routers.MainRouter = M.Router.extend({
        routes: {
            '': 'indexCtrl',
            'edit': 'editCtrl'
        },


        initialize: function() {

            M.Router.prototype.initialize.apply(this, arguments);
            Addressbook.MainController = this.indexCtrl;
            Addressbook.EditController = this.editCtrl;
        },

        indexCtrl: Addressbook.Controllers.MainController.create(),

        editCtrl: M.Controller.extend({
            initialize: function() {
                M.Router.prototype.initialize.apply(this, arguments);
                this.view = M.ButtonView.extend({

                    value: 'back',
                    events: {
                        click: function() {
                            Addressbook.navigate({
                                route: '/'
                            })
                        }
                    }
                }).design();
            },
            show: function() {
                $('#main').html(this.view.render().$el);
            },
            applicationStart: function(){
                $('#main').html(this.view.render().$el);
            }
        }).create()
    });

})();