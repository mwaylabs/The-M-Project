define([
    "themproject"
],

    function( M ) {
        var template = $('<div><div class="left"></div><div class="right"></div></div>');

        var AppLayout = {

            identifier: 'app-layout',

            template: template,

            __applyViews: function( views, duplicates ) {
                var myViews = {};

//                if(duplicates[0] !== views.right){
                    myViews['.right'] = views.right;
//                }

//                if(duplicates[0] !== views.left){
                    myViews['.left'] = views.left;
//                }

                return myViews;
            }
        };


        return M.Layout.extend(AppLayout);

    });