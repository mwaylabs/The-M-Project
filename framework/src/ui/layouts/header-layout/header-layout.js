

M.Themes.registerTemplateForTheme( M.Themes.DEFAULT_THEME, 'header-layout', '<div class="header"></div>' );

M.HeaderLayout = M.Layout.extend({

    _type: 'header-layout',

    template: M.Themes.getTemplateByName('header-layout')
});