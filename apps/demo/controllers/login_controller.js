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

        M.Request.init({
            url: 'index.html',
            type: 'GET',
            onSuccess: this.dataIsHere
        }).send();
    },

    dataIsHere: function(data, msg, request) {
        M.Logger.log('######################');
        M.Logger.log(data);
        M.Logger.log(msg);
        M.Logger.log(request);
        M.Logger.log('######################');
    }

});