(function (scope) {

    Addressbook.Controllers.EditController = M.Controller.extend({

        detailView: null,

        editModel: M.Model.create(),

        applicationStart: function (settings) {

            Addressbook.layout = M.AppLayout.extend().create(this, null, true);

            this._initView(settings);

            Addressbook.layout.applyViews({
                header: this.header,
                content: this.detailView
            }).render();
            $('body').html(Addressbook.layout.$el);
        },

        show: function (settings) {
            this._initView(settings);

            Addressbook.layout.applyViews({
                header: this.header,
                content: this.detailView
            });
            Addressbook.layout.startTransition();
        },

        back: function () {
            Addressbook.navigate({
                route: 'detail/' + this.currentModel.id
            });
        },

        _initView: function (settings) {
            var that = this;
            var userId = settings.id;
            var userModel = null;

            if (Addressbook.contactCollection && Addressbook.contactCollection.models.length > 1) {
                this._setModel(userId);
            } else {
                Addressbook.contactCollection = new Addressbook.Collections.ContactsCollection(/*dummy*/);
                Addressbook.contactCollection.fetch({
                    success: function () {
                        that._setModel(userId);
                    }
                });
            }

            if (!this.detailView) {
                this.detailView = Addressbook.Views.EditView.create(this, null, true);
            }

            if( !this.header ) {
                this.header = M.ToolbarView.extend({
                    value: 'Edit'
                },{
                    second: M.View.extend({},{

                        deleteButton: M.ButtonView.extend({
                            cssClass: 'btn-danger',
                            value: 'Delete',
                            useElement: YES,
                            events: {
                                tap: 'removeEntry'
                            }
                        }),

                        updateButton: M.ButtonView.extend({
                            cssClass: 'btn-success',
                            value: 'Save',
                            useElement: YES,
                            events: {
                                tap: 'updateEntry'
                            }
                        })
                    })
                }).create(this, null, true);
            }
        },

        _setModel: function (userId) {
            var userModel = Addressbook.contactCollection.get(userId);
            if(userModel){
                this.currentModel = userModel;
                this.editModel.set('firstname', userModel.get('firstname'));
                this.editModel.set('lastname', userModel.get('lastname'));
            }

        },

        removeEntry: function (event, element) {
            if (element.scope.currentModel) {
                element.scope.currentModel.destroy({
                    success: function(){
                        M.Toast.show({text: 'Successfully deleted', timeout: M.Toast.MEDIUM});
                        Addressbook.navigate({
                            route: '/'
                        });
                    },
                    error: function(){
                        M.Toast.show({text: 'Could not delete', timeout: M.Toast.MEDIUM});
                    }
                });
                element.scope.set('currentModel', null);
            }
            element.scope.editModel.clear();
        },

        updateEntry: function (event, element) {
            if (this.currentModel) {
                this.currentModel.set(this.editModel.attributes);

                this.currentModel.save(null, {
                    success: function(){
                        M.Toast.show({text: 'Successfully updated', timeout: M.Toast.MEDIUM});
                    },
                    error: function(){
                        M.Toast.show({text: 'Error on update', timeout: M.Toast.MEDIUM});
                    }
                });

            }
        }

    });

})(this);