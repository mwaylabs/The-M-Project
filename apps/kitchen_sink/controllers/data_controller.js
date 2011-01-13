// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.DataController = M.Controller.extend({

    dataList: null,

    init: function(isFirstLoad) {
        
        if(isFirstLoad) {

            var dataList = [
                {
                    name: "LocalStorage ToDo App Example",
                    page: "dataLocalStorageTaskApp"
                },
                {
                    name: "WebSQL ToDo App Example",
                    page: "dataWebSqlTaskApp"
                },
                {
                    name: "M.Request: Send GET Request",
                    page: "dataRequestSample"
                }
            ];
            
            this.set('dataList', dataList);
        }
    },

    dataSelected: function(id) {
        var dataName = M.ViewManager.getView(id, 'name').value;
        var data = _.detect(this.dataList, function(data) {
            return data.name === dataName;
        });
        
        this.switchToPage(data.page);
    },

    here: function() {
        this.switchToPage('data', M.TRANSITION.SLIDE, YES);
    }

});