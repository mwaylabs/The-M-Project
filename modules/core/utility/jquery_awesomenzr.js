(function( $ ){
    //return the height of an element with the its margin whether it's visible or not
    $.fn.outerMarginHeight = function() {
        if(!this || this.length < 1){
            return null;
        }
        var page = $(this).closest('.ui-page');
        var visible = NO;
        var left = page.css('left');
        if(!page.is(':visible')){
            page.addClass('ui-page-active').css('left', -window.innerWidth*4);
            visible = YES;
        }

        var height = this.outerHeight();
        height += parseInt(this.css('margin-bottom'));
        height += parseInt(this.css('margin-top'));

        if(visible){
            page.removeClass('ui-page-active').css('left', left);
        }
        return height;

    };
    //return the width of an element with the its margin whether it's visible or not
    $.fn.outerMarginWidth = function() {
        if(!this || this.length < 1){
            return null;
        }
        var page = $(this).closest('.ui-page');
        var visible = NO;
        var left = page.css('left');
        if(!page.is(':visible')){
            page.addClass('ui-page-active').css('left', -window.innerWidth*4);
            visible = YES;
        }

        var width = this.outerWidth();
        width += parseInt(this.css('margin-left'));
        width += parseInt(this.css('margin-right'));

        if(visible){
            page.removeClass('ui-page-active').css('left', left);
        }
        return width;

    };

})( jQuery );