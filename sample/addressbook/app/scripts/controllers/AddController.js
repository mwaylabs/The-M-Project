(function( scope ) {

    Addressbook.Controllers.AddController = M.Controller.extend({

        detailView: null,

        editModel: M.Model.create(),

        applicationStart: function( settings ) {

            Addressbook.setLayout(M.AppLayout.design(this, null, true));

            this._initView(settings);

            Addressbook.getLayout().applyViews({
                header: this.header,
                content: this.detailView
            });
        },

        show: function( settings ) {
            this._initView(settings);

            Addressbook.getLayout().applyViews({
                header: this.header,
                content: this.detailView
            });
            Addressbook.getLayout().startTransition();
        },

        back: function() {
            this.editModel.set('firstname', '');
            this.editModel.set('lastname', '');
            Addressbook.navigate({
                route: '/'
            });
        },

        _initView: function( settings ) {
            var that = this;
            var userId = settings.id;
            var userModel = null;

            if( Addressbook.contactCollection && Addressbook.contactCollection.models.length > 1 ) {
                this._setModel(userId);
            } else {
                Addressbook.contactCollection = new Addressbook.Collections.ContactsCollection(/*dummy*/);
                Addressbook.contactCollection.fetch({
                    success: function() {
                        that._setModel(userId);
                    }
                });
            }

            if( !this.detailView ) {
                this.detailView = Addressbook.Views.EditView.create(this, null, true);
            }

            if( !this.header ) {
                this.header = M.ToolbarView.extend({
                    value: M.I18N.get('global.edit')
                }, {
                    first: M.ButtonView.extend({
                        cssClass: 'btn-default',
                        value: M.I18N.get('global.back'),
                        useElement: YES,
                        events: {
                            tap: 'back'
                        }
                    }),
                    second: M.View.extend({}, {

                        updateButton: M.ButtonView.extend({
                            cssClass: 'btn-success',
                            value: M.I18N.get('global.save'),
                            useElement: YES,
                            events: {
                                tap: 'addEntry'
                            }
                        })
                    })
                }).create(this, null, true);
            }
        },

        _setModel: function( userId ) {
            var userModel = Addressbook.contactCollection.get(userId);
            if( userModel ) {
                this.currentModel = userModel;
                this.editModel.set('firstname', userModel.get('firstname'));
                this.editModel.set('lastname', userModel.get('lastname'));
            }

        },

        addEntry: function( event, element ) {
            element.scope.set('currentModel', Addressbook.contactCollection.create(element.scope.editModel.attributes));
            //M.Toast.show({text: M.I18N.l('global.succ_add'), timeout: M.Toast.MEDIUM});
        }

    });

})(this);