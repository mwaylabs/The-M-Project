// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      23.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('ui/dialog.js');

/**
 * @class
 *
 * This is the prototype for any action sheet dialog view. It is derived from M.DialogView
 * and mainly used for implementing a action sheet dialog view specific render method.
 *
 * @extends M.DialogView 
 */
M.ActionSheetDialogView = M.DialogView.extend(
/** @scope M.ActionSheetDialogView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ActionSheetDialogView',

    /**
     * The default title of an action sheet dialog.
     *
     * @type String
     */
    title: 'ActionSheet',

    /**
     * Defines the value of the destructive button (the one button that is showed in red)
     *
     * @type String
     */
    destructiveButtonValue: null,

    /**
     * Defines the value of the cancel button
     *
     * @type String
     */
    cancelButtonValue: null,

    /**
     * Contains the values of all other buttons as strings
     *
     * @type Array
     */
    otherButtonValues: null,

    /**
     * Contains the tags of all other buttons as strings
     *
     * @type Array
     */
    otherButtonTags: null,

    /**
     * Delay between action sheet slide out animation finished and deleting it from DOM and deleting the object
     */
    deletionDelay: 1000,

    /**
     * If set, contains the dialog's callbacks in sub objects named 'destruction', 'cancel' and 'other' or as  functions named confirm, cancel and other.
     *
     * @type Object
     */
    callbacks: null,

    /**
     * Renders an action sheet dialog as a slide-up.
     *
     * @private
     * @returns {String} The action sheet dialog view's html representation.
     */

    render: function() {
        /* render half transparent grey background */
        this.html = '<div class="tmp-dialog-background"></div>';

        /* render title */
        this.html += '<div id="' + this.id + '" class="tmp-actionsheet">';
        this.html += '<div class="tmp-dialog-header">';
        this.html += this.title ? this.title : '';
        this.html +='</div>';

        /* render footer that contains all buttons */
        this.html += '<div class="tmp-dialog-footer">';

        var that = this;

        var buttons = [];
        if(this.destructiveButtonValue) {
            buttons.push(M.ButtonView.design({
                value: this.destructiveButtonValue,
                tag: 'destruction',
                cssClass: 'a tmp-actionsheet-destructive-button',
                events: {
                    tap: {
                        target: that,
                        action: 'handleCallback'
                    }
                }
            }));
        }
        if(this.otherButtonValues) {
            if(this.otherButtonTags && !(_.isArray(this.otherButtonTags)) && !(_.isArray(this.otherButtonValues))) {
                M.Logger.log('Error in Action Sheet: Values and (optional) tags must be passed as string in an array! Rendering will not proceed.', M.WARN);
                return '';
            }
            /* First check if passed number of values matches number of labels passed */
            /* If not, do not use values, but use incremented buttonNr as value */
            if(this.otherButtonTags && this.otherButtonTags.length !== this.otherButtonValues.length) {
                M.Logger.log('Mismatch in Action Sheet: Number of other button\'s tags doesn\'t match number of values. Will not use given values, but use generated numbers as values.', M.WARN);
                this.otherButtonTags = null;
            }

            var buttonNr = 0;

            _.each(this.otherButtonValues, function(btn) {
                buttons.push(M.ButtonView.design({
                    value: btn,
                    tag: that.otherButtonTags ? that.otherButtonTags[buttonNr++] : buttonNr++,
                    events: {
                        tap: {
                            target: that,
                            action: 'handleCallback'
                        }
                    }
                }));
            });
        }
        
        if(this.cancelButtonValue) {
            buttons.push(M.ButtonView.design({
                value: this.cancelButtonValue,
                tag: 'cancel',
                cssClass: 'a',
                events: {
                    tap: {
                        target: that,
                        action: 'handleCallback'
                    }
                }
            }));
        }


        /* render each button saved in the buttons array */
        for(var i in buttons) {
            this.html += buttons[i].render();
        };

        this.html += '</div>';
        this.html += '</div>';

        $('body').append(this.html);

        /* register events for each designed and rendered button and theme it afterwards
         * must be performed AFTER button has been inserted to DOM
         */
        for(var i in buttons) {
            buttons[i].registerEvents();
            buttons[i].theme();
        };
    },

    show: function() {
        /* call the dialog's render() */
        this.render();
        var dialog = $('#' + this.id);
        var background = $('.tmp-dialog-background');
        background.hide();

        /* disable scrolling to enable a "real" dialog behaviour */
//        $(document).bind('touchmove', function(e) {
//            e.preventDefault();
//        });

        /* slide the dialog in */
        dialog.removeClass('slideup out reverse');
        dialog.addClass('slideup in');

        /* reposition, but wait a second */
        var that = this;
        window.setTimeout(function() {
            background.show();
            that.positionBackground(background);

            /* click on background cancels the action sheet */
            $('.tmp-dialog-background').bind('click tap', function() {
                that.hide();
            });
        }, 1);
    },

    handleCallback: function(viewId, event) {
        this.hide();
        var button = M.ViewManager.getViewById(viewId);
        var buttonType = (button.tag === 'destruction' || button.tag === 'cancel') ? button.tag : 'other';

        if(this.callbacks && buttonType && M.EventDispatcher.checkHandler(this.callbacks[buttonType])){
            this.bindToCaller(this.callbacks[buttonType].target, this.callbacks[buttonType].action, button.tag)();
        }
    }
});