(function(scope){

    Addressbook.Controllers.MainController = M.Controller.extend({

        nextPage: '/secondpage',

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

            this.detailView = Addressbook.Views.DetailView.create(this, null, true);

            Addressbook.layout = M.SwitchLayout.extend().create(this, null, true);

            Addressbook.layout.applyViews({
                content: this.detailView
            }).render();

            $('#main').html(this.detailView.render().$el);
            //M.PageTransitions.init();

        },

        show: function(settings) {
            Addressbook.layout.applyViews({
                content: this.detailView
            });

            M.PageTransitions.next();
            Addressbook.nextPage = this.nextPage;
        },

        topcoatTheme: function() {
            M.TemplateManager._currentUI = 'topcoat';
            Addressbook.detailView.updateTemplate();
            Addressbook.detailView.render();
        },

        addEntry: function(event, element) {
            element.scope.set('currentModel', element.scope.contactCollection.create(element.scope.editModel.attributes));
        },

        removeEntry: function(event, element) {
            if( element.scope.currentModel ) {
                element.scope.currentModel.destroy();
                element.scope.set('currentModel', null);
            }
            element.scope.editModel.clear();
        },

        updateEntry: function(event, element) {
            if( element.scope.currentModel ) {
                element.scope.currentModel.save(element.scope.editModel.attributes);
            }
        }

    });


})(this);