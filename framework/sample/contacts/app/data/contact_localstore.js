define([
    "app/data/contact_collection"
],
    function(Collection) {

        var LocalStore = new M.LocalStorageStore({
            entities: {
                contact: {
                    collection: Collection
                }
            }
        });

        return LocalStore;
    });