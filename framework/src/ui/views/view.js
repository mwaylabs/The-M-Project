M.View = Backbone.View.extend(M.Object);

_.extend(M.View.prototype, {

    //    _type: 'M.View',
    //
    //    value: '',
    //
    //    model: null,
    //
    //    events: null,
    //
    //    bindings: {
    //        '[data-binding="value"]': {
    //            observe: 'value'
    //        }
    //    },

    getChildViewIdentifier: function( name ) {
        console.log('#' + this.options.value + ' [data-child-view="' + name + '"]');
        return '#' + this.options.value + ' > [data-child-view="' + name + '"]';
    },

    beforeRender: function() {

        this.addChildViews();
    },

    afterRender: function() {
        this.stickit();
        return this;
    },

    template: _.tpl('<div id="<%= value %>"><div><%= value %></div><div data-child-view="main"></div></div>'),

    initialize: function() {
        this.events = this.events || {};
        var value = this.options.value || this.value;
        if( this.options.value instanceof Backbone.Model ) {
            this.model = this.options.value;
        } else if( this.value instanceof Backbone.Model ) {
            this.model = this.value;
        } else if( !this.model ) {
            this.model = new Backbone.Model({value: value, contenteditable: 'contenteditable' });
        }
    },
    //
    //    // provide data to the template
    serialize: function() {
        return this.model.attributes
    },

    applyViews: function() {
        this.prototype.applyViews.apply(this, arguments);
    },

    isView: function( view ) {
        if( view ) {
            return M.View.prototype.isPrototypeOf(view)
        } else {
            return false;
        }

    },

    addChildViews: function() {
        var childViews = this.getChildViews();

        if(childViews){
            this.setViews(childViews);
        }
        if( this.validateChildViews(childViews) ) {

        }
    },

    getChildViews: function() {
        if( this.options && this.options.childViews ) {
            return this.addChildViewIdentifier();
        } else {
            return false;
        }
    },

    addChildViewIdentifier: function() {
        var childViews = {};

        if( _.isArray(this.options.childViews)){
            var key= 'main';
            childViews[this.getChildViewIdentifier(key)] = this.options.childViews;
        } else {
            _.each(this.options.childViews, function( value, key ) {
                if( key.search(/[.#]/) === 0 ) {
                    key = key.replace(/[.#]/, '');
                }
                childViews[this.getChildViewIdentifier(key)] = value;
            }, this);
        }
        return childViews;
    },

    validateChildViews: function( childViews ) {

        var childViews = childViews || this.getChildViews();
        var isValid = true;
        _.each(childViews, function( childView ) {
            if( _.isArray(childView)){
                _.each(childView, function( child ) {
                    isValid = this.validateChildViews(child);
                }, this);
            } else if( !this.isView(childView) ) {
                isValid = false;
            }
        }, this);

        return isValid ? childViews : false;
    }

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