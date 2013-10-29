(function(scope){

    Addressbook.Controllers.ListController = M.Controller.extend({

        nextPage: '/secondpage',

        testModel: null,

        contactCollection: null,

        listView: null,

        applicationStart: function () {

            this.listView = this._initView();
            Addressbook.layout = M.SwitchLayout.extend().create(this, null, true);

            Addressbook.layout.applyViews({
                content: this.listView
            }).render();
        },

        show: function () {
            Addressbook.layout.applyViews({
                content: this._initView()
            });
            Addressbook.layout.startTransition();
        },

        nextPage: function () {
            Addressbook.navigate({
                route: '/'
            });
        },

        _initView: function (settings) {

            if (!this.contactCollection) {
                Addressbook.contactCollection = this.contactCollection = new Addressbook.Collections.ContactsCollection();
                this.contactCollection.fetch();
            }

            if (!this.listView) {
                this.listView = Addressbook.Views.ListView.create(this, null, true);
            }
            return this.listView;
        },




        topcoatTheme: function() {
            M.TemplateManager._currentUI = 'topcoat';
            Addressbook.listView.updateTemplate();
            Addressbook.listView.render();
        }



    });


})(this);