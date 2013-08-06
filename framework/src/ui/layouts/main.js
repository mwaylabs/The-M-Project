$(function() {

    var current = 0;
    var $pages = $('.m-perspective').children('div');
    var pagesCount = $pages.length;
    var isAnimating = false;
    var endCurrPage = false;
    var endNextPage = false;
    var animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        };
    var animEndEventName = animEndEventNames['WebkitAnimation'];


    $pages.each(function() {
        var $page = $(this);
        $page.data('originalClassList', $page.attr('class'));
    });

    $pages.eq(current).addClass('m-page-current');


    $('#next').on('click', function() {

        nextPage( 1 );
    });

    $('#prev').on('click', function() {

        nextPage( 2 );
    });


    function nextPage( animation ) {


        if( isAnimating ) {
            return false;
        }

        isAnimating = true;
        $('.m-perspective').addClass('m-perspective-transitioning');


        var $currPage = $pages.eq(current);

        if( current < pagesCount - 1 ) {
            ++current;
        } else {
            current = 0;
        }

        var $nextPage = $pages.eq(current).addClass('m-page-current');
        var outClass = '';
        var inClass = '';

		switch( animation ) {

			case 1:
				outClass = 'm-page-moveToLeft';
				inClass = 'm-page-moveFromRight';

				break;
			case 2:
				outClass = 'm-page-moveToRight';
				inClass = 'm-page-moveFromLeft';
				break;
		}

        $currPage.addClass(outClass).on(animEndEventName, function() {
            $currPage.off(animEndEventName);
            endCurrPage = true;
            if( endNextPage ) {
                onEndAnimation($currPage, $nextPage);
            }
        });

        $nextPage.addClass(inClass).on(animEndEventName, function() {
            $nextPage.off(animEndEventName);
            endNextPage = true;
            if( endCurrPage ) {
                onEndAnimation($currPage, $nextPage);
            }
        });
    }

    function onEndAnimation( $outpage, $inpage ) {
        endCurrPage = false;
        endNextPage = false;
        resetPage($outpage, $inpage);
        isAnimating = false;

    }

    function resetPage( $outpage, $inpage ) {
        $outpage.attr('class', $outpage.data('originalClassList'));
        $inpage.attr('class', $inpage.data('originalClassList') + ' m-page-current');
        $('.m-perspective').removeClass('m-perspective-transitioning');
    }

});