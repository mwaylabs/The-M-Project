(function(scope) {

    scope.Addressbook = M.Application.extend({
        Models: {},
        Collections: {},
        Views: {},
        Controllers: {},
        Routers: {},
        init: function() {
            'use strict';

            new Addressbook.Routers.MainRouter();
            Backbone.history.start();
        }
    }).create();

    $(document).ready(function() {
        'use strict';
        Addressbook.init();
    });

})(this);

