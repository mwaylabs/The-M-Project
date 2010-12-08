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
     * The default transition of an confirm dialog.
     *
     * @type String
     */
    transition: M.TRANSITION.POP,

    /**
     * Determines whether the confirm dialog gets a default ok button.
     *
     * @type Boolean
     */
    hasOkButton: YES,

    /**
     * Determines whether the confirm dialog gets a default cancel button.
     *
     * @type Boolean
     */
    hasCancelButton: YES,

    /**
     * Renders an confirm dialog as a pop-up page.
     *
     * @private
     * @returns {String} The confirm dialog view's html representation.
     */
    render: function() {
        this.html = '<div data-role="dialog" id="' + this.id + '">';
        this.html += '<div data-role="header" data-position="fixed"><h1>' + this.title + '</h1></div>';
        this.html += '<div data-role="content">' + this.message;

        if(this.hasOkButton) {
            var button = M.ButtonView.design({
                value: 'OK',
                cssClass: 'b',
                target: this,
                action: 'dialogWillClose',
                role: 'onOk'
            });
            this.buttonIds.push(button.id);
            this.html += button.render();
        }

        if(this.hasCancelButton) {
            var button = M.ButtonView.design({
                value: 'Cancel',
                cssClass: 'c',
                target: this,
                action: 'dialogWillClose',
                role: 'onCancel'
            });
            this.buttonIds.push(button.id);
            this.html += button.render();
        }

        this.html += '</div>';

        this.html += '</div>';

        $('body').append(this.html);
    }

});