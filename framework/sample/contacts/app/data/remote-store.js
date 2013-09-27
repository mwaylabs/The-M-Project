define([
    'themproject', "app"
], function( M, App ) {

    App.RemoteStore = new M.BikiniStore({
         socketio_path: 'bikini/live'
    });

    return App.RemoteStore;
});