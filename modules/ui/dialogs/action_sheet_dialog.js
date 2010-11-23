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
 * The root object for ActionSheetDialogView.
 *
 */
M.ActionSheetDialogView = M.DialogView.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.ActionSheetDialogView',

    /**
     * The default title of an action sheet dialog.
     *
     * @property {String}
     */
    title: 'ActionSheet',

    /**
     * The default transition of an action sheet dialog.
     *
     * @property {String}
     */
    transition: M.TRANSITION.SLIDEUP,

    /**
     * Determines whether the dialog gets a default cancel button.
     *
     * @property {Boolean}
     */
    hasCancelButton: YES,

    /**
     * Renders a button as an input tag. Input is automatically converted by jQuery mobile.
     */
    render: function() {
        this.html = '<div data-role="dialog" id="' + this.id + '">';
        this.html += '<div data-role="content"><h2>' + this.title + '</h2>';
        this.html += this.message ? this.message : '';

        if(this.buttons) {
            for(var buttonName in this.buttons) {
                var button = M.ButtonView.design({
                    value: this.buttons[buttonName].title,
                    target: this.buttons[buttonName].target,
                    action: this.buttons[buttonName].action,
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
                target: this.onCancel.target,
                action: this.onCancel.action
            });
            this.buttonIds.push(button.id);
            this.html += button.render();
        }

        this.html += '</div>';

        $('body').append(this.html);
    }

});