try {
    TEST.Person = M.Model.create({
        config: {
            name:   'person',
            key:    'id',
            fields:  {
                id:          { type: M.CONST.TYPE.INTEGER, required: YES },
                sureName:    { type: M.CONST.TYPE.STRING,  required: YES, index: true },
                firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
                birthDate:   { type: M.CONST.TYPE.DATE   },
                bmi:         { type: M.CONST.TYPE.FLOAT,   default: 1.0},
                notes:       { type: M.CONST.TYPE.TEXT   },
                address:     { type: M.CONST.TYPE.OBJECT },
                displayName: { type: M.CONST.TYPE.STRING, persistent: NO }
            }
        }
    });


    TEST.WebSql = M.DataConnectorWebSql.create({
        config: {
            name: 'test',
            entities: {
                // name of the entity
                person: {
                    // take key and field configuration from Person model
                    model: TEST.Person,
                    // overrides to model config
                    fields: {
                        sureName:    { name: 'sure_name'  },
                        firstName:   { name: 'first_name' },
                        bmi:         { type: M.CONST.TYPE.STRING }
                    }
                }
            }
        }
    });
} catch(e) {}

asyncTest('M.DataConnectorWebSql basics', function () {

    ok(typeof TEST.Person === 'object', 'person model could be created.');

    ok(typeof TEST.WebSql === 'object', 'DataConnectorWebSql could be created.');

    var person = TEST.Person.createRecord({
        id: 1,
        firstName: 'The',
        sureName: 'M-Project',
        birthDate: '03.12.2011',
        bmi: 27.8,
        notes: 'Best HTML5 framework ever!',
        address: { street: 'Leitzstraße', house_nr: 45, zip: '70469', city: 'Stuttgart' },
        displayName: 'The M-Project'
    });

    var testDrop = function () {
        TEST.WebSql.dropTable({
            entity: 'person',
            success: function() { ok(true,  'drop table person succeeded.' ); },
            error: function()   { ok(false, 'error dropping table person.' ); start(); },
            finish: function()  { ok(true,  'drop table person finished.' ); testCreateTable(); }
        });
    };

    var testCreateTable = function () {
        TEST.WebSql.createTable({
            entity: 'person',
            success: function() { ok(true,  'save person model succeeded' ); },
            error: function()   { ok(false, 'error saving person model' ); start(); },
            finish: function()  { ok(true,  'save person model finished' ); testSave(); }
        });
    };

    var testSave = function () {
        TEST.WebSql.save({
            data: person,
            success: function() { ok(true,  'save person model succeeded' ); },
            error: function()   { ok(false, 'error saving person model' ); start(); },
            finish: function()  { ok(true,  'save person model finished' ); testFind(); }
        });
    };

    var testFind = function () {
        TEST.WebSql.find({
            entity: 'person',
            success: function(result) {
                ok(true,  'find person model succeeded' );
                testResult(result);
            },
            error: function()   { ok(false, 'error find person model' ); start(); },
            finish: function()  { ok(true,  'find person model finished' ); testUpdate(); }
        });
    };

    var testResult = function(result) {

        ok(typeof result === 'object', 'Find has a response object.');

        ok(M.Collection.isPrototypeOf(result), 'The response is a M.Collection.');

        ok(result.getCount() === 1, 'The response holds one record.');

        // get first person record
        var p = result.getAt(0);

        ok(p.get('sureName') === 'M-Project', 'Field "sureName" has correct value.');

        ok(p.get('bmi') === person.get('bmi'), 'Field "bmi" has correct value.');

        ok(p.get('notes') === 'Best HTML5 framework ever!', 'Field "note" has correct value.');

        ok(p.get('id') === 1, 'Field "id" has correct value.');

        ok(p.get('address').street === 'Leitzstraße', 'Field "address" has correct value.');
    };

    var testUpdate = function () {

        person.set('bmi', 26.1);

        TEST.WebSql.save({
            data: person,
            success: function() { ok(true,  'update person model succeeded' );
                TEST.WebSql.find({
                    entity: 'person',
                    success: function(result) {
                        var p = result.getAt(0);
                        ok(p.get('bmi') === person.get('bmi'), 'Field "bmi" has correct updated value.');
                    },
                    error: function()   { ok(false, 'error find updated person model.' ); start(); },
                    finish: function()  { ok(true,  'find updated person model finished.' ); testDel(); }
                });
            },
            error: function()  { ok(false, 'error updating person model.' ); start(); },
            finish: function() { ok(true,  'update person model finished.' ); }
        });
    };

    var testDel = function () {

        TEST.WebSql.del({
            data: person,
            success: function() {
                ok(true,  'del person model succeeded.' );
                TEST.WebSql.find({
                    entity: 'person',
                    success: function(result) {
                        ok(result.getCount() === 0, 'record has been deleted.');
                    },
                    error: function()   { ok(false, 'error find updated person model.' ); start(); },
                    finish: function()  { ok(true,  'find updated person model finished.' ); start(); }
                });
            },
            error: function()  { ok(false, 'error deleting person model.' ); start(); },
            finish: function() { ok(true,  'del person model finished.' ); }
        });
    };

    testDrop();
});

