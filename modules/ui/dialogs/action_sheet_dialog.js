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
     * The default transition of an action sheet dialog.
     *
     * @type String
     */
    transition: M.TRANSITION.SLIDEUP,

    /**
     * Determines whether the action sheet dialog gets a default cancel button.
     *
     * @type Boolean
     */
    hasCancelButton: YES,

    /**
     * Renders an action sheet dialog as a slide-up page.
     *
     * @private
     * @returns {String} The action sheet dialog view's html representation.
     */
    render: function() {
        this.html = '<div data-role="dialog" id="' + this.id + '">';
        this.html += '<div data-role="content"><h2>' + this.title + '</h2>';
        this.html += this.message ? this.message : '';

        if(this.buttons) {
            for(var buttonName in this.buttons) {
                var button = M.ButtonView.design({
                    value: this.buttons[buttonName].title,
                    target: this,
                    action: 'dialogWillClose',
                    role: buttonName,
                    cssClass: this.buttons[buttonName].cssClass ? this.buttons[buttonName].cssClass : (buttonName === 'cancel' ? 'c' : 'b')
                });
                this.buttonIds.push(button.id);
                this.html += button.render();
            }
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

        $('body').append(this.html);
    }

});