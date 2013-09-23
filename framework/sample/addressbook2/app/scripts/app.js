define([
    'themproject',
    'routes/router'
], function( M, Router ) {
    window.Addressbook = new M.Application();
    Addressbook.start({
        router: new Router()
    });
});