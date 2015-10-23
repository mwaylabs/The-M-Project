// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * The base implementation of an alert view. You can show the alert view by calling the show function.
 * Call hide/toggle for every show to hide the alert view.
 * To force the hiding pass true to the hide call
 *
 * @module M.AlertView
 * @extends M.ModalView
 * @type {*|Object|void}
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
     * The text displayed in the alert view
     * @type {String}
     */
    text: '',

    /**
     * The title of the alert view
     * @type {String}
     */
    title: '',

    /**
     * Defines that the alert view can't be closed by clicking on the overlay.
     * @type {String}
     */
    hideOnOverlayClick: NO,

    useAsScope: YES,
    /**
     * Gets called when user clicks on the ok button
     */
    onConfirm: function() {

    },

    _onConfirm: function() {
        this.onConfirm();
        this.hide();
    },

    initialize: function() {
        var that = this;
        M.View.prototype.initialize.apply(this, arguments);

        this._childViews = this._childViews || {};
        this.text = this.text || '';
        this.title = this.title || '';

        var content = M.View.extend({
                value: '',
                _templateString: M.TemplateManager.get('alert.ejs'),
                assignTemplateValues: function() {
                    return {
                        text: that.text,
                        title: that.title
                    };

                }
            }, {
                buttonContainer: M.View.extend({
                    value: '',
                    grid: 'row',
                    childViews: {

                        confirmButton: M.ButtonView.extend({
                            grid: 'col-xs-8 col-xs-offset-2',
                            value: 'Ok',
                            cssClass: 'confirmButton',
                            events: {
                                tap: '_onConfirm'
                            }
                        })
                    }
                })
            }

        );

        if(this._childViews.content){
            console.log('there is already a content as childview!');
        } else {
            this._childViews.content = content;
        }
    }
});

M.Alert = M.AlertView.create().render();