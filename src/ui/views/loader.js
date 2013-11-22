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
M.LoaderView = M.ModalView.extend({

    /**
     * The type of the View
     * @private
     * @type {String}
     */
    _type: 'M.LoaderView',

    /**
     * The template of the view
     * @private
     * @type {function}
     */
    _template: _.tmpl(M.TemplateManager.get('M.LoaderView')),

    /**
     * Show the loader
     * @param {String} text - The text for the Loader
     * @returns {LoaderView}
     */
    show: function( text ) {
        M.ModalView.prototype.show.apply(this, arguments);
        this.$el.find('.m-loaderview-inner-message').html(text);
        return this;
    }
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
M.Loader = M.LoaderView.create().render();