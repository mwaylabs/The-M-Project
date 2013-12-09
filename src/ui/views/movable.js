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
    _template: _.tmpl(M.TemplateManager.get('M.MovableView')),

    leftEdge: 0,

    rightEdge: null,

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
        deltaY: 0
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
        deltaY: 0
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
     * Drag and TouchEnd are registered for the Movable-Element
     * @type {Object}
     * @private
     */
    _internalEvents: {
        drag: function( event, element ) {
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
     * Determines if there is a current animation
     * @private
     */
    _isAnimating: NO,

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
        // move the element
        this._move(position);
    },

    /**
     * /**
     * Get called on every touchend / after every drag to store the last point of the element for further calculations on the next drag start.
     * @private
     */
    _touchEnd: function( event ) {
        // cache the dimensions of the view
        this._setDimensions();

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
     * Gets called after the user stops interacting with the movable
     */
    onRelease: function(){
        if( this._currentPos.x > (this._containerWidth / 2 ) - (this._movableWidth / 2) ) {
            this.toRight();
        } else {
            this.toLeft();
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
            'stop_browser_behavior': true
        };
    },


    /**
     * Cache the dimensions of the elements
     * @private
     */
    _setDimensions: function() {
        // if they are not stored
        if( !this._movableWidth || !this._containerWidth ) {
            // get the outer width of the moveable
            this._movableWidth = this.$el.find('.movable-element').outerWidth();
            // get the outer width of the container
            this._containerWidth = this.$el.outerWidth();
        }

        if(this.rightEdge === null){
            this.rightEdge =  this._containerWidth - this._movableWidth;
        }
    },


    /**
     * Moves the element. The best performance on old devices is with position absolute and setting the left and top property
     * @param position
     * @private
     */
    _move: function( position ) {
        // not that good on old devices
        //this.$el.find('.movable-element').css('-webkit-transform', ' matrix(1, 0, 0, 1, ' + position.x + ', 0)');
        // good for old devices
        this.$el.find('.movable-element').css('left', position.x + 'px');
        // if there is a position cache it
        if( position ) {
            this._currentPos = position;
        }
    },

    /**
     * Move the movable with an animation
     * @param options
     * @private
     */
    _animatedMove: function( options ) {
        if( this._isAnimating ) {
            return;
        }
        var that = this;
        that._isAnimating = YES;
        this.$el.find('.movable-element').animate({
            left: options.x + 'px'
        }, options.duration, function() {
            that._isAnimating = NO;
            that._currentPos.x = options.x;
        });


    },

    /**
     * Move the element on the x axis to the position defined in the param.
     * @param {Number}
     */
    moveX: function( xPos, duration ) {
        if( _.isNumber(xPos) ) {
            if( _.isNumber(duration) ) {
                this._animatedMove({
                    x: xPos,
                    duration: duration
                });
            } else {
                this._move({
                    x: xPos
                });
            }

        }
    },

    /**
     * Animate the moveable to the left
     */
    toLeft: function() {
        this._setDimensions();
        this.moveX(this.leftEdge, 1000);
    },

    /**
     * Animate the moveable to the right
     */
    toRight: function() {
        this._setDimensions();
        this.moveX(this.rightEdge, 1000);
    },

    /**
     * Toggle between left and right animation
     */
    toggle: function() {
        if( this._currentPos.x <= this.leftEdge ) {
            this.toRight();
        } else {
            this.toLeft();

        }
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