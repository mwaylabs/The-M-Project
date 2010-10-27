// ==========================================================================
// Project:   The-M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   ...
// ==========================================================================

Demo.LoginController = {

    doClick: function() {
        //M.Logger.log('CLICKED: YIHAAAAAAAAAAAaaa');
        /*

        switchToView('page2');

         */

        location.href = location.href.substr(0, location.href.lastIndexOf('#')) + '#page2';
    },

    doClick2: function() {
        //M.Logger.log('CLICKED: YIHAAAAAAAAAAAaaa');
        /*

        switchToView('page2');

         */

        location.href = location.href.substr(0, location.href.lastIndexOf('#')) + '#page1';
    }

}