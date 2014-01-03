describe('M.PageTransitions', function () {

    var $stage;
    var testLayout;
    var ctrl;

    before(function () {
        $stage = $('<div style="opacity: 0"></div>');
        $('body').append($stage);
    });

    after(function () {
        if ($stage) {
            $stage.remove();
            $stage = null;
        }
    });

    it('basic', function () {
        assert.isDefined(M.PageTransitions);
        assert.isObject(M.PageTransitions);
    });

    it('const', function () {
        assert.isDefined(M.PageTransitions.CONST.NONE);
        assert.isDefined(M.PageTransitions.CONST.MOVE_TO_LEFT_FROM_RIGHT);
        assert.isDefined(M.PageTransitions.CONST.MOVE_TO_RIGHT_FROM_LEFT);
        assert.isDefined(M.PageTransitions.CONST.MOVE_TO_TOP_FROM_BOTTOM);
        assert.isDefined(M.PageTransitions.CONST.MOVE_TO_BOTTOM_FROM_TOP);
        assert.isDefined(M.PageTransitions.CONST.FADE_FROM_RIGHT);
        assert.isDefined(M.PageTransitions.CONST.FADE_FROM_LEFT);
        assert.isDefined(M.PageTransitions.CONST.FADE_FROM_BOTTOM);
        assert.isDefined(M.PageTransitions.CONST.FADE_FROM_TOP);
        assert.isDefined(M.PageTransitions.CONST.FADE_LEFT_FADE_RIGHT);
        assert.isDefined(M.PageTransitions.CONST.FADE_RIGHT_FADE_LEFT);
        assert.isDefined(M.PageTransitions.CONST.FADE_TOP_FADE_BOTTOM);
        assert.isDefined(M.PageTransitions.CONST.FADE_BOTTOM_FADE_TOP);
        assert.isDefined(M.PageTransitions.CONST.DIFFERENT_EASING_FROM_RIGHT);
        assert.isDefined(M.PageTransitions.CONST.DIFFERENT_EASING_FROM_LEFT);
        assert.isDefined(M.PageTransitions.CONST.DIFFERENT_EASING_FROM_BOTTOM);
        assert.isDefined(M.PageTransitions.CONST.DIFFERENT_EASING_FROM_TOP);
        assert.isDefined(M.PageTransitions.CONST.SCALE_DOWN_FROM_RIGHT);
        assert.isDefined(M.PageTransitions.CONST.SCALE_DOWN_FROM_LEFT);
        assert.isDefined(M.PageTransitions.CONST.SCALE_DOWN_FROM_BOTTOM);
        assert.isDefined(M.PageTransitions.CONST.SCALE_DOWN_FROM_TOP);
        assert.isDefined(M.PageTransitions.CONST.SCALE_DOWN_SCALE_DOWN);
        assert.isDefined(M.PageTransitions.CONST.SCALE_UP_SCALE_UP);
        assert.isDefined(M.PageTransitions.CONST.MOVE_TO_LEFT_SCALE_UP);
        assert.isDefined(M.PageTransitions.CONST.MOVE_TO_RIGHT_SCALE_UP);
        assert.isDefined(M.PageTransitions.CONST.MOVE_TO_TOP_SCALE_UP);
        assert.isDefined(M.PageTransitions.CONST.MOVE_TO_BOTTOM_SCALE_UP);
        assert.isDefined(M.PageTransitions.CONST.SCALE_DOWN_SCALE_UP);
        assert.isDefined(M.PageTransitions.CONST.GLUE_LEFT_FROM_RIGHT);
        assert.isDefined(M.PageTransitions.CONST.GLUE_RIGHT_FROM_LEFT);
        assert.isDefined(M.PageTransitions.CONST.GLUE_BOTTOM_FROM_TOP);
        assert.isDefined(M.PageTransitions.CONST.GLUE_TOP_FROM_BOTTOM);
        assert.isDefined(M.PageTransitions.CONST.FLIP_RIGHT);
        assert.isDefined(M.PageTransitions.CONST.FLIP_LEFT);
        assert.isDefined(M.PageTransitions.CONST.FLIP_TOP);
        assert.isDefined(M.PageTransitions.CONST.FLIP_BOTTOM);
        assert.isDefined(M.PageTransitions.CONST.FALL);
        assert.isDefined(M.PageTransitions.CONST.NEWSPAPER);
        assert.isDefined(M.PageTransitions.CONST.PUSH_LEFT_FROM_RIGHT);
        assert.isDefined(M.PageTransitions.CONST.PUSH_RIGHT_FROM_LEFT);
        assert.isDefined(M.PageTransitions.CONST.PUSH_TOP_FROM_BOTTOM);
        assert.isDefined(M.PageTransitions.CONST.PUSH_BOTTOM_FROM_TOP);
        assert.isDefined(M.PageTransitions.CONST.PUSH_LEFT_PULL_RIGHT);
        assert.isDefined(M.PageTransitions.CONST.PUSH_RIGHT_PULL_LEFT);
        assert.isDefined(M.PageTransitions.CONST.PUSH_TOP_PULL_BOTTOM);
        assert.isDefined(M.PageTransitions.CONST.PUSH_BOTTOM_PULL_TOP);
        assert.isDefined(M.PageTransitions.CONST.FOLD_LEFT_FROM_RIGHT);
        assert.isDefined(M.PageTransitions.CONST.FOLD_RIGHT_FROM_LEFT);
        assert.isDefined(M.PageTransitions.CONST.FOLD_TOP_FROM_BOTTOM);
        assert.isDefined(M.PageTransitions.CONST.FOLD_BOTTOM_FROM_TOP);
        assert.isDefined(M.PageTransitions.CONST.MOVE_TO_RIGHT_UNFOLD_LEFT);
        assert.isDefined(M.PageTransitions.CONST.MOVE_TO_LEFT_UNFOLD_RIGHT);
        assert.isDefined(M.PageTransitions.CONST.MOVE_TO_BOTTOM_UNFOLD_TOP);
        assert.isDefined(M.PageTransitions.CONST.MOVE_TO_TOP_UNFOLD_BOTTOM);
        assert.isDefined(M.PageTransitions.CONST.ROOM_TO_LEFT);
        assert.isDefined(M.PageTransitions.CONST.ROOM_TO_RIGHT);
        assert.isDefined(M.PageTransitions.CONST.ROOM_TO_TOP);
        assert.isDefined(M.PageTransitions.CONST.ROOM_TO_BOTTOM);
        assert.isDefined(M.PageTransitions.CONST.CUBE_TO_LEFT);
        assert.isDefined(M.PageTransitions.CONST.CUBE_TO_RIGHT);
        assert.isDefined(M.PageTransitions.CONST.CUBE_TO_TOP);
        assert.isDefined(M.PageTransitions.CONST.CUBE_TO_BOTTOM);
        assert.isDefined(M.PageTransitions.CONST.CAROUSEL_TO_LEFT);
        assert.isDefined(M.PageTransitions.CONST.CAROUSEL_TO_RIGHT);
        assert.isDefined(M.PageTransitions.CONST.CAROUSEL_TO_TOP);
        assert.isDefined(M.PageTransitions.CONST.CAROUSEL_TO_BOTTOM);
        assert.isDefined(M.PageTransitions.CONST.SIDES);
        assert.isDefined(M.PageTransitions.CONST.SLIDE);

        assert.isString(M.PageTransitions.CONST.NONE);
        assert.isString(M.PageTransitions.CONST.MOVE_TO_LEFT_FROM_RIGHT);
        assert.isString(M.PageTransitions.CONST.MOVE_TO_RIGHT_FROM_LEFT);
        assert.isString(M.PageTransitions.CONST.MOVE_TO_TOP_FROM_BOTTOM);
        assert.isString(M.PageTransitions.CONST.MOVE_TO_BOTTOM_FROM_TOP);
        assert.isString(M.PageTransitions.CONST.FADE_FROM_RIGHT);
        assert.isString(M.PageTransitions.CONST.FADE_FROM_LEFT);
        assert.isString(M.PageTransitions.CONST.FADE_FROM_BOTTOM);
        assert.isString(M.PageTransitions.CONST.FADE_FROM_TOP);
        assert.isString(M.PageTransitions.CONST.FADE_LEFT_FADE_RIGHT);
        assert.isString(M.PageTransitions.CONST.FADE_RIGHT_FADE_LEFT);
        assert.isString(M.PageTransitions.CONST.FADE_TOP_FADE_BOTTOM);
        assert.isString(M.PageTransitions.CONST.FADE_BOTTOM_FADE_TOP);
        assert.isString(M.PageTransitions.CONST.DIFFERENT_EASING_FROM_RIGHT);
        assert.isString(M.PageTransitions.CONST.DIFFERENT_EASING_FROM_LEFT);
        assert.isString(M.PageTransitions.CONST.DIFFERENT_EASING_FROM_BOTTOM);
        assert.isString(M.PageTransitions.CONST.DIFFERENT_EASING_FROM_TOP);
        assert.isString(M.PageTransitions.CONST.SCALE_DOWN_FROM_RIGHT);
        assert.isString(M.PageTransitions.CONST.SCALE_DOWN_FROM_LEFT);
        assert.isString(M.PageTransitions.CONST.SCALE_DOWN_FROM_BOTTOM);
        assert.isString(M.PageTransitions.CONST.SCALE_DOWN_FROM_TOP);
        assert.isString(M.PageTransitions.CONST.SCALE_DOWN_SCALE_DOWN);
        assert.isString(M.PageTransitions.CONST.SCALE_UP_SCALE_UP);
        assert.isString(M.PageTransitions.CONST.MOVE_TO_LEFT_SCALE_UP);
        assert.isString(M.PageTransitions.CONST.MOVE_TO_RIGHT_SCALE_UP);
        assert.isString(M.PageTransitions.CONST.MOVE_TO_TOP_SCALE_UP);
        assert.isString(M.PageTransitions.CONST.MOVE_TO_BOTTOM_SCALE_UP);
        assert.isString(M.PageTransitions.CONST.SCALE_DOWN_SCALE_UP);
        assert.isString(M.PageTransitions.CONST.GLUE_LEFT_FROM_RIGHT);
        assert.isString(M.PageTransitions.CONST.GLUE_RIGHT_FROM_LEFT);
        assert.isString(M.PageTransitions.CONST.GLUE_BOTTOM_FROM_TOP);
        assert.isString(M.PageTransitions.CONST.GLUE_TOP_FROM_BOTTOM);
        assert.isString(M.PageTransitions.CONST.FLIP_RIGHT);
        assert.isString(M.PageTransitions.CONST.FLIP_LEFT);
        assert.isString(M.PageTransitions.CONST.FLIP_TOP);
        assert.isString(M.PageTransitions.CONST.FLIP_BOTTOM);
        assert.isString(M.PageTransitions.CONST.FALL);
        assert.isString(M.PageTransitions.CONST.NEWSPAPER);
        assert.isString(M.PageTransitions.CONST.PUSH_LEFT_FROM_RIGHT);
        assert.isString(M.PageTransitions.CONST.PUSH_RIGHT_FROM_LEFT);
        assert.isString(M.PageTransitions.CONST.PUSH_TOP_FROM_BOTTOM);
        assert.isString(M.PageTransitions.CONST.PUSH_BOTTOM_FROM_TOP);
        assert.isString(M.PageTransitions.CONST.PUSH_LEFT_PULL_RIGHT);
        assert.isString(M.PageTransitions.CONST.PUSH_RIGHT_PULL_LEFT);
        assert.isString(M.PageTransitions.CONST.PUSH_TOP_PULL_BOTTOM);
        assert.isString(M.PageTransitions.CONST.PUSH_BOTTOM_PULL_TOP);
        assert.isString(M.PageTransitions.CONST.FOLD_LEFT_FROM_RIGHT);
        assert.isString(M.PageTransitions.CONST.FOLD_RIGHT_FROM_LEFT);
        assert.isString(M.PageTransitions.CONST.FOLD_TOP_FROM_BOTTOM);
        assert.isString(M.PageTransitions.CONST.FOLD_BOTTOM_FROM_TOP);
        assert.isString(M.PageTransitions.CONST.MOVE_TO_RIGHT_UNFOLD_LEFT);
        assert.isString(M.PageTransitions.CONST.MOVE_TO_LEFT_UNFOLD_RIGHT);
        assert.isString(M.PageTransitions.CONST.MOVE_TO_BOTTOM_UNFOLD_TOP);
        assert.isString(M.PageTransitions.CONST.MOVE_TO_TOP_UNFOLD_BOTTOM);
        assert.isString(M.PageTransitions.CONST.ROOM_TO_LEFT);
        assert.isString(M.PageTransitions.CONST.ROOM_TO_RIGHT);
        assert.isString(M.PageTransitions.CONST.ROOM_TO_TOP);
        assert.isString(M.PageTransitions.CONST.ROOM_TO_BOTTOM);
        assert.isString(M.PageTransitions.CONST.CUBE_TO_LEFT);
        assert.isString(M.PageTransitions.CONST.CUBE_TO_RIGHT);
        assert.isString(M.PageTransitions.CONST.CUBE_TO_TOP);
        assert.isString(M.PageTransitions.CONST.CUBE_TO_BOTTOM);
        assert.isString(M.PageTransitions.CONST.CAROUSEL_TO_LEFT);
        assert.isString(M.PageTransitions.CONST.CAROUSEL_TO_RIGHT);
        assert.isString(M.PageTransitions.CONST.CAROUSEL_TO_TOP);
        assert.isString(M.PageTransitions.CONST.CAROUSEL_TO_BOTTOM);
        assert.isString(M.PageTransitions.CONST.SIDES);
        assert.isString(M.PageTransitions.CONST.SLIDE);

        assert.equal(M.PageTransitions.CONST.NONE, 'none');
        assert.equal(M.PageTransitions.CONST.MOVE_TO_LEFT_FROM_RIGHT, 'm-page-moveToLeft|m-page-moveFromRight');
        assert.equal(M.PageTransitions.CONST.MOVE_TO_RIGHT_FROM_LEFT, 'm-page-moveToRight|m-page-moveFromLeft');
        assert.equal(M.PageTransitions.CONST.MOVE_TO_TOP_FROM_BOTTOM, 'm-page-moveToTop|m-page-moveFromBottom');
        assert.equal(M.PageTransitions.CONST.MOVE_TO_BOTTOM_FROM_TOP, 'm-page-moveToBottom|m-page-moveFromTop');
        assert.equal(M.PageTransitions.CONST.FADE_FROM_RIGHT, 'm-page-fade|m-page-moveFromRight m-page-ontop');
        assert.equal(M.PageTransitions.CONST.FADE_FROM_LEFT, 'm-page-fade|m-page-moveFromLeft m-page-ontop');
        assert.equal(M.PageTransitions.CONST.FADE_FROM_BOTTOM, 'm-page-fade|m-page-moveFromBottom m-page-ontop');
        assert.equal(M.PageTransitions.CONST.FADE_FROM_TOP, 'm-page-fade|m-page-moveFromTop m-page-ontop');
        assert.equal(M.PageTransitions.CONST.FADE_LEFT_FADE_RIGHT, 'm-page-moveToLeftFade|m-page-moveFromRightFade');
        assert.equal(M.PageTransitions.CONST.FADE_RIGHT_FADE_LEFT, 'm-page-moveToRightFade|m-page-moveFromLeftFade');
        assert.equal(M.PageTransitions.CONST.FADE_TOP_FADE_BOTTOM, 'm-page-moveToTopFade|m-page-moveFromBottomFade');
        assert.equal(M.PageTransitions.CONST.FADE_BOTTOM_FADE_TOP, 'm-page-moveToBottomFade|m-page-moveFromTopFade');
        assert.equal(M.PageTransitions.CONST.DIFFERENT_EASING_FROM_RIGHT, 'm-page-moveToLeftEasing m-page-ontop|m-page-moveFromRight');
        assert.equal(M.PageTransitions.CONST.DIFFERENT_EASING_FROM_LEFT, 'm-page-moveToRightEasing m-page-ontop|m-page-moveFromLeft');
        assert.equal(M.PageTransitions.CONST.DIFFERENT_EASING_FROM_BOTTOM, 'm-page-moveToTopEasing m-page-ontop|m-page-moveFromBottom');
        assert.equal(M.PageTransitions.CONST.DIFFERENT_EASING_FROM_TOP, 'm-page-moveToBottomEasing m-page-ontop|m-page-moveFromTop');
        assert.equal(M.PageTransitions.CONST.SCALE_DOWN_FROM_RIGHT, 'm-page-scaleDown|m-page-moveFromRight m-page-ontop');
        assert.equal(M.PageTransitions.CONST.SCALE_DOWN_FROM_LEFT, 'm-page-scaleDown|m-page-moveFromLeft m-page-ontop');
        assert.equal(M.PageTransitions.CONST.SCALE_DOWN_FROM_BOTTOM, 'm-page-scaleDown|m-page-moveFromBottom m-page-ontop');
        assert.equal(M.PageTransitions.CONST.SCALE_DOWN_FROM_TOP, 'm-page-scaleDown|m-page-moveFromTop m-page-ontop');
        assert.equal(M.PageTransitions.CONST.SCALE_DOWN_SCALE_DOWN, 'm-page-scaleDown|m-page-scaleUpDown m-page-delay300');
        assert.equal(M.PageTransitions.CONST.SCALE_UP_SCALE_UP, 'm-page-scaleDownUp|m-page-scaleUp m-page-delay300');
        assert.equal(M.PageTransitions.CONST.MOVE_TO_LEFT_SCALE_UP, 'm-page-moveToLeft m-page-ontop|m-page-scaleUp');
        assert.equal(M.PageTransitions.CONST.MOVE_TO_RIGHT_SCALE_UP, 'm-page-moveToRight m-page-ontop|m-page-scaleUp');
        assert.equal(M.PageTransitions.CONST.MOVE_TO_TOP_SCALE_UP, 'm-page-moveToTop m-page-ontop|m-page-scaleUp');
        assert.equal(M.PageTransitions.CONST.MOVE_TO_BOTTOM_SCALE_UP, 'm-page-moveToBottom m-page-ontop|m-page-scaleUp');
        assert.equal(M.PageTransitions.CONST.SCALE_DOWN_SCALE_UP, 'm-page-scaleDownCenter|m-page-scaleUpCenter m-page-delay400');
        assert.equal(M.PageTransitions.CONST.GLUE_LEFT_FROM_RIGHT, 'm-page-rotateRightSideFirst|m-page-moveFromRight m-page-delay200 m-page-ontop');
        assert.equal(M.PageTransitions.CONST.GLUE_RIGHT_FROM_LEFT, 'm-page-rotateLeftSideFirst|m-page-moveFromLeft m-page-delay200 m-page-ontop');
        assert.equal(M.PageTransitions.CONST.GLUE_BOTTOM_FROM_TOP, 'm-page-rotateTopSideFirst|m-page-moveFromTop m-page-delay200 m-page-ontop');
        assert.equal(M.PageTransitions.CONST.GLUE_TOP_FROM_BOTTOM, 'm-page-rotateBottomSideFirst|m-page-moveFromBottom m-page-delay200 m-page-ontop');
        assert.equal(M.PageTransitions.CONST.FLIP_RIGHT, 'm-page-flipOutRight|m-page-flipInLeft m-page-delay500');
        assert.equal(M.PageTransitions.CONST.FLIP_LEFT, 'm-page-flipOutLeft|m-page-flipInRight m-page-delay500');
        assert.equal(M.PageTransitions.CONST.FLIP_TOP, 'm-page-flipOutTop|m-page-flipInBottom m-page-delay500');
        assert.equal(M.PageTransitions.CONST.FLIP_BOTTOM, 'm-page-flipOutBottom|m-page-flipInTop m-page-delay500');
        assert.equal(M.PageTransitions.CONST.FALL, 'm-page-rotateFall m-page-ontop|m-page-scaleUp');
        assert.equal(M.PageTransitions.CONST.NEWSPAPER, 'm-page-rotateOutNewspaper|m-page-rotateInNewspaper m-page-delay500');
        assert.equal(M.PageTransitions.CONST.PUSH_LEFT_FROM_RIGHT, 'm-page-rotatePushLeft|m-page-moveFromRight');
        assert.equal(M.PageTransitions.CONST.PUSH_RIGHT_FROM_LEFT, 'm-page-rotatePushRight|m-page-moveFromLeft');
        assert.equal(M.PageTransitions.CONST.PUSH_TOP_FROM_BOTTOM, 'm-page-rotatePushTop|m-page-moveFromBottom');
        assert.equal(M.PageTransitions.CONST.PUSH_BOTTOM_FROM_TOP, 'm-page-rotatePushBottom|m-page-moveFromTop');
        assert.equal(M.PageTransitions.CONST.PUSH_LEFT_PULL_RIGHT, 'm-page-rotatePushLeft|m-page-rotatePullRight m-page-delay180');
        assert.equal(M.PageTransitions.CONST.PUSH_RIGHT_PULL_LEFT, 'm-page-rotatePushRight|m-page-rotatePullLeft m-page-delay180');
        assert.equal(M.PageTransitions.CONST.PUSH_TOP_PULL_BOTTOM, 'm-page-rotatePushTop|m-page-rotatePullBottom m-page-delay180');
        assert.equal(M.PageTransitions.CONST.PUSH_BOTTOM_PULL_TOP, 'm-page-rotatePushBottom|m-page-rotatePullTop m-page-delay180');
        assert.equal(M.PageTransitions.CONST.FOLD_LEFT_FROM_RIGHT, 'm-page-rotateFoldLeft|m-page-moveFromRightFade');
        assert.equal(M.PageTransitions.CONST.FOLD_RIGHT_FROM_LEFT, 'm-page-rotateFoldRight|m-page-moveFromLeftFade');
        assert.equal(M.PageTransitions.CONST.FOLD_TOP_FROM_BOTTOM, 'm-page-rotateFoldTop|m-page-moveFromBottomFade');
        assert.equal(M.PageTransitions.CONST.FOLD_BOTTOM_FROM_TOP, 'm-page-rotateFoldBottom|m-page-moveFromTopFade');
        assert.equal(M.PageTransitions.CONST.MOVE_TO_RIGHT_UNFOLD_LEFT, 'm-page-moveToRightFade|m-page-rotateUnfoldLeft');
        assert.equal(M.PageTransitions.CONST.MOVE_TO_LEFT_UNFOLD_RIGHT, 'm-page-moveToLeftFade|m-page-rotateUnfoldRight');
        assert.equal(M.PageTransitions.CONST.MOVE_TO_BOTTOM_UNFOLD_TOP, 'm-page-moveToBottomFade|m-page-rotateUnfoldTop');
        assert.equal(M.PageTransitions.CONST.MOVE_TO_TOP_UNFOLD_BOTTOM, 'm-page-moveToTopFade|m-page-rotateUnfoldBottom');
        assert.equal(M.PageTransitions.CONST.ROOM_TO_LEFT, 'm-page-rotateRoomLeftOut m-page-ontop|m-page-rotateRoomLeftIn');
        assert.equal(M.PageTransitions.CONST.ROOM_TO_RIGHT, 'm-page-rotateRoomRightOut m-page-ontop|m-page-rotateRoomRightIn');
        assert.equal(M.PageTransitions.CONST.ROOM_TO_TOP, 'm-page-rotateRoomTopOut m-page-ontop|m-page-rotateRoomTopIn');
        assert.equal(M.PageTransitions.CONST.ROOM_TO_BOTTOM, 'm-page-rotateRoomBottomOut m-page-ontop|m-page-rotateRoomBottomIn');
        assert.equal(M.PageTransitions.CONST.CUBE_TO_LEFT, 'm-page-rotateCubeLeftOut m-page-ontop|m-page-rotateCubeLeftIn');
        assert.equal(M.PageTransitions.CONST.CUBE_TO_RIGHT, 'm-page-rotateCubeRightOut m-page-ontop|m-page-rotateCubeRightIn');
        assert.equal(M.PageTransitions.CONST.CUBE_TO_TOP, 'm-page-rotateCubeTopOut m-page-ontop|m-page-rotateCubeTopIn');
        assert.equal(M.PageTransitions.CONST.CUBE_TO_BOTTOM, 'm-page-rotateCubeBottomOut m-page-ontop|m-page-rotateCubeBottomIn');
        assert.equal(M.PageTransitions.CONST.CAROUSEL_TO_LEFT, 'm-page-rotateCarouselLeftOut m-page-ontop|m-page-rotateCarouselLeftIn');
        assert.equal(M.PageTransitions.CONST.CAROUSEL_TO_RIGHT, 'm-page-rotateCarouselRightOut m-page-ontop|m-page-rotateCarouselRightIn');
        assert.equal(M.PageTransitions.CONST.CAROUSEL_TO_TOP, 'm-page-rotateCarouselTopOut m-page-ontop|m-page-rotateCarouselTopIn');
        assert.equal(M.PageTransitions.CONST.CAROUSEL_TO_BOTTOM, 'm-page-rotateCarouselBottomOut m-page-ontop|m-page-rotateCarouselBottomIn');
        assert.equal(M.PageTransitions.CONST.SIDES, 'm-page-rotateSidesOut|m-page-rotateSidesIn m-page-delay200');
        assert.equal(M.PageTransitions.CONST.SLIDE, 'm-page-rotateSlideOut|m-page-rotateSlideIn');
    });

    it('properties', function () {
        assert.isDefined(M.PageTransitions._main);
        assert.isDefined(M.PageTransitions._pages);
        assert.isDefined(M.PageTransitions._pagesCount);
        assert.isDefined(M.PageTransitions._current);
        assert.isDefined(M.PageTransitions._isAnimating);
        assert.isDefined(M.PageTransitions._endCurrPage);
        assert.isDefined(M.PageTransitions._endNextPage);

        assert.isNull(M.PageTransitions._main);
        assert.isNull(M.PageTransitions._pages);
        assert.isNumber(M.PageTransitions._pagesCount);
        assert.isNumber(M.PageTransitions._current);
        assert.isBoolean(M.PageTransitions._isAnimating);
        assert.isBoolean(M.PageTransitions._endCurrPage);
        assert.isBoolean(M.PageTransitions._endNextPage);
    });

    it('methods', function () {
        assert.isDefined(M.PageTransitions.init);
        assert.isDefined(M.PageTransitions.startTransition);
        assert.isDefined(M.PageTransitions._onEndAnimation);
        assert.isDefined(M.PageTransitions._resetPage);

        assert.isFunction(M.PageTransitions.init);
        assert.isFunction(M.PageTransitions.startTransition);
        assert.isFunction(M.PageTransitions._onEndAnimation);
        assert.isFunction(M.PageTransitions._resetPage);
    });

    it('init layout', function () {

        var page1 = M.View.create({
            value: 'TestPageAContent'
        });

        var page2 = M.View.create({
            value: 'TestPageBContent'
        });

        ctrl = M.Controller.design({
            applicationStart: function () {
                testLayout = M.SwitchLayout.extend().create(this, null, true);
                testLayout.applyViews({
                    content: page1
                }).render();
                $stage.html(testLayout.$el);
            },
            show: function () {
                testLayout.applyViews({
                    content: page2
                });
                testLayout.startTransition({
                    transition: M.PageTransitions.CONST.MOVE_TO_LEFT_FROM_RIGHT
                });
            }
        });
        ctrl.applicationStart();

        assert.lengthOf($('.m-page', $stage), 2);
        assert.lengthOf($('.m-page-current', $stage), 1);
        assert.equal($(".m-page-current .view div", $stage).html(), 'TestPageAContent');
    });

    it('make transition', function (done) {
        this.timeout(2500);
        $('.m-page-2', $stage).on("animationend webkitAnimationEnd", function () {
            setTimeout(function () {
                assert.lengthOf($('.m-page', $stage), 2);
                assert.lengthOf($('.m-page-current', $stage), 1);
                assert.equal($(".m-page-current .view div", $stage).html(), 'TestPageBContent');

                done();
            }, 10)
        });

        ctrl.show();
    });

    it('Create an instance', function() {
        var a = M.Transitions.design();
        var b = M.Transitions.design();

        assert.isFalse(a === b);

        a.init();
        assert.isNull(b._pages);

        assert.isDefined(a._pages);
        assert.isDefined(a._pages[0]);
        assert.lengthOf(a._pages, 2);
    });

});
