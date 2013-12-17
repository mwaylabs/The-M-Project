// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * M.MenuView inherits from M.View.
 * To add childViews to this view name it 'menu-content'
 * @module M.MenuView
 *
 * @type {*}
 * @extends M.View
 * @example
 * var menu = M.MenuView.extend({},{
        'menu-content': M.View.extend({},{
            b1 : M.ButtonView.extend({value:'b1'}),
            b2 : M.ButtonView.extend({value:'b2'})
        })
    }).create().render()
 *
 */
M.MenuView = M.MovableView.extend({

    /**
     * The type of the object
     * @private
     */
    _type: 'M.MenuView',

    /**
     * The template of the object before initializing it.
     * @private
     */
    _template: _.tmpl(M.TemplateManager.get('M.MenuView')),

    /**
     * The most left position of the menu
     */
    leftEdge: 0,

    /**
     * The most right position of the menu
     */
    rightEdge: null,

    /**
     * The Backdrop dom representation
     * @type {jQuery DOM Object}
     */
    _$backdrop: null,

    /**
     * The 'padding' of the element that listens to the drag from outside the device
     */
    _deviceSwipeListenerWidth: 0,

    /**
     * Timeout to fade out the menu.
     */
    _transitionTimeout: null,


    /**
     * basic css class is on-left to start on the left side
     */
    _internalCssClasses: 'on-left',

    /**
     * calculate the leftEdge and rightEdge vars
     */
    initialize: function() {
        this._deviceSwipeListenerWidth = parseInt(M.ThemeVars.get('m-menu-view-device-swipe-listener-width'), 10);
        this.leftEdge = this.leftEdge || 0;
        this.rightEdge = this.rightEdge || parseInt(M.ThemeVars.get('m-menu-view-width'), 10) - this._deviceSwipeListenerWidth;
        M.MovableView.prototype.initialize.apply(this, arguments);
    },

    _postRender: function() {
        this._$backdrop = this.$el.find('.movable-backdrop');
        M.MovableView.prototype._postRender.apply(this, arguments);
    },

    /**
     * Animate the moveable to the left
     * Add background to the element.
     */
    toLeft: function() {
        //copy of the prototype:
        this._setDimensions();
        this.$el.removeClass('on-right');
        this.$el.addClass('on-left');
        this._resetInlineCss();
        this._lastPos.x = 0;

        // add backdrop functionality
        this._$backdrop.removeClass('in');
        this._$backdrop.css('opacity', '0');
        var that = this;
        window.clearTimeout(this._transitionTimeout);
        var animationDuration = parseInt(M.ThemeVars.get('m-menu-transition'), 10);
        this._transitionTimeout = setTimeout(function() {
            that.$el.removeClass('on-move');
        }, animationDuration);
    },

    /**
     * Animate the movable to the right.
     * Add background to the element.
     */
    toRight: function() {
        M.MovableView.prototype.toRight.apply(this, arguments);
        this._$backdrop.addClass('in');
        this._$backdrop.css('opacity', '0.8');
    },

    /**
     * Applies the css to the movable element with background
     * @param position
     * @private
     */
    _setCss: function( position ) {
        M.MovableView.prototype._setCss.apply(this, arguments);
        var opacity = (parseInt(10 - (this.rightEdge / position.x), 10) / 10);
        if( opacity < 0 ) {
            opacity = 0;
        }
        if( opacity > 1 ) {
            opacity = 1;
        }
        this._$backdrop.css('opacity', opacity);
    },

    /**
     * Returns the complete DOM node to be swipeable.
     * @returns {$el|*}
     * @private
     */
    _getMovableContent: function() {
        return this.$el.find('.movable-container');
    },

    /**
     * Get called on every touch move of the moveable element. Calculates the position of the element and calls the move method to the calculated points
     * @param event
     * @private
     */
    _drag: function() {
        M.MovableView.prototype._drag.apply(this, arguments);
        window.clearTimeout(this._transitionTimeout);
    }
});