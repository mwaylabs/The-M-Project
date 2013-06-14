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
        "overview":             "overview",    // #overview
        "detail/:query":        "detail",  // #detail/kiwis
        "detail/:query/p:page": "detail"   // #detail/kiwis/p7
    },

    overview: function() {
        M.LayoutManager.setLayout(M.Layout.create()).setContent({
            view: new Addressbook.AppView
        });
    },

    detail: function(query, page) {
        console.log('show detail', query, page);
    },

    start: function(){
        Backbone.history.start();
        this.navigate("overview", {trigger: true});
        console.log('start the application');
    }

});

var Addressbook = new AddressbookApp();

