define([

],
    function() {

        var Model = M.Model.extend({
            idAttribute: '_id',
            defaults: {
                firstname: '',
                lastname: ''
            },

            validate: function( attrs, options ) {
                if( attrs.firstname.length == 0 ) {
                    return "Firstname  is missing!"
                }
                if( attrs.lastname.length == 0 ) {
                    return "Lastname  is missing!"
                }
            }
        });

        return Model;
    });