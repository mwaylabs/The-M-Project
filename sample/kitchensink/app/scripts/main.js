(function(scope) {

    scope.Kitchensink = M.Application.extend().create();

    $(document).ready(function() {
        'use strict';

        Kitchensink.Routers.KitchensinkRouter.create();
        Kitchensink.start({
            locales: [
                { name: 'English', locale: 'en'},
                { name: 'Deutsch', locale: 'de'}
            ]
        });
    });

})(this);

