
M.Themes.registerTemplateForTheme( M.Themes.DEFAULT_THEME, 'bottom-bar-layout', '<div class="bottom-bar"></div>' );
/**
 *
 * @module M.BottomBarLayout
 * @type {*}
 * @extends M.Layout
 */
M.BottomBarLayout = M.Layout.extend({

    _type: 'bottom-bar-layout',

    template: M.Themes.getTemplateByName('bottom-bar-layout')
});