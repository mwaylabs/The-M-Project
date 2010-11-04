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

    users: null,

    selectedUser: null,

    content: null,

    performSearch: function(isFirstLoad) {
        if(isFirstLoad) {
            M.Request.init({
                url: 'http://search.twitter.com/search.json?q=vittel',
                isJSON: YES,
                beforeSend: function(req) {
                    //...
                },
                onSuccess: function(data){
                    Demo.TwitterController.set('users', data);
                }
            }).send();
        }
    },

    performSearchForUser: function() {
        M.Request.init({
            url: 'http://search.twitter.com/search.json?q=from%3Aalexiskold',
            isJSON: YES,
            beforeSend: function(req) {
                //...
            },
            onSuccess: function(data){
                Demo.TwitterController.set('content', data);
            }
        }).send();
    },

    listItemClicked: function(id) {
        this.set('selectedUser', Demo.app.viewManager.getViewById(id).label1.value);
        this.switchToView(Demo.app.page3);
    }

});