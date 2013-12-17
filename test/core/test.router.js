describe('M.Router', function () {

    var instance;

    it('basic', function () {
        assert.isDefined(M.Router);
        assert.isDefined(M.Router.design);
        assert.isDefined(M.Router.create);
        assert.isDefined(M.Router.extend);

        assert.isFunction(M.Router.design);
        assert.isFunction(M.Router.create);
        assert.isFunction(M.Router.extend);

        instance = M.Router.create();
        assert.isDefined(instance);
        assert.isObject(instance);
        assert.isDefined(instance._type);
        assert.isString(instance._type);
        assert.equal(instance._type, 'M.Router');
    });

});