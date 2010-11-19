// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      19.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');

M.Validator = M.Object.extend({

    type: 'M.Validator',

    EMAIL: {
        pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        validate: function(value) {
            if (this.pattern.exec(value))Ê{
                return YES;
            }
            return NO;
        }
    },

    NUMBER: {
        validate: function(value) {
            if(typeof(value) === 'number') {
                return YES;
            }
            return NO;
        }
    },

    NOTMINUS: {
       validate: function(value) {
           
           if(typeof(value) === 'number') {
               if(value < 0) {
                   return NO;
               }
               return YES;
           }

           if(typeof(value) === 'string') {
               var pattern = /-/;
               if(this.pattern.exec(value)) {
                   return NO;
               }
               return YES;
           }
       }
    }
});