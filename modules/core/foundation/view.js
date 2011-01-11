// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
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
     * The path to a content that is bind to the view's value.
     *
     * @property {String}
     */
    contentBinding: null,

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
     * This property determines whether to apply a theme to a view or not.
     *
     * @type Boolean
     */
    applyTheme: YES,

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
     * This method encapsulates the 'extend' method of M.Object for better reading of code syntax.
     * It triggers the content binding for this view,
     * gets an ID from and registers itself at the ViewManager.
     *
     * @param {Object} obj The mixed in object for the extend call.
     */
    design: function(obj) {
        var view = this.extend(obj);
        if(view.contentBinding) {
            view.attachToObservable(view.contentBinding);
        } else if(view.computedValue && view.computedValue.contentBinding) {
            view.attachToObservable(view.computedValue.contentBinding);
        }
        view.id = M.Application.viewManager.getNextId();
        M.Application.viewManager.register(view);
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
            var childViews = $.trim(this.childViews).split(' ');
            for(var i in childViews) {
                if(this.type === 'M.PageView' && this[childViews[i]].type === 'M.TabBarView') {
                    this.hasTabBarView = YES;
                    this.tabBarView = this[childViews[i]];
                }
                if(this[childViews[i]]) {
                    this.html += this[childViews[i]].render();
                } else {
                    M.Logger.log(childViews[i] + ' is undefinded. Can\' call render() of an undefinded object', M.ERROR);
                }
            }
            return this.html;
        }
    },

    /**
     * Clears the html property of a view and triggers the same method on all of its
     * child views.
     */
    clearHtml: function() {
        this.html = '';
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
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
     * This method triggers the theme method on all children.
     */
    themeChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
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
        var bindingPath = this.contentBinding ? this.contentBinding.split('.') : this.computedValue.contentBinding.split('.');
        if(bindingPath && bindingPath.length === 3 && !(this.hasFocus && this.type === 'M.TextFieldView')) {
            if(this.contentBinding) {
                this.value = eval(bindingPath[0])[bindingPath[1]][bindingPath[2]];
            } else {
                this.computedValue.value = eval(bindingPath[0])[bindingPath[1]][bindingPath[2]];
            }
            this.renderUpdate();
            this.delegateValueUpdate();
        } else if(bindingPath && bindingPath.length === 3) {
            return;
        } else {
            var bindingPathString = bindingPath.join('.');
            M.Logger.log('bindingPath \'' + bindingPathString + '\' not valid', M.Error);
        }
    },

    /**
     * This method attaches the view to an observable to be later notified once the observable's
     * state did change.
     *
     * @param {String} contentBinding The path to the observable property.
     */
    attachToObservable: function(contentBinding) {
        var bindingPath = contentBinding.split('.');
        if(bindingPath && bindingPath.length === 3 && eval(bindingPath[0]) && eval(bindingPath[0])[bindingPath[1]]) {
            var controller = eval(bindingPath[0])[bindingPath[1]];
            if(!controller.observable) {
                controller.observable = M.Observable.extend({});
            }
            controller.observable.attach(this, bindingPath[2]);
            this.isObserver = YES;
        } else {
            var bindingPathString = bindingPath.join('.');
            M.Logger.log('bindingPath \'' + bindingPathString + '\' not valid', M.Error);
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
        /* delegate value updates to a binded controller,
           but only if the view currently is the master */
        if(this.contentBindingReverse && this.hasFocus) {
            var params = this.contentBindingReverse.split('.');
            var controller = eval(params[0]);
            controller[params[1]].set(params[2], this.value);
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
     * implemented with a specific behaviour for any input view.
     */
    clearValue: function() {
        
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
    }

});