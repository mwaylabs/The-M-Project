// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The root object for TextFieldViews.
 *
 */
M.TextFieldView = M.View.extend({

   /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.TextFieldView',

   /**
     * The name of the text field.
     *
     * @property {String}
     */
    name: '',

    /**
     * Label defines a text that is shown above or next to the textfield as a 'title' for the textfield.
     * e.g. "Name:"
     *
     * @property {String}
     */
    label: '',

    /**
     * The initial text shown inside the text field describing the input or making a suggestion for input
     * e.g. "Please enter your Name."
     *
     * @property {String}
     */
    initialText: '',

    /**
     * Defines whether the text field is rendered as an password field or not.
     *
     * @property {Boolean}
     */
    isPassword: NO,

    /**
     * Renders a TextFieldView
     */
    render: function() {
        this.html += '<div ' + this.style() + ' data-role="fieldcontain">';

        if(this.label !== '') {
            this.html += '<label for="' + this.name + '">' + this.label + '</label>';
        }

        var type = this.isPassword ? 'password' : 'text';
        this.html += '<input type="' + type + '" name="' + this.name + '" id="' + this.id + '" value="' + this.initialText + '" />';
        this.html += '</div>';
        
        return this.html;
    },

    /**
     * Updates a TextFieldView.
     */
    renderUpdate: function() {
        $('#' + this.id).val(this.value);
        this.styleUpdate();
    },

    /**
     * This method is called whenever the view gets the focus.
     * If there is a initial text specified and the value of this text field
     * still equals this initial text, the value is emptied.
     */
    gotFocus: function() {
        if(this.initialText && (!this.value || this.initialText === this.value)) {
            this.setValue('');
        }
        this.hasFocus = YES;
    },

    /**
     * This method is called whenever the view lost the focus.
     * If there is a initial text specified and the value of this text field
     * is empty, the value is set to the initial text.
     */
    lostFocus: function() {
        if(this.initialText && !this.value) {
            this.setValue(this.initialText, NO);
        }
        this.hasFocus = NO;
    },

    /**
     * Method to append css styles inline to the rendered view.
     */
    style: function() {
        var html = '';
        if(this.isInline) {
            if(!html) {
                html += 'style="';
            }
            html += 'display:inline;';
        }
        if(!this.isEnabled) {
            if(!html) {
                html += 'style="';
            }
            html += 'disabled="disabled"';
        }
        if(html) {
            html += '"';
        }
        return html;
    },

    /**
     * Method to append css styles inline to the rendered view.
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
     * This method sets its value to the value it has in its DOM representation
     * and then delegates these changes to a controller property if the
     * contentBindingReverse property is set.
     */
    setValueFromDOM: function() {
        this.value = this.secure($('#' + this.id).val());
        this.delegateValueUpdate();
    },

    /**
     * This method sets the text field's value, initiates its re-rendering
     * and call the delegateValueUpdate().
     */
    setValue: function(value, delegateUpdate) {
        this.value = value;
        this.renderUpdate();

        if(delegateUpdate) {
            this.delegateValueUpdate();
        }
    }

});