

define([
    "data/contact_collection"
], function( Collection ) {

        var RemoteStore = new M.BikiniStore({
            socketio_path: 'bikini/live'
        });

        return RemoteStore;
    });