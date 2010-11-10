// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('model.js');

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
    isVisible: NO,

    /*
     * Indicates whether the view is enabled or not.
     */
    isEnabled: YES,

    modelId: null,

    /**
     * This method encapsulates the 'extend' method of M.Object for better reading of code syntax.
     * It triggers the content binding for this view,
     * gets an ID from and registers itself at the ViewManager.
     *
     * @param {Object} obj The mixed in object for the extend call.
     */
    design: function(obj) {
        var extendedView = this.extend(obj);
        if(extendedView.contentBinding) {
            extendedView.attachToObservable(extendedView.contentBinding);
        }
        extendedView.id = M.Application.viewManager.getNextId();
        M.Application.viewManager.register(extendedView);
        return extendedView;
    },

     /**
     * Interface method.
     * Renders itself to HTML.
     * Render implementation is done by the special child obj of View (LabelView etc.).
     */
    render: function() {

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
            var arr = this.childViews[0].split(' ');
            for(var i in arr) {
                this[arr[i]].render();
            }
        }
    },

    /**
     * Interface method.
     * Triggers rendering engine to style this view/apply a theme.
     */
    applyTheme: function() {
        
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
    }

});