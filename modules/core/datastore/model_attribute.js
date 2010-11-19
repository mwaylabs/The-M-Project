// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      18.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');


/**
 * @class
 *
 * Defines an attribute for a model
 */
M.ModelAttribute = M.Object.extend({

    defaultValue: null,

    type: null,

    isRequired: NO,

    validators: null

});

//
// CLASS METHODS
//

/**
 * Returns a model attribute.
 *
 * @param type
 * @param opts options for the attribute, such as defaultValue, isRequired flag, etc. ...
 * @return {Object} Model attribute
 */
M.ModelAttribute.attr = function(type, opts) {
    if (!opts) {
        opts = {};
    }
    if (!opts.type) {
        opts.type = type || 'String';
    }
    return this.extend(opts);
};