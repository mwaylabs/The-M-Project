define([
    'themproject',
    'layouts/app-layout',
    'views/ContactAll',
    'views/ContactDetail'

], function( M, AppLayout, Left, Right ) {



    var index = M.Controller.create({

        applicationStart: function( params ) {

            Addressbook.layoutManager.setLayout(new AppLayout());

            Addressbook.layoutManager.applyViews({
                left: Left,
                right: Right
            });
        },

        show: function( params ) {

        }
    });

    return index;

});