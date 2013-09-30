define([
    'themproject', 'data/remote-store'

], function( M, RemoteStore ) {

    var Contact = M.Model.extend({
        idAttribute: '_id'
    });

    var host = 'http://localhost:8080/~hano/';
    var Contacts = M.Collection.extend({
        url: host + 'mock.json', // for rest usage
        model: Contact,
        store: RemoteStore,
        entity: 'contacts'
    });

    return Contacts;
});