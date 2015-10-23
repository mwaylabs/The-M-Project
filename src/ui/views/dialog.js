// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * The base implementation of a dialog. You can show the dialog view by calling the show function.
 * For displaying text in the dialog view you can pass the show function your String as an argument.
 * Calling multiple times the show function with a different text will update the text.
 * Call hide/toggle for every show to hide the dialog view.
 * To force the hiding pass true to the hide call
 *
 * @module M.DialogView
 * @extends M.ModalView
 * @type {*|Object|void}
 *
 * @example
 *
 *
 *
 *
 */

M.DialogView = M.ModalView.extend({

    /**
     * The type of the View
     * @private
     * @type {String}
     */
    _type: 'M.DialogView',

    /**
     * Defines that the dialog view can't be closed by clicking on the overlay.
     * @type {String}
     */
    hideOnOverlayClick: NO,

    /**
     * Defines the headline of the dialog view.
     * @type {String}
     */
    headline: '',

    /**
     * Defines the text which is displayed in the content section of the dialog view.
     * @type {String}
     */
    text: '',

    /**
     * Defines if the confirm button gets displayed in the dialog view.
     * @type {Boolean}
     */
    confirmButton: YES,

    /**
     * Defines if the decline button gets displayed in the dialog view.
     * @type {Boolean}
     */
    declineButton: NO,

    /**
     * Defines the label on the confirm button.
     * @type {String}
     */
    confirmLabel: 'Ok',

    /**
     * Defines the label on the decline button.
     * @type {String}
     */
    declineLabel: 'Cancel',

    useAsScope: YES,
    /**
     * Gets called when user clicks on the confirm button
     */
    onConfirm: function(){

    },

    _onConfirm: function(){
        this.onConfirm();
        this.hide();
    },

    /**
     * Gets called if the user taps the decline button
     */
    onDecline: function(){

    },

    _onDecline: function(){
        this.onDecline();
        this.hide();
    },

    initialize: function(){

        var that = this;
        M.View.prototype.initialize.apply(this, arguments);

        this._childViews = this._childViews || {};
        this.headline = this.headline || '';
        this.text = this.text || '';

        this.confirmLabel = (this.confirmLabel || this.confirmLabel === '') ? this.confirmLabel : 'Ok';
        this.declineLabel = (this.declineLabel || this.declineLabel === '') ? this.declineLabel : 'Cancel';
        this.confirmButton = this.confirmButton || YES;
        this.declineButton = this.declineButton || NO;

        var buttonGrid = 'col-xs-8 col-xs-offset-2' +
            '';
        if(this.confirmButton && this.declineButton){
            buttonGrid = 'col-xs-6';
        }

        var buttons = {};

        if(this.confirmButton){

            buttons.confirm = M.ButtonView.extend({
                grid: buttonGrid,
                value: this.confirmLabel,
                cssClass: 'confirmButton',
                events: {
                    tap: '_onConfirm'
                }
            });
        }

        if(this.declineButton){

            buttons.decline = M.ButtonView.extend({
                grid: buttonGrid,
                value: this.declineLabel,
                cssClass: 'declineButton',
                events: {
                    tap: '_onDecline'
                }
            });
        }

        var content = M.View.extend({
                value: '',
                _templateString:  M.TemplateManager.get('dialog.ejs'),
                assignTemplateValues: function(){
                    return {
                        headline: that.headline,
                        text: that.text
                    };
                }
            }, {
                buttons: M.View.extend({
                    grid: 'row'
                }, buttons ? buttons : {} )
            }
        );

        if(this._childViews.content){
            console.log('there is already a content as childview!');
        } else {
            this._childViews.content = content;
        }

        return this;
    },

    /**
     * Show the dialog view
     * @param {String} text - The text for the dialog view
     * @returns {DialogView}
     */
    show: function() {
        M.ModalView.prototype.show.apply(this, arguments);

        return this;
    }
});

M.Dialog = M.DialogView.create().render();




