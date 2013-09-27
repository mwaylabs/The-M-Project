define([
    'themproject'
], function( M ) {

    var RemoteStore = new M.BikiniStore({
         socketio_path: 'bikini/live'
    });

    return RemoteStore;
});