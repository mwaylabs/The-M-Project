M.View = Backbone.View.extend(M.Object);


_.extend(M.View.prototype, {

    _type: 'M.View',

    value: null,

    valuePattern: "<%= value %>",

    _domEvents: [{}],

    initialize: function( properties ) {
        _.extend(this, properties);
        this.value = this.collection
        if( !this.value ) {
            var value = { value: '' };
            if(properties && properties.value){
                value = properties.value
            }
            this.value = M.Model.create(value);
        }

        this.set();
        this._initEvents();

        this.template = _.template(this.valuePattern);
    },

    set: function( value ) {

        this.value = value || this.value;

        if( this.value ) {
            this.value.on('remove', this._remove, this);
            this.value.on('change', this._change, this);
            this.value.on('add', this._add, this);
            this.value.on('all', this._all, this);
        }
    },

    _remove: function( data ) {
        if(this.value.cid === data.cid){
            this.remove();
        }
    },

    _change: function( data ) {
        this.render();
    },

    _add: function( model, collection, options ) {

        /*CLONE EVENT ON create*/
        debugger;
        var view = _.clone(this.valueView);
        view.set(model);
        var v = view.render().el;
        this.$el.append(v);
    },

    _all: function( data ) {

    },

    constructor: function( properties ) {
        _.extend(this, properties);
        Backbone.View.apply(this, arguments);
    },

    render: function() {
        //return M.View.prototype.render.apply(this, arguments);
        console.log('render: ' + this.getObjectType());
        //        this._preRender();
        this._addClasses();
        //        this._renderChildViews();
        this._createDOM();
        this._addId();
        this._registerEvents();

        return this;
    },


    _addClasses: function() {
        this.$el.addClass(Object.getPrototypeOf(this)._getClasseName().reverse().join(' '));
    },

    _getCssClassByType: function() {
        return this.getObjectType().replace('.', '-').toLowerCase();
    },

    _getClasseName: function( cssClasses ) {
        if( !cssClasses ) {
            cssClasses = [];
        }
        cssClasses.push(this._getCssClassByType());
        if( this.getObjectType() !== 'M.View' ) {
            Object.getPrototypeOf(this)._getClasseName(cssClasses);
        }
        return cssClasses;
    },

    _createDOM: function(){
        if(this.value.attributes){
            val = this.template(this.value.attributes);
            this.$el.html(val);
        }

    },

    _addId: function(){
      this.$el.attr('id', this.cid);
    },

    /** EVENTS **/

    /**
     * This property is used to specifiy all events for a view within an application.
     *
     * @type {Object}
     */
    events: null,

    /**
     * This property contains a view's event handlers that are handled by the event dispatcher.
     *
     * @type {Object}
     */
    _domEvents: null,

    /**
     * This property contains a view's event handlers for all events that are not handled by
     * the event dispatcher, e.g. 'postRender'.
     *
     * @type {Object}
     */
    _events: null,

    /**
     * This property contains an array of event types that are not handled by the event dispatcher.
     *
     * @type {Array}
     */
    _eventTypes: ['preRender', 'postRender'],

    _initEvents: function() {
        this.events = this.events || {};
        this._domEvents = {};
        this._events = {};

        this._eventTypes = _.uniq(_.compact(this._eventTypes.concat(Object.getPrototypeOf(this)._eventTypes)));

        _.each(this.events, function( eventHandler, eventName ) {
            if( !this.events[eventName].target ) {
                if( !this.events[eventName].action ) {
                    var tmp = this.events[eventName];
                    this.events[eventName] = null;
                    this.events[eventName] = {
                        action: tmp
                    };
                }

                this.events[eventName].target = this;
            }

            if( _.contains(this._eventTypes, eventName) ) {
                this._events[eventName] = this.events[eventName];
            } else {
                this._domEvents[eventName] = this.events[eventName];
            }
        }, this);
    },

    /**
     * This method registers a view's dom events at the event dispatcher. This happens
     * automatically during the render process of a view.
     *
     * @private
     */
    _registerEvents: function() {
        _.each(this._domEvents, function( handler, eventType ) {
            M.EventDispatcher.registerEvent({
                type: eventType,
                source: this
            });
        }, this);
    },

    /**
     * This method returns the event handler of a certain event type of a view.
     *
     * @param eventType
     * @returns {*}
     */
    getEventHandler: function( eventType ) {
        return this._domEvents[eventType];
    },

    _unregisterEvents: function() {
        _.each(this._domEvents, function( event, key ) {
            M.EventDispatcher.unregisterEvent({
                type: key,
                source: this
            });
        }, this);
    }
});

