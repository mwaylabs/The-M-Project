// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      29.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

I18N.LanguageController = M.Controller.extend({

    switchToGerman: function() {
        if(M.Application.currentLanguage !== 'de_DE') {
            M.I18N.setLanguage('de_DE');
        }
    },

    switchToEnglish: function() {
        if(M.Application.currentLanguage !== 'en_US') {
            M.I18N.setLanguage('en_US');
        }
    },

    switchToSpanish: function() {
        if(M.Application.currentLanguage !== 'es_ES') {
            M.I18N.setLanguage('es_ES');
        }
    }
    
})