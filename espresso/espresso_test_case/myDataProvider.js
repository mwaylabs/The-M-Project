
Demo.UserModelDataProvider = M.DataProvider.extend({

    useSource: M.REMOTE,

    /**
     * Fetches the data from a specified fixture, based on the passed query.
     *
     * @param {String} query The query string.
     */
    getDataFromFixture: function(query) {
        Demo.LoginController.myCallback(Demo.UserModelFixtures);
    },

    /**
     * Fetches the data from a remote server (e.g. webservice), based on the passed query.
     *
     * @param {String} query The query string.
     */
    getDataFromRemote: function(query) {
        M.Request.init({
            url: 'demo.json',
            type: 'GET',
            isJSON: YES,
            onSuccess: function(data, msg, request) {
                var users = [];
                for(i in data.users) {
                    var u = data.users[i];
                    users.push(Demo.UserModel.create({
                        guid: u.guid,
                        firstName: u.firstname,
                        lastName: u.lastname
                    }));
                }
                Demo.LoginController.myCallback(users);
            }
        }).send();
    }

})