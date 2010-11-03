// ==========================================================================
// Project:   The-M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   ...
// ==========================================================================

Demo.LoginController = M.Controller.extend({

    users: null,

    numberOfClicks: 0,

    doClick: function() {
        Demo.UserModel.find('');
    },

    myCallback: function(users) {
        this.set('users', users);
    },

    addClick: function() {
        this.set('numberOfClicks', this.numberOfClicks + 1);
    },

    switchPage: function() {
        this.switchToView(Demo.app.page2);
    },

    onLoad: function(isFirstLoad) {
        if(isFirstLoad) {
            //alert('kam im controller an ...');
        } else {
            //alert('wieder hier ...');
        }
    }

});