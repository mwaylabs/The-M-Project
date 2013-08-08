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

M.Layout = Backbone.Layout.extend(/** @scope M.Layout.prototype */{

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

    template: '<div></div>',

    applyViews: function(){

    }

});




//    /**
//     * This method sets the layout's content.
//     *
//     * @param obj
//     * @private
//     */
//    _setContent: function( obj ) {
//        this.$el.empty().append(obj.view.render().el);
//        return;
//        this.$el.children().eq(this.currentChildIndex + 1).append(obj.view.render().el);
//
//        if( !this.first ) {
//            this._next();
//        }
//        this.first = false;
//    },
//
//    /**
//     * This method returns the basic layout markup that provides the skeleton
//     * for the views/content that will be displayed inside that layout.
//     *
//     * This basic implementation of M.Layout won't provide any markup. This is
//     * the job of each concrete layout implementation.
//     *
//     * @returns {String}
//     * @private
//     */
//    _generateMarkup: function() {
//        return '';
//    },
//
//    currentChildIndex: 0,
//
//    $pages: null,
//
//    totalChildren: null,
//
//    isAnimating: NO,
//
//    endCurrPage: NO,
//
//    endNextPage: NO,
//
//    first: YES,
//
//    animEndEventNames: {
//        'WebkitAnimation': 'webkitAnimationEnd',
//        'OAnimation': 'oAnimationEnd',
//        'msAnimation': 'MSAnimationEnd',
//        'animation': 'animationend'
//    },
//
//    animEndEventName: null,
//
//    initialize: function() {
//        this.$pages = this.$el.children('div');
//        this.totalChildren = this.$pages.length;
//        this.animEndEventName = this.animEndEventNames['WebkitAnimation'];
//        this.currentChildIndex = -1;
//        M.View.prototype.initialize.apply(this, arguments);
//    },
//
//
//    resetPage: function( $outpage, $inpage ) {
//        $outpage.attr('class', $outpage.data('originalClassList'));
//        $inpage.attr('class', $inpage.data('originalClassList') + ' m-page-current');
//        $('.m-perspective').removeClass('m-perspective-transitioning');
//    },
//
//    onEndAnimation: function( $outpage, $inpage ) {
//        this.endCurrPage = false;
//        this.endNextPage = false;
//        this.resetPage($outpage, $inpage);
//        this.isAnimating = false;
//    },
//
//    _next: function( animation ) {
//        if( this.isAnimating ) {
//            return false;
//        }
//
//        if(!animation){
//            animation = 1;
//        }
//
//        this.isAnimating = true;
//        this.$el.addClass('m-perspective-transitioning');
//
//        if( this.currentChildIndex < this.totalChildren - 1 ) {
//            this.currentChildIndex += 1;
//        } else {
//            this.currentChildIndex = 0;
//        }
//
//        var $currPage = this.$pages.eq(this.currentChildIndex);
//
//        var $nextPage = this.$pages.eq(this.currentChildIndex).addClass('m-page-current');
//        var outClass = '';
//        var inClass = '';
//
//        switch( animation ) {
//
//            case 1:
//                outClass = 'm-page-move-to-left';
//                inClass = 'm-page-move-from-right';
//
//                break;
//            case 2:
//                outClass = 'm-page-move-to-right';
//                inClass = 'm-page-move-from-left';
//                break;
//        }
//
//        var that = this;
//
//        setTimeout(function() {
//            $currPage.addClass(outClass).on(that.animEndEventName, function() {
//                $currPage.off(that.animEndEventName);
//                that.endCurrPage = true;
//                if( that.endNextPage ) {
//                    that.onEndAnimation($currPage, $nextPage);
//                }
//            });
//
//            $nextPage.addClass(inClass).on(that.animEndEventName, function() {
//                $nextPage.off(that.animEndEventName);
//                that.endNextPage = true;
//                if( that.endCurrPage ) {
//                    that.onEndAnimation($currPage, $nextPage);
//                }
//            });
//
//        }, 0)
//    }
//
//});