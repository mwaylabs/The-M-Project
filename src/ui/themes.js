// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * @module M.Themes
 * @type {*}
 * @extends M.Object
 */
M.Themes = M.Object.design({
    DEFAULT_THEME: 'basic',

    basic: {},

    _currentThemeName: 'basic',

    _themes: {},

    registerTemplateForTheme: function (themeName, templateName, template, override) {
        override = override || false;

        var theme = this._getThemeByName(themeName);
        if (!theme) {
            this._createThemeWithName(themeName);
        }

        var exists = this._getTemplateByNameForTheme(themeName, templateName) !== '';
        if (!exists || override) {
            this._themes[ themeName ][ templateName ] = template;
            return true;
        }

        console.warn('Template "' + templateName + '" already defined for theme "' + themeName + '"');
        return false;
    },

    getTemplateByName: function (templateName) {

        var template = this.getTemplateByNameForTheme(this._currentThemeName, templateName);
        if (template === '' && this._currentThemeName !== this.DEFAULT_THEME) {
            console.log('Template "' + templateName + '" not defined for theme "' + this._currentThemeName + '", switched to default theme "' + this.DEFAULT_THEME + '"');
            template = this.getTemplateByNameForTheme(this.DEFAULT_THEME, templateName);
        }
        return template;
    },

    getTemplateByNameForTheme: function (themeName, templateName) {
        var template = this._getTemplateByNameForTheme(themeName, templateName);
        if (template) {
            return template;
        }
        console.warn('Template "' + templateName + '" not defined for theme "' + themeName + '"');
        return '';
    },

    _getTemplateByNameForTheme: function (themeName, templateName) {
        var theme = this._getThemeByName(themeName);
        if (theme && theme[templateName]) {
            return theme[templateName];
        }
        return '';
    },

    _createThemeWithName: function (name) {
        this._themes[ name ] = {};
    },

    _getThemeByName: function (name) {
        if (this._themes[ name ]) {
            return this._themes[ name ];
        }
        return null;
    }
});