asyncTest('M.DataConnectorWebSql with array', function () {

    var persons = [
        { sureName: 'Stierle' },
        { sureName: 'Werler' }
    ];

    var testSave = function () {
        TEST.WebSql.save({
            entity: 'person',
            data: persons,
            success: function() { ok(true,  'save persons array succeeded.' ); },
            error: function()   { ok(false, 'error save persons array.' ); start(); },
            finish: function()  { ok(true,  'save persons array finished.' ); testFind(); }
        });
    };

    var testFind = function (bmi) {
        TEST.WebSql.find({
            order: 'id',
            entity: 'person',
            success: function(result) {
                ok(true,  'find persons succeeded.' );
                testResult(result);
            },
            error: function()   { ok(false, 'error find persons.' ); start(); },
            finish: function()  { ok(true,  'find persons finished.'); testDel(); }
        });
    };

    var testResult = function(result) {

        ok(typeof result === 'object', 'Find has a response object.');

        ok(M.Collection.isPrototypeOf(result), 'The response is a M.Collection.');

        ok(result.getCount() === 2, 'The response holds 2 records.');

        // get first person record
        var p = result.getAt(0);

        ok(p && p.get('sureName') === 'Stierle', 'Field "sureName" of second record has correct value.');

        // get second person record
        p = result.getAt(1);

        ok(p && p.get('sureName') === 'Werler', 'Field "sureName" of third record has correct value.');
    };

    var testDel = function () {

        TEST.WebSql.del({
            entity: 'person',
            success: function() {
                ok(true,  'del person model succeeded.' );
                TEST.WebSql.find({
                    entity: 'person',
                    success: function(result) {
                        ok(result.getCount() === 0, 'records have been deleted.');
                    },
                    error: function()   { ok(false, 'error find updated person model.' ); start(); },
                    finish: function()  { ok(true,  'find updated person model finished.' ); start(); }
                });
            },
            error: function()  { ok(false, 'error deleting person model.' ); start(); },
            finish: function() { ok(true,  'del person model finished.' ); }
        });
    };

    testSave();

});

asyncTest('M.DataConnectorWebSql with collection', function () {

    var persons = M.Collection.create(TEST.Person);
    persons.add({
        sureName: 'Laubach',
        firstName: 'Dominik',
        id: 4
    }).add({
        sureName: 'Hanowski',
        firstName: 'Marco',
        id: 1
    }).add({
        sureName: 'Stierle',
        firstName: 'Frank',
        id: 3
    }).add({
        sureName: 'Werler',
        firstName: 'Sebastian',
        id: 5
    }).add({
        sureName: 'Buck',
        firstName: 'Stefan',
        id: 2
    });

    var testSave = function () {
        TEST.WebSql.save({
            entity: 'person',
            data: persons,
            success: function() { ok(true,  'save persons collection succeeded.' ); },
            error: function()   { ok(false, 'error save persons collection.' ); start(); },
            finish: function()  { ok(true,  'save persons collection finished.' ); testFind(); }
        });
    };

    var testFind = function (bmi) {
        TEST.WebSql.find({
            order: 'id',
            entity: 'person',
            where: { $or: [
                { sureName: /er/ },
                { id: { $gt: 1, $lte: 2 } } ]
            },
            success: function(result) {
                ok(true,  'find persons succeeded.' );
                testResult(result);
            },
            error: function()   { ok(false, 'error find persons.' ); start(); },
            finish: function()  {
                ok(true,  'find persons finished.');
               // TEST.WebSql.del({ entity: 'person' });
                start();
            }
        });
    };

    var testResult = function(result) {

        ok(typeof result === 'object', 'Find has a response object.');

        ok(M.Collection.isPrototypeOf(result), 'The response is a M.Collection.');

        ok(result.getCount() === 3, 'The response holds 3 records.');

        // get first person record
        var p = result.getAt(0);

        ok(p && p.get('sureName') === 'Buck', 'Field "sureName" of first record has correct value.');

        // get second person record
        p = result.getAt(1);

        ok(p && p.get('sureName') === 'Stierle', 'Field "sureName" of second record has correct value.');
    };
    testSave();
});

