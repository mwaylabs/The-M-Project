// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      11.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

C2G.LoginController = M.Controller.extend({

    login: function() {

        var username = C2G.app.loginPage.content.username.value;
        var password = C2G.app.cypher.hash(C2G.app.loginPage.content.password.value, M.SHA-2);

        console.log('username: ' + username);
        console.log('password: ' + password);

    },

    logout: function() {

        

    }

})