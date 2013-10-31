asyncTest('M.DataConnector', function () {

    TEST.Person = M.Model.create({
        config: {
            name:   'person',
            key:    'id',
            fields:  {
                id:          { type: M.CONST.TYPE.INTEGER, required: YES },
                sureName:    { type: M.CONST.TYPE.STRING,  required: YES, index: true },
                firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
                birthDate:   { type: M.CONST.TYPE.DATE   },
                bmi:         { type: M.CONST.TYPE.FLOAT,   default: 0.0},
                notes:       { type: M.CONST.TYPE.TEXT   },
                address:     { type: M.CONST.TYPE.OBJECT },
                displayName: { type: M.CONST.TYPE.STRING, persistent: NO }
            }
        }
    });

    TEST.Data = M.DataConnector.create({
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
                        firstName:   { name: 'first_name' }
                    }
                }
            }
        }
    });

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

    var testResult = function(result) {
        ok(true,  'save person model succeeded' );

        ok(typeof result === 'object', 'Find has a response object.');

        ok(M.Collection.isPrototypeOf(result), 'The response is a M.Collection.');

        ok(result.getCount() === 1, 'The response holds one record.');

        // get first person record
        var p = result.getAt(0);

        ok(p.get('sureName') === 'M-Project', 'Field "sureName" has correct value.');

        ok(p.get('bmi') === 27.8, 'Field "bmi" has correct value.');

        ok(p.get('notes') === 'Best HTML5 framework ever!', 'Field "note" has correct value.');

        ok(p.get('id') === 1, 'Field "id" has correct value.');

        ok(p.get('address').street === 'Leitzstraße', 'Field "address" has correct value.');
    };

    var testFind = function () {
        TEST.Data.find({
            entity: 'person',
            success: function(result) { testResult(result); },
            error: function()   { ok(false, 'error saving person model' ); },
            finish: function()  { ok(true,  'save person model finished' ); start(); }
        });
    };

    TEST.Data.save({
        data: person,
        success: function() { ok(true,  'save person model succeeded' ); },
        error: function()   { ok(false, 'error saving person model' ); start(); },
        finish: function()  { ok(true,  'save person model finished' ); testFind(); }
    });
});

