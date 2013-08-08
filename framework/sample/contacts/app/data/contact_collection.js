define([
    'themproject',
    'data/contact_model'

], function( M, Model ) {

        var host = 'http://nerds.mway.io:8200';

        var Collection = M.Collection.extend({
            model: Model,
            url: host + '/contact' // for rest usage
        });

        return Collection;
    });