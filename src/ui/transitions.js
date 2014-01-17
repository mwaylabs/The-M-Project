// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

// Thanks to: https://github.com/codrops/PageTransitions

/**
 *
 * @module M.PageTransitions
 * @type {*}
 * @extends M.Object
 */
M.Transitions = function( options ) {
    this.options = options || {};
    if( _.isFunction(this.initialize) ) {
        this.initialize(this.options);
    }
};

M.Transitions.extend = M.extend;
M.Transitions.create = M.create;
M.Transitions.design = M.design;

_.extend(M.Transitions.prototype, {

    _isAnimating: false,
    _current: 0,
    _pagesCount: 0,
    _$pages: null,
    _$wrapper: null,
    _transitionName: '',
    _animEndEventName: 'webkitAnimationEnd',

    initialize: function( view ) {

        if( view.transition ) {
            this._transitionName = view.transition;
        } else {
            this._transitionName = M.Transitions.CONST.MOVE_TO_LEFT_FROM_RIGHT;
        }

        this.$view = view;
        this.setActivePage();
    },

    destroy: function() {
        this._isAnimating = false;
        this._current = 0;
        this._pagesCount = 0;
        this._$pages = null;
        this._$wrapper = null;
    },

    setActivePage: function() {
        var that = this;

        this._$pages = this.$view.$el.find('.et-page');
        this._$wrapper = this.$view.$el.find('.et-wrapper');
        this._pagesCount = this._$pages.length;
        this._$pages.each(function() {
            $(this).data('originalClassList', $(this).attr('class'));
        });

        this._$wrapper.each(function() {
            that._$pages.eq(that._current).addClass('et-page-current');
        });

        this._$pages.eq(this._current).addClass('et-page-current');
    },

    animate: function( transitionName, callback ) {

        if( !transitionName ) {
            transitionName = this._transitionName;
        }

        return this.nextPage(this._$wrapper, transitionName, callback);
    },

    nextPage: function( block, transitionName, callback ) {
        var that = this;
        block = $(block);
        var endCurrPage = false, endNextPage = false;

        if( this._isAnimating ) {
            return false;
        }
        this._isAnimating = true;

        var $currPage = this._$pages.eq(this._current);
        if( this._current < this._pagesCount - 1 ) {
            this._current++;
        } else {
            this._current = 0;
        }

        var $nextPage = this._$pages.eq(this._current).addClass('et-page-current');

        if( !M.Animation.animationSupport || transitionName === M.Transitions.CONST.NONE ) {
            this.onEndAnimation($currPage, $nextPage, callback);
            return;
        }

        var transitionClasses = transitionName.split('|');
        var outClass = transitionClasses[0];
        var inClass = transitionClasses[1];
        inClass = this.formatClass(inClass);
        outClass = this.formatClass(outClass);

        $currPage.addClass(outClass).on(this._animEndEventName, function() {
            $currPage.off(that._animEndEventName);
            endCurrPage = true;
            if( endNextPage ) {
                that.onEndAnimation($currPage, $nextPage, callback);
            }
        });

        $nextPage.addClass(inClass).on(this._animEndEventName, function() {
            $nextPage.off(that._animEndEventName);
            endNextPage = true;
            if( endCurrPage ) {
                that.onEndAnimation($currPage, $nextPage, callback);
            }
        });

        return true;
    },

    isAnimating: function() {
        return this._isAnimating;
    },

    onEndAnimation: function( $outpage, $inpage, callback ) {
        this.resetPage($outpage, $inpage);
        this._isAnimating = false;

        if( callback ) {
            callback();
        }
    },

    resetPage: function( $outpage, $inpage ) {
        $outpage.attr('class', $outpage.data('originalClassList'));
        $inpage.attr('class', $inpage.data('originalClassList') + ' et-page-current');
    },

    formatClass: function( str ) {
        var classes = str.split(' ');
        var output = '';
        for( var n = 0; n < classes.length; n++ ) {
            output += ' pt-page-' + classes[n];
        }
        return output;
    },

    setTransition: function( name ) {
        this._transition = name;
    }
});

