define([
    'router',
    'themproject'
], function( Router, M ) {

    //create the global app namespace

    window.Addressbook = new M.Application();

    Addressbook.start({

        router: new Router()

    });
});