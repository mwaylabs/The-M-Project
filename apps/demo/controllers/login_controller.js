// ==========================================================================
// Project:   The-M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   ...
// ==========================================================================

Demo.LoginController = M.Controller.extend({

    users: null,

    doClick: function() {
        Demo.UserModel.find('');
    },

    myCallback: function(users) {
        Demo.LoginController.observable.attach('asa', 'users');
        this.set('users', users);
    }

});