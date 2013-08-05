// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Johannes
// Date:      13.06.2013
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

M.MOVABLE_TYPE_ALTERNATE = 'alternate';
M.MOVABLE_TYPE_LEFT = 'left';
M.MOVABLE_TYPE_RIGHT = 'right';

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
		$self: null,

		/**
		 * jQuery object of the DOM representation of this view's parent
		 *
		 * @private
		 * @type {Object}
		 */
		$parent: null,

		/**
		 * Width of the MovableLabel
		 *
		 * @private
		 * @type {Number}
		 */
		$selfWidth: 0,

		/**
		 * Width of its outer container
		 *
		 * @private
		 * @type {Number}
		 */
		$parentWidth: 0,

		/**
		 * Acts as a trigger whether MovableLabel behaves like a normal Label or not. Standard is moving.
		 *
		 * @private
		 * @type {Boolean}
		 */
		autoplay: YES,

		/**
		 * Signalizes if the lable is currently in moving state or not
		 *
		 * @private
		 * @type {Boolean}
		 */

		playing: NO,

		/**
		 * Renders a label view as a div tag with corresponding data-role attribute and inner
		 * text defined by value. The call of _init determines if this Label qualifies as a MovableLabel.
		 *
		 * @private
		 * @returns {String} The image view's styling as html representation.
		 */

		render: function() {
			this.computeValue();

			this._init( true );
			this.html += '<div id="' + this.id + '">';

			if( this.hyperlinkTarget && this.hyperlinkType ) {
				switch ( this.hyperlinkType ) {
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

			if( this.hyperlinkTarget && this.hyperlinkType ) {
				this.html += '</a>';
			}

			this.html += '</div>';

			/* If movable is set, an outer div box was defined before and we need to close it here */
			if( this.autoplay ) {
				if( _.isObject( this.movable ) ) {
					this.html += '</div>';
					this.html += '</div>';
				}
			}

			return this.html;
		},

		/**
		 * Updates the value of the label with DOM access by jQuery. Checks again if this view has to move
		 * as the width might has changed hence of changes in the views value.
		 *
		 * @private
		 */
		renderUpdate: function( rerender ) {
			if( !rerender ) {
				this.computeValue();
			}

			$( '#' + this.id ).html( this.newLineToBreak ? this.nl2br( this.value ) : this.value );

			!rerender ? this._init() : this._init( true );
		},

		/**
		 * Responsible to initialize the Label as a MovableLabel or not. If autoplay was set to false
		 * or no movable Object Parameter was defined or no time setting was passed it returns immediately.
		 *
		 * @param initialRender
		 * @private
		 */
		_init: function( initialRender ) {
			var that = this;
			if( !this.autoplay ) {
				return;
			} else {
				if( !_.isObject( this.movable ) ) {
					return;
				}
				else if( ( this.movable.time || this.movable.time === 0 ) || ( this.movable.pxPerSec || this.movable.pxPerSec === 0 ) ){
					if( initialRender ) {
						this.html = '<div '+ this.style() + '>';
						this.html += '<div class="tmp-movable-outer outer-'+ this.id + '">';
						this.extraStyle = this._createExtraStyle();
					}
					window.setTimeout( function(){
						that._config( that._checkIfMovingNecessary );
					}, 0 );
				}
				else {
					M.Logger.log( '"time" OR "pxPerSec" are needed', M.WARN );
					return;
				}
			}
		},

		/**
		 * caches the MovableLabel and its outer container as jQuery objects and calls _checkIfMovingNecessary by callback.
		 * If _checkIfMovingNecessary returns a valid number _makeMovable gets called. If not it returns immediately.
		 *
		 * @param checkIfMovingNecessary
		 * @private
		 */
		_config: function( checkIfMovingNecessary ) {
			var diff;

			this.$self = $( '#' + this.id );
			this.$parent = this.$self.parent();

			(diff = checkIfMovingNecessary.call( this )) ? this._makeMovable( diff ) : M.Logger.log( 'Moving not necessary as MovableLabel is smaller than its outer container', M.INFO ); return;
		},

		/**
		 * Actual method which makes this view movable by inserting CSS3 animation rule
		 * to the extra style-tag in the document-head.
		 *
		 * @private
		 */
		_makeMovable: function( diff ) {
			var that = this;

			this.playing = YES;
			window.setTimeout( function(){
				that._insertMoveRules( that._getBrowserKeyframeRule(), diff, (that.movable.offset || that.movable.offset === 0) ? that.movable.offset : 0, (that.movable.pxPerSec) ? (diff / that.movable.pxPerSec) : that.movable.time );
			}, 0 );
		},

		/**
		 * Responsible for deciding whether this view should move or not.
		 *
		 * @private
		 * @returns either the calculated number or false
		 */
		_checkIfMovingNecessary: function() {
			var diff;

			this._addMoveClasses();
			diff = this._getDiff();
			if( diff > 0 ){
				if( this.moveRulesAvailable ){
					this._deleteMoveRules();
				}
				return diff;
			}else {
				this._removeMoveClasses();
				if( this.moveRulesAvailable ) {
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
			var animationStyle = document.createElement( 'style' ),
				styles;

			animationStyle.type = "text/css";
			document.getElementsByTagName( 'head' ).item(0).appendChild( animationStyle );
			styles = document.styleSheets.length;
			animationStyle = document.styleSheets[ styles-1 ];

			return animationStyle;
		},

		/**
		 * Calculates the width-difference of the inner div (the one containing the value) and
		 * its outer box.
		 *
		 * Difference + offset results in the "moving value", the offset that the label is animated.
		 *
		 * @private
		 * @returns {number} difference self-width minus parent-width
		 */
		_getDiff: function() {
			this.$selfWidth = this.$self.outerWidth();
			this.$parentWidth = this.$parent.width();

			return this.$selfWidth - this.$parentWidth;
		},

		/**
		 * Returns the vendor prefix for the specific browser.
		 *
		 * @private
		 * @returns {string} the name of the browser for css3-animation
		 */
		_getBrowserKeyframeRule: function(){
			if( CSSRule.WEBKIT_KEYFRAME_RULE ) {
				return "-webkit-";
			}
			else if( CSSRule.MOZ_KEYRAME_RULE ) {
				return "-moz-";
			}
			else if( CSSRule.O_KEYFRAME_RULE ) {
				return "-o-";
			}
			else {
				return "";
			}
		},

		/**
		 * Adds special classes responsible for making the label move.
		 *
		 * @private
		 */
		_addMoveClasses: function() {
			this.$self.addClass( 'tmp-movable-inner inner-' + this.id );
		},

		/**
		 * Removes special classes responsible for making the label move.
		 *
		 * @private
		 */
		_removeMoveClasses: function() {
			this.$self.removeClass( 'tmp-movable-inner inner-' + this.id );
		},

		/**
		 * Inserts Animation-Rules to the CSSOM in the document-head.
		 * Standard moving type is "alternate", meaning it moves from left to right infinitely.
		 * "left" creates an infinite loop to the left and "right" to the right of course.
		 *
		 * @private
		 * @param vendor The String for the specific browser
		 * @param diff The difference self-parent
		 * @param offset The offset value of the passed movable-object
		 * @param sec The time value of the passed movable-object
		 */
		_insertMoveRules: function( vendor, diff, offset, sec ){
			var text,
				spacer = '<span class="tmp-movable-spacer" style="padding:0 ' + offset/2 + 'px"></span>';

			if( this.movable.type && typeof this.movable.type === 'string' ) {
				if( this.movable.type === M.MOVABLE_TYPE_LEFT || this.movable.type === M.MOVABLE_TYPE_RIGHT ) {
					this.extraStyle.insertRule('.inner-' + this.id + ' {'+
						vendor+'animation-name: move-' + this.id + ';'+
						vendor+'animation-duration: ' + sec + 's;'+
						vendor+'animation-iteration-count: infinite;'+
						vendor+'animation-timing-function: linear;'+
						'}', 0 );
					this.extraStyle.insertRule( '@' + vendor + 'keyframes move-' + this.id + '{ 0% { left: ' + (this.movable.type === M.MOVABLE_TYPE_LEFT ? 0 : (-this.$selfWidth - offset)) + 'px; } 100% { left: ' + (this.movable.type === M.MOVABLE_TYPE_LEFT ? (-this.$selfWidth - offset) : 0) + 'px;}}', 1 );
					text = this.value;
					this.$self.html( spacer + text + spacer + text );
				}
				else {
					this.extraStyle.insertRule( '.inner-' + this.id + ' {'+
						vendor+'animation-name: move-' + this.id + ';'+
						vendor+'animation-duration: ' + sec + 's;'+
						vendor+'animation-iteration-count: infinite;'+
						vendor+'animation-timing-function: linear;'+
						'}', 0 );
					this.extraStyle.insertRule( '@' + vendor + 'keyframes move-' + this.id + '{ 0%,100% { left: ' + offset + 'px;} 50% { left:' + (-diff - offset) + 'px;}}', 1 );
				}
			}
			else {
				this.extraStyle.insertRule( '.inner-' + this.id + ' {'+
					vendor+'animation-name: move-' + this.id + ';'+
					vendor+'animation-duration: ' + sec + 's;'+
					vendor+'animation-iteration-count: infinite;'+
					vendor+'animation-timing-function: linear;'+
					'}', 0 );
				this.extraStyle.insertRule( '@' + vendor + 'keyframes move-' + this.id + '{ 0%,100% { left: ' + offset + 'px;} 50% { left:' + (-diff - offset) + 'px;}}', 1 );
			}
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

			while( l > 0 ){
				this.extraStyle.removeRule( l-1 );
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

			if( this.isInline ) {
				html += ' style="display:inline;"';
			}
			if( this.cssClass ) {
				html += ' class="' + this.cssClass + '"';
			}
			return html;
		},

		/**
		 * This method sets the label's value and initiates its re-rendering.
		 *
		 * @param {String} value The value to be applied to the label view.
		 */
		setValue: function( value ) {
			this.value = value;
			this.renderUpdate();
		},

		/**
		 * Public method for starting the animation of the MovableLabel
		 *
		 * @public
		 */

		startMovable: function() {
			var that = this;

			if( this.autoplay && !this.playing ) {
				this.playing = YES;
				this._addMoveClasses();
			}
		},

		/**
		 * Public method for stopping the animation of the MovableLabel
		 *
		 * @public
		 */

		stopMovable: function() {
			if( this.autoplay && this.playing ) {
				this.playing = NO;
				this._removeMoveClasses();
			}
		}

	});