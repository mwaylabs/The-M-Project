describe('M.Object', function () {

    it('basic', function () {
        assert.isDefined(M.Object);
        assert.isDefined(M.Object._type);

        assert.isObject(M.Object);
        assert.isString(M.Object._type);
        assert.equal(M.Object._type, 'M.Object');
    });

    it('properties', function () {
        assert.isDefined(M.Object._implementedInterfaces);

        assert.isNull(M.Object._implementedInterfaces);
    });

    it('methods', function () {
        assert.isDefined(M.Object._create);
        assert.isDefined(M.Object.include);
        assert.isDefined(M.Object.design);
        assert.isDefined(M.Object.implement);
        assert.isDefined(M.Object.hasInterfaceImplementation);
        assert.isDefined(M.Object._create);
        assert.isDefined(M.Object.bindToCaller);
        assert.isDefined(M.Object._init);
        assert.isDefined(M.Object._normalize);
        assert.isDefined(M.Object.handleCallback);
        assert.isDefined(M.Object.getObjectType);

        assert.isFunction(M.Object._create);
        assert.isFunction(M.Object.include);
        assert.isFunction(M.Object.design);
        assert.isFunction(M.Object.implement);
        assert.isFunction(M.Object.hasInterfaceImplementation);
        assert.isFunction(M.Object.bindToCaller);
        assert.isFunction(M.Object._init);
        assert.isFunction(M.Object._normalize);
        assert.isFunction(M.Object.handleCallback);
        assert.isFunction(M.Object.getObjectType);

    });

    it('implement function: _implementedInterfaces are not different for instances', function () {

        var testInterface = M.Interface.design({
            _type: 'test',
            getInterface: function() {
                return {
                    testinterfaceImplementation: 'testinterfaceImplementation'
                };
            }
        });
        var TestView = M.View.extend().implements([testInterface]);
        var v1 = TestView.create();
        var interfaceCountV1 = v1._implementedInterfaces.length;
        var v2 = TestView.create();
        var interfaceCountV2 = v2._implementedInterfaces.length;
        assert.equal(interfaceCountV1, interfaceCountV2);
        assert.equal(v1._implementedInterfaces[interfaceCountV1], v2._implementedInterfaces[interfaceCountV2]);

    });

});
