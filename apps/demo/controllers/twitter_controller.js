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

    numEntries: null,

    numUsers: null,

    performSearch: function(isFirstLoad) {
        if(isFirstLoad) {
            M.Request.init({
                url: 'http://search.twitter.com/search.json?q=vittel&rpp=10',
                //url: '/twitter/search.json?q=vittel&rpp=10',
                isJSON: YES,
                beforeSend: function(req) {
                    //...
                },
                onSuccess: function(data){
                    Demo.TwitterController.set('users', data);
                    Demo.TwitterController.set('numUsers', data.results.length);
                }
            }).send();
        }
    },

    performSearchForUser: function() {
        var n = Math.floor(Math.random()*10 + 1);
        M.Request.init({
            url: 'http://search.twitter.com/search.json?q=' + this.selectedUser + '&rpp=' + n,
            //url: '/twitter/search.json?q=' + this.selectedUser + '&rpp=' + n,
            isJSON: YES,
            beforeSend: function(req) {
                //...
            },
            onSuccess: function(data){
                Demo.TwitterController.set('content', data);
                    
                    Demo.TwitterController.set('numEntries', data.results.length);
            }
        }).send();
    },

    listItemClicked: function(id) {
        this.set('selectedUser', Demo.app.viewManager.getViewById(id).label1.value);
        this.switchToPage(Demo.app.page3);
    }

});