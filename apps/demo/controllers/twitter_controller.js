// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      03.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Demo.TwitterController = M.Controller.extend({

    content: null,

    buttonValue: null,

    performSearch: function(){
        M.Request.init({
            url: 'http://search.twitter.com/search.json?q=vittel',
            isJSON: YES,
            beforeSend: function(req) {
                //...
            },
            onSuccess: function(data){
                Demo.TwitterController.set('content', data);
                Demo.TwitterController.set('buttonValue', 'CLICK ME');
            }
        }).send();
    }

});