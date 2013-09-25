define([
    'themproject', 'routes/router'
], function( M, Router ) {

    //DEFINE AN APP NAME
    window.TMP_APPLICATION_NAME = 'Addressbook';
    //Or name the app name on the init process - same result
    M.Application.create({
        applicationName: 'Addressbook'
    }).start({
            router: Router.create()
    });

});