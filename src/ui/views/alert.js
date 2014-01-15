// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * The base implementation of a alert. You can show the alert view by calling the show function.
 * For displaying text in the alert view you can pass the show function your String as an argument.
 * Calling multiple times the show function with a different text will update the text.
 * Call hide/toggle for every show to hide the alert view.
 * To force the hiding pass true to the hide call
 *
 * @module M.AlertView
 * @extends M.ModalView
 * @type {*|Object|void}
 *
 * @example
 * var alert = M.AlertView.extend().create().render();
 * //show alert
 * alert.show('Warning!');
 * //hide loader
 * alert.hide();
 *
 */
M.AlertView = M.ModalView.extend({

    /**
     * The type of the View
     * @private
     * @type {String}
     */
    _type: 'M.AlertView',

    /**
     * Defines that the alert view can't be closed by clicking on the overlay.
     * @type {String}
     */
    hideOnOverlayClick: NO,

    useAsScope: YES,
    /**
     * Gets called when user clicks on the ok button
     */
    ok: function(){

    },

    _ok: function(){
        this.ok();
        this.hide();
    },

    /**
     * Gets called if the user taps the cancel button
     */
    cancel: function(){

    },

    _cancel: function(){
        this.cancel();
        this.hide();
    },

    /**
     * Show the alert view
     * @param {String} text - The text for the alert view
     * @returns {AlertView}
     */
    show: function( text ) {
        text = text || '';
        M.ModalView.prototype.show.apply(this, arguments);
        this.$el.find('.m-alertview-inner-message').html(text);
        //this.$el.find('.alertDismissButton').on('click', this.hide());
        return this;
    }
}, {

    content: M.View.extend({

        /**
         * The template of the view
         * @private
         * @type {function}
         */
        _templateString: M.TemplateManager.get('alert.ejs'),

        /**
         * This function needs to be implemented to render the view if there is no value given
         * @returns {Boolean|Function|YES}
         * @private
         */
        _attachToDom: function() {
            return YES;
        }
    },{
        buttons: M.View.extend({
            grid: 'row'
        },{
            ok: M.ButtonView.extend({
                grid: 'col-xs-6',
                value:'Ok',
                events: {
                    tap: '_ok'
                }

            }),
            cancel: M.ButtonView.extend({
                grid: 'col-xs-6',
                value: 'Cancel',
                events: {
                    tap: '_cancel'
                }
            })
        })
    })
});


/**
 *
 * @module M.Alert
 * @static
 * Static implementation of the Alert view
 *
 * @type {*|Prompt|String|this}
 * @example
 * alertButton: M.ButtonView.extend({
                grid: 'col-xs-12 col-sm-6 col-md-4',
                value: 'Show Alert',
                events: {
                    tap: function() {
                        M.AlertView.extend( {
                            ok: function(){
                            console.log('ok');
                        },
                            cancel: function(){
                                console.log('cancel');
                            }
                        }).create().render().show('Hallo ich bin ein alert');
                    }
                }
            })
 */
M.Alert = M.AlertView.create().render();