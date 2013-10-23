M.Themes.registerTemplateForTheme(M.Themes.DEFAULT_THEME, 'switch-layout', '<div id="pt-main" class="pt-perspective"> <div class="pt-page pt-page-1"> <div data-childviews="content_page1"></div> <div class="footer"></div> </div> <div class="pt-page pt-page-2"> <div data-childviews="content_page2"></div> <div class="footer"></div> </div> </div>');

M.SwitchLayout = M.Layout.extend({

    _type: 'switch-layout',

    template: M.Themes.getTemplateByName('switch-layout'),

    currentPage: null,

    applyViews: function( settings ){
        var current = $('.pt-page-current');

        var next = $('.pt-page:not(.pt-page-current)');

        var selector = '';

        if(this.currentPage === null || this.currentPage === 'content_page2'){
            this.currentPage = 'content_page1';

        } else if(this.currentPage === 'content_page1'){
            this.currentPage = 'content_page2';
        }


        if(!this.childViews[this.currentPage]){
            this.addChildView(this.currentPage, settings.content);
            this.$el.find('[data-childviews="' + this.currentPage + '"]').append(settings.content.render().$el);
        }




//        if(current.length < 1){
//            selector = 'content_page1';
//        } else if(current.hasClass('pt-page-1')){
//            selector = 'content_page2';
//        } else if(current.hasClass('pt-page-2')){
//            selector = 'content_page1';
//        }



//
//        var view = {};
//        view['.' + selector + ' .content'] = settings.content;
//        if( settings.footer ) {
//            view['.' + selector + ' .footer'] = settings.footer.create();
//        } else {
//            view['.' + selector + ' .footer'] = new M.View();
//        }
//
//        if( settings.header ) {
//            view['.' + selector + ' .header'] = settings.header.create();
//        } else {
//            view['.' + selector + ' .header'] = new M.View();
//        }
        return this;
    }
});
