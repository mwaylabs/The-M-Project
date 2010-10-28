// ==========================================================================
// Project:   The-M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   ...
// ==========================================================================

Demo.LoginController = M.Controller.extend({

    doClick: function() {
        //M.Logger.log('CLICKED: YIHAAAAAAAAAAAaaa');
        //M.Logger.log('NEEEEUUUUUUUU');
        //M.Logger.log(this);
        M.Logger.log('doClick in Demo.LoginController');
        var username = 'u1', password = 'test';

        var result = Demo.UserModel.find({
            userName: username,
            password: password
        });
        if(result.length > 0) {
            M.Logger.log('Login was successfull');
            this.switchToView('Demo.LoggedInView');
        }
        //location.href = location.href.substr(0, location.href.lastIndexOf('#')) + '#page2';
    },

    doClick2: function() {
        //M.Logger.log('CLICKED: YIHAAAAAAAAAAAaaa');
        /*

        switchToView('page2');

         */

        location.href = location.href.substr(0, location.href.lastIndexOf('#')) + '#page1';
    }

});