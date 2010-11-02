

Demo.LoginController = M.Controller.extend({

    users: null,

    doClick: function() {
        Demo.UserModel.find('')
    },

    myCallback: function(users) {
        Demo.LoginController.observable.attach('asa', 'users');
        this.set('users', users);
    }

});