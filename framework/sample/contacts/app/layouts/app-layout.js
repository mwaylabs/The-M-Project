define([
    "themproject"
],

    function( M ) {
        var template = $(M.SwipeLayout.prototype.template);
        template.find('#pt-main .pt-page').first().before(M.HeaderLayout.prototype.template);
        template.find('#pt-main .pt-page').last().after(M.HeaderLayout.prototype.template);

        var AppLayout = {

            identifier: 'app-layout',

            template: template,

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
                view['.' + selector + ' .content'] = settings.content;
                if( settings.footer ) {
                    view['.' + selector + ' .footer'] = settings.footer;
                } else {
                    view['.' + selector + ' .footer'] = new M.View();
                }
                return view;
            }


        };

        return M.SwipeLayout.extend(AppLayout);

    });
