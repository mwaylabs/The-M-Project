// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      23.05.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 * @extends M.Object
 */
M.Controller = M.Object.extend(/** @scope M.Controller.prototype */{

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.Controller',

    /**
     * This method is called whenever the bound content did change. It overwrites the
     * basic interface implementation of M.ContentBinding.
     */
    contentDidChange: function() {

    }

}).implement(M.ContentBinding);