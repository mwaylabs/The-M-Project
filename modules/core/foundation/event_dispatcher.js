// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      27.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('logger.js');

/**
 * @class
 *
 * Object for dispatching all incoming events.
 *
 */
M.EventDispatcher = M.Object.create({

    /**
     * The lookupTable will automatically be set after all framework-components were loaded.
     * It contains references for all events within an app.
     *
     * @property {Object}
     */
    lookupTable: null,

    /**
     * This method is called whenever an event is triggered within the app.
     *
     * @param {Object} evt The event.
     */
    eventDidHappen: function(evt) {
        //M.Logger.log('M.EventDispatcher.eventDidHappen: (' + evt.currentTarget.id + ' - ' + evt.type + ')');
        this.delegateEvent(evt.currentTarget.id, evt.type);
    },

    /**
     * This method looks for a corresponding event inside the lookup table and then
     * delegates the call directly to the responsible controller.
     *
     * @param {String} id The id of the element that triggered the event.
     * @param {String} type The event type.
     */
    delegateEvent: function(id, type) {
        //M.Logger.log('M.EventDispatcher.getTarget');
        if(this.lookupTable) {
            if(this.lookupTable[id]) {
                if(this.lookupTable[id][type]) {
                    //this.lookupTable[id][type]["target"]();
                    ////M.Logger.log('#######################################');
                    ////M.Logger.log(this.lookupTable[id][type]["target"][this.lookupTable[id][type]["action"]]());
                    ////M.Logger.log('#######################################');
                    this.lookupTable[id][type]["target"][this.lookupTable[id][type]["action"]]();
                } else {
                    //M.Logger.log('event "' + type + '" not found for "' + id + '" in lookupTable', M.ERROR);
                }
            } else {
                //M.Logger.log('"' + id + '" not found in lookupTable', M.ERROR);
            }
        } else {
            //M.Logger.log('lookupTable undefined', M.ERROR);
        }
    }

});

$(document).ready(function() {
    /*
    currently we only register click-events. we need something like $().allEvents.....
     */
    var eventList = 'click mouseenter';
    $('*[id]').bind(eventList, function(evt) { M.EventDispatcher.eventDidHappen(evt); });
    //$('*[data-role = "button"]').click(function(evt) { M.EventDispatcher.eventDidHappen(evt); });
});