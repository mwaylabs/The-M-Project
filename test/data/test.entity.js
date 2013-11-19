describe('M.Entity', function() {

    var TEST = {
        fields:  {
            id:          { type: M.CONST.TYPE.STRING,  required: YES, index: YES },
            sureName:    { name: 'USERNAME', type: M.CONST.TYPE.STRING,  required: YES, index: YES },
            firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
            age:         M.CONST.TYPE.INTEGER,
            birthday:    M.CONST.TYPE.DATE
        }
    }

    TEST.attributes = {
        id: 1000,
        sureName: 'Nachname',
        firstName: 'Vorname',
        age: '33',
        birthday: '1999-09-23'
    }

    it('creating an entity', function() {
        var entity = M.Entity.design({
            fields: TEST.fields
        });
        assert.isObject(entity, 'entity successfully created.');
        TEST.entity = entity;

        var id = entity.fields.id;
        assert.isObject(id, 'id field successfully created.');
        assert.equal(id.type,  TEST.fields.id.type, 'id field has correct type.');
        assert.ok(id.required,  'id field is required.');
        assert.ok(id.index, 'id field is index.');

        var sureName = entity.fields.sureName;
        assert.isObject(sureName, 'sureName field successfully created.');
        assert.equal(sureName.type,  TEST.fields.sureName.type, 'sureName field has correct type.');
        assert.ok(sureName.required,  'sureName field is required.');
        assert.ok(sureName.index, 'sureName field is index.');

        var firstName = entity.fields.firstName;
        assert.isObject(firstName, 'firstName field successfully created.');
        assert.equal(firstName.type,  TEST.fields.firstName.type, 'firstName field has correct type.');
        assert.ok(!firstName.required,  'firstName field is not required.');
        assert.ok(!firstName.index, 'firstName field is not index.');

        var age = entity.fields.age;
        assert.isObject(age, 'age field successfully created.');
        assert.equal(age.type,  TEST.fields.age, 'age field has correct type.');
        assert.ok(!age.required,  'age field is not required.');
        assert.ok(!age.index, 'age field is not index.');

        var birthday = entity.fields.birthday;
        assert.isObject(birthday, 'birthday field successfully created.');
        assert.equal(birthday.type,  TEST.fields.birthday, 'birthday field has correct type.');
        assert.ok(!birthday.required,  'birthday field is not required.');
        assert.ok(!birthday.index, 'birthday field is not index.');

    });

    it('transform attributes to data', function() {
        TEST.data = TEST.entity.fromAttributes(TEST.attributes);
        assert.isString(TEST.data.id, 'id has the correct type');
        assert.equal(TEST.data.id, TEST.attributes.id + '', 'id holds the correct data');
        assert.isString(TEST.data.USERNAME, 'USERNAME has the correct type');
        assert.equal(TEST.data.USERNAME, TEST.attributes.sureName, 'USERNAME (sureName) holds the correct data');
        assert.isString(TEST.data.firstName, 'sureName has the correct type');
        assert.equal(TEST.data.firstName, TEST.attributes.firstName, 'firstName holds the correct data');
        assert.isNumber(TEST.data.age, 'age has the correct type');
        assert.equal(TEST.data.age, parseInt(TEST.attributes.age), 'firstName holds the correct data');
        assert.isObject(TEST.data.birthday, 'birthday has the correct type');
        assert.equal(TEST.data.birthday.format('YYYY-MM-DD'), TEST.attributes.birthday, 'birthday holds the correct data');
    });

});
