(function( scope ) {
    /**
     * M.ButtonView inherits from M.View
     * @type {*}
     */

    M.BUTTON_VIEW = 'M.ButtonView';

    M.ButtonView = M.View.extend({

        /**
         * The type of the object
         * @private
         */
        _type: M.BUTTON_VIEW,

        /**
         * The template of the object before initializing it.
         * @private
         */
        _template: _.tmpl(M.TemplateManager.get(M.BUTTON_VIEW)),

        /**
         * The active state of the button. Use isActive and setActive to change this property.
         * @private
         */
        _isAcitve: YES,

        isActive: function(){
            return this._isActive();
        },

        activate: function(){

            this._isAcitve = YES;
            this.$el.addClass('active');

        },

        deactivate: function(){
            this._isAcitve = NO;
            this.$el.removeClass('active');
        }

    }).implements([M.ViewEnableState]);
})(this);