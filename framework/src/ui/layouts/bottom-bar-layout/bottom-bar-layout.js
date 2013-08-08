//
M.Themes.registerTemplateForTheme( M.Themes.DEFAULT_THEME, 'bottom-bar-layout', '<div class="bottom-bar"></div>' );

M.BottomBarLayout = M.Layout.extend({

    _type: 'bottom-bar-layout',

    template: M.Themes.getTemplateByName('bottom-bar-layout')
});