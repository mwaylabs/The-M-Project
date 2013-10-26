(function(scope) {

    scope.Addressbook = M.Application.extend().create();

    $(document).ready(function() {
        'use strict';
        Addressbook.start({
            router: Addressbook.Routers.KitchensinkRouter.create(),
            locales: [
                { name: 'English', locale: 'en'},
                { name: 'Deutsch', locale: 'de'}
            ]
        });
    });

})(this);

