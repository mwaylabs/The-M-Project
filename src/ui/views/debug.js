/**
 * @module M.DebugView
 *
 * @type {*}
 * @extends M.View
 */
M.DebugView = M.View.extend({

    _type: 'M.DebugView',
    _template: _.tmpl(M.TemplateManager.get('M.DebugView')),

    useAsScope: YES,

    toggleGrid: function () {
        this.childViews['debug-grid'].$el.toggle();
    },

    androidLightTheme: function(){
        this.resetTheme();
        $('html').addClass('android-light');
    },

    iosTheme: function(){
        this.resetTheme();
        $('html').addClass('ios');
    },

    resetTheme: function(){
        $('html').removeClass('android').removeClass('android-light').removeClass('android-dark').removeClass('ios');
    },

    hideDebug: function(){
        window[M.APPLICATION_NAME].hideDebug();
    }

}, {
    'debug-menu': M.View.extend({
        grid: 'row',
        cssClass: 'debug-menu'
    }, {
        toggleGrid: M.ButtonView.extend({
            value: 'toggle grid',
            grid: 'col-xs-2',
            events: {
                tap: 'toggleGrid'
            }
        }),

        androidLight: M.ButtonView.extend({
            value: 'android-light theme',
            grid: 'col-xs-2',
            events: {
                tap: 'androidLightTheme'
            }
        }),

        ios: M.ButtonView.extend({
            value: 'ios theme',
            grid: 'col-xs-2',
            events: {
                tap: 'iosTheme'
            }
        }),

        reset: M.ButtonView.extend({
            value: 'reset theme',
            grid: 'col-xs-2',
            events: {
                tap: 'resetTheme'
            }
        }),

        hide: M.ButtonView.extend({
            value: 'hide debug',
            grid: 'col-xs-2',
            events: {
                tap: 'hideDebug'
            }
        })

    }),

    'debug-grid': M.View.extend({
        useElement: YES,
        template: '<div class="debug-container"><div class="container debug-grid"><div class="row"> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> </div></div></div>'
    })
});