// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

(function() {

    /**
     * M.View inherits from Backbone.View
     * @module M.View
     *
     * @type {*}
     * @extends Backbone.View
     */
    M.View = Backbone.View.extend({

        /**
         * @constructor
         * @param {options} Attributes for the current Instance
         */
        constructor: function( options ) {
            this.cid = _.uniqueId('view');
            options = options || {};
            var viewOptions = ['scope', 'model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events', 'scopeKey', 'computedValue', 'onSet', 'onGet', 'enabled'];
            _.extend(this, _.pick(options, viewOptions));
            this._ensureElement();
            this.initialize.apply(this, arguments);
            this.delegateEvents();
        }
    });

    /**
     *
     * Extend M.View with the M.create function. You can use this function to create an M.View with the create function. Instances from Backbone are generated with new. This function wrapps the new.
     *
     * @type {Function}
     */

    M.View.create = M.create;

    /**
     *
     * Extend M.View with the M.design function. With the design you can extend an object and get an instance at once.
     *
     * @type {Function}
     */

    M.View.design = M.design;

    M.View.implements = M.implements;

    /**
     * Extend the M.View also from M.Object
     */

    _.extend(M.View.prototype, M.Object, {

        /**
         * The View type
         * @private
         */
        _type: 'M.View',

        /**
         * define a user template
         */
        template: null,

        /**
         * define a template based on the tmpl template engine
         * @private
         */
        _template: _.tmpl(M.TemplateManager.get('M.View')),

        /**
         * use this property to define which data are given to the template
         * @private
         */
        _templateValues: null,

        /**
         * extend the default template with this one. It gets injected into the <%= _value %> placeholder
         */
        templateExtend: null,

        /**
         * Indicates if this is the view was rendered before
         * @private
         */
        _firstRender: YES,

        /**
         * Specify if the View has an surrounding DOM-Element or not
         */
        useElement: NO,

        /**
         * Has the View a localization listener
         * @private
         */
        _hasI18NListener: NO,

        /**
         * Model data to view value transformation.
         * Change the display value of a view. Use this if the model has another data format as the view representation accepts it.
         * @param value The value of a view
         * @returns {*} The value of a view
         */
        onSet: null,

        /**
         * View value to model data transformation.
         * Change the display value of a view back to the model data. Use this if the view has another data format as the model accepts it.
         * @param value The value of a view
         * @returns {*} The value of a view
         */
        onGet: null,

        /**
         * Bootstrap css wrap
         */
        cssClass: null,

        /**
         * String of css classes whitespace separated
         */
        _internalCssClasses: '',

        /**
         * Bootstrap css classes for a grid implementation
         */
        grid: null,

        /**
         * Store events from outside the framework here. Developer should use this to bind events on their views like they know it from backbone.
         */
        events: null,

        /**
         * internal framework events. This is used to store every event till the _registerEvents is called. _registerEvents binds only the events stored inside this attribute
         */
        _events: null,

        _internalEvents: null,

        /**
         * The Value of the view
         */
        _value: null,

        /**
         * The hammer.js event object
         */
        _hammertime: null,


        /**
         * Use this property to access a model from the given scope. The scope needs to be a M.Controller if you want to use a nested scopeKey
         *
         *  @type: {String}
         *  @example
         *
         *  var scope = M.Controller.extend({
         *      person: M.Model.create({
         *          favorite: ON
         *      })
         *   }).create();
         *
         * var toggleSwitch = M.ToggleSwitchView.extend({
         *   scopeKey: 'person.favorite',
         * }).create(scope, null, true).render();
         *
         */
        scopeKey: null,

        /**
         * Store the given events inside this attribute. The events object is set to null to prefent backbone of setting events. To not loose the information it gets stored.
         */
        _originalEvents: null,

        /**
         * Set the model of the view
         * @param { M.Model } The Model to be set
         * @returns {View}
         * @private
         */
        _setModel: function( value ) {
            this.model = value;
            return this;
        },


        /**
         * Get the Model for the View
         * @returns {M.Model}
         * @private
         */
        _getModel: function() {
            return this.model;
        },


        /**
         * Get the value of a view. If the value is a M.Model return its attributes.
         * @returns {*}
         */
        getValue: function() {
            if( this.model ) {
                if( this._value.hasOwnProperty('attribute') && this._value.hasOwnProperty('model') ) {
                    return this._value.model.get(this._value.attribute);
                }
                return this._getModel().attributes;
            } else {
                return this._value;
            }
        },

        _getValue: function() {
            return this._value;
        },

        _setValue: function( value ) {
            this._value = value;
        },

        getPropertyValue: function( propertyString, data ) {
            var o = data;
            _.each(propertyString.split('.'), function( key ) {
                if( o[key] ) {
                    o = o[key];
                } else if( M.isModel(o) || M.isCollection(o) ) {
                    //o = o.get(key);
                    o = {
                        model: o,
                        attribute: key
                    };
                } else {
                    o = null;
                }
            });
            return o;
        },

        /**
         *
         * @returns {*}
         */

        initialize: function( options ) {
            this._registerView();
            this._addInterfaces();
            this._assignValue(options);
            this._assignTemplateValues();
            this._mapEventsToScope(this.scope);
            this._addInternalEvents();
            this._addCustomEvents(this.scope);
            if( !this.useElement ) {
                this._registerEvents();
            }
            this._assignContentBinding();
            //            this._assignComplexView();
            //            this.init();
            return this;
        },

        _registerView: function() {
            M.ViewManager.registerView(this);
        },

        _assignValue: function( options ) {
            //don't write _value in the view definition - write value and here it gets assigned
            if( this.value || (typeof this.value !== 'undefined' && this.value !== null) ) {
                this._setValue(this.value);
            } else if( this.scopeKey ) {
                this._setValue(this.getPropertyValue(this.scopeKey, this.scope));
            } else if( options && options.value ) {
                this._setValue(options.value);
            }

            var _value = this._getValue();

            if( _value ) {
                if( M.isModel(_value.model) ) {
                    this._setModel(_value.model);
                } else if( M.isModel(_value) ) {
                    this._setModel(_value);
                } else if( M.isCollection(_value) ) {
                    this.collection = _value;
                }
            }

            if( this._reactOnLocaleChanged() ) {
                M.I18N.on(M.CONST.I18N.LOCALE_CHANGED, function() {
                    this.render();
                }, this);
                this._hasI18NListener = YES;
            }

            return this;
        },

        _reactOnLocaleChanged: function() {
            return (this.value || this.label);
        },


        _assignContentBinding: function() {
            var that = this;
            var _value = this._getValue();
            if( this.scopeKey && M.isModel(_value) ) {
                this.listenTo(this.scope, this.scopeKey, function( model ) {
                    that._setModel(model);
                    that.render();
                });
            } else if( this.scopeKey && _value && M.isModel(_value.model) && _value.attribute ) {
                this.listenTo(this.scope, this.scopeKey.split('.')[0], function( model ) {
                    that._setModel(model);
                    that.render();
                });
            }
            return this;
        },

        /**
         *
         * Prepares the events. Loops over all defined events and searchs for the callback function for every element. If the event is a string, search in the given scope for the callback function.
         * The event attribute of every object is also used by backbone. The event handling is done by hammer.js so we map the events to an internal used _events object delete the events.
         * Before that we store the events in an internal _originalEvents so the information isn't lost.
         * Every event type e.q. tap is an array to handle more than one callback function.
         *
         * @param scope
         * @returns {View}
         * @private
         */
        _mapEventsToScope: function( scope ) {
            // A swap object for the given events to assign it later to the _events object.
            var events = {};
            if( this.events ) {
                _.each(this.events, function( value, key ) {
                    var callback = value;
                    // If the event callback type is an string, search in the given scope for a function
                    if( typeof value === 'string' && scope && typeof scope[value] === 'function' ) {
                        callback = scope[value];
                    }
                    // Create an array for the specific eventtype
                    events[key] = _.isArray(callback) ? callback : [callback];
                }, this);

                // Store the events object to not loose the information
                this._originalEvents = this.events;
                // backbone should not bind events so set it to null
                this.events = null;
            }
            // events should be an object
            this._events = events;

            return this;
        },


        /**
         * Merge the internal events with the external ones.
         * @private
         */
        _addInternalEvents: function() {
            if( this._internalEvents ) {
                _.each(this._internalEvents, function( internalEvent, eventType ) {
                    //if the _internalEvents isn't an array create one
                    var internal = _.isArray(internalEvent) ? internalEvent : [internalEvent];
                    //if the object has no _events or the object is not an array create one
                    this._events[eventType] = _.isArray(this._events[eventType]) ? this._events[eventType] : [];
                    //merge the interanl and external events
                    this._events[eventType] = this._events[eventType].concat(internal);
                }, this);
            }
        },

        _addCustomEvents: function() {
            if( !this._events ) {
                return;
            }
            var that = this;
            var customEvents = {
                enter: {
                    'origin': 'keyup',
                    'callback': function( event ) {
                        if( event.keyCode === 13 ) {
                            that._events.enter.apply(that.scope, arguments);
                        }

                    }
                }
            };
            for( var event in this._events ) {
                if( customEvents.hasOwnProperty(event) ) {
                    this._events[customEvents[event].origin] = customEvents[event].callback;
                }
            }
        },

        _getEventOptions: function() {

            // No Ghost click on Android
            var preventDefault = false;
            var noMouseevents = true;
            var stopBrowserBehavior = false;

            return {
                'prevent_default': preventDefault,
                'no_mouseevents': noMouseevents,
                'stop_browser_behavior': stopBrowserBehavior
            };
        },

        /**
         * Register events via hammer.js
         *
         * @private
         */
        _registerEvents: function() {
            if( this._events ) {
                var that = this;

                this._eventCallback = {};
                Object.keys(this._events).forEach(function( eventName ) {

                    this._hammertime = new Hammer(that.el, that._getEventOptions());

                    this._eventCallback[eventName] = function( event ) {
                        // for debug purposes
                        //M.Toast.show(eventName, 200);
                        if( that._hammertime.enabled === NO ) {
                            return;
                        }
                        var args = Array.prototype.slice.call(arguments);
                        args.push(that);
                        _.each(that._events[event.type], function( func ) {
                            func.apply(that.scope, args);
                        }, that);
                    };
                    this._hammertime.on(eventName, this._eventCallback[eventName]);

                }, this);
            }
        },

        /**
         * Disable all events on this element. Events are still bound but not triggered. Wrapper for hammer.js.
         * See hammer.js docu: https://github.com/EightMedia/hammer.js/wiki/Instance-methods#hammertimeoffgesture-handler
         * @private
         */
        _disableEvents: function() {
            if( this._hammertime ) {
                this._hammertime.enable(NO);
            }
        },

        /**
         * Enable all events on this element when they where disabled. Wrapper for hammer.js.
         * See hammer.js docu: https://github.com/EightMedia/hammer.js/wiki/Instance-methods#hammertimeoffgesture-handler
         * @private
         */
        _enableEvents: function() {
            if( this._hammertime ) {
                this._hammertime.enable(YES);
            }
        },

        /**
         *
         * @returns {Boolean} if events are active or not
         */
        isEnabled: function() {
            return this._hammertime.enabled;
        },

        /**
         * implement render function
         * @returns {this}
         */
        render: function() {
            //this._assignValue();
            this._preRender();
            this._render();
            this._renderChildViews();
            this._postRender();
            return this;
        },

        _preRender: function() {
            this._assignTemplate();
            this._assignTemplateValues();
            this._extendTemplate();
            this.preRender();
            return this;
        },

        _assignTemplate: function( template ) {
            template = template || this.template;
            if( template ) {
                if( typeof template === 'function' ) {
                    this._template = template;
                } else if( _.isString(template) ) {
                    this._template = _.tmpl(template);
                } else if( _.isObject(template) ) {
                    this._template = _.tmpl(M.TemplateManager.get.apply(this, ['template']));
                }
            } else if( this._template ) {
                this.template = this._template;
            }
            return this;
        },

        _assignTemplateValues: function() {
            this._templateValues = {};
            var _value = this._getValue();

            if( this.model ) {
                if( M.isModel(_value) ) {
                    this._templateValues = M.Object.deepCopy(this.model.attributes);
                } else {
                    this._templateValues._value = this.model.get(_value.attribute);
                }
            } else if( M.isI18NItem(_value) ) {
                this._templateValues._value = M.I18N.l(_value.key, _value.placeholder);
            } else if( typeof _value === 'string' ) {
                this._templateValues._value = _value;
            } else if( _value !== null && typeof _value === 'object' && this._hasI18NListener === NO ) {
                this._templateValues = _value;
            } else if( this._hasI18NListener && _.isObject(_value) ) {
                _.each(_value, function( value, key ) {
                    this._templateValues[key] = M.I18N.l(value.key, value.placeholder);
                }, this);
            }
        },

        _extendTemplate: function() {
            if( this.extendTemplate ) {
                this._templateValues._value = this.extendTemplate;
                this._template = _.tmpl(this.template(this._templateValues));
            }
        },

        preRender: function() {

        },

        _render: function() {
            var dom = this._template(this._templateValues);

            if( this.useElement ) {
                this.setElement(dom);
            } else if( this._attachToDom() ) {
                this.$el.html(dom);
            } else {
                this.$el.html('');
            }
            return this;
        },

        /**
         * Specify if the template needs to be attached to the element or not.
         *
         * @returns {boolean}
         * @private
         */
        _attachToDom: function() {
            return this.getValue() !== null;
        },

        _renderChildViews: function() {

            if( !this.childViews ) {
                return;
                //this.childViews = this._getChildViews();
            }
            _.each(this.childViews, function( child, name ) {
                var dom = this.$el;
                //                if( this.$el.find('[data-childviews="' + this.cid + '_' + name + '"]').addBack().length ) {
                //                    dom = this.$el.find('[data-childviews="' + this.cid + '_' + name + '"]').addBack();
                //                }
                if( this.$el.find('[data-childviews="' + name + '"]').length ) {
                    dom = this.$el.find('[data-childviews="' + name + '"]');
                    dom.addClass(name);
                }

                if( typeof child.render === 'function' ) {
                    dom.append(child.render().$el);
                    child.delegateEvents();
                } else if( _.isArray(child) ) {
                    _.each(child, function( c ) {
                        dom.append(c.render().$el);
                        c.delegateEvents();
                    });
                }

            }, this);

            return this;
        },

        _postRender: function() {
            //use element can be given from the parent element
            if( this.useElement ) {
                this._registerEvents();
            }
            this._addClassNames();
            if( this.model ) {
                this._assignBinding();
                this.stickit();
            }
            if( this.model && this.useElement ) {
                //console.warn('be aware that stickit only works if you define useElement with NO');
            }
            this.postRender();
            this._firstRender = NO;
            return this;
        },

        _addClassNames: function() {
            var viewCssClassName = this._getViewCssClassName();
            this.$el.addClass(viewCssClassName);
            if( this.cssClass ) {
                this.$el.addClass(this.cssClass);
            }
            if( this._internalCssClasses ) {
                this.$el.addClass(this._internalCssClasses);
            }
            if( this.grid ) {
                this.$el.addClass(this.grid);
            }
        },

        /**
         * Returns based on the _type property of the view the cssClassName. If the type starts with 'M.' it is in the M context. This will return the name of the view without 'M.' in lowercase.
         * If the _type is not in the M context a check on whitespaces and dots is made. If there isn't a forbidden character the _type is returned as string.
         * @returns {String}
         * @private
         * @example
         * M.ButtonView.extend().create()._getViewCssClassName(); // buttonview
         */
        _getViewCssClassName: function() {
            // return value. if there is a error/warning a empty string is returned
            var cssClassName = null;
            // if the name contains 'M.' like every view should from the framework
            if( this._type.toString().indexOf('M.') === 0 ) {
                // this is a View in the M context
                cssClassName = this._type.split('M.')[1].toLowerCase();
            } else {
                cssClassName = this._type.toString();
            }
            // check if there are any whitespaces in the _type property and show a warning if there are any.
            if( cssClassName.indexOf(' ') >= 0 ) {
                console.warn('The View type contains whitespaces: ' + this._type + '. The _type property gets added to the css classes. Since there are whitespaces inside the name the view has multiple classes. To set a class overwrite _getViewCssClassName method of the view');
                cssClassName = '';
            }
            // check if there are any dots in the _type property. If there are any don't add the cssClass
            if( cssClassName.indexOf('.') >= 0 ) {
                console.warn('The View type contains dots: ' + this._type + '. The _type property gets added to the css classes. Since there are dots inside the name we skiped this. To enable this featuer overwrite the _getViewCssClassName method');
                cssClassName = '';
            }
            // a error should overwrite the cssClassName with an empty string. If this doesn't happen set the cssClassName to the type
            return cssClassName;
        },

        _assignBinding: function() {
            var bindings = {};

            var _value = this._getValue();
            var selector = '';

            if( this.model && !M.isModel(_value) ) {
                selector = '[data-binding="_value"]';
                bindings[selector] = {observe: '' + _value.attribute};
            } else if( this.collection ) {
                selector = '[data-binding="_value"]';
                bindings[selector] = {observe: '_value'};
            } else if( this.model && M.isModel(_value) ) {
                _.each(this.model.attributes, function( value, key ) {
                    var selector = '[data-binding="' + key + '"]';
                    bindings[selector] = {observe: '' + key};
                }, this);
            } else if( this.templateExtend === null && this.scopeKey ) {
                selector = '[data-binding="_value"]';
                bindings[selector] = {observe: '' + this.scopeKey};
            } else {
                _.each(this._templateValues, function( value, key ) {
                    selector = '[data-binding="' + key + '"]';
                    bindings[selector] = {observe: '' + key};
                }, this);
            }

            _.each(bindings, function( value, key ) {
                if( typeof this.onGet === 'function' ) {
                    bindings[key].onGet = function( value ) {
                        var ret = this.onGet(value);
                        return ret;
                    };
                }

                if( typeof this.onSet === 'function' ) {
                    bindings[key].onSet = function( value ) {
                        var ret = this.onSet(value);
                        return ret;
                    };
                }
            }, this);

            this.bindings = bindings;

            return this;
        },

        postRender: function() {

        },

        updateTemplate: function() {
            var template = this.template || M.TemplateManager.get(this._type);
            this._assignTemplate(template);
            this._updateChildViewsTemplate();
            return this;
        },

        _updateChildViewsTemplate: function() {

            if( !this.childViews ) {
                return;
            }
            _.each(this.childViews, function( child ) {
                if( typeof child.updateTemplate === 'function' ) {
                    child.updateTemplate();
                } else if( _.isArray(child) ) {
                    _.each(child, function( c ) {
                        c.updateTemplate();
                    });
                }

            }, this);
            return this;
        },

        /**
         * Sets an childview to the given selector. If it doesn't exist it gets created.
         * @param selector
         * @param view
         */
        setChildView: function( selector, view ) {

            if( !this.childViews[selector] ) {
                this.addChildView(selector, view);
            } else {
                this.childViews[selector] = view;
            }

        },

        /**
         * Gets an childview by the given selector. If it doesn't exist it retuns null.
         * @param selector
         * @param {M.View}
         */
        getChildView: function( selector ) {
            if(this.childViews[selector]) {
                return this.childViews[selector];
            }
            return null;
        },

        /**
         * adds a childview to the view.
         * @param {String} selector - the selector to identify in which childview container the view should be added
         * @param {M.View} the view that should be added
         */
        addChildView: function( selector, view ) {
            if( _.isObject(selector) ) {
                // this can be an object if the you use it as addChildViews function
                /**
                 * @example
                 *
                 * var children = {
                 *  b1: M.View.extend(),
                 *  b2: M.View.extend()
                 * };
                 *
                 * M.View.create().addChildView(children);
                 *
                 */
                _.each(selector, function( view, selector ) {
                    this._mergeChildView(selector, view);
                }, this);
            } else {
                return this._mergeChildView(selector, view);
            }
            return this;
        },

        /**
         * Appends a child view to the given selector. If there is already a childview for the given selector, create an array an add the old and the new one.
         * @param {String} selector - the selector to identify in which childview container the view should be added
         * @param {M.View} the view that should be added
         * @private
         */
        _mergeChildView: function( selector, view ) {
            if( !(_.isString(selector)) || !(M.isView(view)) ) {
                return void 0;
            }

            var existingChildViews = this.childViews[selector];

            if( _.isArray(existingChildViews) ) {
                existingChildViews.push(view);
            } else if( _.isObject(existingChildViews) ) {
                var container = [];
                container.push(existingChildViews);
                container.push(view);
                this.childViews[selector] = container;
                container = null;
            } else {
                this.childViews[selector] = view;
            }

            return this;
        },

        /**
         * Remove all events to the given eventtype
         * @param {String} The eventtype e.q. tap
         * @private
         * @todo removing an event by its name removes all bound event callbacks. At the moment it isn't possible to remove a single eventype function.
         * @example
         *
         * //Create a view with an tap event
         * var view = M.View.extend({
         *   events: {
         *      tap: function(){console.log('tap did happen')}
         *   }
         * }).create().render();
         *
         * //Log all bound events (Chrome provides the getEventListeners function to log all event on an DOM object)
         * getEventListeners(view.el); // Object {touchstart: Array[1], mousedown: Array[1], tap: Array[1]}
         *
         * //Remove all tap events
         * view._unbindEvent('tap');
         *
         * //Log again
         * getEventListeners(view.el); //Object {touchstart: Array[1], mousedown: Array[1]}
         */
        _unbindEvent: function( eventtype ) {
            this._hammertime.off(eventtype, this._eventCallback[eventtype]);
        },


        /**
         *
         * Returns a childview of an object either by the name or the index of the childview
         * @param {(string|number)} the index or name of the childview
         * @private
         *
         * @example
         * var testView = M.View.extend({}, {
         *    child1: M.View.extend({value: 'child 1 value'}),
         *    child2: M.View.extend({value: 'child 2 value'})
         * }).create();
         *
         * testView._getChildView(0);  //child1
         * testView._getChildView(1);  //child2
         * testView._getChildView('child1');  //child1
         * testView._getChildView('child2');  //child2
         * testView._getChildView('child2');  //child2
         */
        _getChildView: function( identifier ) {
            var ident = parseInt(identifier, 10);
            if( !_.isNaN(ident) ) {
                identifier = ident;
            }
            var childName = _.isNumber(identifier) ? Object.keys(this.childViews)[identifier] : identifier;
            return this.childViews[childName];
        },


        /**
         *
         * @param {String|M.I18NItem} text - The text to get the internationalization from
         * @returns {String|M.I18NItem} returns an empty string if no param is defined. Returns the translatation if its an M.I18NItem. Returns the text if there is no translation
         * @private
         * @example
         *
         * _assignTemplateValues: function() {
         *   M.View.prototype._assignTemplateValues.apply(this, arguments);
         *   this._templateValues.placeholder = this._getInternationalizedTemplateValue(this.placeholder);
         * }
         *
         */
        _getInternationalizedTemplateValue: function( text ) {
            if( M.isI18NItem(text) ) {
                return M.I18N.l(text.key, text.placeholder);
            } else if( text ) {
                return text;
            } else {
                return '';
            }
        },

        /**
         * Gets called if the view is visible in the dom. Typical usage is the calculaction of the widht or height.
         * Calls for the same function for every child view and then the attachToDom for a user
         * @private
         */
        _getsVisible: function() {
            this._childViewsGetsVisible();
            this.getsVisible();
        },

        /**
         * Gets called if the view is visible in the dom. Typical usage is the calculaction of the widht or height
         */
        getsVisible: function() {

        },

        /**
         * Calls _attachedToDom on every childView
         * @private
         */
        _childViewsGetsVisible: function() {
            _.each(this.childViews, function( child ) {
                child._getsVisible();
            }, this);
        }

    });

    /**
     * extend the Backbone.View extend function with a childViews parameter
     * @param options
     * @param childViews
     * @returns {*}
     */
    M.View.extend = function( options, childViews ) {
        options = options || {};
        if( childViews ) {
            options._childViews = childViews;
        }
        return Backbone.View.extend.apply(this, [options]);
    };

    /**
     *
     * @param scope
     * @returns {this}
     */
    M.View.create = function( scope, childViews, isScope ) {

        var _scope = isScope || M.isController(scope) ? {scope: scope} : scope;

        var f = new this(_scope);
        f.childViews = {};
        if( f._childViews ) {
            _.each(f._childViews, function( childView, name ) {
                var _scope = scope;
                if( f.useAsScope === YES ) {
                    _scope = f;

                }
                f.childViews[name] = childView.create(_scope || f, null, true);
            });
        }
        if( childViews ) {
            f.childViews = f.childViews || {};
            _.each(childViews, function( childView, name ) {
                f.childViews[name] = childView;
            });
        }
        return f;
    };

})(this);