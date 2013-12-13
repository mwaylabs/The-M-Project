// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * M.MenuView inherits from M.View
 * @module M.MenuView
 *
 * @type {*}
 * @extends M.View
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
     * overwrite the default duration
     */
    duration: 500,

    /**
     * The 'padding' of the element that listens to the drag from outside the device
     */
    _deviceSwipeListenerWidth: 0,

    /**
     * The moveable icon
     * @type {String}
     */
    icon: 'fa-align-justify',

    cssClass: 'on-left',

    /**
     * calculate the leftEdge and rightEdge vars
     */
    initialize: function() {
        this._deviceSwipeListenerWidth = parseInt(M.ThemeVars.get('m-menu-view-device-swipe-listener-width'), 10);
        this.leftEdge = 0;//(parseInt(M.ThemeVars.get('m-menu-view-width'), 10) - this._deviceSwipeListenerWidth) * -1;
        this.rightEdge = parseInt(M.ThemeVars.get('m-menu-view-width'), 10) - this._deviceSwipeListenerWidth;
        M.MovableView.prototype.initialize.apply(this, arguments);
    },


    /**
     * Different calculation to find the middle of the swipe to decide if to close or open the menu
     */
    onRelease: function() {
        if( this._currentPos.direction === Hammer.DIRECTION_LEFT ) {
            this.toLeft();
        } else {
            this.toRight();
        }
    },

    /**
     * Returns the complete DOM node to be swipeable.
     * @returns {$el|*}
     * @private
     */
    _getMovableContent: function() {
        return this.$el.find('.movable-container');
    },

    _assignTemplateValues: function() {
        M.MovableView.prototype._assignTemplateValues.apply(this, arguments);
        this._templateValues.icon = this.icon || '';
    }
});