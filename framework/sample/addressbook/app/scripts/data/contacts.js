define([
    'themproject', 'data/remote-store'

], function( M, RemoteStore ) {

    var Contact = M.Model.extend({
        idAttribute: '_id'
    });


//    var host = 'http://nerds.mway.io:8200';
//    var Contacts = M.Collection.extend({
//        url: host + '/bikini/employees', // for rest usage
//        model: Contact,
//        store: RemoteStore,
//        entity: 'contacts',
//        comparator: function( contact ) {
//            return contact.get("firstname").charAt(0);
//        }
//    });
    var host = 'http://localhost:8080/~hano/mway/';
    var Contacts = M.Collection.extend({
        url: host + 'data/employee.json', // for rest usage
        model: Contact,
        store: RemoteStore,
        entity: 'contacts',
        comparator: function( contact ) {
            return contact.get("firstname").charAt(0);
        }
    });

    return Contacts;
});