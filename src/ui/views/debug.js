// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.DebugView
 *
 * @type {*}
 * @extends M.View
 */
M.DebugView = M.View.extend({

    _type: 'M.DebugView',

    _templateString: M.TemplateManager.get('debug.ejs'),

    _debugViewIsHidden: YES,

    cssClass: 'bg',

    useAsScope: YES,

    initialize: function() {
        M.View.prototype.initialize.apply(this, arguments);
        this._addShakeEvent();
    },

    hide: function() {
        this._debugViewIsHidden = YES;
        this.$el.hide();
    },

    show: function() {
        if( this._firstRender ) {
            $('body').append(this.render().$el);
        }
        this._debugViewIsHidden = NO;
        this.$el.show();
    },

    toggle: function() {
        if( this._debugViewIsHidden ) {
            this.show();
        } else {
            this.hide();
        }
    },

    toggleGrid: function() {
        this.$el.toggleClass('bg');
        this.childViews['debug-grid'].$el.toggle();
    },

    androidLightTheme: function() {
        this.resetTheme();
        $('html').addClass('android-light');
    },

    iosTheme: function() {
        this.resetTheme();
        $('html').addClass('ios');
    },

    resetTheme: function() {
        $('html').removeClass('android').removeClass('android-light').removeClass('android-dark').removeClass('ios');
    },

    _addShakeEvent: function() {
        var that = this;
        window.addEventListener('shake', function() {
            that.toggle();
        }, false);
    }
}, {
    'debug-menu': M.ButtonGroupView.extend({
        cssClass: 'debug-menu'
    }, {
        toggleGrid: M.ButtonView.extend({
            value: 'Toggle grid',
            events: {
                tap: 'toggleGrid'
            }
        }),

        androidLight: M.ButtonView.extend({
            value: 'android-light theme',
            events: {
                tap: 'androidLightTheme'
            }
        }),

        ios: M.ButtonView.extend({
            value: 'ios theme',
            events: {
                tap: 'iosTheme'
            }
        }),

        reset: M.ButtonView.extend({
            value: 'reset theme',
            events: {
                tap: 'resetTheme'
            }
        })
    }),

    'debug-grid': M.View.extend({
        useElement: YES,
        template: (function() {
            var tpl = '<div class="debug-container"><div class="debug-grid col-xs-12"><div class="row">';
            for( var i = 0; i < 12; i++ ) {
                tpl += '<div class="col-xs-1"><div class="inner"></div></div>';
            }
            tpl += '</div></div></div>';
            return tpl;
        })()
    })
});