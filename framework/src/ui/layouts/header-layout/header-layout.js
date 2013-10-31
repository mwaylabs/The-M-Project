M.Themes.registerTemplateForTheme(M.Themes.DEFAULT_THEME, 'header-layout', '<div data-childviews="header" class="header"></div>');

M.HeaderLayout = M.Layout.extend({

    _type: 'header-layout',

    template: M.Themes.getTemplateByName('header-layout'),

    applyViews: function( settings ) {


        var ident = 'header';

        if(!this.childViews['header']){
            this.addChildView('header', settings.header);
        }

        if( settings.header && !this._firstRender ) {
            this.$el.find('[data-childviews="' + ident + '"]').html('');
            this.$el.find('[data-childviews="' + ident + '"]').html(settings.header.render().$el);
        }


        return this;
    }

});