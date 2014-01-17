describe('M.Transitions', function() {

    var $stage;
    var testLayout;
    var ctrl;
    var $template;

    before(function() {
        $stage = $('<div style="opacity: 0"></div>');
        $('body').append($stage);
    });

    beforeEach(function() {
        $template = $('<div class="et-wrapper"><div class="et-page a"></div><div class="et-page b"></div></div>');
    });

    after(function() {
        if( $stage ) {
            $stage.remove();
            $stage = null;
        }
        $template = null;
    });

    afterEach(function() {
        $template.remove();
    })

    it('basic', function() {
        assert.isDefined(M.Transitions);
        assert.isFunction(M.Transitions);
    });

    it('const', function() {
        assert.isDefined(M.Transitions.CONST.NONE);
        assert.isDefined(M.Transitions.CONST.MOVE_TO_LEFT_FROM_RIGHT);
        assert.isDefined(M.Transitions.CONST.MOVE_TO_RIGHT_FROM_LEFT);
        assert.isDefined(M.Transitions.CONST.MOVE_TO_TOP_FROM_BOTTOM);
        assert.isDefined(M.Transitions.CONST.MOVE_TO_BOTTOM_FROM_TOP);
        assert.isDefined(M.Transitions.CONST.FADE_FROM_RIGHT);
        assert.isDefined(M.Transitions.CONST.FADE_FROM_LEFT);
        assert.isDefined(M.Transitions.CONST.FADE_FROM_BOTTOM);
        assert.isDefined(M.Transitions.CONST.FADE_FROM_TOP);
        assert.isDefined(M.Transitions.CONST.FADE_LEFT_FADE_RIGHT);
        assert.isDefined(M.Transitions.CONST.FADE_RIGHT_FADE_LEFT);
        assert.isDefined(M.Transitions.CONST.FADE_TOP_FADE_BOTTOM);
        assert.isDefined(M.Transitions.CONST.FADE_BOTTOM_FADE_TOP);
        assert.isDefined(M.Transitions.CONST.DIFFERENT_EASING_FROM_RIGHT);
        assert.isDefined(M.Transitions.CONST.DIFFERENT_EASING_FROM_LEFT);
        assert.isDefined(M.Transitions.CONST.DIFFERENT_EASING_FROM_BOTTOM);
        assert.isDefined(M.Transitions.CONST.DIFFERENT_EASING_FROM_TOP);
        assert.isDefined(M.Transitions.CONST.SCALE_DOWN_FROM_RIGHT);
        assert.isDefined(M.Transitions.CONST.SCALE_DOWN_FROM_LEFT);
        assert.isDefined(M.Transitions.CONST.SCALE_DOWN_FROM_BOTTOM);
        assert.isDefined(M.Transitions.CONST.SCALE_DOWN_FROM_TOP);
        assert.isDefined(M.Transitions.CONST.SCALE_DOWN_SCALE_DOWN);
        assert.isDefined(M.Transitions.CONST.SCALE_UP_SCALE_UP);
        assert.isDefined(M.Transitions.CONST.MOVE_TO_LEFT_SCALE_UP);
        assert.isDefined(M.Transitions.CONST.MOVE_TO_RIGHT_SCALE_UP);
        assert.isDefined(M.Transitions.CONST.MOVE_TO_TOP_SCALE_UP);
        assert.isDefined(M.Transitions.CONST.MOVE_TO_BOTTOM_SCALE_UP);
        assert.isDefined(M.Transitions.CONST.SCALE_DOWN_SCALE_UP);
        assert.isDefined(M.Transitions.CONST.GLUE_LEFT_FROM_RIGHT);
        assert.isDefined(M.Transitions.CONST.GLUE_RIGHT_FROM_LEFT);
        assert.isDefined(M.Transitions.CONST.GLUE_BOTTOM_FROM_TOP);
        assert.isDefined(M.Transitions.CONST.GLUE_TOP_FROM_BOTTOM);
        assert.isDefined(M.Transitions.CONST.FLIP_RIGHT);
        assert.isDefined(M.Transitions.CONST.FLIP_LEFT);
        assert.isDefined(M.Transitions.CONST.FLIP_TOP);
        assert.isDefined(M.Transitions.CONST.FLIP_BOTTOM);
        assert.isDefined(M.Transitions.CONST.FALL);
        assert.isDefined(M.Transitions.CONST.NEWSPAPER);
        assert.isDefined(M.Transitions.CONST.PUSH_LEFT_FROM_RIGHT);
        assert.isDefined(M.Transitions.CONST.PUSH_RIGHT_FROM_LEFT);
        assert.isDefined(M.Transitions.CONST.PUSH_TOP_FROM_BOTTOM);
        assert.isDefined(M.Transitions.CONST.PUSH_BOTTOM_FROM_TOP);
        assert.isDefined(M.Transitions.CONST.PUSH_LEFT_PULL_RIGHT);
        assert.isDefined(M.Transitions.CONST.PUSH_RIGHT_PULL_LEFT);
        assert.isDefined(M.Transitions.CONST.PUSH_TOP_PULL_BOTTOM);
        assert.isDefined(M.Transitions.CONST.PUSH_BOTTOM_PULL_TOP);
        assert.isDefined(M.Transitions.CONST.FOLD_LEFT_FROM_RIGHT);
        assert.isDefined(M.Transitions.CONST.FOLD_RIGHT_FROM_LEFT);
        assert.isDefined(M.Transitions.CONST.FOLD_TOP_FROM_BOTTOM);
        assert.isDefined(M.Transitions.CONST.FOLD_BOTTOM_FROM_TOP);
        assert.isDefined(M.Transitions.CONST.MOVE_TO_RIGHT_UNFOLD_LEFT);
        assert.isDefined(M.Transitions.CONST.MOVE_TO_LEFT_UNFOLD_RIGHT);
        assert.isDefined(M.Transitions.CONST.MOVE_TO_BOTTOM_UNFOLD_TOP);
        assert.isDefined(M.Transitions.CONST.MOVE_TO_TOP_UNFOLD_BOTTOM);
        assert.isDefined(M.Transitions.CONST.ROOM_TO_LEFT);
        assert.isDefined(M.Transitions.CONST.ROOM_TO_RIGHT);
        assert.isDefined(M.Transitions.CONST.ROOM_TO_TOP);
        assert.isDefined(M.Transitions.CONST.ROOM_TO_BOTTOM);
        assert.isDefined(M.Transitions.CONST.CUBE_TO_LEFT);
        assert.isDefined(M.Transitions.CONST.CUBE_TO_RIGHT);
        assert.isDefined(M.Transitions.CONST.CUBE_TO_TOP);
        assert.isDefined(M.Transitions.CONST.CUBE_TO_BOTTOM);
        assert.isDefined(M.Transitions.CONST.CAROUSEL_TO_LEFT);
        assert.isDefined(M.Transitions.CONST.CAROUSEL_TO_RIGHT);
        assert.isDefined(M.Transitions.CONST.CAROUSEL_TO_TOP);
        assert.isDefined(M.Transitions.CONST.CAROUSEL_TO_BOTTOM);
        assert.isDefined(M.Transitions.CONST.SIDES);
        assert.isDefined(M.Transitions.CONST.SLIDE);

        assert.isString(M.Transitions.CONST.NONE);
        assert.isString(M.Transitions.CONST.MOVE_TO_LEFT_FROM_RIGHT);
        assert.isString(M.Transitions.CONST.MOVE_TO_RIGHT_FROM_LEFT);
        assert.isString(M.Transitions.CONST.MOVE_TO_TOP_FROM_BOTTOM);
        assert.isString(M.Transitions.CONST.MOVE_TO_BOTTOM_FROM_TOP);
        assert.isString(M.Transitions.CONST.FADE_FROM_RIGHT);
        assert.isString(M.Transitions.CONST.FADE_FROM_LEFT);
        assert.isString(M.Transitions.CONST.FADE_FROM_BOTTOM);
        assert.isString(M.Transitions.CONST.FADE_FROM_TOP);
        assert.isString(M.Transitions.CONST.FADE_LEFT_FADE_RIGHT);
        assert.isString(M.Transitions.CONST.FADE_RIGHT_FADE_LEFT);
        assert.isString(M.Transitions.CONST.FADE_TOP_FADE_BOTTOM);
        assert.isString(M.Transitions.CONST.FADE_BOTTOM_FADE_TOP);
        assert.isString(M.Transitions.CONST.DIFFERENT_EASING_FROM_RIGHT);
        assert.isString(M.Transitions.CONST.DIFFERENT_EASING_FROM_LEFT);
        assert.isString(M.Transitions.CONST.DIFFERENT_EASING_FROM_BOTTOM);
        assert.isString(M.Transitions.CONST.DIFFERENT_EASING_FROM_TOP);
        assert.isString(M.Transitions.CONST.SCALE_DOWN_FROM_RIGHT);
        assert.isString(M.Transitions.CONST.SCALE_DOWN_FROM_LEFT);
        assert.isString(M.Transitions.CONST.SCALE_DOWN_FROM_BOTTOM);
        assert.isString(M.Transitions.CONST.SCALE_DOWN_FROM_TOP);
        assert.isString(M.Transitions.CONST.SCALE_DOWN_SCALE_DOWN);
        assert.isString(M.Transitions.CONST.SCALE_UP_SCALE_UP);
        assert.isString(M.Transitions.CONST.MOVE_TO_LEFT_SCALE_UP);
        assert.isString(M.Transitions.CONST.MOVE_TO_RIGHT_SCALE_UP);
        assert.isString(M.Transitions.CONST.MOVE_TO_TOP_SCALE_UP);
        assert.isString(M.Transitions.CONST.MOVE_TO_BOTTOM_SCALE_UP);
        assert.isString(M.Transitions.CONST.SCALE_DOWN_SCALE_UP);
        assert.isString(M.Transitions.CONST.GLUE_LEFT_FROM_RIGHT);
        assert.isString(M.Transitions.CONST.GLUE_RIGHT_FROM_LEFT);
        assert.isString(M.Transitions.CONST.GLUE_BOTTOM_FROM_TOP);
        assert.isString(M.Transitions.CONST.GLUE_TOP_FROM_BOTTOM);
        assert.isString(M.Transitions.CONST.FLIP_RIGHT);
        assert.isString(M.Transitions.CONST.FLIP_LEFT);
        assert.isString(M.Transitions.CONST.FLIP_TOP);
        assert.isString(M.Transitions.CONST.FLIP_BOTTOM);
        assert.isString(M.Transitions.CONST.FALL);
        assert.isString(M.Transitions.CONST.NEWSPAPER);
        assert.isString(M.Transitions.CONST.PUSH_LEFT_FROM_RIGHT);
        assert.isString(M.Transitions.CONST.PUSH_RIGHT_FROM_LEFT);
        assert.isString(M.Transitions.CONST.PUSH_TOP_FROM_BOTTOM);
        assert.isString(M.Transitions.CONST.PUSH_BOTTOM_FROM_TOP);
        assert.isString(M.Transitions.CONST.PUSH_LEFT_PULL_RIGHT);
        assert.isString(M.Transitions.CONST.PUSH_RIGHT_PULL_LEFT);
        assert.isString(M.Transitions.CONST.PUSH_TOP_PULL_BOTTOM);
        assert.isString(M.Transitions.CONST.PUSH_BOTTOM_PULL_TOP);
        assert.isString(M.Transitions.CONST.FOLD_LEFT_FROM_RIGHT);
        assert.isString(M.Transitions.CONST.FOLD_RIGHT_FROM_LEFT);
        assert.isString(M.Transitions.CONST.FOLD_TOP_FROM_BOTTOM);
        assert.isString(M.Transitions.CONST.FOLD_BOTTOM_FROM_TOP);
        assert.isString(M.Transitions.CONST.MOVE_TO_RIGHT_UNFOLD_LEFT);
        assert.isString(M.Transitions.CONST.MOVE_TO_LEFT_UNFOLD_RIGHT);
        assert.isString(M.Transitions.CONST.MOVE_TO_BOTTOM_UNFOLD_TOP);
        assert.isString(M.Transitions.CONST.MOVE_TO_TOP_UNFOLD_BOTTOM);
        assert.isString(M.Transitions.CONST.ROOM_TO_LEFT);
        assert.isString(M.Transitions.CONST.ROOM_TO_RIGHT);
        assert.isString(M.Transitions.CONST.ROOM_TO_TOP);
        assert.isString(M.Transitions.CONST.ROOM_TO_BOTTOM);
        assert.isString(M.Transitions.CONST.CUBE_TO_LEFT);
        assert.isString(M.Transitions.CONST.CUBE_TO_RIGHT);
        assert.isString(M.Transitions.CONST.CUBE_TO_TOP);
        assert.isString(M.Transitions.CONST.CUBE_TO_BOTTOM);
        assert.isString(M.Transitions.CONST.CAROUSEL_TO_LEFT);
        assert.isString(M.Transitions.CONST.CAROUSEL_TO_RIGHT);
        assert.isString(M.Transitions.CONST.CAROUSEL_TO_TOP);
        assert.isString(M.Transitions.CONST.CAROUSEL_TO_BOTTOM);
        assert.isString(M.Transitions.CONST.SIDES);
        assert.isString(M.Transitions.CONST.SLIDE);

        assert.equal(M.Transitions.CONST.NONE, 'none');
        assert.equal(M.Transitions.CONST.MOVE_TO_LEFT_FROM_RIGHT, 'moveToLeft|moveFromRight');
        assert.equal(M.Transitions.CONST.MOVE_TO_RIGHT_FROM_LEFT, 'moveToRight|moveFromLeft');
        assert.equal(M.Transitions.CONST.MOVE_TO_TOP_FROM_BOTTOM, 'moveToTop|moveFromBottom');
        assert.equal(M.Transitions.CONST.MOVE_TO_BOTTOM_FROM_TOP, 'moveToBottom|moveFromTop');
        assert.equal(M.Transitions.CONST.FADE_FROM_RIGHT, 'fade|moveFromRight ontop');
        assert.equal(M.Transitions.CONST.FADE_FROM_LEFT, 'fade|moveFromLeft ontop');
        assert.equal(M.Transitions.CONST.FADE_FROM_BOTTOM, 'fade|moveFromBottom ontop');
        assert.equal(M.Transitions.CONST.FADE_FROM_TOP, 'fade|moveFromTop ontop');
        assert.equal(M.Transitions.CONST.FADE_LEFT_FADE_RIGHT, 'moveToLeftFade|moveFromRightFade');
        assert.equal(M.Transitions.CONST.FADE_RIGHT_FADE_LEFT, 'moveToRightFade|moveFromLeftFade');
        assert.equal(M.Transitions.CONST.FADE_TOP_FADE_BOTTOM, 'moveToTopFade|moveFromBottomFade');
        assert.equal(M.Transitions.CONST.FADE_BOTTOM_FADE_TOP, 'moveToBottomFade|moveFromTopFade');
        assert.equal(M.Transitions.CONST.DIFFERENT_EASING_FROM_RIGHT, 'moveToLeftEasing ontop|moveFromRight');
        assert.equal(M.Transitions.CONST.DIFFERENT_EASING_FROM_LEFT, 'moveToRightEasing ontop|moveFromLeft');
        assert.equal(M.Transitions.CONST.DIFFERENT_EASING_FROM_BOTTOM, 'moveToTopEasing ontop|moveFromBottom');
        assert.equal(M.Transitions.CONST.DIFFERENT_EASING_FROM_TOP, 'moveToBottomEasing ontop|moveFromTop');
        assert.equal(M.Transitions.CONST.SCALE_DOWN_FROM_RIGHT, 'scaleDown|moveFromRight ontop');
        assert.equal(M.Transitions.CONST.SCALE_DOWN_FROM_LEFT, 'scaleDown|moveFromLeft ontop');
        assert.equal(M.Transitions.CONST.SCALE_DOWN_FROM_BOTTOM, 'scaleDown|moveFromBottom ontop');
        assert.equal(M.Transitions.CONST.SCALE_DOWN_FROM_TOP, 'scaleDown|moveFromTop ontop');
        assert.equal(M.Transitions.CONST.SCALE_DOWN_SCALE_DOWN, 'scaleDown|scaleUpDown delay300');
        assert.equal(M.Transitions.CONST.SCALE_UP_SCALE_UP, 'scaleDownUp|scaleUp delay300');
        assert.equal(M.Transitions.CONST.MOVE_TO_LEFT_SCALE_UP, 'moveToLeft ontop|scaleUp');
        assert.equal(M.Transitions.CONST.MOVE_TO_RIGHT_SCALE_UP, 'moveToRight ontop|scaleUp');
        assert.equal(M.Transitions.CONST.MOVE_TO_TOP_SCALE_UP, 'moveToTop ontop|scaleUp');
        assert.equal(M.Transitions.CONST.MOVE_TO_BOTTOM_SCALE_UP, 'moveToBottom ontop|scaleUp');
        assert.equal(M.Transitions.CONST.SCALE_DOWN_SCALE_UP, 'scaleDownCenter|scaleUpCenter delay400');
        assert.equal(M.Transitions.CONST.GLUE_LEFT_FROM_RIGHT, 'rotateRightSideFirst|moveFromRight delay200 ontop');
        assert.equal(M.Transitions.CONST.GLUE_RIGHT_FROM_LEFT, 'rotateLeftSideFirst|moveFromLeft delay200 ontop');
        assert.equal(M.Transitions.CONST.GLUE_BOTTOM_FROM_TOP, 'rotateTopSideFirst|moveFromTop delay200 ontop');
        assert.equal(M.Transitions.CONST.GLUE_TOP_FROM_BOTTOM, 'rotateBottomSideFirst|moveFromBottom delay200 ontop');
        assert.equal(M.Transitions.CONST.FLIP_RIGHT, 'flipOutRight|flipInLeft delay500');
        assert.equal(M.Transitions.CONST.FLIP_LEFT, 'flipOutLeft|flipInRight delay500');
        assert.equal(M.Transitions.CONST.FLIP_TOP, 'flipOutTop|flipInBottom delay500');
        assert.equal(M.Transitions.CONST.FLIP_BOTTOM, 'flipOutBottom|flipInTop delay500');
        assert.equal(M.Transitions.CONST.FALL, 'rotateFall ontop|scaleUp');
        assert.equal(M.Transitions.CONST.NEWSPAPER, 'rotateOutNewspaper|rotateInNewspaper delay500');
        assert.equal(M.Transitions.CONST.PUSH_LEFT_FROM_RIGHT, 'rotatePushLeft|moveFromRight');
        assert.equal(M.Transitions.CONST.PUSH_RIGHT_FROM_LEFT, 'rotatePushRight|moveFromLeft');
        assert.equal(M.Transitions.CONST.PUSH_TOP_FROM_BOTTOM, 'rotatePushTop|moveFromBottom');
        assert.equal(M.Transitions.CONST.PUSH_BOTTOM_FROM_TOP, 'rotatePushBottom|moveFromTop');
        assert.equal(M.Transitions.CONST.PUSH_LEFT_PULL_RIGHT, 'rotatePushLeft|rotatePullRight delay180');
        assert.equal(M.Transitions.CONST.PUSH_RIGHT_PULL_LEFT, 'rotatePushRight|rotatePullLeft delay180');
        assert.equal(M.Transitions.CONST.PUSH_TOP_PULL_BOTTOM, 'rotatePushTop|rotatePullBottom delay180');
        assert.equal(M.Transitions.CONST.PUSH_BOTTOM_PULL_TOP, 'rotatePushBottom|rotatePullTop delay180');
        assert.equal(M.Transitions.CONST.FOLD_LEFT_FROM_RIGHT, 'rotateFoldLeft|moveFromRightFade');
        assert.equal(M.Transitions.CONST.FOLD_RIGHT_FROM_LEFT, 'rotateFoldRight|moveFromLeftFade');
        assert.equal(M.Transitions.CONST.FOLD_TOP_FROM_BOTTOM, 'rotateFoldTop|moveFromBottomFade');
        assert.equal(M.Transitions.CONST.FOLD_BOTTOM_FROM_TOP, 'rotateFoldBottom|moveFromTopFade');
        assert.equal(M.Transitions.CONST.MOVE_TO_RIGHT_UNFOLD_LEFT, 'moveToRightFade|rotateUnfoldLeft');
        assert.equal(M.Transitions.CONST.MOVE_TO_LEFT_UNFOLD_RIGHT, 'moveToLeftFade|rotateUnfoldRight');
        assert.equal(M.Transitions.CONST.MOVE_TO_BOTTOM_UNFOLD_TOP, 'moveToBottomFade|rotateUnfoldTop');
        assert.equal(M.Transitions.CONST.MOVE_TO_TOP_UNFOLD_BOTTOM, 'moveToTopFade|rotateUnfoldBottom');
        assert.equal(M.Transitions.CONST.ROOM_TO_LEFT, 'rotateRoomLeftOut ontop|rotateRoomLeftIn');
        assert.equal(M.Transitions.CONST.ROOM_TO_RIGHT, 'rotateRoomRightOut ontop|rotateRoomRightIn');
        assert.equal(M.Transitions.CONST.ROOM_TO_TOP, 'rotateRoomTopOut ontop|rotateRoomTopIn');
        assert.equal(M.Transitions.CONST.ROOM_TO_BOTTOM, 'rotateRoomBottomOut ontop|rotateRoomBottomIn');
        assert.equal(M.Transitions.CONST.CUBE_TO_LEFT, 'rotateCubeLeftOut ontop|rotateCubeLeftIn');
        assert.equal(M.Transitions.CONST.CUBE_TO_RIGHT, 'rotateCubeRightOut ontop|rotateCubeRightIn');
        assert.equal(M.Transitions.CONST.CUBE_TO_TOP, 'rotateCubeTopOut ontop|rotateCubeTopIn');
        assert.equal(M.Transitions.CONST.CUBE_TO_BOTTOM, 'rotateCubeBottomOut ontop|rotateCubeBottomIn');
        assert.equal(M.Transitions.CONST.CAROUSEL_TO_LEFT, 'rotateCarouselLeftOut ontop|rotateCarouselLeftIn');
        assert.equal(M.Transitions.CONST.CAROUSEL_TO_RIGHT, 'rotateCarouselRightOut ontop|rotateCarouselRightIn');
        assert.equal(M.Transitions.CONST.CAROUSEL_TO_TOP, 'rotateCarouselTopOut ontop|rotateCarouselTopIn');
        assert.equal(M.Transitions.CONST.CAROUSEL_TO_BOTTOM, 'rotateCarouselBottomOut ontop|rotateCarouselBottomIn');
        assert.equal(M.Transitions.CONST.SIDES, 'rotateSidesOut|rotateSidesIn delay200');
        assert.equal(M.Transitions.CONST.SLIDE, 'rotateSlideOut|rotateSlideIn');
    });

    it('properties', function() {
        assert.isDefined(M.Transitions.prototype._isAnimating);
        assert.isDefined(M.Transitions.prototype._current);
        assert.isDefined(M.Transitions.prototype._pagesCount);
        assert.isDefined(M.Transitions.prototype._$pages);
        assert.isDefined(M.Transitions.prototype._$wrapper);
        assert.isDefined(M.Transitions.prototype._transitionName);
        assert.isDefined(M.Transitions.prototype._animEndEventName);

        assert.isBoolean(M.Transitions.prototype._isAnimating);
        assert.isNumber(M.Transitions.prototype._current);
        assert.isNumber(M.Transitions.prototype._pagesCount);
        assert.isNull(M.Transitions.prototype._$pages);
        assert.isNull(M.Transitions.prototype._$wrapper);
        assert.isString(M.Transitions.prototype._transitionName);
        assert.isString(M.Transitions.prototype._animEndEventName);
    });

    it('methods', function() {
        assert.isDefined(M.Transitions.prototype.initialize);
        assert.isDefined(M.Transitions.prototype.destroy);
        assert.isDefined(M.Transitions.prototype.setActivePage);
        assert.isDefined(M.Transitions.prototype.animate);
        assert.isDefined(M.Transitions.prototype.nextPage);
        assert.isDefined(M.Transitions.prototype.isAnimating);
        assert.isDefined(M.Transitions.prototype.onEndAnimation);
        assert.isDefined(M.Transitions.prototype.resetPage);
        assert.isDefined(M.Transitions.prototype.formatClass);
        assert.isDefined(M.Transitions.prototype.setTransition);

        assert.isFunction(M.Transitions.prototype.initialize);
        assert.isFunction(M.Transitions.prototype.destroy);
        assert.isFunction(M.Transitions.prototype.setActivePage);
        assert.isFunction(M.Transitions.prototype.animate);
        assert.isFunction(M.Transitions.prototype.nextPage);
        assert.isFunction(M.Transitions.prototype.isAnimating);
        assert.isFunction(M.Transitions.prototype.onEndAnimation);
        assert.isFunction(M.Transitions.prototype.resetPage);
        assert.isFunction(M.Transitions.prototype.formatClass);
        assert.isFunction(M.Transitions.prototype.setTransition);
    });

    it('Create an instance', function() {
        var view = {
            $el: $template
        }
        var trans = M.Transitions.create(view);
        assert.isNotNull(trans);
        assert.isNotNull(trans._$pages);
        assert.isNotNull(trans._$wrapper);
        assert.notEqual(trans._pagesCount, 0);
        assert.notEqual(trans._transitionName, '');
        assert.notEqual(trans._isAnimating, true);
    });

    it('Create an instance without arguments', function() {
        assert.throw(M.Transitions.create, TypeError);
    });

    it('Check default transition', function() {
        var view = {
            $el: $template
        }
        var trans = M.Transitions.create(view);
        assert.equal(trans._transitionName, M.Transitions.CONST.MOVE_TO_LEFT_FROM_RIGHT);
    });

    it('Set transition to M.Transitions.CONST.SLIDE', function() {
        var view = {
            $el: $template,
            transition: M.Transitions.CONST.SLIDE
        }
        var trans = M.Transitions.create(view);
        assert.equal(trans._transitionName, M.Transitions.CONST.SLIDE);
    });

    it('Set transition to M.Transitions.CONST.SLIDE', function() {
        var view = {
            $el: $template,
            transition: M.Transitions.CONST.SLIDE
        }
        var trans = M.Transitions.create(view);
        assert.equal(trans._transitionName, M.Transitions.CONST.SLIDE);
    });

    it('Set temporary transition to M.Transitions.CONST.NONE', function() {
        var view = {
            $el: $template,
            transition: M.Transitions.CONST.SLIDE
        }
        var trans = M.Transitions.create(view);
        assert.equal(trans._transitionName, M.Transitions.CONST.SLIDE);

        trans.animate(M.Transitions.CONST.NONE);
        assert.equal(trans._transitionName, M.Transitions.CONST.SLIDE);
    });

    it('animate with M.Transitions.CONST.NONE', function() {

        var view = {
            $el: $template
        }
        var trans = M.Transitions.create(view);

        assert.equal(view.$el.find('.et-page-current').length, 1);
        assert.equal(view.$el.find('.a.et-page-current').length, 1);

        trans.animate(M.Transitions.CONST.NONE);

        assert.equal(view.$el.find('.et-page-current').length, 1);
        assert.equal(view.$el.find('.a.et-page-current').length, 0);
        assert.equal(view.$el.find('.b.et-page-current').length, 1);

        trans.animate(M.Transitions.CONST.NONE);

        assert.equal(view.$el.find('.et-page-current').length, 1);
        assert.equal(view.$el.find('.a.et-page-current').length, 1);
        assert.equal(view.$el.find('.b.et-page-current').length, 0);
    });

    it('animate with callback', function( done ) {
        this.timeout(2000);

        var view = {
            $el: $template
        }
        $stage.html($template);

        var trans = M.Transitions.create(view);
        assert.equal(trans._transitionName, M.Transitions.CONST.MOVE_TO_LEFT_FROM_RIGHT);

        assert.equal(view.$el.find('.et-page-current').length, 1);
        assert.equal(view.$el.find('.a.et-page-current').length, 1);

        trans.animate(null, function() {
            assert.equal(view.$el.find('.et-page-current').length, 1);
            assert.equal(view.$el.find('.a.et-page-current').length, 0);
            assert.equal(view.$el.find('.b.et-page-current').length, 1);
            done();
        });
    });

    it('animate with callback there and back again', function( done ) {
        this.timeout(2000);

        var view = {
            $el: $template
        }
        $stage.html($template);

        var trans = M.Transitions.create(view);
        assert.equal(trans._transitionName, M.Transitions.CONST.MOVE_TO_LEFT_FROM_RIGHT);

        assert.equal(view.$el.find('.et-page-current').length, 1);
        assert.equal(view.$el.find('.a.et-page-current').length, 1);

        trans.animate(null, function() {
            assert.equal(view.$el.find('.et-page-current').length, 1);
            assert.equal(view.$el.find('.a.et-page-current').length, 0);
            assert.equal(view.$el.find('.b.et-page-current').length, 1);

            trans.animate(null, function() {
                assert.equal(view.$el.find('.et-page-current').length, 1);
                assert.equal(view.$el.find('.a.et-page-current').length, 1);
                assert.equal(view.$el.find('.b.et-page-current').length, 0);
                done();
            });
        });
    });
});