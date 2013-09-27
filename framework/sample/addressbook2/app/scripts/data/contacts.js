define([
    'themproject', 'data/remote-store'

], function( M, RemoteStore ) {

    var Contact = M.Model.extend({
        idAttribute: '_id'
    });

    var host = 'http://nerds.mway.io:8200';
    var Contacts = M.Collection.extend({
        url: host + '/bikini/contacts', // for rest usage
        model: Contact,
        store: RemoteStore,
        entity: 'contacts'
    });

    return Contacts;
});