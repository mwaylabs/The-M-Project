define([
    "themproject"
],

    function( M ) {
        var template = $('<div><div class="content"></div></div>');

        var AppLayout = {

            identifier: 'app-layout',

            template: template,

            __applyViews: function( views, duplicates ) {
                var myViews = {};

//                if(duplicates[0] !== views.right){
                    myViews['.content'] = views.content;
//                }

                return myViews;
            }
        };


        return M.Layout.extend(AppLayout);

    });