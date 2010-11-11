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

        /* username: mway, password: test */
        var username = C2G.app.loginPage.content.username.value;
        var password = C2G.app.loginPage.content.password.value;

        /* get username / password from local storage (will later be handled by the model */
        var storedUsername = localStorage.getItem('username');
        var storedPassword = localStorage.getItem('password');

        if(storedUsername === username) {
            if(storedPassword === C2G.app.cypher.hash(password)) {
                console.log('login successfull');
                // this.switchToPage(page2);
            } else {
                alert('The password you entered is wrong!');
            }
        } else {
            alert('The username you entered couldn\'t be found!');
        }

    },

    logout: function() {

        

    }

})