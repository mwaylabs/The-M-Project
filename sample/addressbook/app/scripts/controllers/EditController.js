(function (scope) {

    Addressbook.Controllers.EditController = M.Controller.extend({

        detailView: null,

        editModel: M.Model.create(),

        applicationStart: function (settings) {

            Addressbook.setLayout(M.AppLayout.design(this, null, true));

            this._initView(settings);

            Addressbook.getLayout().applyViews({
                header: this.header,
                content: this.detailView
            });
        },

        show: function (settings) {
            this._initView(settings);

            Addressbook.getLayout().applyViews({
                header: this.header,
                content: this.detailView
            });
            Addressbook.getLayout().startTransition();
        },

        back: function () {
            Addressbook.navigate({
                route: 'detail/' + this.currentModel.id,
                transition: M.PageTransitions.CONST.MOVE_TO_TOP_FROM_BOTTOM
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

                    first: M.ButtonView.extend({
                        cssClass: 'btn-default',
                        value: M.I18N.get('global.back'),
                        useElement: YES,
                        events: {
                            tap: 'back'
                        }
                    }),
                    second: M.View.extend({},{

                        deleteButton: M.ButtonView.extend({
                            grid: 'col-xs-3',
                            cssClass:'btn-danger',
                            value: M.I18N.get('global.delete'),
                            useElement: YES,
                            events: {
                                tap: 'removeEntry'
                            }
                        }),

                        updateButton: M.ButtonView.extend({
                            grid: 'col-xs-3',
                            cssClass: 'btn-success',
                            value: M.I18N.get('global.save'),
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
                Addressbook.router.editCtrl.editModel.clear();
                _.each(userModel.attributes, function(value, key){
                    if(key.indexOf('_') != 0){
                        this.editModel.set(key, userModel.get(key));
                    }
                }, this);
            }

        },

        removeEntry: function (event, element) {
            if (element.scope.currentModel) {
                element.scope.currentModel.destroy({
                    success: function(){
                        M.Toast.show({text: M.I18N.l('global.succ_del'), timeout: M.Toast.MEDIUM});
                        Addressbook.navigate({
                            route: '/'
                        });
                    },
                    error: function(){
                        M.Toast.show({text: M.I18N.l('global.could_not_delete'), timeout: M.Toast.MEDIUM});
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
                        //M.Toast.show({text: M.I18N.l('global.succ_update'), timeout: M.Toast.MEDIUM});
                    },
                    error: function(){
                        M.Toast.show({text: M.I18N.l('global.err_update'), timeout: M.Toast.MEDIUM});
                    }
                });

            }
        }

    });

})(this);