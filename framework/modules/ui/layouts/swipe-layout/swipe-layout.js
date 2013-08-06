define([
    "text!layouts/switch-layout/switch-layout.html", "text!layouts/swipe-layout/swipe-layout.html"
],

    function( switchTemplate, swipeTemplate ) {
        var SwipeLayout = {

            identifier: 'swipe-layout',

            template: swipeTemplate,

            currentPage: '',

            leftPanelIsOpen: null,

            rightThreshold: null,

            applyViews: function( settings ) {
                var current = $('.pt-page-current');
                var next = $('.pt-page:not(.pt-page-current)');
                var selector = '';
                if( current.length < 1 ) {
                    selector = 'pt-page-1';
                } else if( current.hasClass('pt-page-1') ) {
                    selector = 'pt-page-2';
                } else if( current.hasClass('pt-page-2') ) {
                    selector = 'pt-page-1';
                }

                var view = {};
                //                view['.' + selector + ' .content'] = settings.content;
                view['.' + selector + ' .content'] = settings.content;
                if( settings.footer ) {
                    view['.' + selector + ' .footer'] = settings.footer;
                } else {
                    view['.' + selector + ' .footer'] = 'settings.footer';
                }

                return view;
            },

            initialize: function() {
                //TODO! How to do this in the future
                var w = $(window).width();
                this.rightThreshold = (w / 100) * 80;
            },

            toggleRightPanel: function() {
                this.closeLeftPanel();
                $('.right-panel').toggleClass('show');
            },

            closeRightPanel: function() {
                $('.right-panel').removeClass('show');
            },

            toggleLeftPanel: function() {
                this.closeRightPanel();
                if(this.leftPanelIsOpen){
                    this.closeLeftPanel();
                } else {
                    this.openLeftPanel();
                }
            },

            startMoveLeftPanel: function( evt ) {
                if(!evt || !evt.originalEvent){
                    return;
                }
                evt.stopPropagation();
                evt.preventDefault();
                var touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];

                if( this.leftPanelIsOpen ) {
                    this.moveStart = 0;
                } else {
                    this.moveStart = touch.pageX;
                }
            },

            stopMoveLeftPanel: function( evt ) {
                evt.stopPropagation();
                evt.preventDefault();
                $('#pt-main').addClass('easing');

                if( this.leftPanelIsOpen ) {
                    this.closeLeftPanel();
                } else {
                    this.openLeftPanel();
                }

                setTimeout(function() {
                    $('#pt-main').removeClass('easing');
                }, 500);

            },

            moveLeftPanel: function(  evt ) {
//                if(!evt || !evt.originalEvent){
//                    return;
//                }
//                evt.stopPropagation();
//                evt.preventDefault();
                var touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];

                var diff = touch.pageX - this.moveStart;

                console.log(diff);
                if( diff <= 0 ) {
                    diff = 0;
                } else if( diff >= this.rightThreshold ) {
                    diff = this.rightThreshold;
                } else {
                    $('#pt-main').css('-webkit-transform', 'translate3d(' + diff + 'px, 0, 0)');
                }

                //        -webkit-transform: translate3d(80%, 0, 0);
                //        -moz-transform: translate3d(80%, 0, 0);
                //        -ms-transform: translate3d(80%, 0, 0);
                //        -o-transform: translate3d(80%, 0, 0);
                //        transform: translate3d(80%, 0, 0);
            },

            closeLeftPanel: function() {
                //$('.os-bb10 .template-bottom, .os-bb10 .template-right').css('-webkit-transform', 'translate3d(' + 0 + 'px, 0, 0)');
                $('#pt-main').css('-webkit-transform', 'translate3d(' + 0 + 'px, 0, 0)');
                this.leftPanelIsOpen = false;
            },

            openLeftPanel: function() {
                $('#pt-main').css('-webkit-transform', 'translate3d(' + this.rightThreshold + 'px, 0, 0)');
                this.leftPanelIsOpen = true;
            }
        };

        return SwipeLayout;

    });
