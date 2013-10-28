//Addressbook.Views = Addressbook.Views || {};
//
//(function() {
//    'use strict'
//    Addressbook.Views.DetailView = M.View.extend({
//
//        template: '<div><div data-childviews="edit"></div><div data-childviews="content"></div><div data-childviews="footer"></div></div>'
//
//    }, {
//        edit: M.View.extend({
//            postRender: function() {
//                this.$el.hide();
//            }
//        }, {
//            headline: M.View.extend({
//                tagName: 'h2',
//                value: 'Edit',
//                test: 'headline'
//            }),
//
//            firstname: M.TextfieldView.extend({
//                scopeKey: 'editModel.firstname',
//                label: 'Firstname'
//            }),
//
//            lastname: M.TextfieldView.extend({
//                scopeKey: 'editModel.lastname',
//                label: 'Lastname'
//            }),
//
//            //            overview2: M.View.extend({
//            //                template: '<div><span><%= lastname %></span>, <span><%= firstname %></span></div>',
//            //                type: 'Overview',
//            //                scopeKey: 'currentModel'
//            //            }),
//
//            options: M.View.extend({
//                cssClass: 'options',
//                useElement: YES
//            },{
//                updateButton: M.ButtonView.extend({
//                    cssClass:'btn-info',
//                    value: 'Update',
//                    events: {
//                        click: 'updateEntry'
//                    }
//                }),
//
//                deleteButton: M.ButtonView.extend({
//                    cssClass:'btn-danger',
//                    value: 'Delete',
//                    events: {
//                        click: 'removeEntry'
//                    }
//                }),
//
//                addButton: M.ButtonView.extend({
//                    cssClass:'btn-success',
//                    value: 'Add',
//                    extendTemplate: '<span><%= _value_ %></span>',
//                    events: {
//                        click: 'addEntry'
//                    }
//                }),
//                hide: M.ButtonView.extend({
//                    cssClass:'btn-default',
//                    value: 'Hide',
//                    events: {
//                        click: function() {
//                            Addressbook.MainController.detailView.childViews.edit.$el.slideUp();
//                        }
//                    }
//                })
//            })
//        }),
//
//        content: M.View.extend({
//
//        }, {
//            headline: M.View.extend({
//                tagName: 'h2',
//                value: 'Contacts'
//            }),
//            contactList: M.ListView.extend({
//                scopeKey: 'contactCollection',
//                listItemView: M.ListItemView.extend({
//                    extendTemplate: '<span class="firstname"><%= firstname %></span><span class="lastname"><%= lastname %></span>',
//                    events: {
//                        click: function() {
//                            this.scope.editModel.set('firstname', this.model.get('firstname'));
//                            this.scope.editModel.set('lastname', this.model.get('lastname'));
//                            this.scope.set('currentModel', this.model);
//                            Addressbook.MainController.detailView.childViews.edit.$el.slideDown();
//                        }
//                    }
//                })
//            })
//        }),
//
//        navigation: M.View.extend({
//        }, {
//            next: M.ButtonView.extend({
//
//                value: 'second page',
//                events: {
//                    click: function() {
//                        Addressbook.navigate({
//                            route: this.scope.nextPage
//                        })
//                    }
//                }
//            }),
//            clear: M.ButtonView.extend({
//                value: 'clear all data',
//                events: {
//                    click: function() {
//                        localStorage.clear();
//                        var scope = this.scope;
//                        var db = openDatabase('bikini', '1.2', 'my first database', 2 * 1024 * 1024);
//                        db.transaction(function( tx ) {
//                            tx.executeSql("DROP TABLE '" + scope.contactCollection.channel + "'");
//                        });
//                    }
//                }
//            })
//        })
//
//    });
//
//})();