(function( scope ) {

    Addressbook.Controllers.ListController = M.Controller.extend({

        nextPage: '/secondpage',

        testModel: null,

        contactCollection: null,

        listView: null,

        editModel: M.Model.create(),

        applicationStart: function() {

            this._initView();
            Addressbook.setLayout(M.AppLayout.design(this, null, true));

            Addressbook.getLayout().applyViews({
                header: this.header,
                content: this.listView
            });
        },

        show: function() {

            this._initView();
            Addressbook.getLayout().applyViews({
                header: this.header,
                content: this.listView
            });
            Addressbook.getLayout().startTransition();
        },

        nextPage: function() {
            Addressbook.navigate({
                route: '/'
            });
        },

        gotoAddPage: function() {
            Addressbook.navigate({
                route: '/add'
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
                this.header = M.ToolbarView.extend({
                    value: 'Contacts',
                    events:{
                        hold: function(){
                            localStorage.clear();
                            M.Toast.show('cleared local stoage')
                        }
                    }
                },{
                    second: M.View.extend({},{

                        addButton: M.ButtonView.extend({
                            cssClass: 'btn-success',
                            value: 'Add',
                            useElement: YES,
                            events: {
                                tap: 'gotoAddPage'
                            }
                        })
                    })
                }).create(this, null, true);
            }


        }


    });


})(this);