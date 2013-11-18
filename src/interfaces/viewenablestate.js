// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      15.05.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
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

    disable: function(){
        this._isEnabled = NO;
        this.$el.addClass('disabled').removeClass('enabled');
        this._disableEvents();
        return this;
    },

    enable: function(){
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