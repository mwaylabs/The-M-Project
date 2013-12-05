describe('M.Field', function() {

    var TEST = {
        fields:  {
            _id:         { type: M.CONST.TYPE.STRING,  required: YES, index: YES },
            sureName:    { name: 'USERNAME', type: M.CONST.TYPE.STRING,  required: YES, index: YES },
            firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
            age:         M.CONST.TYPE.INTEGER,
            birthday:    M.CONST.TYPE.DATE
        }
    }

    it('creating a field', function() {
        var id          = M.Field.create( TEST.fields._id );
        assert.isObject(id, 'id field successfully created.');
        assert.equal(id.type,  TEST.fields._id.type, 'id field has correct type.');
        assert.ok(id.required,  'id field is required.');
        assert.ok(id.index, 'id field is index.');
        TEST.id = id;

        var sureName    = M.Field.create( TEST.fields.sureName );
        assert.isObject(sureName, 'sureName field successfully created.');
        assert.equal(sureName.type,  TEST.fields.sureName.type, 'sureName field has correct type.');
        assert.ok(sureName.required,  'sureName field is required.');
        assert.ok(sureName.index, 'sureName field is index.');
        TEST.sureName = sureName;

        var firstName   = M.Field.create( TEST.fields.firstName );
        assert.isObject(firstName, 'firstName field successfully created.');
        assert.equal(firstName.type,  TEST.fields.firstName.type, 'firstName field has correct type.');
        assert.ok(!firstName.required,  'firstName field is not required.');
        assert.ok(!firstName.index, 'firstName field is not index.');
        TEST.firstName = firstName;

        var age         = M.Field.create( TEST.fields.age );
        assert.isObject(age, 'age field successfully created.');
        assert.equal(age.type,  TEST.fields.age, 'age field has correct type.');
        assert.ok(!age.required,  'age field is not required.');
        assert.ok(!age.index, 'age field is not index.');
        TEST.age = age;

        var birthday    = M.Field.create( TEST.fields.birthday);
        assert.isObject(birthday, 'birthday field successfully created.');
        assert.equal(birthday.type,  TEST.fields.birthday, 'birthday field has correct type.');
        assert.ok(!birthday.required,  'birthday field is not required.');
        assert.ok(!birthday.index, 'birthday field is not index.');
        TEST.birthday = birthday;

    });

    it('converting a field', function() {
        var value = TEST.sureName.transform(1000);
        assert.isString(value, 'sureName transforms integer into string');

        value = TEST.age.transform('23');
        assert.isNumber(value, 'age transforms string into integer');

        value = TEST.birthday.transform('2013-11-22');
        assert.isObject(value, 'birthday transforms string into date');

    });

    it('comparing a field', function() {

        assert.ok(TEST.sureName.equals(1000, '1000'), '1000 == "1000" for field type string')

        assert.ok(!TEST.age.equals(1000, '1002'), '1000 != "1002" for field type integer')

        assert.ok(TEST.age.equals(1000, '1000'), '1000 == "1000" for field type integer')

        assert.ok(TEST.age.equals(10.4, '10.7'), '10.4 == "10.7" for field type integer')

    });

});
