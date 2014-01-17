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
 * var dialog = M.DialogView.extend().create().render();
 * //show dialog
 * dialog.show('Warning!');
 * //hide loader
 * dialog.hide();
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
    confirmLabel: '',

    /**
     * Defines the label on the decline button.
     * @type {String}
     */
    declineLabel: '',

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
        M.View.prototype.initialize.apply(this, arguments);

        this.headline = this.headline || '';
        this._childViews = this._childViews || {};
        var headline = this.headline || '';
        var text = this.text || '';

        var buttonGrid = 'col-xs-12';
        if(this.confirmButton && this.declineButton){
            buttonGrid = 'col-xs-6';
        }

        var buttons = {};

        if(this.confirmButton){

            buttons.confirm = M.ButtonView.extend({
                grid: buttonGrid,
                value: this.confirmLabel || 'Ok',
                events: {
                    tap: '_onConfirm'
                }
            });
        }

        if(this.declineButton){

            buttons.decline = M.ButtonView.extend({
                grid: buttonGrid,
                value: this.declineLabel || 'Cancel',
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
                        headline: headline,
                        text: text
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




