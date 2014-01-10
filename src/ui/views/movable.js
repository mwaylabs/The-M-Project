// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * M.MovableView inherits from M.View
 * @module M.MovableView
 *
 * @type {*}
 * @extends M.View
 */
M.MovableView = M.View.extend({

    /**
     * The type of the object
     * @private
     */
    _type: 'M.MovableView',

    /**
     * The template of the object before initializing it.
     * @private
     */
    _templateString: M.TemplateManager.get('movable.ejs'),

    leftEdge: 0,

    duration: 1000,

    /**
     * The right border to stop the moveable item
     */
    rightEdge: null,

    /**
     * The right border to stop the moveable item used internal
     */
    _rightEdge: null,


    /**
     * Save the last position of the moveable element after the user releases the moveable element
     * x: the x position absolute to the window
     * y: the y position absolute to the window
     * deltay: the difference from the draging startpoint on the x axis
     * deltaY: the difference from the draging startpoint on the y axis
     * @type {Object}
     * @private
     */
    _lastPos: {
        x: 0,
        y: 0,
        deltaX: 0,
        deltaY: 0,
        direction: ''
    },

    /**
     * Save the current position for every move of the moveable element
     * x: the x position absolute to the window
     * y: the y position absolute to the window
     * deltay: the difference from the draging startpoint on the x axis
     * deltaY: the difference from the draging startpoint on the y axis
     * @type {Object}
     * @private
     */
    _currentPos: {
        x: 0,
        y: 0,
        deltaX: 0,
        deltaY: 0,
        direction: ''
    },

    /**
     * The widht of the moveable item. To calculate the edge of the moveable element
     * @type {Number|String}
     * @private
     */
    _movableWidth: null,

    /**
     * The width of the container. To calculate the edge of the moveable element
     * @type {Number|String}
     * @private
     */

    _containerWidth: null,

    /**
     * DOM that should be moved
     * @type {jQuery DOM Object}
     */
    _$movableContent: null,

    /**
     * Determines if there is a current animation
     * @private
     */
    _isAnimating: NO,

    initialize: function() {
        M.View.prototype.initialize.apply(this, arguments);
        this.leftEdge = this.leftEdge || 0;
        // if the right edge was defined by the user set it, otherwise initialize it in _setDimensions
    },

    _postRender: function() {
        M.View.prototype._postRender.apply(this, arguments);
        this._$movableContent = this._getMovableContent();
    },

    _getsVisible: function() {
        M.View.prototype._getsVisible.apply(this, arguments);
        this.toLeft();
        this.setDimensions();
    },

    /**
     * Drag and TouchEnd are registered for the Movable-Element
     * @type {Object}
     * @private
     */
    _internalEvents: {
        dragright: function( event, element ) {
            // call the drag method of M.MovableView
            element._drag(event, element);
        },

        dragleft: function( event, element ) {
            // call the drag method of M.MovableView
            element._drag(event, element);
        },

        touchend: function( event, element ) {
            // call the touchend method of M.MovableView
            element._touchEnd(event, element);
        },

        mouseup: function( event, element ) {
            // call the touchend method of M.MovableView
            element._touchEnd(event, element);
        }
    },

    /**
     * Get called on every touch move of the moveable element. Calculates the position of the element and calls the move method to the calculated points
     * @param event
     * @private
     */
    _drag: function( event ) {
        var position = {};
        // the last position of the last touchend added with the current moved distance
        position.x = this._lastPos.x + event.gesture.deltaX;
        // cache the delta
        position.deltaX = event.gesture.deltaX;
        position.direction = this._currentPos.deltaX > event.gesture.deltaX ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT;
        // move the element
        this._move(position);
    },

    /**
     * /**
     * Get called on every touchend / after every drag to store the last point of the element for further calculations on the next drag start.
     * @private
     */
    _touchEnd: function( event, element ) {

        if( event.target !== this._$movableContent[0] && !this.$el.hasClass('on-move') ) {
            return;
        }

        // check the boundaries
        if( this._currentPos.x < this.leftEdge ) {
            // set the left edge of the element to the left edge of the container
            this._currentPos.x = this.leftEdge;
        } else if( this._containerWidth < this._currentPos.x + this._movableWidth ) {
            // set the right edge of the element to the right edge of the container
            this._currentPos.x = this._containerWidth - this._movableWidth;
        }

        // cache the current position. The view needs this to calculate further drags
        this._lastPos = this._currentPos;
        // move the element to the position so it can't get lost out of the boundaries.
        this.onRelease();
    },

    /**
     * Move the movable Element to the left or right on release according to the direction. Overwrite this to enable a different behavior
     */
    onRelease: function() {
        if( this._currentPos.direction === Hammer.DIRECTION_LEFT ) {
            this.toLeft();
        } else {
            this.toRight();
        }
    },

    /**
     * Overwrite the default hammer configuration. This needs to be done to get a constant move tracking on the drag event
     * @returns {{prevent_default: boolean, no_mouseevents: boolean, stop_browser_behavior: boolean}}
     * @private
     */
    _getEventOptions: function() {
        return {
            'prevent_default': true,
            'no_mouseevents': true,
            'stop_browser_behavior': {
                // this also triggers onselectstart=false for IE
                userSelect: 'none',
                // this makes the element blocking in IE10 >, you could experiment with the value
                // see for more options this issue; https://github.com/EightMedia/hammer.js/issues/241
                touchAction: 'none',
                touchCallout: 'none',
                contentZooming: 'none',
                userDrag: 'none'
            }
        };
    },


    /**
     * Cache the dimensions of the elements
     * @private
     */
    setDimensions: function() {
        // get the outer width of the moveable
        this._movableWidth = this._$movableContent.outerWidth();
        // get the outer width of the container
        this._containerWidth = this.$el.outerWidth();
        //default is the with of the outer object minus the moveable part
        this._rightEdge = this.rightEdge || this._containerWidth - this._movableWidth;
    },

    /**
     * Returns the element that should be animated
     * @returns {*|Cursor|Mixed}
     * @private
     */
    _getMovableContent: function() {
        return this.$el.find('.movable-element');
    },

    /**
     * Moves the element. The best performance on old devices is with position absolute and setting the left and top property
     * @param position
     * @private
     */
    _move: function( position ) {
        var pos = parseInt(position.x, 10);

        if( pos > this._rightEdge ) {
            return;
        }
        if( pos < this.leftEdge ) {
            return;
        }

        this._removeCssClasses();
        this.$el.addClass('on-move');
        this._setCss(position);

        // if there is a position cache it
        if( position ) {
            this._currentPos = position;
        }
    },

    /**
     * Animate the moveable to the left
     */
    toLeft: function() {
        this.$el.removeClass('on-right');
        this.$el.addClass('on-left');
        this._resetInlineCss();
        this._lastPos.x = this.leftEdge;
        this._setCss({
            x: this._lastPos.x
        });

    },

    /**
     * Animate the movable to the right
     */
    toRight: function() {
        this.$el.addClass('on-right');
        this.$el.removeClass('on-left');
        this.$el.removeClass('on-move');
        this._resetInlineCss();
        this._lastPos.x = this._rightEdge;
        this._setCss({
            x: this._lastPos.x
        });
    },


    /**
     * Toggle between left and right animation
     */
    toggle: function() {
        if( this.$el.hasClass('on-left') ) {
            this.toRight();
        } else {
            this.toLeft();
        }
        return this;
    },


    /**
     * Applies the css to the movable element
     * @param position
     * @private
     */
    _setCss: function( position ) {
        if( position && position.x && typeof position.x !== 'undefined' ) {
            var pos = parseInt(position.x, 10);
            if( !isNaN(pos) ) {
                this._$movableContent.css('-webkit-transform', 'translate3d(' + pos + 'px, 0, 0)');
                this._$movableContent.css('-moz-transform', 'translate3d(' + pos + 'px, 0, 0)');
                this._$movableContent.css('transform', 'translate3d(' + pos + 'px, 0, 0)');
                return this;
            }
        }
        return void 0;

    },

    /**
     * Removes all css classes set by itself
     * @private
     */
    _removeCssClasses: function() {
        this.$el.removeClass('to-left');
        this.$el.removeClass('to-right');
        this.$el.removeClass('on-move');
    },

    /**
     * Removes all inline styles. Done because it was the easiest way to remove the transform of the move
     * @param position
     * @private
     */
    _resetInlineCss: function( position ) {
        this._$movableContent.attr('style', '');
    },

    /**
     * This function needs to be implemented to render the view if there is no value given
     * @returns {Boolean|Function|YES}
     * @private
     */
    _attachToDom: function() {
        return YES;
    }


});