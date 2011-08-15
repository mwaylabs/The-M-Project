// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
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
 * A button group is a vertically or / and horizontally aligned group of buttons. There
 * are basically three different types of a button group:
 *
 * - horizontally aligned buttons
 *     1 - 2 - 3
 *
 * - vertically aligned buttons
 *     1
 *     |
 *     2
 *     |
 *     3
 *
 * - horizontally and vertically aligned buttons
 *     1 - 2
 *     |   |
 *     3 - 4
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
     * Determines whether to display the button group view 'inset' or at full width.
     *
     * @type Boolean
     */
    isInset: YES,

    /**
     * Determines whether to display the button group compact, i.e. without top/bottom
     * margin. This property only is relevant in combination with multiple lines of
     * buttons (c.p.: buttonsPerLine property).
     *
     * @type Boolean
     */
    isCompact: YES,

    /**
     * This property, if set, defines how many buttons are rendered per line. If there
     * are more buttons defined that fitting into one line, the following buttons are
     * rendered into a new line. Make sure, the number of your buttons is divisible by
     * the number of buttons per line, since only full lines are displayed. So if you
     * for example specify 5 buttons and 2 buttons per line, the fifth button won't be
     * visible.
     *
     * If e.g. 4 buttons are specified and this property is set to 2, the rendering will
     * be as follows:
     *
     *     1 -- 2
     *     3 -- 4
     *
     * @type Number
     */
    buttonsPerLine: null,

    /**
     * This property is used to internally store the number of lines that are necessary
     * to render all buttons according to the buttonsPerLine property.
     *
     * @private
     * @type Number
     */
    numberOfLines: null,

    /**
     * This property refers to the currently rendered line, if there is more than one.
     *
     * @private
     * @type Number
     */
    currentLine: null,

    /**
     * This property contains an array of html ids referring to the several lines of grouped
     * buttons, if there is more than one at all.
     *
     * @private
     * @type Array
     */
    lines: null,

    /**
     * This property contains a reference to the currently selected button.
     *
     * @private
     * @type Object
     */
    activeButton: null,

    /**
     * This property determines whether the buttons of this button group are selectable or not. If
     * set to YES, a click on one of the buttons will set this button as the currently active button
     * and automatically change its styling to visualize its selection.
     *
     * @type Boolean
     */
    isSelectable: YES,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['change'],

    /**
     * Renders a button group as a div container and calls the renderChildViews
     * method to render the included buttons.
     *
     * @private
     * @returns {String} The button group view's html representation.
     */
    render: function() {
        /* check if multiple lines are necessary before rendering */
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            if(this.buttonsPerLine && this.buttonsPerLine < childViews.length) {
                var numberOfButtons = 0;
                for(var i in childViews) {
                    if(this[childViews[i]] && this[childViews[i]].type === 'M.ButtonView') {
                        numberOfButtons = numberOfButtons + 1;
                    }
                }
                if(this.buttonsPerLine < numberOfButtons) {
                    this.numberOfLines = M.Math.round(numberOfButtons / this.buttonsPerLine, M.FLOOR);
                }
            }
        }

        /* if there are multiple lines, render multiple horizontally aligned button groups */
        if(this.numberOfLines) {
            /* set the direction to horizontally, no matter what it was set to before */
            this.direction = M.HORIZONTAL;

            /* this is a wrapper for the multiple button groups.
               if it is not inset, assign css class 'ui-listview' for clearing the padding of the surrounding element */
            this.html += '<div id="' + this.id + '"';
            this.html += this.style();
            this.html += '>';

            /* create a button group for every line */
            this.lines = [];
            for(var i = 0; i < this.numberOfLines; i++) {
                this.currentLine = i + 1;
                /* store current line in lines property for use in renderChildViews() */
                this.lines.push(this.id + '_' + i);

                this.html += '<div data-role="controlgroup" href="#" id="' + this.id + '_' + i + '" data-type="' + this.direction + '"';

                /* if isCompact, assign specific margin, depending on line number (first, last, other) */
                if(!this.isInset || this.isCompact) {
                    if(i == 0) {
                        this.html += this.isInset ? ' style="margin-bottom:0px"' : ' style="margin:0px"';
                    } else if(i > 0 && i < this.numberOfLines - 1) {
                        this.html += this.isInset ? ' style="margin:0px 0px 0px 0px"' : ' style="margin:0px"';
                    } else if(i < this.numberOfLines) {
                        this.html += this.isInset ? ' style="margin-top:0px"' : ' style="margin:0px"';
                    }
                }

                this.html += '>';

                /* render the buttons for the current line */
                this.renderChildViews();

                this.html += '</div>';
            }
            this.html += '</div>';
        } else {
            this.html += '<div data-role="controlgroup" href="#" id="' + this.id + '" data-type="' + this.direction + '"' + this.style() + '>';

            this.renderChildViews();

            this.html += '</div>';
        }

        return this.html;
    },

    /**
     * Triggers render() on all children of type M.ButtonGroupView.
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            var currentButtonIndex = 0;

            for(var i in childViews) {
                if(this[childViews[i]] && this[childViews[i]].type === 'M.ButtonView') {
                    currentButtonIndex = currentButtonIndex + 1;

                    if(!this.numberOfLines || M.Math.round(currentButtonIndex / this.buttonsPerLine, M.CEIL) === this.currentLine) {

                        var button = this[childViews[i]];
                        /* reset buttons html, to make sure it doesn't get rendered twice if this is multi button group */
                        button.html = '';

                        button.parentView = this;
                        button.internalEvents = {
                            tap: {
                                target: this,
                                action: 'buttonSelected'
                            }
                        }

                        /* if the buttons are horizontally aligned, compute their width depending on the number of buttons
                           and set the right margin to '-2px' since the jQuery mobile default would cause an ugly gap to
                           the right of the button group */
                        if(this.direction === M.HORIZONTAL) {
                            button.cssStyle = 'margin-right:-2px;width:' + 100 / (this.numberOfLines ? this.buttonsPerLine : childViews.length) + '%';
                        }

                        /* set the button's _name property */
                        this[childViews[i]]._name = childViews[i];

                        /* finally render the button and add it to the button groups html */
                        this.html += this[childViews[i]].render();
                    }
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
        /* if there are multiple lines of buttons, it's getting heavy */
        if(this.numberOfLines) {
            
            /* iterate through all lines */
            for(var line in this.lines) {
                line = parseInt(line);

                /* style the current line */
                $('#' + this.lines[line]).controlgroup();
                var childViews = this.getChildViewsAsArray();
                var currentButtonIndex = 0;
                
                /* if isCompact, iterate through all buttons */
                if(this.isCompact) {
                    for(var i in childViews) {
                        i = parseInt(i);
                        if(this[childViews[i]] && this[childViews[i]].type === 'M.ButtonView') {
                            currentButtonIndex = currentButtonIndex + 1;
                            var currentLine = M.Math.round(currentButtonIndex / this.buttonsPerLine, M.CEIL) - 1;
                            var button = this[childViews[i]];

                            /* if the button belongs to the current line adjust its styling according to its position,
                               e.g. the first button in the first row gets the css class 'ui-corner-tl' (top left). */
                            if(line === currentLine) {

                                /* first line */
                                if(line === 0 && this.numberOfLines > 1) {
                                    /* first button */
                                    if(currentButtonIndex === 1) {
                                        $('#' + button.id).removeClass('ui-corner-left');
                                        if(this.isInset) {
                                            $('#' + button.id).addClass('ui-corner-tl');
                                        }
                                    /* last button */
                                    } else if(currentButtonIndex === this.buttonsPerLine) {
                                        $('#' + button.id).removeClass('ui-corner-right');
                                        if(this.isInset) {
                                            $('#' + button.id).addClass('ui-corner-tr');
                                        }
                                    }
                                /* last line */
                                } else if(line === this.numberOfLines - 1) {
                                    /* first button */
                                    if(currentButtonIndex === (currentLine * this.buttonsPerLine) + 1) {
                                        $('#' + button.id).removeClass('ui-corner-left');
                                        $('#' + button.id).addClass('ui-corner-bl');
                                    /* last button */
                                    } else if(currentButtonIndex === ((currentLine + 1) * this.buttonsPerLine)) {
                                        $('#' + button.id).removeClass('ui-corner-right');
                                        $('#' + button.id).addClass('ui-corner-br');
                                    }
                                /* all other lines */
                                } else {
                                    /* first button */
                                    if(currentButtonIndex === (currentLine * this.buttonsPerLine) + 1) {
                                        $('#' + button.id).removeClass('ui-corner-left');
                                    /* last button */
                                    } else if(currentButtonIndex === ((currentLine + 1) * this.buttonsPerLine)) {
                                        $('#' + button.id).removeClass('ui-corner-right');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        /* if there is only on row, simply style that button group */
        } else {
            $('#' + this.id).controlgroup();
        }

        /* iterate through all buttons and activate on of them, according to the button's isActive property */
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            for(var i in childViews) {
                if(this[childViews[i]] && this[childViews[i]].type === 'M.ButtonView') {
                    var button = this[childViews[i]];
                    if(button.isActive) {
                        this.setActiveButton(button.id);
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
     * @param {M.ButtonView, String} button The button to be set active or its id.
     */
    setActiveButton: function(button) {
        if(this.isSelectable) {
            if(this.activeButton) {
                this.activeButton.removeCssClass('ui-btn-active');
                this.activeButton.isActive = NO;
            }

            var obj = M.ViewManager.getViewById(button);
            if(!obj) {
                if(button && typeof(button) === 'object' && button.type === 'M.ButtonView') {
                    obj = button;
                }
            }
            if(obj) {
                obj.addCssClass('ui-btn-active');
                obj.isActive = YES;
                this.activeButton = obj;
            }
        }
    },

    /**
     * This method activates one button within the button group at the given index.
     *
     * @param {Number} index The index of the button to be set active.
     */
    setActiveButtonAtIndex: function(index) {
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();
            var button = this[childViews[index]];
            if(button && button.type === 'M.ButtonView') {
                this.setActiveButton(button);
            }
        }
    },

    /**
     * This method is called everytime a button is activated / clicked.
     *
     * @private
     * @param {String} id The id of the selected item.
     * @param {Object} event The event.
     * @param {Object} nextEvent The application-side event handler.
     */
    buttonSelected: function(id, event, nextEvent) {
        /* if selected button is disabled, do nothing */
        if(M.ViewManager.getViewById(id) && M.ViewManager.getViewById(id).type === 'M.ButtonView' && !M.ViewManager.getViewById(id).isEnabled) {
            return;
        }

        if(!(this.activeButton && this.activeButton === M.ViewManager.getViewById(id))) {
            if(this.isSelectable) {
                if(this.activeButton) {
                    this.activeButton.removeCssClass('ui-btn-active');
                    this.activeButton.isActive = NO;
                }

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

            /* trigger change event for the button group */
            $('#' + this.id).trigger('change');
        }

        /* delegate event to external handler, if specified */
        if(nextEvent) {
            M.EventDispatcher.callHandler(nextEvent, event, YES);
        }
    },

    /**
     * Applies some style-attributes to the button group.
     *
     * @private
     * @returns {String} The button group's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.numberOfLines && !this.isInset) {
            html += ' class="ui-listview';
        }
        if(this.cssClass) {
            html += html !== '' ? ' ' + this.cssClass : ' class="' + this.cssClass;
        }
        html += '"';
        return html;
    }

});