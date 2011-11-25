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

    /* disable touch overflow */
    $.mobile.touchOverflowEnabled = false;
});
$(document).ready(function(){
    /* configure jqm */
    $.mobile.touchOverflowEnabled = M.Application.getConfig('enableTouchOverflow') !== undefined ? M.Application.getConfig('enableTouchOverflow') : $.mobile.touchOverflowEnabled;

    /* init pages */
    $.mobile.initializePage();

    /* bind orientation change event */
    $(window).bind('orientationchange', function() {
        $('#' + M.ViewManager.getCurrentPage().id).trigger('orientationchange');
    });
});