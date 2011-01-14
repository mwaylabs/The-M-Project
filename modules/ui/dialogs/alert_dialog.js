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
 * This is the prototype for any alert dialog view. It is derived from M.DialogView
 * and mainly used for implementing a alert dialog view specific render method.
 *
 * @extends M.DialogView
 */
M.AlertDialogView = M.DialogView.extend(
/** @scope M.AlertDialogView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.AlertDialogView',

    /**
     * The default title of an alert dialog.
     *
     * @type String
     */
    title: 'Alert',

    /**
     * The default message of an alert dialog.
     *
     * @type String
     */
    message: '',

    /**
     * The default transition of an alert dialog.
     *
     * @type String
     */
    transition: M.TRANSITION.POP,

    /**
     * Determines whether the alert dialog gets a default ok button.
     *
     * @type Boolean
     */
    hasOkButton: YES,

    /**
     * Renders an alert dialog as a pop-up page.
     *
     * @private
     * @returns {String} The alert dialog view's html representation.
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

        this.html += '</div>';        
        this.html += '</div>';

        $('body').append(this.html);
    }

});