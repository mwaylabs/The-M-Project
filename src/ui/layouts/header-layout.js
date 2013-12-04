// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

M.Themes.registerTemplateForTheme(M.Themes.DEFAULT_THEME, 'header-layout', '<div data-childviews="header" class="header"></div>');
/**
 *
 * @module M.HeaderLayout
 * @type {*}
 * @extends M.Layout
 */
M.HeaderLayout = M.Layout.extend({

    _type: 'header-layout',

    template: M.Themes.getTemplateByName('header-layout'),

    applyViews: function( settings ) {


        var ident = 'header';

        if(!this.childViews[ident] && settings.header){
            this.addChildView(ident, settings.header);
        }

        if( settings.header && !this._firstRender ) {
            this.$el.find('[data-childviews="' + ident + '"]').html('');
            this.$el.find('[data-childviews="' + ident + '"]').html(settings.header.render().$el);
        }

        return this;
    }

});