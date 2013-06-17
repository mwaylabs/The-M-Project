//Addressbook = M.Application.extend({
//
//    start: function() {
//
//        M.LayoutManager.setLayout(M.Layout.create()).setContent({
//            view: new Addressbook.AppView
//        });
//
//        //Addressbook.ApplicationController.init();
//    }
//});

var AddressbookApp = Backbone.Router.extend({

    routes: {
        "overview": "overview",    // #overview
        "detail/:query": "detail",  // #detail/kiwis
        "detail/:query/p:page": "detail"   // #detail/kiwis/p7
    },

    overview: function() {
        M.LayoutManager.setLayout(M.Layout.create()).setContent({
            view: new Addressbook.AppView
        });
    },

    detail: function( modelid, page ) {
        var model = Addressbook.Contacts.get('51b5ced9122ba7723d000002');

        if( !model ) {
            Addressbook.Contacts.fetch()
        } else {
            M.LayoutManager.setContent({
                view: new Addressbook.ContactDetailView({model: model})
            });
        }

    },

    start: function() {
        if(!Backbone.history.start()){
            this.navigate("overview", {trigger: true});
        }
    }

});

var Addressbook = new AddressbookApp();

