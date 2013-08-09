define([
    "/modules/ui/layouts/switch-layout/switch-layout.js"
],

    function( Layout ) {

        var AppLayout = {

            identifier: 'app-layout2',

            template: Layout.prototype.template

        };

        return Layout.extend(AppLayout);

    });
