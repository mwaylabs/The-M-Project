describe('M.I18NItem', function () {

    it('M.I18NItem', function () {

        // Basic
        assert.isDefined(M.I18NItem);
        assert.isDefined(M.I18NItem._type);

        assert.isObject(M.I18NItem);
        assert.isString(M.I18NItem._type);
        assert.equal(M.I18NItem._type, 'M.I18NItem');

        // METHODS
        assert.isDefined(M.I18NItem.create);

        assert.isFunction(M.I18NItem.create);

        // PROPERTIES
        assert.isDefined(M.I18NItem.key);
        assert.isDefined(M.I18NItem.placeholder);

        assert.isNull(M.I18NItem.key);
        assert.isNull(M.I18NItem.placeholder);

        // CALLS
        var testItem1 = M.I18NItem.create('test.key');
        assert.equal(testItem1.key, 'test.key');
        assert.isNull(testItem1.placeholder);

        var testItem2 = M.I18NItem.create('test.key {{name}}', {name: 'Tom'});
        assert.equal(testItem2.key, 'test.key {{name}}');
        assert.isObject(testItem2.placeholder);
        assert.equal(testItem2.placeholder.name, 'Tom');

        var testItem3 = M.I18NItem.create();
        assert.isNull(testItem3);
    });

});
