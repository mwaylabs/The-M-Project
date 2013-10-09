// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      17.11.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This defines the prototype for a range slider view. It renders a touch-optimized range slider
 * that can be used to set a two numbers within a specified range.
 *
 * @extends M.View
 */
M.RangeSliderView = M.View.extend(
/** @scope M.ButtonView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.RangeSliderView',

    /**
     * This property contains the slider's lower value.
     */
    lowValue: 0,

    /**
     * This property contains the slider's higher value.
     */
    highValue: 100,

    /**
     * This property contains the slider's initial lower value.
     *
     * @private
     */
    initialLowValue: 0,

    /**
     * This property contains the slider's initial higher value.
     *
     * @private
     */
    initialHighValue: 0,

    /**
     * This property specifies the min value of the slider.
     *
     * @type Number
     */
    min: 0,

    /**
     * This property specifies the max value of the slider.
     *
     * @type Number
     */
    max: 100,

    /**
     * This property specifies the step value of the slider.
     *
     * @type Number
     */
    step: 1,

    /**
     * This property determines whether or not to display the corresponding input of the slider.
     *
     * @type Boolean
     */
    isSliderOnly: NO,

    /**
     * This property determines whether or not to visually highlight the range of the slider. If
     * this is set to YES, the track from the lower slider handle to the higher slider handle will be highlighted.
     *
     * @type Boolean
     */
    highlight: YES,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['change'],

    /**
     * The label proeprty defines a text that is shown above or next to the slider as a 'title'
     * for the slider. e.g. "Name:". If no label is specified, no label will be displayed.
     *
     * @type String
     */
    label: null,

    /**
     * Define whether putting an asterisk to the right of the label for this slider.
     *
     * @type Boolean
     */
    hasAsteriskOnLabel: NO,

    /**
     * This property can be used to assign a css class to the asterisk on the right of the label.
     *
     * @type String
     */
    cssClassForAsterisk: null,

    /**
     * Renders a slider.
     *
     * @private
     * @returns {String} The slider view's html representation.
     */
    render: function() {
        this.html = '';

        this.html += '<div data-role="rangeslider">';

        if(this.label) {
            this.html += '<label for="' + this.id + '">' + this.label;
            if (this.hasAsteriskOnLabel) {
                if (this.cssClassForAsterisk) {
                    this.html += '<span class="' + this.cssClassForAsterisk + '">*</span></label>';
                } else {
                    this.html += '<span>*</span></label>';
                }
            } else {
                this.html += '</label>';
            }
        }

        this.html += '<div id="' + this.id + '_container" class="tmp-slider-container' + (this.isSliderOnly ? ' tmp-slider-is-slider-only' : '') + '">';
        this.html += '<input id="' + this.id + '" type="range" data-highlight="' + this.highlight + '" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this.lowValue + '"' + this.style() + '>';
        this.html += '<input id="' + this.id + '_b" type="range" data-highlight="' + this.highlight + '" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this.highValue + '"' + this.style() + '>';

        this.html += '</div>';

        this.html += '</div>';

        /* store value as initial value for later resetting */
        this.initialLowValue = this.lowValue;
        this.initialHighValue = this.highValue;

        return this.html;
    },

    /**
     * This method registers the change event to internally re-set the value of the
     * slider.
     */
    registerEvents: function() {
        if(!this.internalEvents) {
            this.internalEvents = {
                change: {
                    target: this,
                    action: 'setValueFromDOM'
                }
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
    },

    /**
     * Updates a SliderView with DOM access by jQuery.
     *
     * @private
     */
    renderUpdate: function() {
        /* check if the slider's lower value is numeric, otherwise use initial value */
        if(isNaN(this.lowValue)) {
            this.lowValue = this.initialLowValue;
        /* if it is a number, but out of bounds, use min/max */
        } else if(this.lowValue < this.min) {
            this.lowValue = this.min;
        } else if(this.lowValue > this.max) {
            this.lowValue = this.max;
        }

        /* check if the slider's higher value is numeric, otherwise use initial value */
        if(isNaN(this.highValue)) {
            this.highValue = this.initialHighValue;
        /* if it is a number, but out of bounds, use min/max */
        } else if(this.highValue < this.min) {
            this.highValue = this.min;
        } else if(this.highValue > this.max) {
            this.highValue = this.max;
        }

        $('#' + this.id).val(this.lowValue);
        $('#' + this.id + '_b').val(this.highValue);
        $('#' + this.id).slider('refresh');
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
        this.lowValue = $('#' + this.id).val();
        this.highValue = $('#' + this.id + '_b').val();

        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, NO, [this.value, this.id]);
        }
    },

    /**
     * Applies some style-attributes to the slider.
     *
     * @private
     * @returns {String} The slider's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    },

    /**
     * Do some theming/styling once the slider was added to the DOM.
     *
     * @private
     */
    theme: function() {
        if(this.isSliderOnly) {
            $('#' + this.id).hide();
            $('#' + this.id + '_b').hide();
        }

        if(!this.isEnabled) {
            this.disable();
        }
    },

    /**
     * This method resets the slider to its initial value.
     */
    resetSlider: function() {
        this.lowValue = this.initialLowValue;
        this.highValue = this.initialHighValue;
        this.renderUpdate();
    },

    /**
     * This method disables the text field by setting the disabled property of its
     * html representation to true.
     */
    disable: function() {
        this.isEnabled = NO;
        $('#' + this.id).slider('disable');
    },

    /**
     * This method enables the text field by setting the disabled property of its
     * html representation to false.
     */
    enable: function() {
        this.isEnabled = YES;
        $('#' + this.id).slider('enable');
    }

});