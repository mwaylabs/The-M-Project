// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.SearchBarView defines a prototype of a search bar that can be used inside of a list
 * view or independently as a plain input field with a search styling.
 *
 * @extends M.View
 */
M.SearchBarView = M.View.extend(
/** @scope M.SearchBarView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.SearchBarView',

    /**
     * Determines whether the search bar is part of a list view.
     *
     * @type Boolean
     */
    isListViewSearchBar: NO,

    /**
     * If the search bar belongs to a list view, this property contains this
     * list view.
     *
     * @type M.ListView
     */
    listView: null,

    /**
     * The initial text shown inside the search bar field describing the input or making a suggestion for
     * input e.g. "Please enter your Name."
     *
     * @type String
     */
    initialText: '',

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['focus', 'blur', 'enter', 'keyup'],

    /**
     * Renders a search bar.
     *
     * @private
     * @returns {String} The search bar view's html representation.
     */
    render: function() {
        this.html += '<input id="' + this.id + '" type="search" value="' + (this.value ? this.value : this.initialText) + '" class="' + this.cssClass + '" />';

        return this.html;
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for text field views and
     * their internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            focus: {
                target: this,
                action: 'gotFocus'
            },
            blur: {
                target: this,
                action: 'lostFocus'
            },
            keyup: {
                target: this,
                action: 'setValueFromDOM'
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
    },

    /**
     * Updates a SearchBarView with DOM access by jQuery.
     *
     * @private
     */
    renderUpdate: function() {
        $('#' + this.id).val(this.value);
        this.styleUpdate();
    },

    /**
     * This method sets its value to the value it has in its DOM representation
     * and then delegates these changes to a controller property if the
     * contentBindingReverse property is set.
     *
     * Additionally call target / action if set.
     *
     * @param {Object} evt The event triggered this method.
     */
    setValueFromDOM: function(id, event, nextEvent) {
        this.value = this.secure($('#' + this.id).val());
        this.delegateValueUpdate();

        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
    },

    /**
     * Applies some style-attributes to the button.
     *
     * @private
     * @returns {String} The search bar's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.isListViewSearchBar) {
            html += ' class="ui-listview-filter"';
        }
        return html;
    },

    /**
     * Method to append css styles inline to the rendered view on the fly.
     *
     * @private
     */
    styleUpdate: function() {
        if(this.isInline) {
            $('#' + this.id).attr('display', 'inline');
        } else {
            $('#' + this.id).removeAttr('display');
        }

        if(!this.isEnabled) {
            $('#' + this.id).attr('disabled', 'disabled');
        } else {
            $('#' + this.id).removeAttr('disabled');
        }
    },

    /**
     * This method is called whenever the view gets the focus.
     * If there is a initial text specified and the value of this search bar field
     * still equals this initial text, the value is emptied.
     */
    gotFocus: function() {
        if(this.initialText && (!this.value || this.initialText === this.value)) {
            this.setValue('');
            if(this.cssClassOnInit) {
                this.removeCssClass(this.cssClassOnInit);
            }
        }
        this.hasFocus = YES;
    },

    /**
     * This method is called whenever the view lost the focus.
     * If there is a initial text specified and the value of this search bar field
     * is empty, the value is set to the initial text.
     */
    lostFocus: function() {
        if(this.initialText && !this.value) {
            this.setValue(this.initialText, NO);
            this.value = '';
            if(this.cssClassOnInit) {
                this.addCssClass(this.cssClassOnInit);
            }
        }
        this.hasFocus = NO;
    },

    /**
     * This method sets the text field's value, initiates its re-rendering
     * and call the delegateValueUpdate().
     *
     * @param {String} value The value to be applied to the text field view.
     * @param {Boolean} delegateUpdate Determines whether to delegate this value update to any observer or not.
     */
    setValue: function(value, delegateUpdate) {
        this.value = value;
        this.renderUpdate();

        if(delegateUpdate) {
            this.delegateValueUpdate();
        }
    },

    /**
     * This method disables the search bar by setting the disabled property of its
     * html representation to true.
     */
    disable: function() {
        this.isEnabled = NO;
        this.renderUpdate();
    },

    /**
     * This method enables the search bar by setting the disabled property of its
     * html representation to false.
     */
    enable: function() {
        this.isEnabled = YES;
        this.renderUpdate();
    },

    /**
     * This method clears the search bar's value, both in the DOM and within the JS object.
     */
    clearValue: function() {
        this.setValue('');

        /* call lostFocus() to get the initial text displayed */
        this.lostFocus();
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the search bar field.
     *
     * @private
     */
    theme: function() {
        if(this.initialText && !this.value && this.cssClassOnInit) {
            this.addCssClass(this.cssClassOnInit);
        }

        /* register tap event for delete button */
        var that = this;
        $('#' + this.id).siblings('a.ui-input-clear').bind('tap', function() {
            that.setValue('', YES);
        });
    },

    /**
     * This method returns the search bar view's value.
     *
     * @returns {String} The search bar view's value.
     */
    getValue: function() {
        return this.value;
    }

});