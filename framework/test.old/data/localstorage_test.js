test('M.DataConnectorLocalStorage', function() {

    ok(typeof M.DataConnectorLocalStorage === 'object', 'M.DataConnectorLocalStorage is defined');

    TEST.LocalStorageConnector = M.DataConnectorLocalStorage.create({
        config: {
            targets: {
                developer: {

                }
            }
        }
    });

    ok(TEST.LocalStorageConnector.getObjectType() === 'M.DataConnectorLocalStorage', 'DataConnectorLocalStorage successfully created');

    ok(_.isFunction(TEST.LocalStorageConnector.find), 'find is defined and a function');
    ok(_.isFunction(TEST.LocalStorageConnector.save), 'save is defined and a function');
    ok(_.isFunction(TEST.LocalStorageConnector.del), 'del is defined and a function');


    /**
     * Testing Interaction with DataConnectorLocalStorage
     */

    TEST.Developer = M.Model.create({
        config: {
            name:   'developer',
            fields:  {
                sureName:    { type: M.CONST.TYPE.STRING,  required: YES, index: true },
                firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
                age:         { type: M.CONST.TYPE.INTEGER }
            }
        }
    });

    var dev1 = TEST.Developer.createRecord({
        sureName: 'Werler',
        firstName: 'Sebastian',
        age: 30
    });

    var dev2 = TEST.Developer.createRecord({
        sureName: 'Laubach',
        firstName: 'Dominik',
        age: 28
    });

    var dev3 = TEST.Developer.createRecord({
        sureName: 'Buck',
        firstName: 'Stefan',
        age: 26
    });

    var dev4 = TEST.Developer.createRecord({
        sureName: 'Hanowski',
        firstName: 'Marco',
        age: 28
    });

    var dev5 = TEST.Developer.createRecord({
        sureName: 'Stierle',
        firstName: 'Frank',
        age: 43
    });



    // TODO: make async to let it "run in one piece without interruptions"
    /* Clear local storage to be able to correctly count elements */
    localStorage.clear();

    TEST.LocalStorageConnector.save({
        data: dev1
    });

    ok(localStorage.length === 1, 'one record successfully saved');

    var key = localStorage.key(0);
    ok(key === dev1.getName() + '_' + dev1.getId(), 'record saved under correct key');

    /* change first name and update record in LS */
    dev1.set('firstName', 'Basti');
    TEST.LocalStorageConnector.save({
        data: dev1
    });

    var dev_raw = JSON.parse(localStorage.getItem(localStorage.key(0)));

    ok(localStorage.length === 1 && dev_raw.firstName === 'Basti', 'record update successful');

    /* now testing an array of records */
    TEST.LocalStorageConnector.save({
        data: [dev2, dev3]
    });

    ok(localStorage.length === 3, 'Successfully stored an array of records');

    /* now testing to save a M.Collection of records */

    var myDeveloperCollection = M.Collection.create(TEST.Developer);

    myDeveloperCollection.add(dev4).add(dev5);

    TEST.LocalStorageConnector.save({
        data: myDeveloperCollection
    });

    ok(localStorage.length === 5, 'Successfully stored a M.Collection of records');

    /* now delete them */

    TEST.LocalStorageConnector.del({
        data: dev1
    });

    ok(localStorage.length === 4, 'Successfully deleted one record');

    TEST.LocalStorageConnector.del({
        data: [dev2, dev3]
    });

    ok(localStorage.length === 2, 'Successfully deleted records by passing in an array');

    TEST.LocalStorageConnector.del({
        data: myDeveloperCollection
    });

    ok(localStorage.length === 0, 'Successfully deleted records by passing in a M.Collection');


    /* fill collection and save it then */
    myDeveloperCollection.add(dev1).add(dev2).add(dev3);

    TEST.LocalStorageConnector.save({
        data: myDeveloperCollection
    });




});