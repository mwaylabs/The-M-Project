define([
    'themproject', 'app', 'data/remote-store'

], function( M, App, RemoteStore ) {

    App.Contact = M.Model.extend({
        idAttribute: '_id'
    });

    App.RemoteStore = new M.BikiniStore({
         socketio_path: 'bikini/live'
    });

    var host = '';
    App.Contacts = M.Collection.extend({
        url: host + '/bikini/contacts', // for rest usage
        model: App.Contact,
        store: RemoteStore,
        entity: 'contacts'
    });

    return App.Contacts;
});