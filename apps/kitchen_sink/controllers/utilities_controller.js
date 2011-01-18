// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      14.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.UtilitiesController = M.Controller.extend({

    utilitiesList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var utilitiesList = [
                {
                    name: "M.I18n: Internationalization",
                    page: "utilitiesI18n"
                }
            ];

            this.set('utilitiesList', utilitiesList);
        }
    },

    utilitySelected: function(id) {
        var utilityName = M.ViewManager.getView(id, 'name').value;
        var utility = _.detect(this.utilitiesList, function(utility) {
            return utility.name === utilityName;
        });

        this.switchToPage(utility.page);
    },

    here: function() {
        this.switchToPage('utilities', M.TRANSITION.SLIDE, YES);
    }

});