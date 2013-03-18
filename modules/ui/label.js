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
 * A constant value for hyperlink of type email.
 *
 * @type String
 */
M.HYPERLINK_EMAIL = 'mail';

/**
 * A constant value for hyperlink of type website.
 *
 * @type String
 */
M.HYPERLINK_WEBSITE = 'website';

/**
 * A constant value for hyperlink of type phone number.
 *
 * @type String
 */
M.HYPERLINK_PHONE = 'phone';

/**
 * @class
 *
 * The is the prototype of any label view. It basically renders a simple plain
 * text can be styled using several properties of M.LabelView or providing one
 * ore more css classes.
 *
 * @extends M.View
 */
M.LabelView = M.View.extend(
/** @scope M.LabelView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.LabelView',

    /**
     * Determines whether a new line '\n' within the label's value should be transformed
     * into a line break '<br/>' before it is rendered. Default: YES.
     *
     * @type Boolean
     */
    newLineToBreak: YES,

    /**
     * Determines whether a tabulator '\t' within the label's value should be transformed
     * into four spaces '&#160;' before it is rendered. Default: YES.
     *
     * @type Boolean
     */
    tabToSpaces: YES,

    /**
     * This property can be used to specify a certain hyperlink type for this label. It only
     * works in combination with the hyperlinkTarget property.
     *
     * @type String
     */
    hyperlinkType: null,

    /**
     * This property can be used to specify a hyperlink target for this label. It only
     * works in combination with the hyperlinkType property.
     *
     * @type String
     */
    hyperlinkTarget: null,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['tap'],

    /**
     * Renders a label view as a div tag with corresponding data-role attribute and inner
     * text defined by value.
     *
     * @private
     * @returns {String} The image view's styling as html representation.
     */
    render: function() {
        var that = this;
        this.computeValue();
        if(typeof(this.movable) === 'object') {
            if (this.movable.time && this.movable.offset){
                if(typeof(this.movable.time) === 'string' && typeof(this.movable.offset) === 'string') {
                    this.html += '<div class="outer">';
                    var xtrastyle = this.createExtraStyle();
                    this.makeMovable(xtrastyle, this.movable.offset, this.movable.time);
                    window.setTimeout(function(){
                        that.html += '</div>';
                    }, 0);
                }else {
                    console.log('falscher typ');
                }
            }else {
                console.log("ein parameter fehlt");
            }
        }
        this.html = '<div id="' + this.id + '"' + this.style() + '>';

        if(this.hyperlinkTarget && this.hyperlinkType) {
            switch (this.hyperlinkType) {
                case M.HYPERLINK_EMAIL:
                    this.html += '<a rel="external" href="mailto:' + this.hyperlinkTarget + '">';
                    break;
                case M.HYPERLINK_WEBSITE:
                    this.html += '<a rel="external" target="_blank" href="' + this.hyperlinkTarget + '">';
                    break;
                case M.HYPERLINK_PHONE:
                    this.html += '<a rel="external" href="tel:' + this.hyperlinkTarget + '">';
                    break;
            }
        }

        this.html += this.newLineToBreak ? this.nl2br(this.tabToSpaces ? this.tab2space(this.value) : this.value) : (this.tabToSpaces ? this.tab2space(this.value) : this.value);

        if(this.hyperlinkTarget && this.hyperlinkType) {
            this.html += '</a>';
        }

        this.html += '</div>';
        
        return this.html;
    },

    /**
     * Updates the value of the label with DOM access by jQuery.
     *
     * @private
     */
    renderUpdate: function() {
        this.computeValue();
        $('#' + this.id).html(this.newLineToBreak ? this.nl2br(this.value) : this.value);
    },

    /**
     *
     * Appends an extra style tag to the head
     *
     * @returns {HTMLElement} The style element as CSSOM
     */
    createExtraStyle: function(){
        var animationStyle = document.createElement('style'), styles;
        animationStyle.type = "text/css";
        document.getElementsByTagName('head').item(0).appendChild(animationStyle);
        styles = document.styleSheets.length;
        animationStyle = document.styleSheets[styles-1];
        return animationStyle;
    },

    /**
     *
     * Makes the label movable based on css3 animation
     *
     * @param {Object} style
     */
    makeMovable: function(style, offset, sec){
        var that = this, browsertype = "", parent$, self$, outerSize$, ownSize$, diff;
        if(CSSRule.WEBKIT_KEYFRAME_RULE) {
            browsertype = "-webkit-";
        }else if(CSSRule.MOZ_KEYRAME_RULE) {
            browsertype = "-moz-";
        }
        window.setTimeout(function(){
            self$ = $('#' + that.id);
            parent$ = $('.outer');
            self$.addClass('tmp-movable-inner');
            parent$.addClass('tmp-movable-outer');
            ownSize$ = self$.width();
            outerSize$ = parent$.width();
            diff = ownSize$ - outerSize$;
            if(diff > 0){
                style.insertRule('.tmp-movable-inner {'+
                    browsertype+'animation-name: move;'+
                    browsertype+'animation-duration: '+ sec +'s;'+
                    browsertype+'animation-iteration-count: infinite;'+
                    browsertype+'animation-timing-function: linear;'+
                    '}', 0);
                style.insertRule('@' + browsertype + 'keyframes move { 0%,100% { left: ' + offset + 'px;} 50% { left:' + (-diff - offset) + 'px;}}', 1);
            }else{
                self$.removeClass('tmp-movable-inner');
                parent$.removeClass('tmp-movable-outer');
            }
        }, 0);
    },

    /**
     * Applies some style-attributes to the label.
     *
     * @private
     * @returns {String} The label's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.isInline) {
            html += ' style="display:inline;"';
        }
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    },

    /**
     * This method sets the label's value and initiates its re-rendering.
     *
     * @param {String} value The value to be applied to the label view.
     */
    setValue: function(value) {
        this.value = value;
        this.renderUpdate();
    }

});