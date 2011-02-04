// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      23.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This is the prototype of any dialog view. It is responsible for showing and later
 * hiding a dialog.
 *
 * @extends M.View
 */
M.DialogView = M.View.extend(
/** @scope M.DialogView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DialogView',

    /**
     * Contains the ids of the button's within a dialog. They are used to later register a click
     * event to all of these views.
     *
     * @type Array
     */
    buttonIds: [],

    /**
     * This property states whether the dialog is currently active or not.
     *
     * @type Boolean
     */
    isActive: NO,

    /**
     * The dialog's callback, split in target / action. It is called once the dialog's closing
     * transition did finish.
     *
     * @type Object
     */
    callback: {},

    /**
     * This method controls the process of bringing a dialog to the screen.
     *
     * @private
     */
    show: function() {

        /* register the onHide event for this dialog */
        $('#' + this.id).live('pagehide', this.bindToCaller(this, this.dialogDidHide));

        /* call the dialog's render() */
        this.render();

        /* theme it */
        this.theme();

        /* register the buttons at the event dispatcher */
        for(var i in this.buttonIds) {
            M.Application.eventDispatcher.registerEvents(this.buttonIds[i], 'click');
        }

        /* finally show the dialog on the screen */
        M.Controller.switchToPage(this, this.transition, NO, NO);

        this.isActive = YES;

    },

    /**
     * This method triggers the styling of the dialog and its sub views.
     *
     * @private
     */
    theme: function() {
        $('#' + this.id).page();
    },

    /**
     * This method creates an alert dialog based on the given customizing parameters and
     * initiates its displaying on the screen.
     *
     * @param {Object} obj The customizing parameters of the alert dialog view.
     */
    alert: function(obj) {
        M.AlertDialogView.design(obj).show();
    },

    /**
     * This method creates an confirm dialog based on the given customizing parameters and
     * initiates its displaying on the screen.
     *
     * @param {Object} obj The customizing parameters of the confirm dialog view.
     */
    confirm: function(obj) {
        M.ConfirmDialogView.design(obj).show();
    },

    /**
     * This method creates an actionSheet dialog based on the given customizing parameters and
     * initiates its displaying on the screen.
     *
     * @param {Object} obj The customizing parameters of the actionSheet dialog view.
     */
    actionSheet: function(obj) {
         M.ActionSheetDialogView.design(obj).show();
    },

    /**
     * This method is automatically called right before the dialog will be closed. It is
     * used to store the dialogs specified callbacks, if specified.
     *
     * @private
     * @param {String} id The id of the dialog.
     */
    dialogWillClose: function(id) {
        if(this.isActive) {
            var button = M.ViewManager.getViewById(id);
            if(this[button.role] && this[button.role].target && this[button.role].action) {
                this.callback.target = this[button.role].target;
                this.callback.action = this[button.role].action;
            } else if(this.buttons && this.buttons[button.role] && this.buttons[button.role].target && this.buttons[button.role].action) {
                this.callback.target = this.buttons[button.role].target;
                this.callback.action = this.buttons[button.role].action;
            }
            $('#' + this.id).dialog('close');
            this.isActive = NO;
        }
    },

    /**
     * This method is automatically called right after the dialog was closed. It is used to
     * call the dialog's specified callback and to destroy it by calling M.Object's destroy
     * method.
     *
     * @private
     */
    dialogDidHide: function() {
        if(this) {
            if(this.callback && this.callback.target && this.callback.action) {
                this.callback.target[this.callback.action]();
            }

            /* Destroy the dialog and remove it from DOM, but wait 100ms to make sure, JQM's processing is finished */
            var that = this;
            window.setTimeout(that.bindToCaller(that, that.destroy), 100);
        }
    }

});