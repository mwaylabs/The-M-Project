// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/model.js');

/**
 * @class
 *
 * M.View defines the prototype for any view within The M-Project. It implements lots of basic
 * properties and methods that are used in many derived views. M.View specifies a default
 * behaviour for functionalities like rendering, theming, delegating updates etc.
 *
 * @extends M.Object
 */
M.View = M.Object.extend(
/** @scope M.View.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.View',

    /**
     * A boolean value to definitely recognize a view as a view, independent on its
     * concrete type, e.g. M.ButtonView or M.LabelView.
     *
     * @type Boolean
     */
    isView: YES,

    /**
     * The value property is a generic property for all values. Even if not all views
     * really use it, e.g. the wrapper views like M.ButtonGroupView, most of it do.
     *
     * @property {String}
     */
    value: null,

    /**
     * This property contains the relevant information about the view's computed value. In
     * particular it is used to specify the pre-value, the content binding and the just-
     * in-time performed operation, that computes the view's value.
     *
     * @property {Object}
     */
    computedValue: null,

    /**
     * The path to a content that is bound to the view's value. If this content
     * changes, the view will automatically be updated.
     *
     * @property {String}
     */
    contentBinding: null,

    /**
     * The path to a content that is bound to the view's value (reverse). If this
     * the view's value changes, the bound content will automatically be updated.
     *
     * @property {String}
     */
    contentBindingReverse: null,

    /**
     * An array specifying the view's children.
     *
     * @type Array
     */
    childViews: null,

    /**
     * Indicates whether this view currently has the focus or not.
     *
     * @type Boolean
     */
    hasFocus: NO,

    /**
     * The id of the view used for the html attribute id. Every view gets its own unique
     * id during the rendering process.
     */
    id: null,

    /**
     * Indicates whether the view should be displayed inline or not. This property isn't
     * supported by all views, but e.g. by M.LabelView or M.ButtonView.
     */
    isInline: NO,

    /*
     * Indicates whether the view is currently enabled or disabled.
     */
    isEnabled: YES,

    /**
     * This property can be used to save a reference to the view's parent view.
     *
     * @param {Object}
     */
    parentView: null,

    /**
     * If a view represents a model, e.g. within a list view, this property is used to save
     * the model's id. So the view can be used to get to the record.
     *
     * @param {Object}
     */
    modelId: null,

    /**
     * This property can be used to assign a css class to the view to get a custom styling.
     *
     * @type String
     */
    cssClass: null,

    /**
     * This property can be used to assign a css style to the view. This allows you to
     * create your custom styles inline.
     *
     * @type String
     */
    cssStyle: null,

    /**
     * This property can be used to assign a css class to the view if an error occurs. The
     * applying of this class is automatically triggered if the validation of the view
     * goes wrong. This property is mainly used by input views, e.g. M.TextFieldView.
     *
     * @type String
     */
    cssClassOnError: null,

    /**
     * This property can be used to assign a css class to the view on its initialization. This
     * property is mainly used for input ui elements like text fields, that might have a initial
     * value that should be rendered in a different style than the later value entered by the
     * user. This property is mainly used by input views, e.g. M.TextFieldView.
     *
     * @type String
     */
    cssClassOnInit: null,

    /**
     * This property is used internally to recursively build the pages html representation.
     * It is once set within the render method and then eventually updated within the
     * renderUpdate method.
     *
     * @type String
     */
    html: '',

    /**
     * Determines whether an onChange event will trigger a defined action or not.
     * This property is basically interesting for input ui elements, e.g. for
     * text fields.
     *
     * @type Boolean
     */
    triggerActionOnChange: NO,

    /**
     * Determines whether an onKeyUp event will trigger a defined action or not.
     * This property is basically interesting for input ui elements, e.g. for
     * text fields.
     *
     * @type Boolean
     */
    triggerActionOnKeyUp: NO,

    /**
     * Determines whether an onKeyUp event with the enter button will trigger a defined
     * action or not. This property is basically interesting for input ui elements, e.g.
     * for text fields.
     *
     * @type Boolean
     */
    triggerActionOnEnter: NO,

    /**
     * This property is used to specify a view's events and their corresponding actions.
     *
     * @type Object
     */
    events: null,

    /**
     * This property is used to specify a view's internal events and their corresponding actions.
     *
     * @private
     * @type Object
     */
    internalEvents: null,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: null,
    
    /**
     * Cache for getParentPage function.
     *
     * @type M.PageView
     */

    parentPage : null,

    /**
     * This method encapsulates the 'extend' method of M.Object for better reading of code syntax.
     * It triggers the content binding for this view,
     * gets an ID from and registers itself at the ViewManager.
     *
     * @param {Object} obj The mixed in object for the extend call.
     */
    design: function(obj) {
        var view = this.extend(obj);
        view.id = M.ViewManager.getNextId();
        M.ViewManager.register(view);

        view.attachToObservable();
        
        return view;
    },

     /**
     * This is the basic render method for any views. It does not specific rendering, it just calls
     * renderChildViews method. Most views overwrite this method with a custom render behaviour.
     * 
     * @private
     * @returns {String} The list item view's html representation.
     */
    render: function() {
        this.renderChildViews();
        return this.html;
    },

    /**
     * @interface
     *
     * This method defines an interface method for updating an already rendered html representation
     * of a view. This should be implemented with a specific behaviour for any view.
     */
    renderUpdate: function() {

    },

    /**
     * Triggers render() on all children. This method defines a basic behaviour for rendering a view's
     * child views. If a custom behaviour for a view is desired, the view has to overwrite this method.
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            for(var i in childViews) {
                if(this[childViews[i]]) {
                    this[childViews[i]]._name = childViews[i];
                    this[childViews[i]].parentView = this;
                    this.html += this[childViews[i]].render();
                } else {
                    this.childViews = this.childViews.replace(childViews[i], ' ');
                    M.Logger.log('There is no child view \'' + childViews[i] + '\' available for ' + this.type + ' (' + (this._name ? this._name + ', ' : '') + '#' + this.id + ')! It will be excluded from the child views and won\'t be rendered.', M.WARN);
                }

                if(this.type === 'M.PageView' && this[childViews[i]].type === 'M.TabBarView') {
                    this.hasTabBarView = YES;
                    this.tabBarView = this[childViews[i]];
                }
            }
            return this.html;
        }
    },

    /**
     * This method is used internally for removing a view's child views both from DOM and the
     * view manager.
     *
     * @private
     */
    removeChildViews: function() {
        var childViews = this.getChildViewsAsArray();
        for(var i in childViews) {
            if(this[childViews[i]].childViews) {
                this[childViews[i]].removeChildViews();
            }
            this[childViews[i]].destroy();
            M.ViewManager.unregister(this[childViews[i]]);
        }
        $('#' + this.id).empty();
    },

    /**
     * This method transforms the child views property (string) into an array.
     *
     * @returns {Array} The child views as an array.
     */
    getChildViewsAsArray: function() {
        return $.trim(this.childViews.replace(/\s+/g, ' ')).split(' ');
    },

    /**
     * This method creates and returns an associative array of all child views and
     * their values.
     *
     * The key of an array item is the name of the view specified in the view
     * definition. The value of an array item is the value of the corresponding
     * view.
     *
     * @returns {Array} The child view's values as an array.
     */
    getValues: function() {
        var values = {};
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            for(var i in childViews) {
                if(Object.getPrototypeOf(this[childViews[i]]).hasOwnProperty('getValue')) {
                    values[childViews[i]] = this[childViews[i]].getValue();
                }
                if(this[childViews[i]].childViews) {
                    var newValues = this[childViews[i]].getValues();
                    for(var value in newValues) {
                        values[value] = newValues[value];
                    }
                }
            }
        }
        return values;
    },

    /**
     * @interface
     *
     * This method defines an interface method for getting the view's value. This should
     * be implemented for any view that offers a value and can be used within a form view.
     */
    getValue: function() {
        
    },

    /**
     * This method creates and returns an associative array of all child views and
     * their ids.
     *
     * The key of an array item is the name of the view specified in the view
     * definition. The value of an array item is the id of the corresponding
     * view.
     *
     * @returns {Array} The child view's ids as an array.
     */
    getIds: function() {
        var ids = {};
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            for(var i in childViews) {
                if(this[childViews[i]].id) {
                    ids[childViews[i]] = this[childViews[i]].id;
                }
                if(this[childViews[i]].childViews) {
                    var newIds = this[childViews[i]].getIds();
                    for(var id in newIds) {
                        ids[id] = newIds[id];
                    }
                }
            }
        }
        return ids;
    },


    /**
     * Clears the html property of a view and triggers the same method on all of its
     * child views.
     */
    clearHtml: function() {
        this.html = '';
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            for(var i in childViews) {
                this[childViews[i]].clearHtml();
            }
        }
    },

    /**
     * If the view's computedValue property is set, compute the value. This allows you to
     * apply a method to a dynamically set value. E.g. you can provide your value with an
     * toUpperCase().
     */
    computeValue: function() {
        if(this.computedValue) {
            this.value = this.computedValue.operation(this.computedValue.valuePattern ? this.value : this.computedValue.value, this);
        }
    },

    /**
     * This method is a basic implementation for theming a view. It simply calls the
     * themeChildViews method. Most views overwrite this method with a custom theming
     * behaviour.
     */
    theme: function() {
        this.themeChildViews();
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     */
    registerEvents: function() {
        var externalEvents = {};
        for(var event in this.events) {
            /* map orientationchange event to orientationdidchange event */
            if(event === 'orientationchange') {
                event = 'orientationdidchange';
            }
            externalEvents[event] = this.events[event];
        }

        if(this.internalEvents) {
            for(var event in this.internalEvents) {
                /* map orientationchange event to orientationdidchange event */
                if(this.internalEvents[event]) {
                    if(event === 'orientationchange') {
                        this.internalEvents['orientationdidchange'] = this.internalEvents[event];
                        delete this.internalEvents[event];
                    }
                }
            }
        }

        if(this.internalEvents && externalEvents) {
            for(var event in externalEvents) {
                if(this.internalEvents[event]) {
                    this.internalEvents[event].nextEvent = externalEvents[event];
                    delete externalEvents[event];
                }
            }
            M.EventDispatcher.registerEvents(this.id, this.internalEvents, this.recommendedEvents, this.type);
        } else if(this.internalEvents) {
            M.EventDispatcher.registerEvents(this.id, this.internalEvents, this.recommendedEvents, this.type);
        }

        if(externalEvents) {
            M.EventDispatcher.registerEvents(this.id, externalEvents, this.recommendedEvents, this.type);
        }
        
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            for(var i in childViews) {
                this[childViews[i]].registerEvents();
            }
        }
    },

    /**
     * This method triggers the theme method on all children.
     */
    themeChildViews: function() {
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            for(var i in childViews) {
                this[childViews[i]].theme();
            }
        }
    },

    /**
     * The contentDidChange method is automatically called by the observable when the
     * observable's state did change. It then updates the view's value property based
     * on the specified content binding.
     */
    contentDidChange: function(){
        var contentBinding = this.contentBinding ? this.contentBinding : (this.computedValue) ? this.computedValue.contentBinding : null;

        if(!contentBinding) {
            return;
        }

        var value = contentBinding.target;
        var propertyChain = contentBinding.property.split('.');
        _.each(propertyChain, function(level) {
            if(value) {
                value = value[level];
            }
        });

        if(value === undefined || value === null) {
            M.Logger.log('The value assigned by content binding (property: \'' + contentBinding.property + '\') for ' + this.type + ' (' + (this._name ? this._name + ', ' : '') + '#' + this.id + ') is invalid!', M.WARN);
            return;
        }

        if(this.contentBinding) {
            this.value = value;
        } else if(this.computedValue.contentBinding) {
            this.computedValue.value = value;
        }

        this.renderUpdate();
        this.delegateValueUpdate();
    },

    /**
     * This method attaches the view to an observable to be later notified once the observable's
     * state did change.
     */
    attachToObservable: function() {
        var contentBinding = this.contentBinding ? this.contentBinding : (this.computedValue) ? this.computedValue.contentBinding : null;

        if(!contentBinding) {
            return;
        }

        if(typeof(contentBinding) === 'object') {
            if(contentBinding.target && typeof(contentBinding.target) === 'object') {
                if(contentBinding.property && typeof(contentBinding.property) === 'string') {
                    var propertyChain = contentBinding.property.split('.');
                    if(contentBinding.target[propertyChain[0]] !== undefined) {
                        if(!contentBinding.target.observable) {
                            contentBinding.target.observable = M.Observable.extend({});
                        }
                        contentBinding.target.observable.attach(this, contentBinding.property);
                        this.isObserver = YES;
                    } else {
                        M.Logger.log('The specified target for contentBinding for \'' + this.type + '\' (' + (this._name ? this._name + ', ' : '') + '#' + this.id + ')\' has no property \'' + contentBinding.property + '!', M.WARN);
                    }
                } else {
                    M.Logger.log('The type of the value of \'action\' in contentBinding for \'' + this.type + '\' (' + (this._name ? this._name + ', ' : '') + '#' + this.id + ')\' is \'' + typeof(contentBinding.property) + ' but it must be of type \'string\'!', M.WARN);
                }
            } else {
                M.Logger.log('No valid target specified in content binding \'' + this.type + '\' (' + (this._name ? this._name + ', ' : '') + '#' + this.id + ')!', M.WARN);
            }
        } else {
            M.Logger.log('No valid content binding specified for \'' + this.type + '\' (' + (this._name ? this._name + ', ' : '') + '#' + this.id + ')!', M.WARN);
        }
    },

    /**
     * @interface
     * 
     * This method defines an interface method for setting the view's value from its DOM
     * representation. This should be implemented with a specific behaviour for any view.
     */
    setValueFromDOM: function() {

    },

    /**
     * This method delegates any value changes to a controller, if the 'contentBindingReverse'
     * property is specified.
     */
    delegateValueUpdate: function() {
        /**
         * delegate value updates to a bound controller, but only if the view currently is
         * the master
         */
        if(this.contentBindingReverse && this.hasFocus) {
            this.contentBindingReverse.target.set(this.contentBindingReverse.property, this.value);
        }
    },

    /**
     * @interface
     *
     * This method defines an interface method for styling the view. This should be
     * implemented with a specific behaviour for any view.
     */
    style: function() {

    },

    /**
     * This method is called whenever the view got the focus and basically only sets
     * the view's hasFocus property to YES. If a more complex behaviour is desired,
     * a view has to overwrite this method.
     */
    gotFocus: function() {
        this.hasFocus = YES;
    },

    /**
     * This method is called whenever the view lost the focus and basically only sets
     * the view's hasFocus property to NO. If a more complex behaviour is desired,
     * a view has to overwrite this method.
     */
    lostFocus: function() {
        this.hasFocus = NO;
    },

    /**
     * This method secure the passed string. It is mainly used for securing input elements
     * like M.TextFieldView but since it is part of M.View it can be used and called out
     * of any view.
     *
     * So far we only replace '<' and '>' with their corresponding html entity. The functionality
     * of this method will be extended in the future. If a more complex behaviour is desired,
     * any view using this method has to overwrite it.
     *
     * @param {String} str The string to be secured.
     * @returns {String} The secured string.
     */
    secure: function(str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },

    /**
     * This method parses a given string, replaces any new line, '\n', with a line break, '<br/>',
     * and returns the modified string. This can be useful especially for input views, e.g. it is
     * used in context with the M.TextFieldView.
     *
     * @param {String} str The string to be modified.
     * @returns {String} The modified string.
     */
    nl2br: function(str) {
        if(str) {
            if(typeof(str) !== 'string') {
                str = String(str);
            }
            return str.replace(/\n/g, '<br />');
        }
        return str;
    },

    /**
     * This method parses a given string, replaces any tabulator, '\t', with four spaces, '&#160;',
     * and returns the modified string. This can be useful especially for input views, e.g. it is
     * used in context with the M.TextFieldView.
     *
     * @param {String} str The string to be modified.
     * @returns {String} The modified string.
     */
    tab2space: function(str) {
        if(str) {
            if(typeof(str) !== 'string') {
                str = String(str);
            }
            return str.replace(/\t/g, '&#160;&#160;&#160;&#160;');
        }
        return str;
    },

    /**
     * @interface
     *
     * This method defines an interface method for clearing a view's value. This should be
     * implemented with a specific behaviour for any input view. This method defines a basic
     * functionality for clearing a view's value. This should be overwritten with a specific
     * behaviour for most input view. What we do here is nothing but to call the cleaValue
     * method for any child view.
     */
    clearValue: function() {

    },

    /**
     * This method defines a basic functionality for clearing a view's value. This should be
     * overwritten with a specific behaviour for most input view. What we do here is nothing
     * but to call the cleaValue method for any child view.
     */
    clearValues: function() {
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            for(var i in childViews) {
                if(this[childViews[i]].childViews) {
                    this[childViews[i]].clearValues();
                }
                if(typeof(this[childViews[i]].clearValue) === 'function'){
                    this[childViews[i]].clearValue();
                }
            }
        }
        this.clearValue();
    },

    /**
     * Adds a css class to the view's DOM representation.
     *
     * @param {String} cssClass The css class to be added.
     */
    addCssClass: function(cssClass) {
        $('#' + this.id).addClass(cssClass);
    },

    /**
     * Removes a css class to the view's DOM representation.
     *
     * @param {String} cssClass The css class to be added.
     */
    removeCssClass: function(cssClass) {
        $('#' + this.id).removeClass(cssClass);
    },

    /**
     * Adds or updates a css property to the view's DOM representation.
     *
     * @param {String} key The property's name.
     * @param {String} value The property's value.
     */
    setCssProperty: function(key, value) {
        $('#' + this.id).css(key, value);
    },

    /**
     * Removes a css property from the view's DOM representation.
     *
     * @param {String} key The property's name.
     */
    removeCssProperty: function(key) {
        this.setCssProperty(key, '');
    },
	/**
     *
     * returns the page on which the current view is defined
     *
      * @return {*} M.PageView
     */
    getParentPage: function(){
        if(this.parentPage){
            return this.parentPage;
        }else{
            if(this.type === 'M.PageView'){
                return this;
            }else if(this.parentView){
                this.parentPage = this.parentView.getParentPage();
            }else{
                var parentId = $('#' + this.id).parent().closest('[id^=m_]').attr('id');
                if(parentId){
                    this.parentPage = M.ViewManager.getViewById(parentId).getParentPage();
                }
            }
            return this.parentPage;
        }
    }

});
