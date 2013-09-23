define([
    'themproject',
    'data/contact_model'

], function( M, Model ) {

        var host = '';
//        var host = 'http://localhost:8080';
        //var host = 'http://localhost:8200';
        //var host = 'http://nerds.mway.io:8200';

        var Collection = M.Collection.extend({
//            url: host + '/bikini/contacts', // for rest usage
            model: Model,
//            credentials: {
//                username: 'admin',
//                password: 'mway123'
//            },
            entity: 'contacts'
        });

        return Collection;
    });