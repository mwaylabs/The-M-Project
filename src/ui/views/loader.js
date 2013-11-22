/**
 *
 * The base implementation of a loader. Calling the show/toggle shows the loader.
 * Calling multiple times the show function with a different text will update the text.
 * Call hide/toggle for every show to hide the Loader.
 * To force the hidding pass true to the hide call
 *
 * @module M.LoaderView
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
M.LoaderView = M.View.extend({

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
     * Determines if the loader is shown or not. Access it by calling isShown()
     * @private
     * @type {Boolean}
     */
    _isShown: NO,

    /**
     * Counts the number how often the show function was called.
     * @private
     * @type {Number}
     */
    _shownCounter: 0,

    /**
     * Show the loader
     * @param {String} text - The text for the Loader
     * @returns {LoaderView}
     */
    show: function( text ) {
        this._shownCounter += 1;
        if( this._shownCounter > 0 ) {
            $('body').append(this.$el);
            this._isShown = YES;
        }
        this.$el.find('.m-loaderview-inner-message').html(text);
        return this;
    },

    /**
     * Hide the loader. You have to call for every show a hide or force it by calling with true as first parameter
     * @param {Boolean} force - Force the loader to hide
     * @returns {LoaderView}
     */
    hide: function( force ) {
        this._shownCounter -= 1;
        if( force === YES || this._shownCounter <= 0 ) {
            this.$el.remove();
            this._isShown = NO;
            this._shownCounter = 0;
        }

        return this;
    },

    /**
     * If the loader is visible at the moment
     * @returns {Boolean}
     */
    isShown: function() {
        return this._isShown;
    },

    /**
     * Toggle the loader. If the loader is visibile it gets hidden if it is hidden show the loader
     * @returns {Boolean}
     */
    toggle: function( text ) {
        if( this.isShown(text) ) {
            this.hide(true);
        } else {
            this.show(text);
        }
    },

    /**
     * This function needs to be implemented to render the view if there is no value given
     * @returns {Boolean|Function|YES}
     * @private
     */
    _attachToDom: function() {
        return YES;
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