M.Themes.registerTemplateForTheme(M.Themes.DEFAULT_THEME, 'switch-layout', '<div id="pt-main" class="pt-perspective"> <div class="pt-page pt-page-1"> <div class="content"></div> <div class="footer"></div> </div> <div class="pt-page pt-page-2"> <div class="content"></div> <div class="footer"></div> </div> </div>');

M.SwitchLayout = M.Layout.extend({

    _type: 'switch-layout',

    template: M.Themes.getTemplateByName('switch-layout'),

    currentPage: '',

    applyViews: function( settings ) {
        var current = $('.pt-page-current');

        var next = $('.pt-page:not(.pt-page-current)');

        var selector = '';

        if( current.length < 1 ) {
            selector = 'pt-page-1';
        } else if( current.hasClass('pt-page-1') ) {
            selector = 'pt-page-2';
        } else if( current.hasClass('pt-page-2') ) {
            selector = 'pt-page-1';
        }

        var view = {};
        view['.' + selector + ' .content'] = settings.content;
        if( settings.footer ) {
            view['.' + selector + ' .footer'] = settings.footer;
        } else {
            view['.' + selector + ' .footer'] = new M.View();
        }
        return view;
    }
});