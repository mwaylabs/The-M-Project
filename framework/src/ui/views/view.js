M.View = Backbone.View.extend(M.Object);


_.extend(M.View.prototype, {

    _type: 'M.View',

    value: null,

    valuePattern: "<%= value %>",

    _domEvents: [{}],

    initialize: function( properties ) {
//        _.extend(this, properties);
//        this.value = this.collection;
//        if( !this.value ) {
//            var value = { value: '' };
//            if(properties && properties.value){
//                value = properties.value;
//            }
//            this.value = M.Model.create(value);
//        }
////
//        this.set();
//        this._initEvents();
//
//        this.template = _.template(this.valuePattern);
    },

//    set: function( value ) {
//        this.value = value || this.value;
//
//        if( this.value ) {
//            this.value.on('remove', this._remove, this);
//            this.value.on('change', this._change, this);
//            this.value.on('add', this._add, this);
//            this.value.on('all', this._all, this);
//        }
//    },

//    _remove: function( data ) {
//        if(this.value.cid === data.cid){
//            this.remove();
//        }
//    },

//    _change: function( data ) {
//        this.render();
//    },

//    _add: function( model, collection, options ) {
//
//        /*CLONE EVENT ON create*/
//        var view = _.clone(this.valueView);
//        view.set(model);
//        var v = view.render().el;
//        this.$el.append(v);
//    },

//    _all: function( data ) {
//
//    },

//    constructor: function( properties ) {
//        _.extend(this, properties);
//        Backbone.View.apply(this, arguments);
//    },

//    _addClasses: function() {
//        this.$el.addClass(Object.getPrototypeOf(this)._getClasseName().reverse().join(' '));
//    },

//    _getCssClassByType: function() {
//        return this.getObjectType().replace('.', '-').toLowerCase();
//    },

//    _getClasseName: function( cssClasses ) {
//        if( !cssClasses ) {
//            cssClasses = [];
//        }
//        cssClasses.push(this._getCssClassByType());
//        if( this.getObjectType() !== 'M.View' ) {
//            Object.getPrototypeOf(this)._getClasseName(cssClasses);
//        }
//        return cssClasses;
//    },

//    _createDOM: function(){
//        if(this.value.attributes){
//            val = this.template(this.value.attributes);
//            this.$el.html(val);
//        }
//
//    },

//    _addId: function(){
//      this.$el.attr('id', this.cid);
//    },

    /** EVENTS **/

    /**
     * This property is used to specifiy all events for a view within an application.
     *
     * @type {Object}
     */
//    events: null,

    /**
     * This property contains a view's event handlers that are handled by the event dispatcher.
     *
     * @type {Object}
     */
//    _domEvents: null,

    /**
     * This property contains a view's event handlers for all events that are not handled by
     * the event dispatcher, e.g. 'postRender'.
     *
     * @type {Object}
     */
//    _events: null,
//
    /**
     * This property contains an array of event types that are not handled by the event dispatcher.
     *
     * @type {Array}
     */
//    _eventTypes: ['preRender', 'postRender'],

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
//    _unregisterEvents: function() {
//        _.each(this._domEvents, function( event, key ) {
//            M.EventDispatcher.unregisterEvent({
//                type: key,
//                source: this
//            });
//        }, this);
//    }
});

M.View.create = M.create;