// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================


KitchenSink.StorageController = M.Controller.extend({

    storageList: null,

    init: function(isFirstLoad) {
        
        if(isFirstLoad) {

            var storageList = [
                {
                    name: "LocalStorage",
                    page: "storageLocalStorageTaskApp"
                }
            ];
            
            this.set('storageList', storageList);
        }

    },

    storageSelected: function(id) {
        var storageName = M.ViewManager.getView(id, 'name').value;
        var storage = _.detect(this.storageList, function(storage) {
            return storage.name === storageName;
        });
        
        this.switchToPage(storage.page);
    }

});