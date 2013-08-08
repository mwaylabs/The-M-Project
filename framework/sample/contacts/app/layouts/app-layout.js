define([
    "themproject",
    "text!layouts/header-layout/header-layout.html",
    "text!layouts/bottom-bar-layout/bottom-bar-layout.html"
],

    function( Layout, headerTemplate, bottomBarTemplate ) {
        var template = $(Layout.prototype.template);
        template.find('#pt-main .pt-page').first().before(headerTemplate);
        template.find('#pt-main .pt-page').last().after(bottomBarTemplate);

        var AppLayout = {

            identifier: 'app-layout',

            template: Layout.prototype.template,

            applyViews: function( settings ){
                var current = $('.pt-page-current');

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
                view['.' + selector + ' .content'] = settings.content;
                if( settings.footer ) {
                    view['.pt-perspective .bottom-bar'] = settings.footer;
                }
                if( settings.header ) {
                    view['.pt-perspective .header'] = settings.header;
                }
                return view;
            }


        };

        return Layout.extend(AppLayout);

    });
