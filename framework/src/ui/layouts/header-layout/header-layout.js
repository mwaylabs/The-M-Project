

M.Themes.registerTemplateForTheme( M.Themes.DEFAULT_THEME, 'header-layout', '<div data-childviews="header" class="header"></div>' );

M.HeaderLayout = M.Layout.extend({

    _type: 'header-layout',

    template: M.Themes.getTemplateByName('header-layout')
});