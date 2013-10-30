(function (scope) {

    Addressbook.Controllers.DetailController = M.Controller.extend({

        detailView: null,

        editModel: M.Model.create(),

        applicationStart: function (settings) {
            this.detailView = this._initView(settings);
            Addressbook.layout = M.SwitchLayout.extend().create(this, null, true);

            Addressbook.layout.applyViews({
                content: this.detailView
            }).render();
        },

        show: function (settings) {
            content = this._initView(settings);

            Addressbook.layout.applyViews({
                content: content
            });
            Addressbook.layout.startTransition();
        },

        nextPage: function () {
            Addressbook.navigate({
                route: '/'
            });
        },

        _initView: function (settings) {
//            var that = this;
//            var userId = settings.id;
//            var userModel = null;
//
//            if (!Addressbook.contactCollection) {
//
//                Addressbook.contactCollection = new Addressbook.Collections.ContactsCollection(/*dummy*/);
//                Addressbook.contactCollection.fetch({
//                    success: function () {
//                        that._setModel(userId);
//                    }
//                });
//            } else {
//                this._setModel(userId);
//            }

            this._setModel(settings.id);
            if (!this.detailView) {
                this.detailView = Addressbook.Views.DetailView.create(this, null, true);
            }
            return this.detailView;
        },

        _setModel: function (userId) {
            var userModel = Addressbook.contactCollection.get(userId);
            this.currentModel = userModel;
            this.editModel.set('firstname', userModel.get('firstname'));
            this.editModel.set('lastname', userModel.get('lastname'));
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
                this.currentModel.set(this.editModel.attributes);
                this.currentModel.save();
            }
        }

    });

})(this);