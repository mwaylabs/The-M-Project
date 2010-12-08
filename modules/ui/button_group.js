// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      02.12.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for horizontal alignment.
 *
 * @type String
 */
M.HORIZONTAL = 'horizontal';

/**
 * A constant value for vertical alignment.
 *
 * @type String
 */
M.VERTICAL = 'vertical';


/**
 * @class
 *
 * A button group is a vertically or horizontally aligned group of buttons.
 *
 * @extends M.View
 */
M.ButtonGroupView = M.View.extend(
/** @scope M.ButtonGroupView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ButtonGroupView',

    /**
     * This property determines whether to render the button group horizontally
     * or vertically. Default: horizontal.
     *
     * Possible values are:
     * - M.HORIZONTAL: horizontal
     * - M.VERTICAL: vertical
     *
     * @type String
     */
    direction: M.HORIZONTAL,

    /**
     * This property contains a reference to the currently selected button.
     *
     * @private
     * @type Object
     */
    activeButton: null,

    /**
     * Renders a button group as a div container and calls the renderChildViews
     * method to render the included buttons.
     *
     * @private
     * @returns {String} The button group view's html representation.
     */
    render: function() {
        this.html += '<div data-role="controlgroup" href="#" id="' + this.id + '" data-type="' + this.direction + '">';

        this.renderChildViews();

        this.html += '</div>';
        
        return this.html;
    },

    /**
     * Triggers render() on all children of type M.ButtonGroupView.
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            for(var i in childViews) {
                if(this[childViews[i]] && this[childViews[i]].type === 'M.ButtonView') {
                    var button = this[childViews[i]];

                    button.parentView = this;
                    button.internalTarget = this;
                    button.internalAction = 'setActiveButton';

                    /* check if button has own target / action, otherwise use target / action from button group */
                    if(!button.target) {
                        if(this.target && this.action) {
                            button.target = this.target;
                            button.action = this.action;
                        }
                    }

                    /* give the button a relative width, based on the number of buttons in this group */
                    if(this.direction === M.HORIZONTAL) {
                        button.cssStyle = 'width:' + 100 / childViews.length + '%';
                    }
                    
                    this.html += this[childViews[i]].render();
                } else {
                    M.Logger.log('childview of button group is no button.', M.WARN);
                }
            }
        }
    },

    /**
     * This method themes the button group and activates one of the included buttons
     * if its isActive property is set.
     *
     * @private
     */
    theme: function() {
        $('#' + this.id).controlgroup();

        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            for(var i in childViews) {
                if(this[childViews[i]] && this[childViews[i]].type === 'M.ButtonView') {
                    var button = this[childViews[i]];
                    if(button.isActive) {
                        this.setActiveButton(button.id);
                        break;
                    }
                }
            }
        }
    },

    /**
     * This method returns the currently selected button of this button group. If no
     * button is selected, null is returned.
     *
     * @returns {M.ButtonView} The currently active button of this button group.
     */
    getActiveButton: function() {
        return this.activeButton;  
    },

    /**
     * This method activates one button within the button group.
     *
     * @param {M.ButtonView, String} id The button to be set active or its id.
     */
    setActiveButton: function(id) {
        this.activeButton = null;
        $('#' + this.id).find('a').each(function() {
            var button = M.ViewManager.getViewById($(this).attr('id'));
            button.removeCssClass('ui-btn-active');
            button.isActive = NO;
        });

        var button = M.ViewManager.getViewById(id);
        if(!button) {
            if(id && typeof(id) === 'object' && id.type === 'M.ButtonView') {
                button = id;
            }
        }
        if(button) {
            button.addCssClass('ui-btn-active');
            button.isActive = YES;
            this.activeButton = button;
        }
    }

});