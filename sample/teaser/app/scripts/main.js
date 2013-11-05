(function(scope) {

    scope.Teaser = M.Application.extend({}).create();

    $(document).ready(function() {
        'use strict';

        window.xxx = Teaser.Routers.MainRouter.create();

        Teaser.start({
            locales: [
                { name: 'English', locale: 'en'}
                //                { name: 'Deutsch', locale: 'de'}
            ]
        });
    });

})(this);