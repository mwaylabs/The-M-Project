// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
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
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.EventDispatcher',

    /**
     * This method is called whenever an event is triggered within the app.
     *
     * @param {Object} evt The event.
     */
    eventDidHappen: function(evt) {
        this.delegateEvent(evt.type, evt.currentTarget.id, evt.keyCode);
    },

    /**
     * This method looks for a corresponding event inside the view manager and
     * delegates the call directly to the responsible controller defined by the
     * target and action properties of the view.
     *
     * @param {String} type The type of event that occured, e.g. 'click'.
     * @param {String} id The id of the element that triggered the event.
     * @param {Number} keyCode The keyCode property of the event, necessary for keypress event, e.g. keyCode is 13 when enter is pressed.
     */
    delegateEvent: function(type, id, keyCode) {
        var view = M.ViewManager.getViewById(id);

        switch(type) {
            case 'click':
                if(view && view.target && view.action) {
                    eval(view.target)[view.action](id);
                }
                break;
            case 'change':
                view.setValueFromDOM();    
                break;
            case 'keyup':
                break;
            case 'keypress':
                break;
        }
    }

});

$(document).ready(function() {
    var eventList = 'click change keyup keypress';
    $('*[id]').bind(eventList, function(evt) { M.EventDispatcher.eventDidHappen(evt); });
});