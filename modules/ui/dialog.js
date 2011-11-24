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
     * Determines whether there currently is an active alert dialog, confirm
     * dialog or action sheet.
     *
     * @private
     * @type Boolean
     */
    isActive: NO,

    /**
     * This property is used to store a queue of coming up dialogs. Whenever a dialog
     * is called out of an application and there already is one present, it will be
     * added to the queue and called afterwards.
     *
     * @private
     * @type Array
     */
    queue: [],

    /**
     * This property is used to specify whether to store the dialog in the queue if it
     * can't be shown right away. So if set to YES, this property will prevent a dialog
     * from being added to the queue. If the dialog can not be displayed right away, it
     * will not be displayed at all.
     *
     * @private
     * @type Boolean
     */
    showNowOrNever: NO,

    /**
     * This method creates an alert dialog based on the given customizing parameters and
     * initiates its displaying on the screen.
     *
     * @param {Object} obj The customizing parameters of the alert dialog view.
     */
    alert: function(obj) {
        if(this.isActive) {
            this.enqueue('alert', obj);
        } else {
            this.isActive = YES;
            M.AlertDialogView.design(obj).show();
        }
    },

    /**
     * This method creates an confirm dialog based on the given customizing parameters and
     * initiates its displaying on the screen.
     *
     * @param {Object} obj The customizing parameters of the confirm dialog view.
     */
    confirm: function(obj) {
        if(this.isActive) {
            this.enqueue('confirm', obj);
        } else {
            this.isActive = YES;
            M.ConfirmDialogView.design(obj).show();
        }
    },

    /**
     * This method creates an actionSheet dialog based on the given customizing parameters and
     * initiates its displaying on the screen.
     *
     * @param {Object} obj The customizing parameters of the actionSheet dialog view.
     */
    actionSheet: function(obj) {
        if(this.isActive) {
            this.enqueue('actionSheet', obj);
        } else {
            this.isActive = YES;
            M.ActionSheetDialogView.design(obj).show();
        }
    },

    enqueue: function(action, obj) {
        if(!obj.showNowOrNever) {
            this.queue.unshift({
                action: action,
                obj: obj
            });
        }
    },

    dequeue: function() {
        if(!this.isActive && this.queue.length > 0) {
            var obj = this.queue.pop();
            this[obj.action](obj.obj);
        }
    }

});