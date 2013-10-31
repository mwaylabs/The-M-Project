(function (scope) {

    Addressbook.Controllers.AddController = M.Controller.extend({

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
            this.editModel.set('firstname', '');
            this.editModel.set('lastname', '');
            Addressbook.navigate({
                route: '/'
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

                        updateButton: M.ButtonView.extend({
                            cssClass: 'btn-success',
                            value: 'Save',
                            useElement: YES,
                            events: {
                                tap: 'addEntry'
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

        addEntry: function (event, element) {
            element.scope.set('currentModel', Addressbook.contactCollection.create(element.scope.editModel.attributes));
            M.Toast.show({text: 'Successfully added', timeout: M.Toast.MEDIUM});
        }

    });

})(this);