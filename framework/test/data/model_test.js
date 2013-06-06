test('M.Model', function() {

    ok(typeof M.Model === 'object', 'M.Model is defined.');

    TEST.Person = M.Model.create({
        config: {
            name:   'person',
            key:    'id',
            fields:  {
                id:          { type: M.CONST.TYPE.INTEGER, required: YES },
                firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
                sureName:    { type: M.CONST.TYPE.STRING,  required: YES, index: true },
                birthDate:   { type: M.CONST.TYPE.DATE   },
                bmi:         { type: M.CONST.TYPE.FLOAT,   default: 0.0},
                notes:       { type: M.CONST.TYPE.TEXT   },
                address:     { type: M.CONST.TYPE.OBJECT },
                displayName: { type: M.CONST.TYPE.STRING, persistent: NO }
            }
        }
    });

    ok(typeof TEST.Person === 'object', 'person model could be created.');

    var p = TEST.Person.createRecord({
        firstName: 'Max',
        sureName: 'Mustermann',
        birthDate: M.Date.create('01.02.2003'),
        notes: 'Notes to this person',
        address: { street: 'Leitzstraße', house_nr: 45, zip: '70469', city: 'Stuttgart' }
    });

    ok(typeof p === 'object', 'person record could be created.');

    ok(p.get('firstName') === 'Max', 'Field "firstName" is set.');

    ok(p.get('sureName') === 'Mustermann', 'Field "sureName" is set.');

    ok(p.get('bmi') === 0.0, 'Field "bmi" has correct default value.');

    ok(p.get('notes') === 'Notes to this person', 'Field "note" has correct value.');

    ok(typeof p.get('id') === 'undefined', 'Field "id" is undefined, as expected.');

    ok(p.get('address').street === 'Leitzstraße', 'Field "address" has correct value.');


});