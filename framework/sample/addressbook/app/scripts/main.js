(function(scope) {

    scope.Addressbook = M.Application.extend({}).create();

    $(document).ready(function() {
        'use strict';

        window.xxx = Addressbook.Routers.MainRouter.create();
        Addressbook.start();
    });

})(this);