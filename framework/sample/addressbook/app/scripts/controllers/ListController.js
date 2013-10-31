(function( scope ) {

    Addressbook.Controllers.ListController = M.Controller.extend({

        nextPage: '/secondpage',

        testModel: null,

        contactCollection: null,

        listView: null,

        editModel: M.Model.create(),

        applicationStart: function() {

            this._initView();
            Addressbook.layout = M.AppLayout.extend().create(this, null, true);

            Addressbook.layout.applyViews({
                header: this.header,
                content: this.listView
            }).render();
        },

        show: function() {

            this._initView();
            Addressbook.layout.applyViews({
                header: this.header,
                content: this.listView
            });
            Addressbook.layout.startTransition();
        },

        nextPage: function() {
            Addressbook.navigate({
                route: '/'
            });
        },

        _initView: function( settings ) {

            if( !this.contactCollection ) {
                Addressbook.contactCollection = this.contactCollection = new Addressbook.Collections.ContactsCollection();
                this.contactCollection.fetch();
            }

            if( !this.listView ) {
                this.listView = Addressbook.Views.ListView.create(this, null, true);
            }

            if( !this.header ) {
                this.header = M.View.extend({
                    tagName: 'h2',
                    value: 'Contacts'
                }).create();
            }


        }


    });


})(this);