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
 * The root of all views.
 *
 */
M.View = M.Object.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.View',

    /**
     * A boolean value to definitely recognize a view as a view.
     *
     * @property {Boolean}
     */
    isView: YES,

    /**
     * Generic attribute for views. Some subclasses have a property that is more readable to its context than 'value'.
     * Internally these properties are mapped to 'value'.
     * e.g. in LabelView: value:this.text
     *
     * @property {Object, String}
     */
    value: null,

    /**
     * The path to a content that is bind to the view's value.
     *
     * @property {String, Object}
     */
    contentBinding: null,

    /**
     * An array specifying the view's children.
     *
     * @property {Object}
     */
    childViews: null,

    /**
     * Determines whether this view renders directly to the DOM or just returns its HTML representation.
     *
     * @property {Boolean}
     */
    renderToDOM: YES,

    /**
     * Indicates whether this view currently has the focus or not.
     *
     * @property {Boolean}
     */
    hasFocus: NO,

    /**
     * The id of the View used for the HTML attribute ID.
     */
    id: null,

    /**
     * Indicates whether the view should be displayed inline or not.
     */
    isInline: NO,

    /**
     * Indicates whether the view is visible or not.
     * Implemented via CSS's display property.
     */
    isVisible: YES,

    /*
     * Indicates whether the view is enabled or not.
     */
    isEnabled: YES,

    modelId: null,

    /**
     * This property can be used to assign a css class to the view using the jquery mobile
     * specific data-theme property. This allows you to create your custom styles.
     *
     * @property {String}
     */
    cssClass: null,

    /**
     * This property can be used to assign a css class to the view if an error occurs. The
     * applying of this class is automatically triggered if the validation of the view
     * goes wrong.
     *
     * @property {String}
     */
    cssClassOnError: null,

    /**
     * This property can be used to assign a css class to the view on its initialization. This
     * property is mainly used for input ui elements like text fields, that might have a initial
     * value that should be rendered in a different style than the later value entered by the
     * user.
     *
     * @property {String}
     */
    cssClassOnInit: null,

    /**
     * This property is used internally to recursively build the pages html representation.
     * It is once set within the render method and then eventually updated within the
     * renderUpdate method.
     *
     * @property {String} The pages html content.
     */
    html: '',

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
        }
        view.id = M.Application.viewManager.getNextId();
        M.Application.viewManager.register(view);
        return view;
    },

     /**
     * Interface method.
     * Renders itself to HTML.
     * Render implementation is done by the special child obj of View (LabelView etc.).
     */
    render: function() {
        this.renderChildViews();
        return this.html;
    },

    /**
     * Interface method.
     * Updates itself in DOM.
     * Render implementation is done by the special child obj of View (LabelView etc.).
     */
    renderUpdate: function() {

    },

    /**
     * Triggers render() on all children.
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            for(var i in childViews) {
                if(this.type === 'M.PageView' && this[childViews[i]].type === 'M.TabBarView') {
                    this.hasTabBarView = YES;
                    this.tabBarView = this[childViews[i]];
                }
                this.html += this[childViews[i]].render();
            }
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
     * Interface method.
     * Triggers rendering engine to style this view/apply a theme.
     */
    theme: function() {
        this.themeChildViews();
    },

    /**
     * Triggers theme() on all children.
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
     * contentDidChange is called by the observable when observable's state did change.
     * It updates the view's value property.
     */
    contentDidChange: function(){
        var bindingPath = this.contentBinding.split('.');
        if(bindingPath && bindingPath.length === 3 && !(this.hasFocus && this.type === 'M.TextFieldView')) {
            this.value = eval(bindingPath[0])[bindingPath[1]][bindingPath[2]];
            this.renderUpdate();
            this.delegateValueUpdate();
        } else if(bindingPath && bindingPath.length === 3) {
            return;
        } else {
            M.Logger.log('bindingPath not valid', M.WARN);
        }
    },

    /**
     * This method attaches itself to an observable.
     *
     * @param {String} contentBinding The path to the observable property.
     */
    attachToObservable: function(contentBinding) {
        var bindingPath = contentBinding.split('.');
        if(bindingPath && bindingPath.length === 3 && eval(bindingPath[0]) && eval(bindingPath[0])[bindingPath[1]]) {
            eval(bindingPath[0])[bindingPath[1]].observable.attach(this, bindingPath[2]);
            this.isObserver = YES;
        } else {
            M.Logger.log('bindingPath not valid', M.WARN);
        }
    },

    /**
     * Interface method.
     * This method sets its value to the value it has in its DOM representation.
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
     * Interface method.
     * Method to append css styles and other style specific inline attributes to the rendered view.
     */
    style: function() {

    },

    /**
     * This method is called whenever the view gets the focus.
     */
    gotFocus: function() {
        this.hasFocus = YES;
    },

    /**
     * This method is called whenever the view lost the focus.
     */
    lostFocus: function() {
        this.hasFocus = NO;
    },

    /**
     * Secure the passed string.
     * 
     * This is mainly used for securing input elements like text fields but since it is
     * part of M.View it can be used and called out of any view.
     *
     * So far we only replace '<' and '>' with their corresponding html entity. The functionality
     * of this method will be extended in the future.
     *
     * @param {String} str The string to be escaped
     */
    secure: function(str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },

    nl2br: function(str) {
        if(str) {
            if(typeof(str) !== 'string') {
                str = String(str);
            }
            return str.replace(/\n/g, '<br />\n');
        }
        return str;
    },

    /**
     * This method writes the view's html string into the DOM.
     */
    writeToDOM: function() {
        document.write(this.html);
    },

    /**
     * Adds a css class to the view's DOM representation.
     *
     * @property {String} cssClass The css class to be added.
     */
    addClass: function(cssClass) {
        $('#' + this.id).addClass(cssClass);
    },

    /**
     * Removes a css class to the view's DOM representation.
     *
     * @property {String} cssClass The css class to be removed.
     */
    removeClass: function(cssClass) {
        $('#' + this.id).removeClass(cssClass);
    }

});