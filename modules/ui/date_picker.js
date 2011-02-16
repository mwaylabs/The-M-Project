// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      04.02.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This defines the prototype for a date picker view.
 *
 * @extends M.View
 */
M.DatePickerView = M.View.extend(
/** @scope M.DatePickerView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DatePickerView',

    /**
     * This property specifies whether a value update is currently in progress
     * or not. This is mainly used to decide on focus event for the text field
     * whether or not to show the date picker view.
     *
     * @type Boolean
     */
    valueUpdateInProgress: NO,

    /**
     * Determines whether this date picker is also used to pick a time. If set
     * to YES, two input fields (text fields) are rendered below the date picker
     * to allow the user to enter a certain time (hours and minutes).
     *
     * @type Boolean
     */
    isDateTimePicker: YES,

    /**
     * Renders a datepicker as a button. On click, there will be a date picker
     * visible to select a certain date.
     *
     * @private
     * @returns {String} The date picker view's html representation.
     */
    render: function() {
        this.html += '<input type="hidden" id="' + this.id + '_hidden" />';
        this.html += '<a data-role="button" data-type="date" href="#" id="' + this.id + '"' + this.style() + '>-</a>';

        if(this.isDateTimePicker) {
            this.html += '<div id="' + this.id + '_time" class="ui-grid-a">';
            this.html += '<div class="ui-block-a">';
            this.html += '<input type="number" id="' + this.id + '_hours" onchange="M.ViewManager.getViewById(\'' + this.id + '\').dateSelected();" value="00" />';
            this.html += '</div>';
            this.html += '<div class="ui-block-b">';
            this.html += '<input type="number" id="' + this.id + '_minutes" onchange="M.ViewManager.getViewById(\'' + this.id + '\').dateSelected();" value="00" />';
            this.html += '</div>';
            this.html += '</div>';
        }

        /* set the datepicker's language to the user's language (if specified) */
        var language = M.I18N.getLanguage();
        if($.datepicker.regional[language]) {
            $.datepicker.setDefaults(language);
        } else if($.datepicker.regional[language.substring(0, 2)]) {
            $.datepicker.setDefaults($.datepicker.regional[language.substring(0, 2)]);
        }

        this.internalTarget = this;
        this.internalAction = 'showDatePicker';

        return this.html;
    },

    /**
     * Updates a date picker view based on its newly set value.
     *
     * @private
     */
    renderUpdate: function() {
        $('#' + this.id + '_hours').val(this.value.format('HH'));
        $('#' + this.id + '_minutes').val(this.value.format('MM'));
        $('#' + this.id + ' ~ div:first').datepicker('setDate', this.value.date);
        $('#' + this.id + ' span.ui-btn-text').html($('#' + this.id + '_hidden').val());

        this.computeDate();
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the date picker.
     *
     * @private
     */
    theme: function() {
        $('.hasDatepicker').hide();
        $('#' + this.id + ' span.ui-btn-text').html($('#' + this.id + '_hidden').val());
        this.computeDate();
    },

    /**
     * This method computes the date out of the selected date and a given time.
     */
    computeDate: function() {
        var date = M.Date.create($('#' + this.id + ' ~ div:first').datepicker("getDate"));
        var hours = parseInt($('#' + this.id + '_hours').val());
        var minutes = parseInt($('#' + this.id + '_minutes').val());

        hours = (isNaN(hours) || hours < 0 || hours > 23) ? 0 : hours;
        minutes = (isNaN(minutes) || minutes < 0 || minutes > 59) ? 0 : minutes;

        this.value = date.hoursFromDate(hours).minutesFromDate(minutes);
    },

    /**
     * This method is called whenever the button of a date picker view is clicked. 
     * We use this event to show the actual date picker and to let the user select
     * a date. Once the user clicks a date, the date picker gets hidden again and
     * we update the button's label.
     */
    showDatePicker: function() {
        if(this.valueUpdateInProgress) {
            return;
        }

        $('.hasDatepicker').show();

        var that = this;
        $('#' + this.id + ' ~ div.hasDatepicker table.ui-datepicker-calendar').live(
            'mouseup',
            function() {
                $('.hasDatepicker').hide();
            }
        );
    },

    /**
     * This method is event triggered and gets called automatically if a user selected
     * a certain date. We then update the button's label and the date picker's value.
     *
     * @param {String} dateText The date string to be displayed as the button's label.
     */
    dateSelected: function(dateText) {
        $('#' + this.id + ' span.ui-btn-text').html(dateText);
        this.computeDate();
    },

    /**
     * Set the value, respectively the date, of this date picker view.
     *
     * @param {M.Date} date The date, the date picker should be set to.
     */

    setDate: function(date) {
        $('#' + this.id + ' ~ div:first').datepicker('setDate', date.date);
        this.value = M.Date.create($('#' + this.id + ' ~ div:first').datepicker("getDate"));
    },

    /**
     * Get the value, respectively the date, of this date picker view.
     *
     * @returns {M.Date} The date of this date picker.
     */

    getDate: function() {
        return this.value;
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
    setValueFromDOM: function(evt) {
        //this.value = M.Date.create($('#' + this.id + ' ~ div:first').datepicker("getDate"));
        this.delegateValueUpdate();

        if((evt === 'change' && this.triggerActionOnChange || evt === 'keyup' && this.triggerActionOnKeyUp) && this.target && this.action) {
            this.target[this.action](this.value);
        }
    }

});