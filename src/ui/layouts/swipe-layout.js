// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt


//TODO do this in good
var template = $('<div class="wrap"> <div class="left-panel firstLeft"> <div class="action-menu-close"></div> <div class="content"></div> </div> <div class="right-panel"> <div class="content"></div> </div> </div>');
template.find('.right-panel').before(M.SwitchLayout.prototype.template);

M.Themes.registerTemplateForTheme( M.Themes.DEFAULT_THEME, 'swipe-layout', template );
/**
 *
 * @module M.SwipeLayout
 * @type {*}
 * @extends M.SwitchLayout
 */
M.SwipeLayout = M.SwitchLayout.extend({

    _type: 'M.SwipeLayout',

    template: M.Themes.getTemplateByName('swipe-layout'),

    leftPanelIsOpen: null,

    rightThreshold: null,

    initialize: function() {
        M.SwitchLayout.prototype.initialize.call(this);

        var w = $(window).width();
        this.rightThreshold = (w / 100) * 80;
    },

    toggleRightPanel: function() {
        this.closeLeftPanel();
        $('.right-panel').toggleClass('show');
    },

    closeRightPanel: function() {
        $('.right-panel').removeClass('show');
    },

    toggleLeftPanel: function() {
        this.closeRightPanel();
        if( this.leftPanelIsOpen ) {
            this.closeLeftPanel();
        } else {
            this.openLeftPanel();
        }
    },

    startMoveLeftPanel: function( evt ) {
        if( !evt || !evt.originalEvent ) {
            return;
        }
        evt.stopPropagation();
        evt.preventDefault();
        var touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];

        if( this.leftPanelIsOpen ) {
            this.moveStart = 0;
        } else {
            this.moveStart = touch.pageX;
        }
    },

    stopMoveLeftPanel: function( evt ) {
        evt.stopPropagation();
        evt.preventDefault();
        $('#m-main').addClass('easing');

        if( this.leftPanelIsOpen ) {
            this.closeLeftPanel();
        } else {
            this.openLeftPanel();
        }

        setTimeout(function() {
            $('#m-main').removeClass('easing');
        }, 500);

    },

    moveLeftPanel: function( evt ) {
        //                if(!evt || !evt.originalEvent){
        //                    return;
        //                }
        //                evt.stopPropagation();
        //                evt.preventDefault();
        var touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];

        var diff = touch.pageX - this.moveStart;
        if( diff <= 0 ) {
            diff = 0;
        } else if( diff >= this.rightThreshold ) {
            diff = this.rightThreshold;
        } else {
            $('#m-main').css('-webkit-transform', 'translate3d(' + diff + 'px, 0, 0)');
        }

        //        -webkit-transform: translate3d(80%, 0, 0);
        //        -moz-transform: translate3d(80%, 0, 0);
        //        -ms-transform: translate3d(80%, 0, 0);
        //        -o-transform: translate3d(80%, 0, 0);
        //        transform: translate3d(80%, 0, 0);
    },

    closeLeftPanel: function() {
        //$('.os-bb10 .template-bottom, .os-bb10 .template-right').css('-webkit-transform', 'translate3d(' + 0 + 'px, 0, 0)');
        $('#m-main').css('-webkit-transform', 'translate3d(' + 0 + 'px, 0, 0)');
        this.leftPanelIsOpen = false;
    },

    openLeftPanel: function() {
        $('#m-main').css('-webkit-transform', 'translate3d(' + this.rightThreshold + 'px, 0, 0)');
        this.leftPanelIsOpen = true;
    }
});
