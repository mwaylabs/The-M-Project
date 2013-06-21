// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      06.05.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.EventDispatcher is the central instance for registering
 * and delegating DOM and non-UI events to their corresponding target
 * and handler
 *
 * @extends M.Object
 */
(function() {

    M.EventDispatcher = M.Object.extend(/** @scope M.EventDispatcher.prototype */ {

        _type: 'M.EventDispatcher',

        _globalEvents: ['orientationchange', 'resize', 'deviceorientation'], // TODO: make configurable for app devs, e.g. in application config

        _customEvents: {
            enter: {
                type: 'keyup',
                source: {
                    getEventHandler: function() {
                        return function( id, event ) {
                            if( event.which === 13 ) {
                                $('#' + id).trigger('enter');
                            }
                        }
                    }
                }
            }
            //            tap: {
            //                type: 'touchstart',
            //                source: {
            //                    getEventHandler: function() {
            //                        return function( id, event ) {
            //
            //                        }
            //                    }
            //                }
            //            }
        },

        /**
         * Registry for all event handlers for global and UI/DOM events
         *
         * Events are registered in it via M.EventDispatcher#registerEvents
         *
         * Structure:
         *
         * {
     *   <domEventName>: {
     *       <view-id>: {
     *          <handler object>
     *       },
     *       ...
     *   },
     *
     *   <globalEventName>: [
     *      { <handler object> }, { <handler object> }, ...
     *   ]
     * }
         *
         */
        _eventRegistry: null,

        _customEventRegistry: null,

        _init: function() {
            this._eventRegistry = {};
            this._customEventRegistry = {};

            $(document).on('click', function(ev){
                ev.stopPropagation();
                ev.preventDefault();
                return false;
            });

            this._initCustomEvents();
        },

        _initCustomEvents: function() {
            _.each(this._customEvents, function( event ) {
                this.registerEvent(event);
            }, this);
        },

        /**
         * Is called as a handler for events.
         *
         * Delegates event via M.EventDispatcher#delegateEvent
         *
         *
         * @param {Object} evt jQuery event object with target, type, offset etc. see jQuery docs for details
         * @private
         */
        _delegateEvent: function( evt ) {
            M.EventDispatcher.delegateEvent({
                evt: evt
            });
        },

        /**
         * Registers an event of given type in the internal _eventRegistry.
         *
         * Distinguishes between DOM events (touchstart, focus, ...) and global events.
         * DOM events are saved with their referenced view, global events are not bound
         * to a certain view components.
         *
         * All events are bound to document and then passed to delegateEvents which
         * uses the event registry to retrieve the event handler.
         *
         * @param {Object} obj The parameter object. Includes type of event and if DOM event, the view
         *      * {String} type: The type of string, e.g. touchstart
         *      * {Object} source: The source of the event, that becomes the target once the event is triggered, e.g a M.ButtonView
         *
         * @returns {boolean} A flag indicating whether registering was successful or not
         */
        registerEvent: function( obj ) {
            if( !obj.type ) {
                M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_CORE, 'Cannot register event because no event type passed.');
                return NO;
            }

            console.log('register event', obj.type);

            if( !obj.source ) {
                M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_CORE, 'Cannot register event because no event source passed.');
                return NO;
            }

            if( !obj.source.getEventHandler || !_.isFunction(obj.source.getEventHandler) ) {
                M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_CORE, 'Cannot register event because event handler cannot be retrieved due to missing getEventHandler accessor.');
                return NO;
            }

            var eventHandler = obj.source.getEventHandler(obj.type);
            if( !this.checkHandler(eventHandler, obj.type) ) {
                /* Warning messages are printed within checkHandler method */
                return NO;
            }

            /* check if event type is already registered - if not, register to document  */

            if( !this._eventRegistry[obj.type] && obj.type !== 'click' ) {
                $(document).bind(obj.type, this._delegateEvent);
            }

            if( this._isGlobalEvent(obj.type) ) {
                /* case global events (orientationchange, resize, ...) */

                /* create new object for type if not exists yet */
                this._createRegistryEntryForType(obj.type, YES);

                this._eventRegistry[obj.type].push(eventHandler);

            } else {
                /* case UI/DOM events (touchstart, touchmove, focus, ...) */

                try {
                    /* id can be accessed via getId for TMP views or by passing an object with this parameter or explicitly passing an id */
                    var id = _.isFunction(obj.source.getId) ? obj.source.getId() : (obj.source.id ? obj.source.id : obj.id);

                    if( id ) {
                        /* create new object for type if not exists yet */
                        this._createRegistryEntryForType(obj.type);

                        /* save handler under property <view-id> to be able to call it later */
                        this._eventRegistry[obj.type][id] = eventHandler;
                    } else if( this._isUsedForCustomEvent(obj.type) ) {
                        this._customEventRegistry[obj.type] = _.isArray(this._customEventRegistry[obj.type]) ? this._customEventRegistry[obj.type] : [];
                        this._customEventRegistry[obj.type].push(eventHandler);
                    }

                } catch( e ) {
                    M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_CORE, 'Error while trying to register event ' + obj.type + '. ', e);
                    throw M.Exception.INVALID_INPUT_PARAMETER.getException();
                }

            }
            return YES;
        },

        /**
         *
         * @param {Object} obj The parameter object. Includes type of event and if DOM event, the view
         *      * {String} type: The type of string, e.g. touchstart
         *      * {Object} source: The source of the event, that becomes the target once the event is triggered, e.g a M.ButtonView
         * @returns {Boolean} A flag indicating whether registering was successful or not
         */
        unregisterEvent: function( obj ) {

            if( !obj.type ) {
                M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_CORE, 'Cannot unregister event because no event type passed.');
                return NO;
            }

            if( !obj.source ) {
                M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_CORE, 'Cannot register event because no event source passed.');
                return NO;
            }

            if( !this._eventRegistry[obj.type] ) {
                return NO;
            }

            var isLastHandler = NO;

            if( this._isGlobalEvent(obj.type) ) {

                var handler = obj.source.getEventHandler(obj.type);

                /**
                 * Global events are unregistered by comparing each handler with the passed one.
                 * If match, handler at matched index is removed.
                 */
                var index;
                var regHandler;
                for( var i = 0, len = this._eventRegistry[obj.type].length; i < len; i++ ) {
                    regHandler = this._eventRegistry[obj.type][i];
                    if( regHandler === handler ) {
                        index = i;
                        break;
                    }
                }

                if( index || index === 0 ) {
                    this._eventRegistry[obj.type].splice(index, 1);
                    /* check if last handler */
                    isLastHandler = !this._eventRegistry[obj.type].length;
                }

            } else {

                try {
                    /* id can be accessed via getId for TMP views or by passing an object with this parameter or explicitly passing an id */
                    var id = _.isFunction(obj.source.getId) ? obj.source.getId() : (obj.source.id ? obj.source.id : obj.id);

                    /* delete handler from registry */
                    delete this._eventRegistry[obj.type][id];

                    /* check if last handler */
                    isLastHandler = !_.keys(this._eventRegistry[obj.type]).length;

                } catch( e ) {
                    M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_CORE, 'Error while trying to unregister event ' + obj.type + '. ', e);
                    throw M.Exception.INVALID_INPUT_PARAMETER.getException();
                }
            }

            /**
             * If we've unregistered the last event handler, we need to
             * delete the type from event registry and unbind the global handler
             * for this event type from document, too.
             */
            if( isLastHandler ) {
                delete this._eventRegistry[obj.type];
                $(document).unbind(obj.type);
            }
        },

        /**
         * Delegates events to their registered handler.
         *
         * It's safe that the passed event is registered: delegateEvents only
         * called for bound events.
         *
         * Distinguishes between global and DOM events.
         * Handlers for global events are called asynchronously.
         *
         * @param obj Parameter object including the jQuery event object referenced in property evt
         */
        delegateEvent: function( obj ) {
            var that = this;
            var type = obj.evt.type;
            var id = obj.evt.target.id;
            /* check for custom events first */
            if( _.isArray(this._customEventRegistry[type]) ) {
                for( var i = 0, len = this._customEventRegistry[type].length; i < len; i++ ) {
                    console.log(this._customEventRegistry[type], type);
                    (function() {
                        var _id = id;
                        var j = i;
                        window.setTimeout(function() {
                            that.handleCallback(that._customEventRegistry[type][j], _id, obj.evt);
                        }, 0);
                    })();
                }
            }

            if( _.isArray(this._eventRegistry[type]) ) {

                for( var i = 0, len = this._eventRegistry[type].length; i < len; i++ ) {
                    (function() {
                        var _id = id;
                        var j = i;
                        window.setTimeout(function() {
                            that.handleCallback(that._eventRegistry[type][j], _id, obj.evt);
                        }, 0);
                    })();
                }

            } else {
                var target = obj.evt.target;

                /**
                 * Bubbling the event 'til the right element is found,
                 * afterwards, trigger event asynchronously
                 **/
                while( target !== document ) {
                    id = target.id;
                    if( this._eventRegistry[type] && this._eventRegistry[type][id] ) {
                        // TODO: perform tests to prove whether timeout effects performance of event handling in bad ways or not
                        (function() {
                            var _id = id;
                            window.setTimeout(function() {
                                that.handleCallback(that._eventRegistry[type][_id], _id, obj.evt);
                            }, 0);
                        })();
                        break;
                    }
                    target = target.parentNode;
                }
            }
        },

        /**
         * This method is used to check the handler. It tests if target and action are
         * specified correctly.
         *
         * @param {Object} handler The handler for the event.
         * @param {String} type The type of the event.
         * @return {Boolean} Specifies whether or not the check was successful.
         */
        checkHandler: function( handler, type ) {
            if( !_.isFunction(handler) && !_.isString(handler.action) && !_.isFunction(handler.action) ) {

                M.Logger.warn(M.CONST.LOGGER.TAG_FRAMEWORK_CORE, 'No valid handler passed for the event type \'' + type + '\'!');
                return NO

            } else if( _.isString(handler.action) ) {

                if( handler.target ) {
                    if( _.isFunction(handler.target[handler.action]) ) {
                        return YES;
                    } else {
                        M.Logger.warn(M.CONST.LOGGER.TAG_FRAMEWORK_CORE, 'No action \'' + handler.action + '\' found for given target and the event type \'' + type + '\'!');
                        return NO;
                    }
                } else {
                    M.Logger.warn(M.CONST.LOGGER.TAG_FRAMEWORK_CORE, 'No valid target passed for action \'' + handler.action + '\' and the event type \'' + type + '\'!');
                    return NO;
                }

            }

            return YES;
        },

        /**
         * Checks whether an event type is seen as global event or not.
         * True, e.g. for "orientationchange"
         * @param {String} type The type of the event, e.g. "orientationchange" or "touchstart"
         * @returns {Boolean} Flag determining whether event is seen as global or not
         * @private
         */
        _isGlobalEvent: function( type ) {
            return _.include(this._globalEvents, type);
        },

        /**
         * Checks whether an event type is used within a custom event or not.
         * True, e.g. for "keyup" (which is used for "enter"
         * @param {String} type The type of the event, e.g. "keyup"
         * @returns {Boolean} Flag determining whether event is used within a custom event or not
         * @private
         */
        _isUsedForCustomEvent: function( type ) {
            var customEvent = _.detect(this._customEvents, function( customEvent ) {
                return customEvent.type === type;
            }, this);

            return customEvent !== null;
        },

        /**
         * Creates an entry in the event registry, if it not exists yet
         * Global events: Array
         * DOM events: Object
         *
         * @param {String} type The type of event, e.g. touchstart
         * @param {Boolean} isGlobalEvent Flag determining type of event. Handlers for global events are saved in an array.
         * @private
         */
        _createRegistryEntryForType: function( type, isGlobalEvent ) {
            if( type ) {
                this._eventRegistry[type] = this._eventRegistry[type] ? this._eventRegistry[type] : (isGlobalEvent ? [] : {});
            }
        }

    });

})(M);