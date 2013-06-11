Addressbook.ApplicationController = M.Controller.extend({

    collection: null,

    init: function() {
        this.collection = Addressbook.Contacts.create();
        Addressbook.Main.bind(this.collection);
        this.collection.fetch();
    },

    remove: function() {
        this.collection.remove(Addressbook.ApplicationController.collection.at(0));
    },

    add: function() {
        this.collection.add({'firstname': 'horscht'});
    },

    change: function() {
        this.collection.at(0).set('firstname', 'klaus');
    },

    gotoDetail: function(){
        Addressbook.Detail.bind(this.collection.at(0));
        M.LayoutManager.setContent({ view: Addressbook.Detail});
    },

    gotoMain: function(){
        M.LayoutManager.setContent({ view: Addressbook.Main});
    }
});