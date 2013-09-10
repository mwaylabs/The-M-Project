define([
    'themproject',
    'data/contact_model'

], function( M, Model ) {

        var host = 'http://localhost:8200';
        // var host = 'http://nerds.mway.io:8200';

        var Collection = M.Collection.extend({
            model: Model,
            entity: 'contacts',
            url: host + '/bikini/contacts', // for rest usage
            credentials: {
                username: 'admin',
                password: 'mway123'
            }
        });

        return Collection;
    });