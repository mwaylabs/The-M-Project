// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      23.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.DIALOG = {};
M.DIALOG.ALERT = 'Alert';
M.DIALOG.ACTIONSHEET = 'ActionSheet';

/**
 * @class
 *
 * The root object for DialogViews.
 *
 */
M.DialogView = M.View.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.DialogView',

    /**
     * Contains the ids of the button's within a dialog. They are used to later register a click
     * event to all of these views.
     *
     * @property {Object}
     */
    buttonIds: [],

    /**
     * This method controls the process of bringing a dialog to the screen.
     */
    show: function() {

        /* call the dialog's render() */
        this.render();

        /* theme it */
        this.theme();

        /* register the buttons at the event dispatcher */
        for(var i in this.buttonIds) {
            M.Application.eventDispatcher.registerEvents(this.buttonIds[i], 'click');
        }

        /* set the dialog as the application's current dialog (necessary for later destroying) */
        M.Application.viewManager.currentDialog = this;

        /* finally show the dialog on the screen */
        M.Controller.switchToPage(this, this.transition, NO, NO);
        
    },

    /**
     * This method triggers the styling of the dialog and its sub views.
     */
    theme: function() {
        $('#' + this.id).page();
    },

    alert: function(obj) {
        M.AlertDialogView.design(obj).show();
    },

    confirm: function(obj) {
        M.ConfirmDialogView.design(obj).show();
    },

    actionSheet: function(obj) {
         M.ActionSheetDialogView.design(obj).show();
    }

});