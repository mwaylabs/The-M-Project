define([
    "themproject"
],

    function( M ) {

        var AppLayout = {

            identifier: 'app-layout2',

            template: M.SwitchLayout.prototype.template,

            applyViews: function( settings ){
                var current = $('.pt-page-current');

                var next = $('.pt-page:not(.pt-page-current)');

                var selector = '';

                if(current.length < 1){
                    selector = 'pt-page-1';
                } else if(current.hasClass('pt-page-1')){
                    selector = 'pt-page-2';
                } else if(current.hasClass('pt-page-2')){
                    selector = 'pt-page-1';
                }

                var view = {};
                //                view['.' + selector + ' .content'] = settings.content;
                view['.' + selector + ' .content'] = settings.content.create();
//                if( settings.footer ) {
//                    view['.' + selector + ' .footer'] = settings.footer;
//                } else {
//                    view['.' + selector + ' .footer'] = 'settings.footer';
//                }
                return view;
            }

        };

        return M.SwitchLayout.extend(AppLayout);

    });
