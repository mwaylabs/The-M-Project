// ==========================================================================
// Project:   The-M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   ...
// ==========================================================================

Demo.LoginController = M.Controller.extend({

    doClick: function() {
        M.Logger.log('doClick in Demo.LoginController');
        /* MISSING: the query is ignored so far */
        var result = Demo.UserModel.find("(userName = 'u1' AND password = 'test')");
        if(result && result.length > 0) {
            M.Logger.log('Login was successfull');
            this.switchToView('Demo.LoggedInView');
        }
        //location.href = location.href.substr(0, location.href.lastIndexOf('#')) + '#page2';
    }

});