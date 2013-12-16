describe('M.Controller', function () {

    var instance;

    it('basic', function () {
        assert.isDefined(M.Controller);
        assert.isDefined(M.Controller.design);
        assert.isDefined(M.Controller.create);
        assert.isDefined(M.Controller.extend);

        assert.isFunction(M.Controller.design);
        assert.isFunction(M.Controller.create);
        assert.isFunction(M.Controller.extend);

        instance = M.Controller.create();
        assert.isDefined(instance);
        assert.isObject(instance);
        assert.isDefined(instance._type);
        assert.isString(instance._type);
        assert.equal(instance._type, 'M.Controller');
    });

    it('methods', function () {
        assert.isDefined(instance.set);
        assert.isDefined(instance.get);
        assert.isDefined(instance.show);
        assert.isDefined(instance.applicationStart);
        assert.isDefined(instance.on);
        assert.isDefined(instance.off);
        assert.isDefined(instance.trigger);
        assert.isDefined(instance.apply);

        assert.isFunction(instance.set);
        assert.isFunction(instance.get);
        assert.isFunction(instance.show);
        assert.isFunction(instance.applicationStart);
        assert.isFunction(instance.on);
        assert.isFunction(instance.off);
        assert.isFunction(instance.trigger);
        assert.isFunction(instance.apply);
    });

    it('set value', function() {
        instance.set('a','b');
        assert.equal(instance.a, 'b');
    })  ;

    it('get value', function() {
        assert.equal(instance.get('a'), 'b');
    })

});
