// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for input type: text
 *
 * @type String
 */
M.INPUT_TEXT = 'text';

/**
 * A constant value for input type: password
 *
 * @type String
 */
M.INPUT_PASSWORD = 'password';

/**
 * A constant value for input type: number
 *
 * @type String
 */
M.INPUT_NUMBER = 'number';

/**
 * A constant value for input type: tel
 *
 * @type String
 */
M.INPUT_TELEPHONE = 'tel';

/**
 * A constant value for input type: url
 *
 * @type String
 */
M.INPUT_URL = 'url';

/**
 * A constant value for input type: email
 *
 * @type String
 */
M.INPUT_EMAIL = 'email';

/**
 * @class
 *
 * M.TextFieldView is the prototype of any text field input view. It can be rendered as both
 * a single line text field and a multiple line text field. If it is styled as a multiple
 * line text field, is has a built-in autogrow mechanism so the textfield is getting larger
 * depending on the number of lines of text a user enters.
 *
 * @extends M.View
 */
M.TextFieldView = M.View.extend(
/** @scope M.TextFieldView.prototype */ {

   /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.TextFieldView',

   /**
    * The name of the text field. During the rendering, this property gets assigned to the name
    * property of the text field's html representation. This can be used to manually access the
    * text field's DOM representation later on.
    *
    * @type String
    */
    name: null,

    /**
     * The label proeprty defines a text that is shown above or next to the textfield as a 'title'
     * for the textfield. e.g. "Name:". If no label is specified, no label will be displayed.
     *
     * @type String
     */
    label: null,

    /**
     * The initial text shown inside the text field describing the input or making a suggestion for input
     * e.g. "Please enter your Name."
     *
     * @type String
     */
    initialText: '',

    /**
     * Determines whether to display the textfield grouped with the label specified with the label property.
     * If set to YES, the textfield and its label are wrapped in a container and styled as a unit 'out of
     * the box'. If set to NO, custom styling could be necessary.
     *
     * If there is no label specified, this property is ignored by default.
     *
     * @type Boolean
     */
    isGrouped: NO,

    /**
     * Defines whether the text field has multiple lines respectively is a text area.
     *
     * @type Boolean
     */
    hasMultipleLines: NO,

    /**
     * This property specifies the input type of this input field. Possible values are:
     *
     *   - M.INPUT_TEXT --> text input (default)
     *   - M.INPUT_PASSWORD --> password
     *   - M.INPUT_NUMBER --> number
     *   - M.INPUT_TELEPHONE --> tel
     *   - M.INPUT_URL --> url
     *   - M.INPUT_EMAIL --> email
     *
     * Note, that these types are not yet supported by all browsers!
     *
     * @type String
     */
    inputType: M.INPUT_TEXT,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['focus', 'blur', 'enter', 'keyup'],

    /**
     * Renders a TextFieldView
     * 
     * @private
     * @returns {String} The text field view's html representation.
     */
    render: function() {
        this.computeValue();
        this.html += '<div';

        if(this.label && this.isGrouped) {
            this.html += ' data-role="fieldcontain"';
        }

        if(this.cssClass) {
            this.html += ' class="' + this.cssClass + '_container"';
        }

        this.html += '>';

        if(this.label) {
            this.html += '<label for="' + (this.name ? this.name : this.id) + '">' + this.label + '</label>';
        }

        if(this.hasMultipleLines) {
            this.html += '<textarea cols="40" rows="8" name="' + (this.name ? this.name : this.id) + '" id="' + this.id + '"' + this.style() + '>' + (this.value ? this.value : this.initialText) + '</textarea>';
            
        } else {
            this.html += '<input type="' + this.inputType + '" name="' + (this.name ? this.name : this.id) + '" id="' + this.id + '"' + this.style() + ' value="' + (this.value ? this.value : this.initialText) + '" />';
        }

        this.html += '</div>';

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
     * The contentDidChange method is automatically called by the observable when the
     * observable's state did change. It then updates the view's value property based
     * on the specified content binding.
     *
     * This is a special implementation for M.TextFieldView.
     */
    contentDidChange: function(){
        /* if the text field has the focus, we do not apply the content binding */
        if(this.hasFocus) {
            return;
        }

        /* let M.View do the real job */
        this.bindToCaller(this, M.View.contentDidChange)();

        this.renderUpdate();
        this.delegateValueUpdate();
    },

    /**
     * Updates a TextFieldView with DOM access by jQuery.
     *
     * @private
     */
    renderUpdate: function() {
        this.computeValue();
        $('#' + this.id).val(this.value);
        this.styleUpdate();
    },

    /**
     * This method is called whenever the view gets the focus.
     * If there is a initial text specified and the value of this text field
     * still equals this initial text, the value is emptied.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    gotFocus: function(id, event, nextEvent) {
        if(this.initialText && (!this.value || this.initialText === this.value)) {
            this.setValue('');
            if(this.cssClassOnInit) {
                this.removeCssClass(this.cssClassOnInit);
            }
        }
        this.hasFocus = YES;

        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
    },

    /**
     * This method is called whenever the view lost the focus.
     * If there is a initial text specified and the value of this text field
     * is empty, the value is set to the initial text.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    lostFocus: function(id, event, nextEvent) {
        if(this.initialText && !this.value) {
            this.setValue(this.initialText, NO);
            this.value = '';
            if(this.cssClassOnInit) {
                this.addCssClass(this.cssClassOnInit);
            }
        }
        this.hasFocus = NO;

        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
    },

    /**
     * Method to append css styles inline to the rendered text field.
     *
     * @private
     * @returns {String} The text field's styling as html representation.
     */
    style: function() {
        var html = ' style="';
        if(this.isInline) {
            html += 'display:inline;';
        }
        html += '"';

        if(!this.isEnabled) {
            html += ' disabled="disabled"';
        }
        
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }

        return html;
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the text field.
     *
     * @private
     */
    theme: function() {
        if(this.initialText && !this.value && this.cssClassOnInit) {
            this.addCssClass(this.cssClassOnInit);
        }

        /* trigger keyup event to make the text field autogrow */
        if(this.value) {
            $('#'  + this.id).trigger('keyup');
        }
    },

    /**
     * Method to append css styles inline to the rendered view on the fly.
     *
     * @private
     */
    styleUpdate: function() {
        /* trigger keyup event to make the text field autogrow (enable fist, if necessary) */
        if(this.value) {
            $('#' + this.id).removeAttr('disabled');
            $('#'  + this.id).trigger('keyup');
        }

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
     * This method sets its value to the value it has in its DOM representation
     * and then delegates these changes to a controller property if the
     * contentBindingReverse property is set.
     *
     * Additionally call target / action if set.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    setValueFromDOM: function(id, event, nextEvent) {
        this.value = this.secure($('#' + this.id).val());
        this.delegateValueUpdate();

        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
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
     * This method disables the text field by setting the disabled property of its
     * html representation to true.
     */
    disable: function() {
        this.isEnabled = NO;
        this.renderUpdate();
    },

    /**
     * This method enables the text field by setting the disabled property of its
     * html representation to false.
     */
    enable: function() {
        this.isEnabled = YES;
        this.renderUpdate();
    },

    /**
     * This method clears the text field's value, both in the DOM and within the JS object.
     */
    clearValue: function() {
        this.setValue('');

        /* call lostFocus() to get the initial text displayed */
        this.lostFocus();
    },

    /**
     * This method returns the text field view's value.
     *
     * @returns {String} The text field view's value.
     */
    getValue: function() {
        return this.value;
    }

});