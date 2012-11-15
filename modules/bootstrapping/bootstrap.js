// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      16.02.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

$(document).bind("mobileinit", function(){
    /* redirect app, if there is already a location hash */
    if(document.location.hash) {
        document.location = document.location.protocol + '//' + document.location.host + document.location.pathname;
    }

    /* disable auto initialize */
    $.mobile.autoInitializePage = false;
});
$(document).ready(function(){
    /* bind the orientationchange event globally */
    M.EventDispatcher.registerEvent(
        'orientationchange',
        $(window),
        {
            target: M.EventDispatcher,
            action: 'dispatchOrientationChangeEvent'
        },
        ['orientationchange'],
        null,
        NO,
        YES
    );

    /* init pages */
    $.mobile.initializePage();


    /* preload images */
    if(M.Application.getConfig('preloadImages') && M.Application.getConfig('imagesToPreload').length) {
        M.ImagePreloader.init({
            images: M.Application.getConfig('imagesToPreload'),
            refId: 'bootstrap',
            events: {
                load: {
                    action: function(imagePath, refId) {
                        M.Logger.info('Image preloading: loaded single file \'' + imagePath + '\' for refId \'' + refId + '\'.');
                    }
                },
                error: {
                    action: function(imagePath, refId) {
                        M.Logger.info('Image preloading: error loading single file \'' + imagePath + '\' for refId \'' + refId + '\'.');
                    }
                },
                finish: {
                    action: function(refId) {
                        M.Logger.info('Image preloading: loaded all file associated with refId \'' + refId + '\'.');
                    }
                }
            }
        }).preload();
    }

    /* dont hide the toolbar, ever */
    $("[data-role=header][data-position=fixed]").fixedtoolbar({ hideDuringFocus: "" });
});