M.Transitions.CONST = {
    NONE: 'none',
    MOVE_TO_LEFT_FROM_RIGHT: 'moveToLeft|moveFromRight',
    MOVE_TO_RIGHT_FROM_LEFT: 'moveToRight|moveFromLeft',
    MOVE_TO_TOP_FROM_BOTTOM: 'moveToTop|moveFromBottom',
    MOVE_TO_BOTTOM_FROM_TOP: 'moveToBottom|moveFromTop',
    FADE_FROM_RIGHT: 'fade|moveFromRight ontop',
    FADE_FROM_LEFT: 'fade|moveFromLeft ontop',
    FADE_FROM_BOTTOM: 'fade|moveFromBottom ontop',
    FADE_FROM_TOP: 'fade|moveFromTop ontop',
    FADE_LEFT_FADE_RIGHT: 'moveToLeftFade|moveFromRightFade',
    FADE_RIGHT_FADE_LEFT: 'moveToRightFade|moveFromLeftFade',
    FADE_TOP_FADE_BOTTOM: 'moveToTopFade|moveFromBottomFade',
    FADE_BOTTOM_FADE_TOP: 'moveToBottomFade|moveFromTopFade',
    DIFFERENT_EASING_FROM_RIGHT: 'moveToLeftEasing ontop|moveFromRight',
    DIFFERENT_EASING_FROM_LEFT: 'moveToRightEasing ontop|moveFromLeft',
    DIFFERENT_EASING_FROM_BOTTOM: 'moveToTopEasing ontop|moveFromBottom',
    DIFFERENT_EASING_FROM_TOP: 'moveToBottomEasing ontop|moveFromTop',
    SCALE_DOWN_FROM_RIGHT: 'scaleDown|moveFromRight ontop',
    SCALE_DOWN_FROM_LEFT: 'scaleDown|moveFromLeft ontop',
    SCALE_DOWN_FROM_BOTTOM: 'scaleDown|moveFromBottom ontop',
    SCALE_DOWN_FROM_TOP: 'scaleDown|moveFromTop ontop',
    SCALE_DOWN_SCALE_DOWN: 'scaleDown|scaleUpDown delay300',
    SCALE_UP_SCALE_UP: 'scaleDownUp|scaleUp delay300',
    MOVE_TO_LEFT_SCALE_UP: 'moveToLeft ontop|scaleUp',
    MOVE_TO_RIGHT_SCALE_UP: 'moveToRight ontop|scaleUp',
    MOVE_TO_TOP_SCALE_UP: 'moveToTop ontop|scaleUp',
    MOVE_TO_BOTTOM_SCALE_UP: 'moveToBottom ontop|scaleUp',
    SCALE_DOWN_SCALE_UP: 'scaleDownCenter|scaleUpCenter delay400',
    GLUE_LEFT_FROM_RIGHT: 'rotateRightSideFirst|moveFromRight delay200 ontop',
    GLUE_RIGHT_FROM_LEFT: 'rotateLeftSideFirst|moveFromLeft delay200 ontop',
    GLUE_BOTTOM_FROM_TOP: 'rotateTopSideFirst|moveFromTop delay200 ontop',
    GLUE_TOP_FROM_BOTTOM: 'rotateBottomSideFirst|moveFromBottom delay200 ontop',
    FLIP_RIGHT: 'flipOutRight|flipInLeft delay500',
    FLIP_LEFT: 'flipOutLeft|flipInRight delay500',
    FLIP_TOP: 'flipOutTop|flipInBottom delay500',
    FLIP_BOTTOM: 'flipOutBottom|flipInTop delay500',
    FALL: 'rotateFall ontop|scaleUp',
    NEWSPAPER: 'rotateOutNewspaper|rotateInNewspaper delay500',
    PUSH_LEFT_FROM_RIGHT: 'rotatePushLeft|moveFromRight',
    PUSH_RIGHT_FROM_LEFT: 'rotatePushRight|moveFromLeft',
    PUSH_TOP_FROM_BOTTOM: 'rotatePushTop|moveFromBottom',
    PUSH_BOTTOM_FROM_TOP: 'rotatePushBottom|moveFromTop',
    PUSH_LEFT_PULL_RIGHT: 'rotatePushLeft|rotatePullRight delay180',
    PUSH_RIGHT_PULL_LEFT: 'rotatePushRight|rotatePullLeft delay180',
    PUSH_TOP_PULL_BOTTOM: 'rotatePushTop|rotatePullBottom delay180',
    PUSH_BOTTOM_PULL_TOP: 'rotatePushBottom|rotatePullTop delay180',
    FOLD_LEFT_FROM_RIGHT: 'rotateFoldLeft|moveFromRightFade',
    FOLD_RIGHT_FROM_LEFT: 'rotateFoldRight|moveFromLeftFade',
    FOLD_TOP_FROM_BOTTOM: 'rotateFoldTop|moveFromBottomFade',
    FOLD_BOTTOM_FROM_TOP: 'rotateFoldBottom|moveFromTopFade',
    MOVE_TO_RIGHT_UNFOLD_LEFT: 'moveToRightFade|rotateUnfoldLeft',
    MOVE_TO_LEFT_UNFOLD_RIGHT: 'moveToLeftFade|rotateUnfoldRight',
    MOVE_TO_BOTTOM_UNFOLD_TOP: 'moveToBottomFade|rotateUnfoldTop',
    MOVE_TO_TOP_UNFOLD_BOTTOM: 'moveToTopFade|rotateUnfoldBottom',
    ROOM_TO_LEFT: 'rotateRoomLeftOut ontop|rotateRoomLeftIn',
    ROOM_TO_RIGHT: 'rotateRoomRightOut ontop|rotateRoomRightIn',
    ROOM_TO_TOP: 'rotateRoomTopOut ontop|rotateRoomTopIn',
    ROOM_TO_BOTTOM: 'rotateRoomBottomOut ontop|rotateRoomBottomIn',
    CUBE_TO_LEFT: 'rotateCubeLeftOut ontop|rotateCubeLeftIn',
    CUBE_TO_RIGHT: 'rotateCubeRightOut ontop|rotateCubeRightIn',
    CUBE_TO_TOP: 'rotateCubeTopOut ontop|rotateCubeTopIn',
    CUBE_TO_BOTTOM: 'rotateCubeBottomOut ontop|rotateCubeBottomIn',
    CAROUSEL_TO_LEFT: 'rotateCarouselLeftOut ontop|rotateCarouselLeftIn',
    CAROUSEL_TO_RIGHT: 'rotateCarouselRightOut ontop|rotateCarouselRightIn',
    CAROUSEL_TO_TOP: 'rotateCarouselTopOut ontop|rotateCarouselTopIn',
    CAROUSEL_TO_BOTTOM: 'rotateCarouselBottomOut ontop|rotateCarouselBottomIn',
    SIDES: 'rotateSidesOut|rotateSidesIn delay200',
    SLIDE: 'rotateSlideOut|rotateSlideIn'
};