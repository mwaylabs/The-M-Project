// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      12.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.DataRequestSampleController = M.Controller.extend({

    markupValue: null,

    titleValue: null,

    getRequest: function() {
        var keyword = M.ViewManager.getView('dataRequestSample', 'keywordField').value;               

        // use 'html5' as keyword if no keyword entered
        keyword = keyword == '' || !keyword ? 'html5' : keyword;

        this.set('titleValue', 'The latest tweets for: ' + keyword);

        that = this;

        M.Request.init({
            url: 'http://search.twitter.com/search.json?q=' + keyword + '&rpp=10',
            method: 'GET',
            isJSON: YES,
            contentType: 'application/JSON',
            timeout: 5000,
            onSuccess: function(data) {
                // hide the loader when request is completed
                M.LoaderView.hide();
                
                that.showResponse(data);
            },
            onError: function(req, msg) {
                // hide the loader when request is completed
                M.LoaderView.hide();
            },
            beforeSend: function() {
                M.LoaderView.show();
            }
        }).send();   
    },

    showResponse: function(data) {

        var response = '-';

        if(data) {
            response = '';
            _.each(data.results, function(res) {
                response += res.created_at + '\n';
                response += '<img src="' + res.profile_image_url +  '"/img><span class="twitter_user_name">' + res.from_user + '</span>: ' + res.text + '\n\n';
            });
            response = response.substring(0,response.length - 2); // delete last two \n
        }

        this.set('markupValue', response);
        //M.ViewManager.getView('dataRequestSample', 'markup').setValue('data');
    },

    showError: function(req, msg) {
        this.set('markupValue', msg);
    }
    
});
