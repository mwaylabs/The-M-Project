define([
    "themproject"
],

    function( M ) {
        var template = $('<div><div class="left"></div><div class="right"></div></div>');

        var AppLayout = {

            identifier: 'app-layout',

            template: template,

            __applyViews: function( views ) {
                var myViews = {};
                myViews['.right'] = views.right;
                myViews['.left'] = views.left;
                return myViews;
            }
        };


        return M.Layout.extend(AppLayout);

    });