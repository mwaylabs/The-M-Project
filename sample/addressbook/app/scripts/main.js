(function(scope) {

    M.APPLICATION_NAME = 'Addressbook';

    scope.Addressbook = M.Application.extend().create();

    $(document).ready(function() {
        'use strict';

        Addressbook.Routers.MainRouter.create();
        Addressbook.start();
    });

})(this);

