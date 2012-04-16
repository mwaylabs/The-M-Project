// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
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
 * This is the prototype for any confirm dialog view. It is derived from M.DialogView
 * and mainly used for implementing a confirm dialog view specific render method.
 *
 * @extends M.DialogView
 */
M.ConfirmDialogView = M.DialogView.extend(
/** @scope M.ConfirmDialogView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ConfirmDialogView',

    /**
     * The default title of an confirm dialog.
     *
     * @type String
     */
    title: 'Confirm',

    /**
     * The default message of an confirm dialog.
     *
     * @type String
     */
    message: '',
    
    /**
     * Determines the value of the button, means the text label on it.
     *
     * @type String
     */
    confirmButtonValue: 'Ok',

    /**
     * Determines the value of the button, means the text label on it.
     *
     * @type String
     */
    cancelButtonValue: 'Cancel',

    /**
     * If set, contains the dialog's callbacks in  sub objects named 'confirm' and 'cancel' or as  functions named confirm and cancel.
     *
     * @type Object
     */
    callbacks: null,

    /**
     * Renders a confirm dialog as a pop-up.
     *
     * @private
     * @returns {String} The confirm dialog view's html representation.
     */
    render: function() {
        this.html = '<div class="tmp-dialog-background"></div>';
        this.html += '<div id="' + this.id + '" class="tmp-dialog">';
        this.html += '<div class="tmp-dialog-header">';
        this.html += this.title ? this.title : '';
        this.html +='</div>';
        this.html += '<div class="tmp-dialog-content">';
        this.html += this.message;
        this.html +='</div>';
        this.html += '<div class="tmp-dialog-footer">';
        var that = this;
        /* build confirm button */
        var button = M.ButtonView.design({
            value: this.confirmButtonValue,
            cssClass: 'b tmp-dialog-smallerbtn-confirm',
            events: {
                tap: {
                    target: that,
                    action: 'confirmed'
                }
            }
        });
        /* build cancel button */
        var button2 = M.ButtonView.design({
            value: this.cancelButtonValue,
            cssClass: 'd tmp-dialog-smallerbtn-confirm',
            events: {
                tap: {
                    target: that,
                    action: 'canceled'
                }
            }
        });
        /*Grid View for positioning buttons*/
        var grid = M.GridView.design({
            childViews: 'confirm cancel',
            layout: M.TWO_COLUMNS,
            confirm: button,
            cancel: button2
        });
        this.html += grid.render(); // renders also buttons (childViews)
        this.html += '</div>';
        this.html += '</div>';

        $('body').append(this.html);
        if(button.type) {
            button.registerEvents();
            button.theme();
        }
        if(button2.type) {
            button2.registerEvents();
            button2.theme();
        }
    },

    confirmed: function() {
        this.hide();
        if(this.callbacks && M.EventDispatcher.checkHandler(this.callbacks.confirm)){
            this.bindToCaller(this.callbacks.confirm.target, this.callbacks.confirm.action)();
        }
    },

    canceled: function() {
        this.hide();
        if(this.callbacks && M.EventDispatcher.checkHandler(this.callbacks.cancel)){
            this.bindToCaller(this.callbacks.cancel.target, this.callbacks.cancel.action)();
        }
    }

});