M.View.create = M.create;


//// ==========================================================================
//// Project:   The M-Project - Mobile HTML5 Application Framework
//// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
////            (c) 2013 panacoda GmbH. All rights reserved.
//// Creator:   Dominik
//// Date:      26.04.2013
//// License:   Dual licensed under the MIT or GPL Version 2 licenses.
////            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
////            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
//// ==========================================================================
//
///**
//* @class
//* @extends M.Object
//*/
//M.View = M.Object.extend(/** @scope M.View.prototype */{
//
//    /**
//     * The type of this object.
//     *
//     * @type String
//     */
//    _type: 'M.View',
//
//    /**
//     * This property contains the view's DOM representation.
//     *
//     * @type Object
//     * @private
//     */
//    _dom: null,
//
//    /**
//     * This property contains the view's unique ID. This ID is automatically generated by the
//     * framework.
//     *
//     * @type String
//     * @private
//     */
//    _id: null,
//
//    /**
//     * This property specifies the markup element to build around the view's DOM. By default
//     * this will be a simply DIV container.
//     *
//     * @type String
//     */
//    surroundingMarkupType: 'div',
//
//    /**
//     * This property is used to identify M.View and all of its derived object as views.
//     *
//     * @type Boolean
//     */
//    isMView: YES,
//
//    /**
//     * This property is used to specifiy all events for a view within an application.
//     *
//     * @type {Object}
//     */
//    events: null,
//
//    /**
//     * This property contains a view's event handlers that are handled by the event dispatcher.
//     *
//     * @type {Object}
//     */
//    _domEvents: null,
//
//    /**
//     * This property contains a view's event handlers for all events that are not handled by
//     * the event dispatcher, e.g. 'postRender'.
//     *
//     * @type {Object}
//     */
//    _events: null,
//
//    /**
//     * This property contains an array of event types that are not handled by the event dispatcher.
//     *
//     * @type {Array}
//     */
//    _eventTypes: ['preRender', 'postRender'],
//
//    /**
//     * This property can be used to add custom css class/classes to the rendered view. This allows
//     * custom styling.
//     *
//     * @type String
//     */
//    cssClass: '',
//
//    /**
//     * This property contains the value of a view. It is directly connected to the view's DOM
//     * representation. To write / read the value, use getValue() / setValue().
//     *
//     * @type String
//     */
//    value: null,
//
//    /**
//     * This flag is used internally to determine whether a view is currently within the pre
//     * rendering handler. If so, and the pre render method gets called again, it will simply
//     * return to prevent circular function calls.
//     *
//     * @type {Boolean}
//     */
//    _isInPreRenderHandler: NO,
//
//    /**
//     * This flag is used internally to determine whether a view is currently within the post
//     * rendering handler. If so, and the post render method gets called again, it will simply
//     * return to prevent circular function calls.
//     *
//     * @type {Boolean}
//     */
//    _isInPostRenderHandler: NO,
//
//    /**
//     * This flag is used internally to determine whether a view is currently getting updated.
//     *
//     * @type {Boolean}
//     */
//    _isUpdateInProgress: NO,
//
//    /**
//     * This property contains the parent view of a view if there is one available.
//     *
//     * @type M.View
//     */
//    _parentView: null,
//
//    /**
//     * This method is based on M.Object's extend() but adds some view specific features
//     * such as registering the view at the view manager and applying a unique id.
//     *
//     * @param obj
//     * @returns M.View
//     */
//    design: function( obj ) {
//        var view = this.extend(obj);
//        view._id = M.ViewManager.getNewId(view);
//        return view;
//    },
//
//    /**
//     * M.View's _init method.
//     *
//     * @private
//     */
//    _init: function() {
//        this._initEvents();
//    },
//
//    /**
//     * This method is used to init a view's event lists.
//     *
//     * @private
//     */
//    _initEvents: function() {
//        this.events = this.events || {};
//        this._domEvents = {};
//        this._events = {};
//
//        this._eventTypes = _.uniq(_.compact(this._eventTypes.concat(Object.getPrototypeOf(this)._eventTypes)));
//
//        _.each(this.events, function( eventHandler, eventName ) {
//            if( !this.events[eventName].target ) {
//                if( !this.events[eventName].action ) {
//                    var tmp = this.events[eventName];
//                    this.events[eventName] = null;
//                    this.events[eventName] = {
//                        action: tmp
//                    };
//                }
//
//                this.events[eventName].target = this;
//            }
//
//            if( _.contains(this._eventTypes, eventName) ) {
//                this._events[eventName] = this.events[eventName];
//            } else {
//                this._domEvents[eventName] = this.events[eventName];
//            }
//        }, this);
//    },
//
//    /**
//     * This method is responsible for processing the rendering of a view. It is split
//     * into several methods that cover a single task each.
//     *
//     * @returns {Object|_dom}
//     */
//    render: function() {
//        this._preRender();
//        this._createDOM();
//        this._addId();
//        this._addTMPClasses();
//        this._registerEvents();
//        this._renderChildViews();
//        this._style();
//
//        return this.getDOM();
//    },
//
//    /**
//     * This method is called once the view got appended to the live DOM. It triggers
//     * the registered callbacks for post rendering and initializes the theming for
//     * all of its child views by calling _themeChildViews().
//     *
//     * Within this method (and the triggered post rendering callbacks) the live DOM can be
//     * accessed. This allows to e.g. get the view's dimensions for theming/styling purpose.
//     */
//    theme: function() {
//        this._postRender();
//        this._themeChildViews();
//    },
//
//    /**
//     * This method registers a view's dom events at the event dispatcher. This happens
//     * automatically during the render process of a view.
//     *
//     * @private
//     */
//    _registerEvents: function() {
//        _.each(this._domEvents, function( handler, eventType ) {
//            M.EventDispatcher.registerEvent({
//                type: eventType,
//                source: this
//            });
//        }, this);
//    },
//
//    /**
//     * This method returns the event handler of a certain event type of a view.
//     *
//     * @param eventType
//     * @returns {*}
//     */
//    getEventHandler: function( eventType ) {
//        return this._domEvents[eventType];
//    },
//
//    /**
//     * This method initializes the theming process for each available child view.
//     *
//     * @private
//     */
//    _themeChildViews: function() {
//        _.each(this._getChildViewsAsArray(), function( childView ) {
//            this[childView].theme();
//        }, this);
//    },
//
//    /**
//     * This method is used internally to process the configuration object for the view
//     * before handing it to the extend method. The job of this method is to make sure that
//     * the configuration object fits the requirements of the extend process.
//     *
//     * @param obj
//     * @returns Object
//     * @private
//     */
//    _normalize: function( obj ) {
//        obj = obj && typeof obj === 'object' ? obj : {};
//        obj.events = obj.events || {};
//
//        return obj;
//    },
//
//    /**
//     * This method is called just before a view gets rendered. It can be used to update
//     * or modify some properties of the view.
//     *
//     * @private
//     */
//    _preRender: function( isUpdate ) {
//        if( this._isInPreRenderHandler ) {
//            return;
//        }
//
//        this._isInPreRenderHandler = YES;
//
//        this.handleCallback(this._events.preRender, {
//            view: this,
//            isUpdate: !!isUpdate
//        });
//
//        this._isInPreRenderHandler = NO;
//    },
//
//    /**
//     * This method is called just after a view gets rendered. It can be used to update
//     * or modify some properties of the view.
//     *
//     * Note: Since this happens after the rendering process, the view's DOM can be
//     * accessed!
//     *
//     * @private
//     */
//    _postRender: function( isUpdate ) {
//        if( this._isInPostRenderHandler ) {
//            return;
//        }
//
//        this._isInPostRenderHandler = YES;
//
//        this.handleCallback(this._events.postRender, {
//            view: this,
//            isUpdate: !!isUpdate
//        });
//
//        this._isInPostRenderHandler = NO;
//    },
//
//    /**
//     * This method triggers the actual markup generation and packs the result into the view's
//     * internally used _dom property.
//     *
//     * @private
//     */
//    _createDOM: function() {
//        if( !this.getDOM() ) {
//            var html = $('<' + this.surroundingMarkupType + '>').append(this._generateMarkup());
//            this._dom = $(html);
//        }
//    },
//
//    /**
//     * This method generates the view's markup for the DOM. In M.View's basic implementation,
//     * it only returns the view's value (by calling _getValueForDOM() internally).
//     *
//     * @returns {String|value}
//     * @private
//     */
//    _generateMarkup: function() {
//        return this._getValueForDOM();
//    },
//
//    /**
//     * This method is responsible for returning the view's value prepared for adding it to
//     * the DOM. In this basic implementation this simply return the view's value property.
//     *
//     * @returns {String|value}
//     * @private
//     */
//    _getValueForDOM: function() {
//        return this.value ? this.value : '';
//    },
//
//    /**
//     * This method adds the view's ID to the view's DOM's root element.
//     *
//     * @private
//     */
//    _addId: function() {
//        this.getDOM().prop('id', this.getId());
//    },
//
//    /**
//     * This method returns the view's unique at ID. This ID is automatically generated
//     * on the creation if the view.
//     *
//     * @returns {String|_id}
//     */
//    getId: function() {
//        return this._id;
//    },
//
//    /**
//     * This method adds css classes to the view's root DOM object. These classes are
//     * based on the view's type and its prototype chain.
//     *
//     * @private
//     */
//    _addTMPClasses: function() {
//        this.getDOM().addClass(Object.getPrototypeOf(this)._getTMPClasses().reverse().join(' '));
//    },
//
//    /**
//     * This method adds the current view's type as a css class name to an array of css
//     * classes (or creates this array if it did not exist yet).
//     *
//     * @param cssClasses
//     * @returns {Array}
//     * @private
//     */
//    _getTMPClasses: function( cssClasses ) {
//        if( !cssClasses ) {
//            cssClasses = [];
//        }
//        cssClasses.push(this._getCssClassByType());
//        if( this !== M.View ) {
//            Object.getPrototypeOf(this)._getTMPClasses(cssClasses);
//        }
//        return cssClasses;
//    },
//
//    /**
//     * This method returns a view's type as a css class. It therefore replaces
//     * any '.' in the type with a '-' and transforms the whole result into
//     * lowercase. So e.g. the type 'M.View' would be transformed to 'm-view'.
//     *
//     * @returns {String}
//     * @private
//     */
//    _getCssClassByType: function() {
//        return this.getObjectType().replace('.', '-').toLowerCase();
//    },
//
//    /**
//     * This method initializes the rendering process for each available child view.
//     *
//     * @private
//     */
//    _renderChildViews: function() {
//        _.each(this._getChildViewsAsArray(), function( childView ) {
//            this[childView].setParentView(this);
//            this._appendChildView(this[childView].render())
//        }, this);
//    },
//
//    /**
//     * This method appends a child views DOM to this view's DOM.
//     *
//     * @param childViewDOM
//     * @private
//     */
//    _appendChildView: function( childViewDOM ) {
//        this.getDOM().append(childViewDOM);
//    },
//
//    /**
//     * This method return a view's childViews property as an array to allow iteration.
//     *
//     * @returns {Array}
//     * @private
//     */
//    _getChildViewsAsArray: function() {
//        return this.childViews ? $.trim(this.childViews.replace(/\s+/g, ' ')).split(' ') : [];
//    },
//
//    /**
//     * This method adds css classes defined in cssClass to the view's root DOM object.
//     *
//     * @private
//     */
//    _style: function() {
//        this.getDOM().addClass(this.cssClass);
//    },
//
//    /**
//     * This method returns the view's DOM.
//     *
//     * @returns {Object|_dom}
//     */
//    getDOM: function() {
//        return this._dom;
//    },
//
//    /**
//     * This method gets the view's current value by reading it directly from its DOM
//     * representation.
//     *
//     * @returns {String|value}
//     */
//    getValue: function() {
//        /* not rendered yet? return value property! */
//        if( !this.getDOM() || this._isUpdateInProgress ) {
//            if(this.value && this.value.isValue){
//                return this.value.get('value');
//            } else {
//                return this.value;
//            }
//
//        }
//
//        this.value = this._getValueFromDOM();
//        return this.value;
//    },
//
//    /**
//     * This method returns the view's value from the DOM. In this basic implementation it simply
//     * gets the text() value (cp. jQuery).
//     *
//     * @returns {*|jQuery}
//     * @private
//     */
//    _getValueFromDOM: function() {
//        return this.getDOM().text();
//    },
//
//    /**
//     * This method is responsible for setting the view's value. It sets both the JavaScript object's
//     * value property and updates the DOM by calling the internally used update() method.
//     *
//     * @param value
//     */
//    setValue: function( value ) {
//        this.set('value', value);
//        this.update();
//    },
//
//    /**
//     * This method returns true if the view has at least one child view.
//     *
//     * @returns {boolean}
//     */
//    hasChildViews: function() {
//        return !!this._getChildViewsAsArray().length;
//    },
//
//    /**
//     * This method updated the view's DOM based on the value property. In this basic implementation,
//     * jQuery's text() is used for this.
//     */
//    update: function() {
//        /* not rendered yet? return right away! */
//        if( !this.getDOM() || this._isUpdateInProgress ) {
//            return;
//        }
//
//        /* set the status flag */
//        this._isUpdateInProgress = YES;
//
//        /* call the pre render function */
//        this._preRender(YES);
//
//        if( this.hasChildViews() ) {
//            this._updateWithChildViews();
//        } else {
//            this._updateWithoutChildViews();
//        }
//
//        /* call the post render function */
//        this._postRender(YES);
//
//        /* re-set the status flag */
//        this._isUpdateInProgress = NO;
//    },
//
//    /**
//     * This method is called out of the view's update() if there are child
//     * views available.
//     *
//     * @private
//     */
//    _updateWithChildViews: function() {
//        var textNode = this.getDOM().contents().filter(function() {
//            return this.nodeType === Node.TEXT_NODE;
//        });
//
//        if( textNode && textNode[0] && typeof textNode[0] === 'object' ) {
//            textNode[0].textContent = this._getValueForDOM();
//        } else {
//            this.getDOM().prepend(this._getValueForDOM());
//        }
//    },
//
//    /**
//     * This method is called out of the view's update() if there are no child
//     * views available.
//     *
//     * @private
//     */
//    _updateWithoutChildViews: function() {
//        this.getDOM().text(this._getValueForDOM());
//    },
//
//    /**
//     * This method is called whenever the bound content did change. It overwrites the
//     * basic interface implementation of M.ContentBinding and is responsible for updating
//     * the view's value based on the given information about the content change.
//     */
//    contentDidChange: function() {
//        this.setValue(this.getContent());
//    },
//
//    /**
//     * This method return a clone of the current view. It is designed for using it
//     * with M.View and might need further development/special implementations for
//     * other view components within the framework.
//     *
//     * @returns {M.View}
//     */
//    clone: function() {
//        /* clone the original view to leave the template alone */
//        var that = _.clone(this);
//
//        /* re-set the target for each event (if it was 'this') */
//        that.events = {};
//        _.each(this.events, function( event, key ) {
//            if( typeof(event) === 'object' ) {
//                that.events[key] = _.clone(event);
//                if( that.events[key].target && that.events[key].target === this ) {
//                    that.events[key].target = null;
//                }
//            }
//        }, this);
//
//        return this.design(that);
//    },
//
//    /**
//     * This method empties the view's DOM and cleans up all contained sub/child views. It
//     * therefore checks the DOM for all elements that contain an ID and cleans them up.
//     *
//     * @private
//     */
//    _deleteChildViews: function() {
//        var childViews = this.getDOM().find('[id^=m_]');
//        _.each(childViews, function( childView ) {
//            childView = $(childView);
//            var view = M.ViewManager.getViewById(childView.prop('id'));
//            if( view ) {
//                view._deleteChildViews();
//                view._destroy();
//            }
//            childView.remove();
//        }, this);
//    },
//
//    _destroy: function() {
//        M.ViewManager.deleteView(this);
//        this._unregisterEvents();
//    },
//
//    _unregisterEvents: function() {
//        _.each(this._domEvents, function( event, key ) {
//            M.EventDispatcher.unregisterEvent({
//                type: key,
//                source: this
//            });
//        }, this);
//    },
//
//    /**
//     * This method sets a view's parent view.
//     *
//     * @param parentView
//     */
//    setParentView: function( parentView ) {
//        this._parentView = parentView;
//    },
//
//    getParentView: function() {
//        return this._parentView;
//    }
//
//}).implement(M.ContentBinding);