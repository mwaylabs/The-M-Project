// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.ViewEnableState
 *
 * @type {*}
 * @extends M.Interface
 */
M.ViewEnableState = M.Interface.design(/** @scope M.ContentBinding.prototype */{

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.ViewEnableState',

    _isEnabled: YES,

    disable: function() {
        this._isEnabled = NO;
        this.$el.addClass('disabled').removeClass('enabled');
        this._disableEvents();
        return this;
    },

    enable: function() {
        this._isEnabled = YES;
        this.$el.addClass('enabled').removeClass('disabled');
        this._enableEvents();
        return this;
    },

    getInterface: function() {
        return {
            disable: this.disable,
            enable: this.enable
        };
    }

});