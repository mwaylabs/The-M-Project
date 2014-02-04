// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * @module M.Layout
 * @type {*}
 * @extends M.View
 */
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

    template: '<div></div>',

    childViews: {},

    applyViews: function() {
        this._getsVisible();
    },

    _attachToDom: function() {
        return YES;
    },

    setTransition: function( name ) {
        M.PageTransitions.setTransition( name );
    },

    startTransition: function() {
        M.PageTransitions.startTransition();
        this._getsVisible();
    },

    isAnimating: function() {
        return M.PageTransitions.isAnimating();
    },

    destroy: function() {
        this.$el.remove();
        this.$el = null;
        this.childViews = null;
        M.PageTransitions.reset();
    },

    _internalEvents: {
        dragdown: function( event, element ) {
            // call the drag method of M.MovableView
            console.log('dragdown');
            element._drag(event, element);
        },

        dragup: function( event, element ) {
            // call the drag method of M.MovableView
            console.log('dragup');
            element._drag(event, element);
        },

        touchend: function( event, element ) {
            // call the touchend method of M.MovableView
            console.log('touchend');
            element._touchEnd(event, element);
        },

        mouseup: function( event, element ) {
            // call the touchend method of M.MovableView
            console.log('mouseup');
            element._touchEnd(event, element);
        }
    },
    _move: function( position ) {
        var pos = parseInt(position.y, 10);

        this._removeCssClasses();
        this.$el.addClass('on-move');
        this._setCss(position);

        // if there is a position cache it
        if( position ) {
            this._currentPos = position;
        }
    },

//    _getMovableContent: function() {
//
//        return this._getChildView(this._currentPage).$el;
//    },
    _setCss: function( position ) {
        this._$movableContent = this._getChildView(this._currentPage).$el;

        if( position && typeof position.y !== 'undefined' ) {
            var pos = parseInt(position.y, 10);
            console.log(pos);
            if( !isNaN(pos) ) {
                this._$movableContent.css('-webkit-transform', 'translate3d(0,' + pos + 'px, 0)');
                this._$movableContent.css('-moz-transform', 'translate3d(0,' + pos + 'px, 0)');
                this._$movableContent.css('transform', 'translate3d(0,' + pos + 'px, 0)');
                return this;
            }
        }
        return void 0;
    },
    _touchEnd: function( event, element ) {

        if( event.target !== this._$movableContent[0] && !this.$el.hasClass('on-move') ) {
            return;
        }

        // check the boundaries
//        if( this._currentPos.x < this.leftEdge ) {
//            // set the left edge of the element to the left edge of the container
//            this._currentPos.x = this.leftEdge;
//        } else if( this._containerWidth < this._currentPos.x + this._movableWidth ) {
//            // set the right edge of the element to the right edge of the container
//            this._currentPos.x = this._containerWidth - this._movableWidth;
//        }

        // cache the current position. The view needs this to calculate further drags
        this._lastPos = this._currentPos;

        this._currentPos.direction = '';
    }
});