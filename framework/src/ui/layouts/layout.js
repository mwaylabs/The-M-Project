// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      07.05.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 * @extends M.View
 */

M.Themes = M.Object.extend({
    DEFAULT_THEME: 'basic',

    basic: {},

    _currentThemeName: 'basic',

    _themes: {},

    registerTemplateForTheme: function( themeName, templateName, template, override ) {
        override = override || false;

        var theme = this._getThemeByName(themeName);
        if( !theme ) {
            this._createThemeWithName( themeName );
        }

        var exists = this._getTemplateByNameForTheme(themeName, templateName) !== '';
        if( !exists || override ) {
            this._themes[ themeName ][ templateName ] = template;
            return true;
        }

        console.warn('Template "' + templateName + '" already defined for theme "' + themeName + '"');
        return false;
    },

    getTemplateByName: function( templateName ) {

        var template = this.getTemplateByNameForTheme(this._currentThemeName, templateName);
        if( template == '' && this._currentThemeName != this.DEFAULT_THEME) {
            console.log( 'Template "' + templateName + '" not defined for theme "' + this._currentThemeName + '", switched to default theme "' + this.DEFAULT_THEME + '"');
            template = this.getTemplateByNameForTheme(this.DEFAULT_THEME, templateName);
        }
        return template;
    },

    getTemplateByNameForTheme: function( themeName, templateName ) {
        var template = this._getTemplateByNameForTheme(themeName, templateName);
        if( template ) {
            return template;
        }
        console.warn( 'Template "' + templateName + '" not defined for theme "' + themeName + '"');
        return '';
    },

    _getTemplateByNameForTheme: function( themeName, templateName ) {
        var theme = this._getThemeByName(themeName);
        if( theme && theme[templateName] ) {
            return theme[templateName];
        }
        return '';
    },

    _createThemeWithName: function( name ) {
        this._themes[ name ] = {};
    },

    _getThemeByName: function( name ) {
        if(this._themes[ name ]) {
            return this._themes[ name ];
        }
        return null;
    }
});

M.Layout = M.View.extend(/** @scope M.Layout.prototype */{

    //el: $(".m-perspective"),

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.Layout',

    /**
     * This property is used to identify M.Layout and all of its derived object
     * as layouts.
     *
     * @type Boolean
     */
    isMLayout: YES,

    template: '<div></div>'

});