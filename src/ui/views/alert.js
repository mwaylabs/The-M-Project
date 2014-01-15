// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * The base implementation of a loader. Calling the show/toggle shows the loader.
 * Calling multiple times the show function with a different text will update the text.
 * Call hide/toggle for every show to hide the Loader.
 * To force the hidding pass true to the hide call
 *
 * @module M.LoaderView
 * @extends M.ModalView
 * @type {*|Object|void}
 *
 * @example
 * var loader = M.LoaderView.extend().create().render();
 * //show loader
 * loader.show('loading');
 * //hide loader
 * loader.hide();
 * //show loader
 * loader.toggle('loading second time');
 * //hide loader
 * loader.toggle();
 * //show loader
 * loader.show('loading');
 * //udpte text
 * loader.show('still loading');
 * //force hidding
 * loader.hide(true);
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
     * Defines that the loader view can't be closed by clicking on the overlay.
     * @type {String}
     */
    hideOnOverlayClick: NO,

    useAsScope: YES,

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
     * Show the loader
     * @param {String} text - The text for the Loader
     * @returns {LoaderView}
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
 * @module M.Loader
 * @static
 * Static implementation of the LoaderView
 *
 * @type {*|Prompt|String|this}
 * @example
 * M.ButtonView.extend({
    grid: 'col-xs-12',
    value: 'Toggle LoaderView',
    events: {
        tap: function() {
            M.Loader.toggle();
        }
    }
 */
M.Alert = M.AlertView.create().render();