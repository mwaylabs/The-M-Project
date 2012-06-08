// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This defines the prototype for any button view. A button is a view element that is
 * typically used for triggering an action, e.g. switching to another page, firing a
 * request or opening a dialog.
 *
 * @extends M.View
 */
M.ButtonView = M.View.extend(
/** @scope M.ButtonView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ButtonView',

    /**
     * Determines whether this button is active or not.
     *
     * Note: This property is only used if the button is part of a button group (M.ButtonGroupView).
     *
     * @type Boolean
     */
    isActive: NO,

    /**
     * Determines whether to display the button ony with an icon but no text or not.
     *
     * @type Boolean
     */
    isIconOnly: NO,

    /**
     * This property can be used to specify a certain hyperlink type for this button. It only
     * works in combination with the hyperlinkTarget property.
     *
     * @type String
     */
    hyperlinkType: null,

    /**
     * This property can be used to specify a hyperlink target for this button. It only
     * works in combination with the hyperlinkType property.
     *
     * @type String
     */
    hyperlinkTarget: null,

    /**
     * This property can be used to specify a tag, that is independent from the button's
     * value. This allows you to identify a button, without having to worry about changes
     * to its value.
     *
     * @type String
     */
    tag: null,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['click', 'tap'],

    /**
     * Renders a button as an input tag. Input is automatically converted by jQuery mobile.
     *
     * @private
     * @returns {String} The button view's html representation.
     */
    render: function() {
        this.computeValue();
        this.html += '<a data-role="button" id="' + this.id + '"' + this.style() + ' ';

        if(this.hyperlinkTarget && this.hyperlinkType) {
            switch (this.hyperlinkType) {
                case M.HYPERLINK_EMAIL:
                    this.html += 'rel="external" href="mailto:' + this.hyperlinkTarget + '"';
                    break;
                case M.HYPERLINK_WEBSITE:
                    this.html += 'rel="external" target="_blank" href="' + this.hyperlinkTarget + '"';
                    break;
                case M.HYPERLINK_PHONE:
                    this.html += 'rel="external" href="tel:' + this.hyperlinkTarget + '"';
                    break;
            }
        } else {
            this.html += 'href="#"';
        }

        this.html += '>' + this.value + '</a>';

        return this.html;
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for list views and their
     * internal events.
     */
    registerEvents: function() {
        if(!this.internalEvents) {
            this.internalEvents = {
                tap: {
                    target: this,
                    action: 'dispatchEvent'
                }
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
    },

    /**
     * Updates the value of the button with DOM access by jQuery.
     *
     * @private
     */
    renderUpdate: function() {
        this.computeValue();
        $('#' + this.id + ' .ui-btn-text').text(this.value);
    },

    /**
     * Sets the button's value and calls renderUpdate() to make the value update visible.
     *
     * @param {String} value The button's new value.
     */
    setValue: function(value) {
        this.value = value;
        this.renderUpdate();
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the button.
     *
     * @private
     */
    theme: function() {
        /* theme only if not already done */
        if(!$('#' + this.id).hasClass('ui-btn')) {
            $('#' + this.id).buttonMarkup();
        }
    },

    /**
     * Applies some style-attributes to the button.
     *
     * @private
     * @returns {String} The button's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.isInline) {
            html += ' data-inline="true"';
        }
        if(this.icon) {
            html += ' data-icon="' + this.icon + '"';
        }
        if(this.cssClass) {
            html += ' data-theme="' + this.cssClass + '"';
        }
        if(this.isIconOnly) {
            html += ' data-iconpos="notext"';
        }
        if(this.cssStyle) {
            html += 'style="' + this.cssStyle + '"';
        }
        return html;
    },

    /**
     * This method is called right before the page is loaded. If a beforeLoad-action is defined
     * for the page, it is now called.
     *
     * @param {String} id The DOM id of the event target.
     * @param {Object} event The DOM event.
     * @param {Object} nextEvent The next event (external event), if specified.
     */
    dispatchEvent: function(id, event, nextEvent) {
        if(this.isEnabled && nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
    },

    /**
     * This method can be used to disable the button. This leads to a visual 'disabled' look and
     * disabled the buttons tap/click events.
     */
    disable: function() {
        if(this.isEnabled) {
            var html = $('#' + this.id).html();
            html = '<div data-theme="c" class="ui-shadow ui-disabled" aria-disabled="true">' + html + '</div>';
            $('#' + this.id).html(html);
            this.isEnabled = NO;
        }
    },

    /**
     * This method can be used to enable a disabled button and make it usable again.
     */
    enable: function() {
        if(!this.isEnabled) {
            var html = $('#' + this.id + ' div').html();
            $('#' + this.id).html(html);
            this.isEnabled = YES;
        }
    }

});
