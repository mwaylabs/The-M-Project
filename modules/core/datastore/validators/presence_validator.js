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

    validate: function(obj, key) {
        if(obj.value === null || obj.value === undefined || obj.value === '') {
            if(obj.isView) {
                this.validationErrors.push({
                    msg: this.msg ? this.msg : key + ' is required and is not set.',
                    viewId: obj.id,
                    validator: 'PRESENCE',
                    onSuccess: obj.onSuccess,
                    onError: obj.onError
                });
            } else {
                this.validationErrors.push({
                    msg: this.msg ? this.msg : obj.property + ' is required and is not set.',
                    modelId: obj.modelId,
                    property: obj.property,
                    validator: 'PRESENCE',
                    onSuccess: obj.onSuccess,
                    onError: obj.onError
                });
            }
            return NO;
        }
        return YES;
    }

});