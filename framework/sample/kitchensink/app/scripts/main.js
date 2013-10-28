(function(scope) {

    scope.Kitchensink = M.Application.extend().create();

    $(document).ready(function() {
        'use strict';
        Kitchensink.start({
            router: Kitchensink.Routers.KitchensinkRouter.create(),
            locales: [
                { name: 'English', locale: 'en'},
                { name: 'Deutsch', locale: 'de'}
            ]
        });
    });

})(this);

