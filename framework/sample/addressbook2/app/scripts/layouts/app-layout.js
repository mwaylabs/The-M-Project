define([
    "themproject"
],

    function( M ) {

        var template = $('<div><div class="left"></div><div class="right"></div></div>');

        var AppLayout = {

            identifier: 'app-layout',

            template: template,

            applyViews: function( settings ) {

                var view = {};
                if(settings.left && _.isFunction(settings.left)){
                    view['.left'] = settings.left.create();
                } else if(settings.left && settings.left.isView()){
                    view['.left'] = settings.left;
                }

                if(settings.right && _.isFunction(settings.right)){
                    view['.right'] = settings.right.create();
                } else if(settings.right && settings.right.isView()){
                    view['.right'] = settings.right;
                }

                return view;
            }


        };

        return M.Layout.extend(AppLayout);

    });