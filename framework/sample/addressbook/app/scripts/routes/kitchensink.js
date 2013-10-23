/*global Addressbook, Backbone*/

Addressbook.Routers = Addressbook.Routers || {};

(function() {

    Addressbook.Routers.MainRouter = Backbone.Router.extend({
        routes: {
            '': 'indexCtrl',
            'edit': 'editCtrl'
        },

        indexCtrl: function() {
            console.time('start');

            var collection = new Addressbook.Collections.ContactsCollection(dummy);
            if( !dummy ) {
                collection.fetch({
                    success: function() {
                        //                        listView.render();
                        //                        Addressbook.testModel.set('lastname', collection.models[0].get('lastname'));
                        //                        Addressbook.testModel.set('firstname', collection.models[0].get('firstname'));
                        //                        Addressbook.testModel.set('value', collection.models[0].get('firstname') + ' - ' + collection.models[0].get('lastname'));
                    }
                });
            }

            //            var editView = new Addressbook.Views.EditView();
            //
            //            var listView = new Addressbook.Views.ListView({
            //                model: collection
            //            });
            //
            //            Addressbook.editView = editView;
            //
            //            Addressbook.listView = listView;
            Addressbook.contactCollection = collection;

            //            $('#main').append(editView.render().$el);
            //            $('#main').append(listView.render().$el);

            Addressbook.testModel = new Addressbook.Models.ContactsModel({
                value: '',
                firstname: 'Frank',
                lastname: 'S'
            });

            var scope = {

                testModel: Addressbook.testModel,

                contactCollection: Addressbook.contactCollection,

                topcoatTheme: function() {
                    M.TemplateManager._currentUI = 'topcoat';
                    Addressbook.detailView.updateTemplate();
                    Addressbook.detailView.render();
                }
            };

            Addressbook.detailView = Addressbook.Views.DetailView.design(scope, null, true);


            $('#main').prepend('<hr>');
            $('#main').prepend(Addressbook.detailView.render().$el);


            console.timeEnd('start');

            //            Extended = TMP.View.extend({
            //                value: 'extended'
            //            }, {
            //                // Reihenfolge der childViews ist nicht garantiert.
            //                button1: TMP.ButtonView.extend({
            //                    value: 'button1',
            //                    scopeValue: 'model',
            //                    events: {
            //                        click: 'onClick'
            //                    }
            //                }),
            //                button2: TMP.ButtonView.extend({
            //                    value: 'button2',
            //                    scopeValue: 'model',
            //                    events: {
            //                        click: 'onClick'
            //                    }
            //                })
            //            });
            //
            //            var scope = {model: 'HELLO MODEL', onClick: function() {
            //                console.log('clock', this);
            //            }};
            //
            //            // Wie kann ich einer childView mittels scope objekt
            //            // ein event hinzufügen?
            //            scope.childViews = {
            //                button2: {
            //                    events: {
            //                        "click": function() {
            //                        }
            //                    }
            //                }
            //            }
            //
            //            ExtendedInstance = Extended.design(scope);
            //
            //            // VERSUS
            //
            //            Designed = TMP.View.design({
            //                value: 'designed'
            //            }, {
            //                button1: TMP.ButtonView.design({
            //                    value: 'button1',
            //                    scopeValue: scope.model,
            //                    events: {
            //                        click: scope.onClick
            //                    }
            //                }),
            //                button2: TMP.ButtonView.design({
            //                    value: 'button2',
            //                    scopeValue: scope.value,
            //                    events: {
            //                        click: scope.onClick
            //                    }
            //                })
            //            });
            //
            //
            //            console.log(ExtendedInstance.value);
            //            console.log(ExtendedInstance.childViews.button1.scope[ExtendedInstance.childViews.button1.scopeValue]);
            //            console.log(ExtendedInstance.childViews.button2.scope[ExtendedInstance.childViews.button2.events.click]);
            //            console.log(ExtendedInstance.childViews.button1.scope === ExtendedInstance.childViews.button1);
            //            console.log('--------------');
            //            console.log(Designed.scope.value);
            //            console.log(Designed.childViews.button1.scopeValue);
            //            console.log(Designed.childViews.button2.events.click);
            //            console.log(Designed.childViews.button1.scope === Designed.childViews.button1);

        },

        editCtrl: function() {

        }
    });

})();

var dummy = null;
