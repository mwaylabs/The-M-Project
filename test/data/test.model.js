describe('M.Model', function() {

    var TEST = {};

    it ('creating model', function() {
        
        assert.typeOf(M.Model, 'function', 'M.Model is defined.');

        var Person = M.Model.extend({
            idAttribute: 'id',
            defaults: { bmi: 0.0 },
            entity: {
                name:   'person',
                fields:  {
                    id:          { type: M.CONST.TYPE.INTEGER, required: YES },
                    firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
                    sureName:    { type: M.CONST.TYPE.STRING,  required: YES, index: true },
                    birthDate:   { type: M.CONST.TYPE.DATE   },
                    bmi:         { type: M.CONST.TYPE.FLOAT },
                    notes:       { type: M.CONST.TYPE.TEXT   },
                    address:     { type: M.CONST.TYPE.OBJECT },
                    displayName: { type: M.CONST.TYPE.STRING, persistent: NO }
                }
            }
        });

        assert.typeOf(Person, 'function', 'person model could be extended.');

        TEST.Person = Person.create();

        assert.typeOf(TEST.Person, 'object', 'empty person model could be created.');

        var p = Person.create({
            firstName: 'Max',
            sureName: 'Mustermann',
            birthDate: M.Date.create('01.02.2003'),
            notes: 'Notes to this person',
            address: { street: 'Leitzstraße', house_nr: 45, zip: '70469', city: 'Stuttgart' }
        });

        assert.ok(typeof p === 'object', 'person record could be created.');

        assert.ok(p.get('firstName') === 'Max', 'Field "firstName" is set.');

        assert.ok(p.get('sureName') === 'Mustermann', 'Field "sureName" is set.');

        assert.ok(p.get('bmi') === 0.0, 'Field "bmi" has correct default value.');

        assert.ok(p.get('notes') === 'Notes to this person', 'Field "note" has correct value.');

        assert.ok(typeof p.get('id') === 'undefined', 'Field "id" is undefined, as expected.');

        assert.ok(p.get('address').street === 'Leitzstraße', 'Field "address" has correct value.');

    });

});