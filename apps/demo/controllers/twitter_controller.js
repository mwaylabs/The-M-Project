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

    performSearch: function(){
        M.Request.init({
            url: 'twitter_search.json',
            isJSON: YES,
            beforeSend: function(req) {
                console.log(req);
                console.log("URL: " + req.abort);
            },
            onSuccess: function(data){
               console.log(data);
               console.log("shizzle kam an");
               Demo.TwitterController.set('content', data);
            }
        }).send();
    }

});