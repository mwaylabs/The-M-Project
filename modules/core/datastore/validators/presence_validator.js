// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      23.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/validator.js')

M.PresenceValidator = M.Validator.extend({

    type: 'M.PresenceValidator',

    validate: function(obj) {
        if(obj.value === null || obj.value === undefined) {
            this.validationErrors.push({
                msg: obj.property + ' is required and is not set.',
                modelId: obj.modelId,
                property: obj.property,
                viewId: obj.viewId,
                validator: 'PRESENCE',
                onSuccess: obj.onSuccess,
                onError: obj.onError
            });
            return NO;
        }
        return YES;
    }

});