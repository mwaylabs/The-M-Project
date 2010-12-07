// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      22.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/datastore/validator.js')

M.NotMinusValidator = M.Validator.extend(
/** @scope M.NotMinusValidator.prototype */ {

    type: 'M.NotMinusValidator',

   validate: function(obj) {

       if(typeof(obj.value) === 'number') {
           if(obj.value < 0) {
                this.validationErrors.push({
                    msg: obj.value + ' is a minus value. This is not allowed.',
                    modelId: obj.modelId,
                    property: obj.property,
                    viewId: obj.viewId,
                    validator: 'NUMBER',
                    onSuccess: obj.onSuccess,
                    onError: obj.onError
                });
                return NO;
           }
           return YES;
       }

       if(typeof(obj.value) === 'string') {
           var pattern = /-/;
           if(this.pattern.exec(obj.value)) {
               this.validationErrors.push({
                    msg: obj.value + ' is a minus value. This is not allowed.',
                    modelId: obj.modelId,
                    property: obj.property,
                    viewId: obj.viewId,
                    validator: 'NUMBER',
                    onSuccess: obj.onSuccess,
                    onError: obj.onError
                });
                return NO;
           }
           return YES;
       }
   }
});