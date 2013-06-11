Addressbook.ApplicationController = M.Controller.extend({

    collection: null,

    init: function() {
        this.collection = Addressbook.Contacts.create();
        Addressbook.Main.set(this.collection);
        this.collection.fetch();
    },

    remove: function() {
        Addressbook.ApplicationController.collection.remove(Addressbook.ApplicationController.collection.at(0));
    },

    add: function() {
        Addressbook.ApplicationController.collection.add({'firstname': 'horscht'});
    },

    change: function() {
        Addressbook.ApplicationController.collection.at(0).set('firstname', 'klaus');
    }
});