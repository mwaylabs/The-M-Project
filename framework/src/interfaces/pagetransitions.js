

//Thanks to: https://github.com/codrops/PageTransitions

(function( scope ) {

    M.PageTransitions = M.Object.extend({

        main: null,
        iterate: null,
        pages: null,
        animcursor: 1,
        pagesCount: 0,
        current: 0,
        isAnimating: false,
        endCurrPage: false,
        endNextPage: false,
        animEndEventNames: {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        },

        support: Modernizr.cssanimations,

        init: function(main) {
            this.animEndEventName = this.animEndEventNames[ Modernizr.prefixed('animation') ];
            this.main = main ? main.find('#m-main') : $('#m-main');
            this.pages = this.main.children('div.m-page');
            this.pagesCount = this.pages.length;

            this.pages.each(function() {
                var page = $(this);
                page.data('originalClassList', page.attr('class'));
            });

            this.pages.eq(this.current).addClass('m-page-current');
        },

        switchToNextPage: function() {
            if( this.isAnimating ) {
                return false;
            }
            if( this.animcursor > 67 ) {
                this.animcursor = 1;
            }
            this.nextPage(this.animcursor);
            this.animcursor += 1;
        },

        nextPage: function(animation) {
            if( this.isAnimating ) {
                return false;
            }

            this.isAnimating = true;

            var currPage = this.pages.eq(this.current);

            if( this.current < this.pagesCount - 1 ) {
                this.current += 1;
            } else {
                this.current = 0;
            }

            var nextPage = this.pages.eq(this.current).addClass('m-page-current'), outClass = '', inClass = '';

            switch( animation ) {

                case 1:
                    outClass = 'm-page-moveToLeft';
                    inClass = 'm-page-moveFromRight';
                    break;
                case 2:
                    outClass = 'm-page-moveToRight';
                    inClass = 'm-page-moveFromLeft';
                    break;
                case 3:
                    outClass = 'm-page-moveToTop';
                    inClass = 'm-page-moveFromBottom';
                    break;
                case 4:
                    outClass = 'm-page-moveToBottom';
                    inClass = 'm-page-moveFromTop';
                    break;
                case 5:
                    outClass = 'm-page-fade';
                    inClass = 'm-page-moveFromRight m-page-ontop';
                    break;
                case 6:
                    outClass = 'm-page-fade';
                    inClass = 'm-page-moveFromLeft m-page-ontop';
                    break;
                case 7:
                    outClass = 'm-page-fade';
                    inClass = 'm-page-moveFromBottom m-page-ontop';
                    break;
                case 8:
                    outClass = 'm-page-fade';
                    inClass = 'm-page-moveFromTop m-page-ontop';
                    break;
                case 9:
                    outClass = 'm-page-moveToLeftFade';
                    inClass = 'm-page-moveFromRightFade';
                    break;
                case 10:
                    outClass = 'm-page-moveToRightFade';
                    inClass = 'm-page-moveFromLeftFade';
                    break;
                case 11:
                    outClass = 'm-page-moveToTopFade';
                    inClass = 'm-page-moveFromBottomFade';
                    break;
                case 12:
                    outClass = 'm-page-moveToBottomFade';
                    inClass = 'm-page-moveFromTopFade';
                    break;
                case 13:
                    outClass = 'm-page-moveToLeftEasing m-page-ontop';
                    inClass = 'm-page-moveFromRight';
                    break;
                case 14:
                    outClass = 'm-page-moveToRightEasing m-page-ontop';
                    inClass = 'm-page-moveFromLeft';
                    break;
                case 15:
                    outClass = 'm-page-moveToTopEasing m-page-ontop';
                    inClass = 'm-page-moveFromBottom';
                    break;
                case 16:
                    outClass = 'm-page-moveToBottomEasing m-page-ontop';
                    inClass = 'm-page-moveFromTop';
                    break;
                case 17:
                    outClass = 'm-page-scaleDown';
                    inClass = 'm-page-moveFromRight m-page-ontop';
                    break;
                case 18:
                    outClass = 'm-page-scaleDown';
                    inClass = 'm-page-moveFromLeft m-page-ontop';
                    break;
                case 19:
                    outClass = 'm-page-scaleDown';
                    inClass = 'm-page-moveFromBottom m-page-ontop';
                    break;
                case 20:
                    outClass = 'm-page-scaleDown';
                    inClass = 'm-page-moveFromTop m-page-ontop';
                    break;
                case 21:
                    outClass = 'm-page-scaleDown';
                    inClass = 'm-page-scaleUpDown m-page-delay300';
                    break;
                case 22:
                    outClass = 'm-page-scaleDownUp';
                    inClass = 'm-page-scaleUp m-page-delay300';
                    break;
                case 23:
                    outClass = 'm-page-moveToLeft m-page-ontop';
                    inClass = 'm-page-scaleUp';
                    break;
                case 24:
                    outClass = 'm-page-moveToRight m-page-ontop';
                    inClass = 'm-page-scaleUp';
                    break;
                case 25:
                    outClass = 'm-page-moveToTop m-page-ontop';
                    inClass = 'm-page-scaleUp';
                    break;
                case 26:
                    outClass = 'm-page-moveToBottom m-page-ontop';
                    inClass = 'm-page-scaleUp';
                    break;
                case 27:
                    outClass = 'm-page-scaleDownCenter';
                    inClass = 'm-page-scaleUpCenter m-page-delay400';
                    break;
                case 28:
                    outClass = 'm-page-rotateRightSideFirst';
                    inClass = 'm-page-moveFromRight m-page-delay200 m-page-ontop';
                    break;
                case 29:
                    outClass = 'm-page-rotateLeftSideFirst';
                    inClass = 'm-page-moveFromLeft m-page-delay200 m-page-ontop';
                    break;
                case 30:
                    outClass = 'm-page-rotateTopSideFirst';
                    inClass = 'm-page-moveFromTop m-page-delay200 m-page-ontop';
                    break;
                case 31:
                    outClass = 'm-page-rotateBottomSideFirst';
                    inClass = 'm-page-moveFromBottom m-page-delay200 m-page-ontop';
                    break;
                case 32:
                    outClass = 'm-page-flipOutRight';
                    inClass = 'm-page-flipInLeft m-page-delay500';
                    break;
                case 33:
                    outClass = 'm-page-flipOutLeft';
                    inClass = 'm-page-flipInRight m-page-delay500';
                    break;
                case 34:
                    outClass = 'm-page-flipOutTop';
                    inClass = 'm-page-flipInBottom m-page-delay500';
                    break;
                case 35:
                    outClass = 'm-page-flipOutBottom';
                    inClass = 'm-page-flipInTop m-page-delay500';
                    break;
                case 36:
                    outClass = 'm-page-rotateFall m-page-ontop';
                    inClass = 'm-page-scaleUp';
                    break;
                case 37:
                    outClass = 'm-page-rotateOutNewspaper';
                    inClass = 'm-page-rotateInNewspaper m-page-delay500';
                    break;
                case 38:
                    outClass = 'm-page-rotatePushLeft';
                    inClass = 'm-page-moveFromRight';
                    break;
                case 39:
                    outClass = 'm-page-rotatePushRight';
                    inClass = 'm-page-moveFromLeft';
                    break;
                case 40:
                    outClass = 'm-page-rotatePushTop';
                    inClass = 'm-page-moveFromBottom';
                    break;
                case 41:
                    outClass = 'm-page-rotatePushBottom';
                    inClass = 'm-page-moveFromTop';
                    break;
                case 42:
                    outClass = 'm-page-rotatePushLeft';
                    inClass = 'm-page-rotatePullRight m-page-delay180';
                    break;
                case 43:
                    outClass = 'm-page-rotatePushRight';
                    inClass = 'm-page-rotatePullLeft m-page-delay180';
                    break;
                case 44:
                    outClass = 'm-page-rotatePushTop';
                    inClass = 'm-page-rotatePullBottom m-page-delay180';
                    break;
                case 45:
                    outClass = 'm-page-rotatePushBottom';
                    inClass = 'm-page-rotatePullTop m-page-delay180';
                    break;
                case 46:
                    outClass = 'm-page-rotateFoldLeft';
                    inClass = 'm-page-moveFromRightFade';
                    break;
                case 47:
                    outClass = 'm-page-rotateFoldRight';
                    inClass = 'm-page-moveFromLeftFade';
                    break;
                case 48:
                    outClass = 'm-page-rotateFoldTop';
                    inClass = 'm-page-moveFromBottomFade';
                    break;
                case 49:
                    outClass = 'm-page-rotateFoldBottom';
                    inClass = 'm-page-moveFromTopFade';
                    break;
                case 50:
                    outClass = 'm-page-moveToRightFade';
                    inClass = 'm-page-rotateUnfoldLeft';
                    break;
                case 51:
                    outClass = 'm-page-moveToLeftFade';
                    inClass = 'm-page-rotateUnfoldRight';
                    break;
                case 52:
                    outClass = 'm-page-moveToBottomFade';
                    inClass = 'm-page-rotateUnfoldTop';
                    break;
                case 53:
                    outClass = 'm-page-moveToTopFade';
                    inClass = 'm-page-rotateUnfoldBottom';
                    break;
                case 54:
                    outClass = 'm-page-rotateRoomLeftOut m-page-ontop';
                    inClass = 'm-page-rotateRoomLeftIn';
                    break;
                case 55:
                    outClass = 'm-page-rotateRoomRightOut m-page-ontop';
                    inClass = 'm-page-rotateRoomRightIn';
                    break;
                case 56:
                    outClass = 'm-page-rotateRoomTopOut m-page-ontop';
                    inClass = 'm-page-rotateRoomTopIn';
                    break;
                case 57:
                    outClass = 'm-page-rotateRoomBottomOut m-page-ontop';
                    inClass = 'm-page-rotateRoomBottomIn';
                    break;
                case 58:
                    outClass = 'm-page-rotateCubeLeftOut m-page-ontop';
                    inClass = 'm-page-rotateCubeLeftIn';
                    break;
                case 59:
                    outClass = 'm-page-rotateCubeRightOut m-page-ontop';
                    inClass = 'm-page-rotateCubeRightIn';
                    break;
                case 60:
                    outClass = 'm-page-rotateCubeTopOut m-page-ontop';
                    inClass = 'm-page-rotateCubeTopIn';
                    break;
                case 61:
                    outClass = 'm-page-rotateCubeBottomOut m-page-ontop';
                    inClass = 'm-page-rotateCubeBottomIn';
                    break;
                case 62:
                    outClass = 'm-page-rotateCarouselLeftOut m-page-ontop';
                    inClass = 'm-page-rotateCarouselLeftIn';
                    break;
                case 63:
                    outClass = 'm-page-rotateCarouselRightOut m-page-ontop';
                    inClass = 'm-page-rotateCarouselRightIn';
                    break;
                case 64:
                    outClass = 'm-page-rotateCarouselTopOut m-page-ontop';
                    inClass = 'm-page-rotateCarouselTopIn';
                    break;
                case 65:
                    outClass = 'm-page-rotateCarouselBottomOut m-page-ontop';
                    inClass = 'm-page-rotateCarouselBottomIn';
                    break;
                case 66:
                    outClass = 'm-page-rotateSidesOut';
                    inClass = 'm-page-rotateSidesIn m-page-delay200';
                    break;
                case 67:
                    outClass = 'm-page-rotateSlideOut';
                    inClass = 'm-page-rotateSlideIn';
                    break;
            }

            var that = this;

            $(currPage[0]).on(that.animEndEventName, function() {
                currPage.off(that.animEndEventName);
                that.endCurrPage = true;
                if( that.endNextPage ) {
                    that.onEndAnimation(currPage, nextPage);
                }
            });
            currPage.addClass(outClass);

            $(nextPage[0]).on(that.animEndEventName, function() {
                nextPage.off(that.animEndEventName);
                that.endNextPage = true;
                if( that.endCurrPage ) {
                    that.onEndAnimation(currPage, nextPage);
                }
            });
            nextPage.addClass(inClass);


            $(document).on(this.animEndEventName, function( ev ) {
                that.onEndAnimation(currPage, nextPage);
            });

            if( !this.support ) {
                this.onEndAnimation(currPage, nextPage);
            }
        },

        onEndAnimation: function(outpage, inpage){
            this.endCurrPage = false;
            this.endNextPage = false;

            this.resetPage(outpage, inpage);
            this.isAnimating = false;
        },

        resetPage: function(outpage, inpage){
            outpage.attr('class', outpage.data('originalClassList'));
            inpage.attr('class', inpage.data('originalClassList') + ' m-page-current');
        },

        startTransition: function(){
            this.switchToNextPage();
        }

    });

})(this);