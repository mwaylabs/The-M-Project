define([
    'themproject',
    'data/contact_collection'

], function( M, Collection ) {

    var LocalStore = new M.LocalStorageStore({
        entities: {
            contact: {
                collection: Collection
            }
        }
    });

    return LocalStore;
});