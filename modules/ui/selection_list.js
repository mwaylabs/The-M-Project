// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      30.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * A constant value for single selection mode.
 *
 * @type String
 */
M.SINGLE_SELECTION = 'radio';

/**
 * A constant value for multiple selection mode.
 *
 * @type String
 */
M.MULTIPLE_SELECTION = 'checkbox';

/**
 * A constant value for single selection mode in a dialog / popup.
 *
 * @type String
 */
M.SINGLE_SELECTION_DIALOG = 'select';

/**
 * A constant value for multiple selection mode in a dialog / popup.
 *
 * @type String
 */
M.MULTIPLE_SELECTION_DIALOG = 'select_multiple';

m_require('ui/selection_list_item.js');

/**
 * @class
 *
 * This defines the prototype of any selection list view. A selection list view displays
 * a list with several items of which either only one single item (M.SINGLE_SELECTION /
 * M.SINGLE_SELECTION_DIALOG) or many items (M.MULTIPLE_SELECTION /
 * M.MULTIPLE_SELECTION_DIALOG) can be selected.
 *
 * @extends M.View
 */
M.SelectionListView = M.View.extend(
/** @scope M.SelectionListView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.SelectionListView',

    /**
     * Determines whether to remove all item if the list is updated or not.
     *
     * @type Boolean
     */
    removeItemsOnUpdate: YES,

    /**
     * The selection mode for this selection list. This can either be single or
     * multiple selection. To set this value use one of the three constants:
     *
     * - M.SINGLE_SELECTION
     *
     *   This selection mode will render a selection list with several list items
     *   of which only one can be selected. Whenever a new item is selected, the
     *   previously selected item automatically gets de-selected. This selection
     *   mode's behaviour is equivalent to the plain HTML's radio button.
     *
     *
     * - M.SINGLE_SELECTION_DIALOG
     *
     *   This selection mode will render a selection list equivalent to the plain
     *   HTML's select menu. Only the currently selected item will be visible, and
     *   by clicking on this item, the selection list will be displayed in a dialog
     *   respectively a popup view. By selecting on of the items, this popup will
     *   automatically close and the selected value will be displayed.
     *
     *
     * - M.MULTIPLE_SELECTION
     *
     *   This selection mode will render a selection list with several list items
     *   of which all be selected. So the selection of a new item doesn't lead to
     *   automatic de-selected of previously selected items. This selection mode's
     *   behaviour is equivalent to the plain HTML's checkboxes.
     *
     *
     * - M.MULTIPLE_SELECTION_DIALOG
     *
     *   This selection mode will render a selection list equivalent to the plain
     *   HTML's select menu, but with the possibility to select multiple options.
     *   In contrast to the single selection dialog mode, it also is possible to
     *   select no option at all. As with the multiple selecton mode, the selection
     *   of a new item doesn't lead to automatic de-selected of previously selected
     *   items.
     *
     *   Note: This mode currently only works on mobile devices!!
     *
     * @type String
     */
    selectionMode: M.SINGLE_SELECTION,

    /**
     * The selected item(s) of this list.
     *
     * @type String, Array
     */
    selection: null,

    /**
     * This property defines the tab bar's name. This is used internally to identify
     * the selection list inside the DOM.
     *
     * @type String
     */
    name: null,

    
    /**
     * This property is used to specify an initial value for the selection list if
     * it is running in 'multiple selection dialog' (M.MULTIPLE_SELECTION_DIALOG) mode.
     * This value is then displayed at startup. You would typically use this e.g. to
     * specify something like: 'Please select...'.
     *
     * As long as this initial value is 'selected', the getSelection() of this selection
     * list will return nothing. Once a 'real' option is selected, this value will visually
     * disappear. If at some point no option will be selected again, this initial text
     * will be shown again.
     *
     * @type String
     */
    initialText: null,

    /**
     * The label proeprty defines a text that is shown above or next to the selection list as a 'title'
     * for the selection list. e.g. "Name:". If no label is specified, no label will be displayed.
     *
     * @type String
     */
    label: null,

    /**
     * Determines whether to display the selection list grouped with the label specified with the label property.
     * If set to YES, the selection list and its label are wrapped in a container and styled as a unit 'out of
     * the box'. If set to NO, custom styling could be necessary.
     *
     * @type Boolean
     */
    isGrouped: NO,

    /**
     * This property is used internally to store the selection list's initial state. This is used to be able
     * to reset the selection list later on using the resetSelection method.
     *
     * Note: This property is only used if the selection list's child views are specified directly (without
     * content binding). Otherwise the state is stored within the content binding and does not need to be
     * stored with this selection list.
     *
     * @private
     * @type Object
     */
    initialState: null,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['change'],

    /**
     * Define whether putting an asterisk to the right of the label for this selection list.
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
     * Renders a selection list.
     *
     * @private
     * @returns {String} The selection list view's html representation.
     */
    render: function() {

        /* initialize the initialState property as new array */
        this.initialState = [];

        this.html += '<div id="' + this.id + '_container"';

        if(this.isGrouped) {
            this.html += ' data-role="fieldcontain"';
        }

        if(this.cssClass) {
            this.html += ' class="';
            var cssClasses = $.trim(this.cssClass).split(' ');            
            for(var i in cssClasses) {
                this.html += (i > 0 ? ' ' : '') + cssClasses[i] + '_container';
            }
            this.html += '"';
        }

        this.html += '>';

        if(this.selectionMode === M.SINGLE_SELECTION_DIALOG || this.selectionMode === M.MULTIPLE_SELECTION_DIALOG) {
            
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

            this.html += '<select name="' + (this.name ? this.name : this.id) + '" id="' + this.id + '"' + this.style() + (this.selectionMode === M.MULTIPLE_SELECTION_DIALOG ? ' multiple="multiple"' : '') + '>';

            this.renderChildViews();

            this.html += '</select>';

        } else {

            this.html += '<fieldset data-role="controlgroup" data-native-menu="false" id="' + this.id + '">';

            if(this.label) {
                this.html += '<legend>' + this.label;
                if (this.hasAsteriskOnLabel) {
                    if (this.cssClassForAsterisk) {
                        this.html += '<span class="' + this.cssClassForAsterisk + '">*</span></legend>';
                    } else {
                        this.html += '<span>*</span></legend>';
                    }
                } else {
                    this.html += '</legend>';
                }
            }

            this.renderChildViews();

            this.html += '</fieldset>';

        }

        this.html += '</div>';

        return this.html;
    },

    /**
     * Triggers render() on all children of type M.ButtonView based on the specified
     * selection mode (single or multiple selection).
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = this.getChildViewsAsArray();

            for(var i in childViews) {
                var view = this[childViews[i]];
                if(view.type === 'M.SelectionListItemView') {
                    view.parentView = this;
                    view._name = childViews[i];
                    this.html += view.render();

                    /* store list item in initialState property */
                    this.initialState.push({
                        value: view.value,
                        label: view.label,
                        isSelected: view.isSelected
                    });
                } else {
                    M.Logger.log('Invalid child views specified for SelectionListView. Only SelectionListItemViews accepted.', M.WARN);
                }
            }
        } else if(!this.contentBinding) {
            M.Logger.log('No SelectionListItemViews specified.', M.WARN);
        }
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for text field views and
     * their internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            change: {
                target: this,
                action: 'itemSelected'
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
    },

    /**
     * This method adds a new selection list item to the selection list view by simply appending
     * its html representation to the selection list view inside the DOM. This method is based
     * on jQuery's append().
     *
     * @param {String} item The html representation of a selection list item to be added.
     */
    addItem: function(item) {
        $('#' + this.id).append(item);
    },

    /**
     * This method removes all of the selection list view's items by removing all of its content in
     * the DOM. This method is based on jQuery's empty().
     */
    removeAllItems: function() {
        $('#' + this.id).empty();
    },

    /**
     * Updates the the selection list view by re-rendering all of its child views, respectively its
     * item views.
     *
     * @private
     */
    renderUpdate: function() {
        if(this.removeItemsOnUpdate || this.selectionMode === M.SINGLE_SELECTION_DIALOG || this.selectionMode === M.MULTIPLE_SELECTION_DIALOG) {
            this.removeAllItems();

            if(this.label && !(this.selectionMode === M.SINGLE_SELECTION_DIALOG || this.selectionMode === M.MULTIPLE_SELECTION_DIALOG)) {
                this.addItem('<legend>' + this.label + '</legend>');
            } else if(this.selectionMode === M.SINGLE_SELECTION_DIALOG || this.selectionMode === M.MULTIPLE_SELECTION_DIALOG) {
            }
        }

        /* remove selection before applying new content */
        this.removeSelection();

        if(this.contentBinding) {
            /* assign the value property to 'items' since this was automatically set by contentDidChange of M.View */
            var items = this.value;
            for(var i in items) {
                var item  = items[i];
                var obj = null;
                obj = M.SelectionListItemView.design({
                    value: (item.value !== undefined && item.value !== null) ? item.value : '',
                    label: item.label ? item.label : ((item.value !== undefined && item.value !== null) ? item.value : ''),
                    parentView: this,
                    isSelected: item.isSelected
                });
                if(this.selectionMode !== M.SINGLE_SELECTION_DIALOG && this.selectionMode !== M.MULTIPLE_SELECTION_DIALOG) {
                    obj.name = item.name ? item.name : (item.label ? item.label : (item.value ? item.value : ''));
                }

                this.addItem(obj.render());
                obj.theme();
            }
            this.themeUpdate();
        }
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the selection list.
     *
     * @private
     */
    theme: function() {
        if(this.selectionMode === M.SINGLE_SELECTION_DIALOG || this.selectionMode === M.MULTIPLE_SELECTION_DIALOG) {
            $('#' + this.id).selectmenu();
            if(this.selectionMode === M.MULTIPLE_SELECTION_DIALOG && this.initialText && this.selection && this.selection.length === 0) {
                $('#' + this.id + '_container').find('.ui-btn-text').html(this.initialText);
            }
        } else if(this.selectionMode !== M.SINGLE_SELECTION_DIALOG && this.selectionMode !== M.MULTIPLE_SELECTION_DIALOG) {
            $('#' + this.id).controlgroup();
        }
    },

    /**
     * Triggers the rendering engine, jQuery mobile, to style the selection list.
     *
     * @private
     */
    themeUpdate: function() {
        if(this.selectionMode === M.SINGLE_SELECTION_DIALOG || this.selectionMode === M.MULTIPLE_SELECTION_DIALOG) {
            $('#' + this.id).selectmenu('refresh');
            if(this.selectionMode === M.MULTIPLE_SELECTION_DIALOG && this.initialText && this.selection && this.selection.length === 0) {
                $('#' + this.id + '_container').find('.ui-btn-text').html(this.initialText);
            } else if(this.selectionMode === M.SINGLE_SELECTION_DIALOG && !this.selection) {
                var that = this;
                var item = M.ViewManager.getViewById($('#' + this.id).find('option:first-child').attr('id'));
                item !== undefined && item !== null ? that.setSelection(item.value) : null;
            }
        } else if(this.selectionMode !== M.SINGLE_SELECTION_DIALOG && this.selectionMode !== M.MULTIPLE_SELECTION_DIALOG) {
            $('#' + this.id).controlgroup();
        }
    },

    /**
     * Method to append css styles inline to the rendered selection list.
     *
     * @private
     * @returns {String} The selection list's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    },

    /**
     * This method is called everytime a item is selected / clicked. If the selected item
     * changed, the defined onSelect action is triggered.
     *
     * @param {String} id The id of the selected item.
     * @param {Object} event The event.
     * @param {Object} nextEvent The application-side event handler.
     */
    itemSelected: function(id, event, nextEvent) {
        var item = null;

        if(this.selectionMode === M.SINGLE_SELECTION) {
            item = M.ViewManager.getViewById($('input[name=' + (this.name ? this.name : this.id) + ']:checked').attr('id'));
            
            if(item !== this.selection) {
                this.selection = item;

                if(nextEvent) {
                    M.EventDispatcher.callHandler(nextEvent, event, NO, [this.selection.value, this.selection]);
                }
            }
        } else if(this.selectionMode === M.SINGLE_SELECTION_DIALOG) {
            item = M.ViewManager.getViewById($('#' + this.id + ' :selected').attr('id'));

            if(item !== this.selection) {
                this.selection = item;

                $('#' + this.id + '_container').find('.ui-btn-text').html(item.label ? item.label : item.value);

                if(nextEvent) {
                    M.EventDispatcher.callHandler(nextEvent, event, NO, [this.selection.value, this.selection]);
                }
            }
        } else if(this.selectionMode === M.MULTIPLE_SELECTION) {
            var that = this;
            this.selection = [];
            $('#' + this.id).find('input:checked').each(function() {
                that.selection.push(M.ViewManager.getViewById($(this).attr('id')));
            });

            var selectionValues = [];
            for(var i in this.selection) {
                selectionValues.push(this.selection[i].value);
            }

            if(nextEvent) {
                M.EventDispatcher.callHandler(nextEvent, event, NO, [selectionValues, this.selection]);
            }
        } else if(this.selectionMode === M.MULTIPLE_SELECTION_DIALOG) {
            var that = this;
            this.selection = [];
            $('#' + this.id).find(':selected').each(function() {
                that.selection.push(M.ViewManager.getViewById($(this).attr('id')));
            });

            var selectionValues = [];
            for(var i in this.selection) {
                selectionValues.push(this.selection[i].value);
                $('#' + this.id + '_container').find('.ui-btn-text').html(this.formatSelectionLabel(this.selection.length));
            }

            /* if there is no more item selected, reset the initial text */
            if(this.selection.length === 0) {
                this.themeUpdate();
            }

            if(nextEvent) {
                M.EventDispatcher.callHandler(nextEvent, event, NO, [selectionValues, this.selection]);
            }
        }

        /* fix the toolbar(s) again */
        $('#' + this.id).blur();
    },

    /**
     * This method returns the selected item's value(s) either as a String (single selection)
     * or as an Array (multiple selection).
     *
     * @param {Boolean} returnObject Determines whether to return the selected item(s) as object or not.
     * @returns {String|Object|Array} The selected item's value(s).
     */
    getSelection: function(returnObject) {
        if(this.selectionMode === M.SINGLE_SELECTION || this.selectionMode === M.SINGLE_SELECTION_DIALOG) {
            if(this.selection) {
                if(returnObject) {
                    return this.selection;
                } else {
                    return this.selection.value;
                }
            }
        } else {
            if(this.selection) {
                var selection = [];
                _.each(this.selection, function(item) {
                    if(returnObject) {
                        selection.push(item);
                    } else {
                        selection.push(item.value);
                    }
                });
                return selection;
            }
            return [];
        }
    },

    /**
     * This method can be used to select items programmatically. The given parameter can either
     * be a String (single selection) or an Array (multiple selection).
     *
     * @param {String|Array} selection The selection that should be applied to the selection list.
     */
    setSelection: function(selection) {
        var that = this;
        if(this.selectionMode === M.SINGLE_SELECTION && (typeof(selection) === 'string' || typeof(selection) === 'number' || typeof(selection) === 'boolean')) {
            $('#' + this.id).find('input').each(function() {
                var item = M.ViewManager.getViewById($(this).attr('id'));
                if(item.value == selection) {
                    that.removeSelection();
                    item.isSelected = YES;
                    that.selection = item;
                    $(this).attr('checked', 'checked');
                    $(this).siblings('label:first').addClass('ui-radio-on');
                    $(this).siblings('label:first').removeClass('ui-radio-off');
                    $(this).siblings('label:first').find('span .ui-icon-radio-off').addClass('ui-icon-radio-on');
                    $(this).siblings('label:first').find('span .ui-icon-radio-off').removeClass('ui-icon-radio-off');
                }
            });
        } else if(this.selectionMode === M.SINGLE_SELECTION_DIALOG && (typeof(selection) === 'string' || typeof(selection) === 'number' || typeof(selection) === 'boolean')) {
            var didSetSelection = NO;
            $('#' + this.id).find('option').each(function() {
                var item = M.ViewManager.getViewById($(this).attr('id'));
                if(item.value == selection) {
                    that.removeSelection();
                    item.isSelected = YES;
                    that.selection = item;
                    $('#' + that.id).val(item.value);
                    didSetSelection = YES;
                }
            });
            if(didSetSelection) {
                $('#' + this.id).selectmenu('refresh');
            }
        } else if(typeof(selection) === 'object') {
            if(this.selectionMode === M.MULTIPLE_SELECTION) {
                var removedItems = NO;
                $('#' + this.id).find('input').each(function() {
                    var item = M.ViewManager.getViewById($(this).attr('id'));
                    for(var i in selection) {
                        var selectionItem = selection[i];
                        if(item.value == selectionItem) {
                            if(!removedItems) {
                                that.removeSelection();
                                removedItems = YES;
                            }
                            item.isSelected = YES;
                            that.selection.push(item);
                            $(this).attr('checked', 'checked');
                            $(this).siblings('label:first').removeClass('ui-checkbox-off');
                            $(this).siblings('label:first').addClass('ui-checkbox-on');
                            $(this).siblings('label:first').find('span .ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
                            $(this).siblings('label:first').find('span .ui-icon-checkbox-off').removeClass('ui-icon-checkbox-off');
                        }
                    }
                });
            } else if(this.selectionMode === M.MULTIPLE_SELECTION_DIALOG) {
                var removedItems = NO;
                $('#' + this.id).find('option').each(function() {
                    var item = M.ViewManager.getViewById($(this).attr('id'));
                    for(var i in selection) {
                        var selectionItem = selection[i];
                        if(item.value == selectionItem) {
                            if(!removedItems) {
                                that.removeSelection();
                                removedItems = YES;
                            }
                            item.isSelected = YES;
                            that.selection.push(item);
                            $(this).attr('selected', 'selected');
                        }
                    }

                    /* set the label */
                    $('#' + that.id + '_container').find('.ui-btn-text').html(that.formatSelectionLabel(that.selection.length));
                });
            }
        }
        that.theme();
    },

    /**
     * This method de-selects all of the selection list's items.
     */
    removeSelection: function() {
        var that = this;

        if(this.selectionMode === M.SINGLE_SELECTION || this.selectionMode === M.SINGLE_SELECTION_DIALOG) {
            this.selection = null;
        } else {
            this.selection = [];
        }
        
        if(this.selectionMode !== M.SINGLE_SELECTION_DIALOG && this.selectionMode !== M.MULTIPLE_SELECTION_DIALOG) {
            $('#' + this.id).find('input').each(function() {
                var item = M.ViewManager.getViewById($(this).attr('id'));
                item.isSelected = NO;
                $(this).removeAttr('checked');
                $(this).siblings('label:first').addClass('ui-' + that.selectionMode + '-off');
                $(this).siblings('label:first').removeClass('ui-' + that.selectionMode + '-on');
                $(this).siblings('label:first').find('span .ui-icon-' + that.selectionMode + '-on').addClass('ui-icon-' + that.selectionMode + '-off');
                $(this).siblings('label:first').find('span .ui-icon-' + that.selectionMode + '-on').removeClass('ui-icon-' + that.selectionMode + '-on');
            });
        } else {
            $('#' + this.id).find('option').each(function() {
                var item = M.ViewManager.getViewById($(this).attr('id'));
                item.isSelected = NO;
            });
            $('#' + this.id).val('').removeAttr('checked').removeAttr('selected');
        }
    },

    /**
     * This method can be used to reset the selection list. This basically discards
     * all changes made to the selection by the user or any application-sided calls
     * and applies the original state.
     *
     * The 'original state' can either be the bound content or the state, specified
     * by the originally assigned child views.
     */
    resetSelection: function() {
        if(this.contentBinding) {
            this.removeSelection();
            this.renderUpdate();
        } else {
            this.contentBinding = {};
            this.contentBinding.target = this;
            this.contentBinding.property = 'initialState';
            this.removeSelection();
            this.renderUpdate();
            this.contentBinding = null;
        }
    },

    /**
     *  We use this as alias for the form reset function view.clearValues() to reset the selection to its initial state
     */
    clearValue: function(){
        this.resetSelection();
    },

    /**
     * This method returns the selection list view's value.
     *
     * @returns {String|Array} The selected item's value(s).
     */
    getValue: function() {
        return this.getSelection();
    },

    /**
     * This method is responsible for rendering the visual text for a selection list
     * in the M.MULTIPLE_SELECTION_DIALOG mode. It's only parameter is a number, that
     * specifies the number of selected options of this selection list. To customize
     * the visual output of such a list, you will need to overwrite this method within
     * the definition of the selection list in your application.
     *
     * @param {Number} v The number of selected options.
     */
    formatSelectionLabel: function(v) {
        return v + ' Object(s)';
    },

    /**
     * This method disables the selection list by setting the disabled property of its
     * html representation to true.
     */
    disable: function() {
        this.isEnabled = NO;
        if(this.selectionMode === M.SINGLE_SELECTION || this.selectionMode === M.MULTIPLE_SELECTION) {
            $('#' + this.id).find('input').each(function() {
                $(this).checkboxradio('disable');
            });
        } else {
            $('#' + this.id).selectmenu('disable');
            $('#' + this.id).each(function() {
                $(this).attr('disabled', 'disabled');
            });
        }
    },

    /**
     * This method enables the selection list by setting the disabled property of its
     * html representation to false.
     */
    enable: function() {
        this.isEnabled = YES;
        if(this.selectionMode === M.SINGLE_SELECTION || this.selectionMode === M.MULTIPLE_SELECTION) {
            $('#' + this.id).find('input').each(function() {
                $(this).checkboxradio('enable');
            });
        } else {
            $('#' + this.id).selectmenu('enable');
            $('#' + this.id).each(function() {
                $(this).removeAttr('disabled');
            });
        }
    }

});