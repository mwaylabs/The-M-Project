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
 * The is the prototype of a movable label view.
 * It extends M.LabelView and has special methods and overrides for making it movable
 *
 * @extends M.LabelView
 */
M.MovableLabelView = M.LabelView.extend(
/** @scope M.MovableLabelView.prototype */ {

    /**
     * The type of this object.
     *
     * @type {String}
     */
    type: 'M.MovableLabelView',

    /**
     * movable object property responsible for making this view movable
     *
     */
    movable: null,

    /**
     * The CSSOM representation of the newly created style in the document-head
     *
     * @private
     * @type {Object}
     */
    extraStyle: null,

    /**
     * Signalizes if there are any moveRules attached to this view
     *
     * @private
     * @type {Boolean}
     */
    moveRulesAvailable: NO,

    /**
     * jQuery object of the DOM representation of this view
     *
     * @private
     * @type {Object}
     */
    $this: null,

    /**
     * jQuery object of the DOM representation of this view's parent
     *
     * @private
     * @type {Object}
     */
    $parent: null,

    /**
     * Renders a label view as a div tag with corresponding data-role attribute and inner
     * text defined by value. Also checks if the label has to move hence that the movable property has been passed.
     * If so renders an outer div, creates an extra style inside the document-head, checks if moving is necessary
     * and if so sets the label movable.
     *
     * @private
     * @returns {String} The image view's styling as html representation.
     */

    render: function() {
        var that = this,
            diff;
        this.computeValue();
        if(_.isObject(this.movable)) {
            if ((this.movable.time || this.movable.time === 0) || (this.movable.pxPerSec || this.movable.pxPerSec === 0)){
                this.html = '<div class="tmp-movable-outer outer-'+ this.id +'">';
                this.extraStyle = this._createExtraStyle();
                window.setTimeout(function(){
                    (diff = that._checkIfMovingNecessary()) ? that._makeMovable(diff) : M.Logger.log('Width not big enough to move', M.INFO);
                }, 0);
            }else {
                M.Logger.log('"time" OR "pxPerSec" are needed', M.WARN);
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

        /* If movable is set, an outer div box was defined before and we need to close it here */
        if(_.isObject(this.movable)) {
            this.html += '</div>';
        }

        return this.html;
    },

    /**
     * Updates the value of the label with DOM access by jQuery. Checks again if this view has to move
     * as the width might has changed hence of changes in the views value.
     *
     * @private
     */
    renderUpdate: function() {
        var that = this;
        this.computeValue();
        $('#' + this.id).html(this.newLineToBreak ? this.nl2br(this.value) : this.value);
        if(_.isObject(this.movable)){
            if ((this.movable.time || this.movable.time === 0) || (this.movable.pxPerSec || this.movable.pxPerSec === 0)){
                window.setTimeout(function(){
                    (diff = that._checkIfMovingNecessary()) ? that._makeMovable(diff) : M.Logger.log('Width not big enough to move', M.INFO);
                }, 0);
            }else {
                M.Logger.log('"time" OR "pxPerSec" are needed', M.WARN);
            }
        }
    },

    /**
     * Actual method which makes this view movable by inserting CSS3 animation rule
     * to the extra style-tag in the document-head.
     *
     * @private
     */
    _makeMovable: function(diff) {
        var that = this;
        window.setTimeout(function(){
            that._insertMoveRules(that._getBrowserKeyframeRule(), diff, (that.movable.offset || that.movable.offset === 0) ? that.movable.offset : 0, (that.movable.pxPerSec) ? (diff / that.movable.pxPerSec) : that.movable.time);
        }, 0);
    },

    /**
     * Responsible for deciding whether this view should move or not.
     *
     * @private
     * @returns either the calculated number or false
     */
    _checkIfMovingNecessary: function() {
        var diff;
        this.$this = $('#' + this.id);
        this.$parent = this.$this.parent();
        this._addMoveClasses(this.$this, this.$parent);
        diff = this._getDiff(this.$this, this.$parent);
        if(diff > 0){
            if(this.moveRulesAvailable){
                this._deleteMoveRules();
            }
            return diff;
        }else {
            this._removeMoveClasses(this.$this, this.$parent);
            if(this.moveRulesAvailable) {
                this._deleteMoveRules();
            }
            return NO;
        }
    },

    /**
     *
     * Appends an extra style tag to the head
     *
     * @private
     * @returns {HTMLElement} The style element as CSSOM
     */
    _createExtraStyle: function(){
        var animationStyle = document.createElement('style'), styles;
        animationStyle.type = "text/css";
        document.getElementsByTagName('head').item(0).appendChild(animationStyle);
        styles = document.styleSheets.length;
        animationStyle = document.styleSheets[styles-1];
        return animationStyle;
    },

    /**
     * Calculates the width-difference of the inner div (the one containing the value) and
     * its outer box.
     *
     * Difference + offset results in the "moving value", the offset that the label is animated.
     *
     * @private
     * @param {Object} $self
     * @param {Object} $parent
     * @returns {number} difference self-width minus parent-width
     */
    _getDiff: function($self, $parent) {
        var diff = $self.outerWidth() - $parent.width();
        return diff;
    },

    /**
     * Returns the CSSRule for the specific browser.
     *
     * @private
     * @returns {string} the name of the browser for css3-animation
     */
    _getBrowserKeyframeRule: function(){
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
     * @param {Object} $self The jQuery-Object of this label
     * @param {Object} $parent The jQuery-Object of the surrounding div-container of the label
     */
    _addMoveClasses: function($self, $parent) {
        $self.addClass('tmp-movable-inner inner-' + this.id);
        $parent.addClass('tmp-movable-outer');
    },

    /**
     * Removes special classes responsible for making the label move.
     *
     * @private
     * @param {Object} $self The jQuery-Object of this label
     * @param {Object} $parent The jQuery-Object of the surrounding div-container of the label
     */
    _removeMoveClasses: function($self, $parent) {
        $self.removeClass('tmp-movable-inner inner-' + this.id);
        $parent.removeClass('tmp-movable-outer');
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
    _insertMoveRules: function(browsertype, diff, offset, sec){
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
    _deleteMoveRules: function(){
        var l = this.extraStyle.cssRules.length;
        while(l > 0){
            this.extraStyle.removeRule(l-1);
            l = this.extraStyle.cssRules.length;
        }
        this.moveRulesAvailable = NO;
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