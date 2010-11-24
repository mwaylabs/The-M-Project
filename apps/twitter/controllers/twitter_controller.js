// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      03.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Twitter.TwitterController = M.Controller.extend({

    results: null,

    userResults: null,

    searchString: null,

    username: null,

    search: function() {
        //var searchString = Twitter.app.page1.content.searchField.value;
        var searchString = M.ViewManager.getView('page1', 'searchField').value;
        if(!searchString) {
            return;
        }

        M.Request.init({
            url: 'http://search.twitter.com/search.json?q=' + searchString + '&rpp=10',
            //url: '/twitter/search.json?q=' + searchString + '&rpp=10',
            isJSON: YES,
            beforeSend: function(req) {
                //...
            },
            onSuccess: function(data){
                Twitter.TwitterController.set('results', data);
                Twitter.TwitterController.set('searchString', 'Results for \'' + searchString + '\'');
                M.Controller.switchToPage(M.ViewManager.getPage('page2'));
            }
        }).send();
    },

    showUser: function(id) {
        var view = M.ViewManager.getViewById(id);
        var username = M.ViewManager.getView(view, 'label1').value;

        if(!username) {
            return;
        }

        M.Request.init({
            url: 'http://search.twitter.com/search.json?from=' + username + '&rpp=10',
            //url: '/twitter/search.json?from=' + username + '&rpp=10',
            isJSON: YES,
            beforeSend: function(req) {
                //...
            },
            onSuccess: function(data){
                Twitter.TwitterController.set('userResults', data);
                Twitter.TwitterController.set('username', username);
                M.Controller.switchToPage(M.ViewManager.getPage('page3'));
            }
        }).send();
    }

});