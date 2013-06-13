Addressbook.ApplicationController = M.Controller.extend({

    collection: null,

    init: function() {
        this.collection = Addressbook.Contacts.create();
//        this.collection = Addressbook.LiveConnector.getCollection({ entity: 'contacts' });
        Addressbook.Main.set(this.collection);
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

    gotoDetail: function(that){
        Addressbook.Detail.set(that.value);
        M.LayoutManager.setContent({ view: Addressbook.Detail });
    },

    gotoMain: function(that){
        M.LayoutManager.setContent({ view: Addressbook.Main });
    }
});