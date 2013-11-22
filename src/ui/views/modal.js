/**
 * @module M.ModalView
 * @type {M|*}
 */
M.ModalView = M.View.extend({

    /**
     * The type of the object
     * @private
     */
    _type: 'M.ModalView',

    /**
     * The template of the object before initializing it.
     * @private
     */
    _template: _.tmpl(M.TemplateManager.get('M.ModalView')),

    /**
     * Determines if the modal is shown or not. Access it by calling isShown()
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
     * Show the modal view
     * @returns {M.ModalView}
     */
    show: function( ) {
        this._shownCounter += 1;
        if( this._shownCounter > 0 ) {
            $('body').append(this.$el);
            this._isShown = YES;
        }
        return this;
    },

    /**
     * Hide the modal view. You have to call for every show a hide or force it by calling with true as first parameter
     * @param {Boolean} force - Force the modal view to hide
     * @returns {M.ModalView}
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
     * If the modal view is visible at the moment
     * @returns {Boolean}
     */
    isShown: function() {
        return this._isShown;
    },

    /**
     * Toggle the modal view. If the modal view is visibile it gets hidden if it is hidden show the modal view
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