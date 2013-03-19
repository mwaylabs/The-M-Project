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

    isMovable: NO,

    extraStyle: null,

    moveRulesAvailable: NO,

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
                this.isMovable = YES;
                this.html = '<div class="outer-'+ this.id +'">';
                this.extraStyle = this.createExtraStyle();
                this.makeMovable(this.movable.offset, this.movable.time);
                window.setTimeout(function(){
                    that.html += '</div>';
                }, 0);
            }else {
                M.Logger.log('both properties "time" and "offset" are needed', M.WARN);
            }
        }
        this.html += '<div id="' + this.id + '"' + this.style() + '>';

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
        var that = this, self$ = $('#' + this.id);
        this.computeValue();
        self$.html(this.newLineToBreak ? this.nl2br(this.value) : this.value);
        if(this.isMovable){
            var parent$ = $('.outer-' + this.id);
            this.addMoveClasses(self$, parent$);
            var diff = this.getDiff(self$, parent$);
            if(diff > 0) {
                if(this.moveRulesAvailable) {
                    this.deleteMoveRules();
                }
                window.setTimeout(function(){
                    that.insertMoveRules(that.getBrowserKeyframeRule(), diff, that.movable.offset, that.movable.time);
                }, 0);
            }else {
                this.removeMoveClasses(self$, parent$);
                if(this.moveRulesAvailable) {
                    this.deleteMoveRules();
                }
            }
        }
    },

    /**
     *
     * Appends an extra style tag to the head
     *
     * @private
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
     * Calculates the width-difference of self$ minus parent$
     *
     * @private
     * @param {Object} self$
     * @param {Object} parent$
     * @returns {number} difference self-parent
     */
    getDiff: function(self$, parent$){
        var diff = self$.width() - parent$.width();
        return diff;
    },

    /**
     * Returns the CSSRule for the specific browser.
     *
     * @private
     * @returns {string} the name of the browser for css3-animation
     */
    getBrowserKeyframeRule: function(){
        if(CSSRule.WEBKIT_KEYFRAME_RULE) {
            return "-webkit-";
        }else if(CSSRule.MOZ_KEYRAME_RULE) {
            return "-moz-";
        }else if(CSSRule.O_KEYFRAME_RULE) {
            return "-o-";
        }else {
            return "";
        }
    },

    /**
     * Adds special classes responsible for making the label move.
     *
     * @private
     * @param {Object} self$ The jQuery-Object of this label
     * @param {Object} parent$ The jQuery-Object of the surrounding div-container of the label
     */
    addMoveClasses: function(self$, parent$) {
        self$.addClass('tmp-movable-inner');
        self$.addClass('inner-' + this.id);
        parent$.addClass('tmp-movable-outer');
    },

    /**
     * Removes special classes responsible for making the label move.
     *
     * @private
     * @param {Object} self$ The jQuery-Object of this label
     * @param {Object} parent$ The jQuery-Object of the surrounding div-container of the label
     */
    removeMoveClasses: function(self$, parent$) {
        self$.removeClass('tmp-movable-inner');
        self$.removeClass('inner-' + this.id);
        parent$.removeClass('tmp-movable-outer');
    },

    /**
     * Inserts Animation-Rules to the CSSOM in the document-head.
     *
     * @private
     * @param {String} The String for the specific browser
     * @param diff The difference self-parent
     * @param offset The offset value of the passed movable-object
     * @param sec The time value of the passed movable-object
     */
    insertMoveRules: function(browsertype, diff, offset, sec){
        this.extraStyle.insertRule('.inner-' + this.id + ' {'+
            browsertype+'animation-name: move-' + this.id + ';'+
            browsertype+'animation-duration: ' + sec + 's;'+
            browsertype+'animation-iteration-count: infinite;'+
            browsertype+'animation-timing-function: linear;'+
            '}', 0);
        this.extraStyle.insertRule('@' + browsertype + 'keyframes move-' + this.id + '{ 0%,100% { left: ' + offset + 'px;} 50% { left:' + (-diff - offset) + 'px;}}', 1);
        this.moveRulesAvailable = YES;
    },

    /**
     * Deletes the extra CSS3 animation-rules from the CSSOM in the document-head.
     *
     * @private
     *
     */
    deleteMoveRules: function(){
        var l = this.extraStyle.cssRules.length;
        while(l > 0){
            this.extraStyle.removeRule(l-1);
            l = this.extraStyle.cssRules.length;
        }
        this.moveRulesAvailable = NO;
    },

    /**
     * "Initial" method to make the label movable. Gets called in render if a movable-object is passed to the View.
     *
     * @private
     * @param offset The offset value of the passed movable-object
     * @param sec The time value of the passed movable-object
     */
    makeMovable: function(offset, sec){
        var that = this, browsertype = "", parent$, self$, diff;
        browsertype = this.getBrowserKeyframeRule();
        window.setTimeout(function(){
            self$ = $('#' + that.id);
            parent$ = $('.outer-' + that.id);
            that.addMoveClasses(self$, parent$);
            diff = that.getDiff(self$, parent$);
            if(diff > 0){
                that.insertMoveRules(browsertype, diff, offset, sec);
            }else{
                that.removeMoveClasses(self$, parent$);
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