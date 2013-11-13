(function(scope) {

    M.APPLICATION_NAME = 'Kitchensink';

    scope.Kitchensink = M.Application.extend().create();

    $(document).ready(function() {
        'use strict';

        scope.Kitchensink.ApplicationRouter =  Kitchensink.Routers.KitchensinkRouter.create();
        Kitchensink.start({
            locales: [
                { name: 'English', locale: 'en'},
                { name: 'Deutsch', locale: 'de'}
            ]
        });
    });

})(this);

