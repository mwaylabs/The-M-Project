define([
    "text!layouts/switch-layout/switch-layout.html"
],

    function( template ) {
        var SwitchLayout = {
            identifier: 'switch-layout',
            template: template,
            currentPage: '',
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
                return view;
            }
        };

        return SwitchLayout;

    });
