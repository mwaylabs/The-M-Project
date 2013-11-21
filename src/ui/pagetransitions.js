//Thanks to: https://github.com/codrops/PageTransitions

M.PageTransitions = M.Object.design({

    NONE: 'none',
    MOVE_TO_LEFT_FROM_RIGHT: 'm-page-moveToLeft|m-page-moveFromRight',
    MOVE_TO_RIGHT_FROM_LEFT: 'm-page-moveToRight|m-page-moveFromLeft',
    MOVE_TO_TOP_FROM_BOTTOM: 'm-page-moveToTop|m-page-moveFromBottom',
    MOVE_TO_BOTTOM_FROM_TOP: 'm-page-moveToBottom|m-page-moveFromTop',
    FADE_FROM_RIGHT: 'm-page-fade|m-page-moveFromRight m-page-ontop',
    FADE_FROM_LEFT: 'm-page-fade|m-page-moveFromLeft m-page-ontop',
    FADE_FROM_BOTTOM: 'm-page-fade|m-page-moveFromBottom m-page-ontop',
    FADE_FROM_TOP: 'm-page-fade|m-page-moveFromTop m-page-ontop',
    FADE_LEFT_FADE_RIGHT: 'm-page-moveToLeftFade|m-page-moveFromRightFade',
    FADE_RIGHT_FADE_LEFT: 'm-page-moveToRightFade|m-page-moveFromLeftFade',
    FADE_TOP_FADE_BOTTOM: 'm-page-moveToTopFade|m-page-moveFromBottomFade',
    FADE_BOTTOM_FADE_TOP: 'm-page-moveToBottomFade|m-page-moveFromTopFade',
    DIFFERENT_EASING_FROM_RIGHT: 'm-page-moveToLeftEasing m-page-ontop|m-page-moveFromRight',
    DIFFERENT_EASING_FROM_LEFT: 'm-page-moveToRightEasing m-page-ontop|m-page-moveFromLeft',
    DIFFERENT_EASING_FROM_BOTTOM: 'm-page-moveToTopEasing m-page-ontop|m-page-moveFromBottom',
    DIFFERENT_EASING_FROM_TOP: 'm-page-moveToBottomEasing m-page-ontop|m-page-moveFromTop',
    SCALE_DOWN_FROM_RIGHT: 'm-page-scaleDown|m-page-moveFromRight m-page-ontop',
    SCALE_DOWN_FROM_LEFT: 'm-page-scaleDown|m-page-moveFromLeft m-page-ontop',
    SCALE_DOWN_FROM_BOTTOM: 'm-page-scaleDown|m-page-moveFromBottom m-page-ontop',
    SCALE_DOWN_FROM_TOP: 'm-page-scaleDown|m-page-moveFromTop m-page-ontop',
    SCALE_DOWN_SCALE_DOWN: 'm-page-scaleDown|m-page-scaleUpDown m-page-delay300',
    SCALE_UP_SCALE_UP: 'm-page-scaleDownUp|m-page-scaleUp m-page-delay300',
    MOVE_TO_LEFT_SCALE_UP: 'm-page-moveToLeft m-page-ontop|m-page-scaleUp',
    MOVE_TO_RIGHT_SCALE_UP: 'm-page-moveToRight m-page-ontop|m-page-scaleUp',
    MOVE_TO_TOP_SCALE_UP: 'm-page-moveToTop m-page-ontop|m-page-scaleUp',
    MOVE_TO_BOTTOM_SCALE_UP: 'm-page-moveToBottom m-page-ontop|m-page-scaleUp',
    SCALE_DOWN_SCALE_UP: 'm-page-scaleDownCenter|m-page-scaleUpCenter m-page-delay400',
    GLUE_LEFT_FROM_RIGHT: 'm-page-rotateRightSideFirst|m-page-moveFromRight m-page-delay200 m-page-ontop',
    GLUE_RIGHT_FROM_LEFT: 'm-page-rotateLeftSideFirst|m-page-moveFromLeft m-page-delay200 m-page-ontop',
    GLUE_BOTTOM_FROM_TOP: 'm-page-rotateTopSideFirst|m-page-moveFromTop m-page-delay200 m-page-ontop',
    GLUE_TOP_FROM_BOTTOM: 'm-page-rotateBottomSideFirst|m-page-moveFromBottom m-page-delay200 m-page-ontop',
    FLIP_RIGHT: 'm-page-flipOutRight|m-page-flipInLeft m-page-delay500',
    FLIP_LEFT: 'm-page-flipOutLeft|m-page-flipInRight m-page-delay500',
    FLIP_TOP: 'm-page-flipOutTop|m-page-flipInBottom m-page-delay500',
    FLIP_BOTTOM: 'm-page-flipOutBottom|m-page-flipInTop m-page-delay500',
    FALL: 'm-page-rotateFall m-page-ontop|m-page-scaleUp',
    NEWSPAPER: 'm-page-rotateOutNewspaper|m-page-rotateInNewspaper m-page-delay500',
    PUSH_LEFT_FROM_RIGHT: 'm-page-rotatePushLeft|m-page-moveFromRight',
    PUSH_RIGHT_FROM_LEFT: 'm-page-rotatePushRight|m-page-moveFromLeft',
    PUSH_TOP_FROM_BOTTOM: 'm-page-rotatePushTop|m-page-moveFromBottom',
    PUSH_BOTTOM_FROM_TOP: 'm-page-rotatePushBottom|m-page-moveFromTop',
    PUSH_LEFT_PULL_RIGHT: 'm-page-rotatePushLeft|m-page-rotatePullRight m-page-delay180',
    PUSH_RIGHT_PULL_LEFT: 'm-page-rotatePushRight|m-page-rotatePullLeft m-page-delay180',
    PUSH_TOP_PULL_BOTTOM: 'm-page-rotatePushTop|m-page-rotatePullBottom m-page-delay180',
    PUSH_BOTTOM_PULL_TOP: 'm-page-rotatePushBottom|m-page-rotatePullTop m-page-delay180',
    FOLD_LEFT_FROM_RIGHT: 'm-page-rotateFoldLeft|m-page-moveFromRightFade',
    FOLD_RIGHT_FROM_LEFT: 'm-page-rotateFoldRight|m-page-moveFromLeftFade',
    FOLD_TOP_FROM_BOTTOM: 'm-page-rotateFoldTop|m-page-moveFromBottomFade',
    FOLD_BOTTOM_FROM_TOP: 'm-page-rotateFoldBottom|m-page-moveFromTopFade',
    MOVE_TO_RIGHT_UNFOLD_LEFT: 'm-page-moveToRightFade|m-page-rotateUnfoldLeft',
    MOVE_TO_LEFT_UNFOLD_RIGHT: 'm-page-moveToLeftFade|m-page-rotateUnfoldRight',
    MOVE_TO_BOTTOM_UNFOLD_TOP: 'm-page-moveToBottomFade|m-page-rotateUnfoldTop',
    MOVE_TO_TOP_UNFOLD_BOTTOM: 'm-page-moveToTopFade|m-page-rotateUnfoldBottom',
    ROOM_TO_LEFT: 'm-page-rotateRoomLeftOut m-page-ontop|m-page-rotateRoomLeftIn',
    ROOM_TO_RIGHT: 'm-page-rotateRoomRightOut m-page-ontop|m-page-rotateRoomRightIn',
    ROOM_TO_TOP: 'm-page-rotateRoomTopOut m-page-ontop|m-page-rotateRoomTopIn',
    ROOM_TO_BOTTOM: 'm-page-rotateRoomBottomOut m-page-ontop|m-page-rotateRoomBottomIn',
    CUBE_TO_LEFT: 'm-page-rotateCubeLeftOut m-page-ontop|m-page-rotateCubeLeftIn',
    CUBE_TO_RIGHT: 'm-page-rotateCubeRightOut m-page-ontop|m-page-rotateCubeRightIn',
    CUBE_TO_TOP: 'm-page-rotateCubeTopOut m-page-ontop|m-page-rotateCubeTopIn',
    CUBE_TO_BOTTOM: 'm-page-rotateCubeBottomOut m-page-ontop|m-page-rotateCubeBottomIn',
    CAROUSEL_TO_LEFT: 'm-page-rotateCarouselLeftOut m-page-ontop|m-page-rotateCarouselLeftIn',
    CAROUSEL_TO_RIGHT: 'm-page-rotateCarouselRightOut m-page-ontop|m-page-rotateCarouselRightIn',
    CAROUSEL_TO_TOP: 'm-page-rotateCarouselTopOut m-page-ontop|m-page-rotateCarouselTopIn',
    CAROUSEL_TO_BOTTOM: 'm-page-rotateCarouselBottomOut m-page-ontop|m-page-rotateCarouselBottomIn',
    SIDES: 'm-page-rotateSidesOut|m-page-rotateSidesIn m-page-delay200',
    SLIDE: 'm-page-rotateSlideOut|m-page-rotateSlideIn',

    _transition: '',
    _main: null,
    _iterate: null,
    _pages: null,
    _pagesCount: 0,
    _current: 0,
    _isAnimating: false,
    _endCurrPage: false,
    _endNextPage: false,
    _support: Modernizr.cssanimations,
    _animEndEventNames: {
        'WebkitAnimation': 'webkitAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd',
        'animation': 'animationend'
    },

    init: function( main ) {
        this._animEndEventName = this._animEndEventNames[ Modernizr.prefixed('animation') ];
        this._main = main ? main : $('#m-main');
        this._pages = this._main.children('div.m-page');
        this._pagesCount = this._pages.length;

        // CSS animations are supported by Android < 4 devices but only if a single property is changed.
        if( M.Environment.isLowerThanAndroid4 ) {
            this._support = false;
        }

        this._pages.each(function() {
            var page = $(this);
            page.data('originalClassList', page.attr('class'));
        });

        this._pages.eq(this._current).addClass('m-page-current');
    },

    startTransition: function() {
        if( this._isAnimating ) {
            return false;
        }

        // TODO dispatch a custom animation-start event.
        this._isAnimating = true;

        var currPage = this._pages.eq(this._current);

        if( this._current < this._pagesCount - 1 ) {
            this._current += 1;
        } else {
            this._current = 0;
        }
        var nextPage = this._pages.eq(this._current).addClass('m-page-current');
        if( !this._support || this._transition === M.PageTransitions.NONE ) {
            this._onEndAnimation(currPage, nextPage);
            return;
        }

        if( !this._transition ) {
            this._transition = this.getDefaultTransition();
        }

        var transitionClasses = this._transition.split('|');
        var outClass = transitionClasses[0];
        var inClass = transitionClasses[1];
        var that = this;

        $(currPage[0]).on(that._animEndEventName, function() {
            currPage.off(that._animEndEventName);
            that._endCurrPage = true;
            if( that._endNextPage ) {
                that._onEndAnimation(currPage, nextPage);
            }
        });
        currPage.addClass(outClass);

        $(nextPage[0]).on(that._animEndEventName, function() {
            nextPage.off(that._animEndEventName);
            that._endNextPage = true;
            if( that._endCurrPage ) {
                that._onEndAnimation(currPage, nextPage);
            }
        });
        nextPage.addClass(inClass);
    },

    setTransition: function( name ) {
        this._transition = name;
    },

    getDefaultTransition: function() {
        return M.PageTransitions.MOVE_TO_LEFT_FROM_RIGHT;
    },

    _onEndAnimation: function( outpage, inpage ) {
        // TODO dispatch a custom animation-end event.

        this._endCurrPage = false;
        this._endNextPage = false;

        this._resetPage(outpage, inpage);
        this._isAnimating = false;
    },

    _resetPage: function( outpage, inpage ) {
        outpage.attr('class', outpage.data('originalClassList'));
        inpage.attr('class', inpage.data('originalClassList') + ' m-page-current');
    }
});

