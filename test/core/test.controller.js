describe('M.Controller', function () {

    var ctrlInstance = new M.Controller();

    it('basic', function () {
        assert.isDefined(ctrlInstance);
        assert.isDefined(ctrlInstance._type);

        assert.isObject(ctrlInstance);
        assert.isString(ctrlInstance._type);
        assert.equal(ctrlInstance._type, 'M.Controller');
    });

    it('methods', function () {
        assert.isDefined(ctrlInstance.set);
        assert.isDefined(ctrlInstance.get);
        assert.isDefined(ctrlInstance.show);
        assert.isDefined(ctrlInstance.applicationStart);
        assert.isDefined(ctrlInstance.on);
        assert.isDefined(ctrlInstance.off);
        assert.isDefined(ctrlInstance.trigger);

        assert.isFunction(ctrlInstance.set);
        assert.isFunction(ctrlInstance.get);
        assert.isFunction(ctrlInstance.show);
        assert.isFunction(ctrlInstance.applicationStart);
        assert.isFunction(ctrlInstance.on);
        assert.isFunction(ctrlInstance.off);
        assert.isFunction(ctrlInstance.trigger);
    });

    it('set value', function() {
        ctrlInstance.set('a','b');
        assert.equal(ctrlInstance.a, 'b');
    })


});
