// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      27.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');

/**
 * @class
 *
 * Object for dispatching all incoming events.
 *
 * @extends M.Object
 */
M.EventDispatcher = M.Object.extend(
/** @scope M.EventDispatcher.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.EventDispatcher',

    /**
     * Saves the latest on click event to make sure that there are no multiple events
     * fired for one click.
     *
     * @type {Object}
     */
    lastEvent: {},

    /**
     * This method is used to register events and link them to a corresponding action.
     * 
     * @param {String, Object} eventSource The view's id or a DOM object.
     * @param {Object} events The events to be registered for the given view or DOM object.
     */
    registerEvents: function(eventSource, events, recommendedEvents, sourceType) {
        if(!events || typeof(events) !== 'object') {
            M.Logger.log('No events passed!', M.WARN);
            return;
        }

        if(typeof(eventSource) === 'string') {
            eventSource = $('#' + eventSource + ':first');
        } else {
            eventSource = $(eventSource);
        }

        if(!eventSource) {
            M.Logger.log('The event source is invalid!', M.WARN);
            return;
        }

        _.each(events, function(handler, type) {
            M.EventDispatcher.registerEvent(type, eventSource, handler, recommendedEvents, sourceType, YES);
        });
    },

    /**
     * This method is used to register a certain event for a certain view or DOM object
     * and link them to a corresponding action.
     *
     * @param {String} type The type of the event.
     * @param {String, Object} eventSource The view's id, the view object or a DOM object.
     * @param {Object} handler The handler for the event.
     * @param {Object} recommendedEvents The recommended events for this event source.
     * @param {Object} sourceType The type of the event source.
     * @param {Boolean} isInternalCall The flag to determine whether this is an internal call or not.
     */
    registerEvent: function(type, eventSource, handler, recommendedEvents, sourceType, isInternalCall) {
        if(!isInternalCall) {
            if(!handler || typeof(handler) !== 'object') {
                M.Logger.log('No event passed!', M.WARN);
                return;
            }

            if(typeof(eventSource) === 'string') {
                eventSource = $('#' + eventSource + ':first');
            } else {
                eventSource = $(eventSource);
            }

            if(!eventSource) {
                M.Logger.log('The event source is invalid!', M.WARN);
                return;
            }
        }

        if(!(recommendedEvents && _.indexOf(recommendedEvents, type) > -1)) {
            if(sourceType && typeof(sourceType) === 'string') {
                M.Logger.log('Event type \'' + type + '\' not recommended for ' + sourceType + '!', M.WARN);
            } else {
                M.Logger.log('Event type \'' + type + '\' not recommended!', M.WARN);
            }
        }

        if(typeof(handler.action) === 'string') {
            if(handler.target) {
                if(handler.target[handler.action] && typeof(handler.target[handler.action]) === 'function') {
                    handler.action = handler.target[handler.action];
                } else {
                    M.Logger.log('No action \'' + handler.action + '\' found for given target and the event type \'' + type + '\'!', M.WARN);
                    return;
                }
            } else {
                M.Logger.log('No valid target passed for action \'' + handler.action + '\' and the event type \'' + type + '\'!', M.WARN);
                return;
            }
        } else if(typeof(handler.action) !== 'function') {
            M.Logger.log('No valid action passed for the event type \'' + type + '\'!', M.WARN);
            return;
        }

        var that = this;
        eventSource.bind(type, function(event) {
            event.preventDefault();
            event.stopPropagation();

            /* fix for jqm problem with two times firing pageshow event for the first page */
            if(type == 'pageshow' || type == 'pagebeforeshow') {
                if(that.lastEvent[type] && that.lastEvent[type].timeBetween(M.Date.now()) <= 100) {
                    return;
                } else {
                    that.lastEvent[type] = M.Date.now();
                }
            }

            if(handler.nextEvent) {
                that.bindToCaller(handler.target, handler.action, [event.currentTarget.id ? event.currentTarget.id : event.currentTarget, event, handler.nextEvent])();
            } else {
                that.bindToCaller(handler.target, handler.action, [event.currentTarget.id ? event.currentTarget.id : event.currentTarget, event])();
            }
        });

    },

    callHandler: function(handler, event, passEvent, parameters) {
        if(!passEvent) {
            this.bindToCaller(handler.target, handler.action, parameters)();
        } else {
            this.bindToCaller(handler.target, handler.action, [event.currentTarget.id ? event.currentTarget.id : event.currentTarget, event])();
        }
    }

});