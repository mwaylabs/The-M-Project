(function (scope) {

    Addressbook.Controllers.DetailController = M.Controller.extend({

        detailView: null,

        applicationStart: function (settings) {
            this.detailView = this._initView(settings);
            Addressbook.layout = M.SwitchLayout.extend().create(this, null, true);

            Addressbook.layout.applyViews({
                content: this.detailView
            }).render();
        },

        show: function (settings) {
            Addressbook.layout.applyViews({
                content: this._initView(settings)
            });
            Addressbook.layout.startTransition();
        },

        nextPage: function () {
            Addressbook.navigate({
                route: '/'
            });
        },

        _initView: function (settings) {
            var that = this;
            var userId = settings.id;
            var userModel = null;

            if (!Addressbook.contactCollection) {

                Addressbook.contactCollection = new Addressbook.Collections.ContactsCollection(/*dummy*/);
                Addressbook.contactCollection.fetch({
                    success: function () {
                        that._setModel(userId);
                    }
                });
            } else {
                this._setModel(userId);
            }

            if (!this.detailView) {
                this.detailView = Addressbook.Views.DetailView.create(this, null, true);
            }
            return this.detailView;
        },

        _setModel: function (userId) {
            var userModel = Addressbook.contactCollection.get(userId);
            this.currentModel = userModel;
            if (!this.editModel) {
                this.editModel = new Addressbook.Models.ContactsModel({
                    firstname: userModel.get('firstname'),
                    lastname: userModel.get('lastname')
                });
            }

//            this.editModel = new Addressbook.Models.ContactsModel({
//                    firstname: userModel.get('firstname'),
//                    lastname: userModel.get('lastname')
//                });
            this.editModel.set('lastname', userModel.get('lastname'));
            this.editModel.set('firstname', userModel.get('firstname'));
            //this.set('editModel', this.editModel);
        },

        addEntry: function (event, element) {
            element.scope.set('currentModel', element.scope.contactCollection.create(element.scope.editModel.attributes));
        },

        removeEntry: function (event, element) {
            if (element.scope.currentModel) {
                element.scope.currentModel.destroy();
                element.scope.set('currentModel', null);
            }
            element.scope.editModel.clear();
        },

        updateEntry: function (event, element) {
            if (this.currentModel) {
                this.currentModel.save(this.editModel.attributes);
            }
        }

    });

})(this);