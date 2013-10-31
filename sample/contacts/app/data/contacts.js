define([
    'themproject', 'app', 'data/remote-store'

], function( M, App, RemoteStore ) {

    App.Contact = M.Model.extend({
        idAttribute: '_id'
    });

    var host = 'http://nerds.mway.io:8200';
    App.Contacts = M.Collection.extend({
        url: host + '/bikini/contacts', // for rest usage
        model: App.Contact,
        store: RemoteStore,
        entity: 'contacts'
    });

    return App.Contacts;
});