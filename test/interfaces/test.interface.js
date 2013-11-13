describe('Interface implementation', function() {

    var general = function( testInterface ) {
        assert.isTrue(testInterface._type === 'M.Interface');
        assert.isDefined(testInterface.isMInterface);
        assert.isTrue(testInterface.isMInterface);
        assert.isFunction(testInterface.getInterface);
    }

    it('M.Interface', function() {
        general(M.Interface)
        assert.isUndefined(M.Interface.getInterface());
    });

    it('M.* implements from M.Objects interface', function() {
        assert.isFunction(M.View.create()._addInterfaces);
        assert.isFunction(M.Model.create()._addInterfaces);
        assert.isFunction(M.Collection.create()._addInterfaces);
    });

    it('M.TestInterface', function() {

        assert.isUndefined(TestInterface);
        var TestInterface = M.Interface.design({
            getInterface: function() {
                return YES;
            }
        });
        general(TestInterface);
        assert.isTrue(TestInterface.getInterface());
        TestInterface = null;
    });

    it('M.TestInterface on an TestView', function() {

        assert.isUndefined(TestInterface);
        var TestInterface = M.Interface.design({
            _test_attribute_1: '_test_attribute_1',
            _test_attribute_2: '_test_attribute_2',
            getInterface: function() {
                return {
                    ta1: this._test_attribute_1,
                    ta2: this._test_attribute_2
                };
            }
        });

        general(TestInterface);
        assert.isDefined(TestInterface.getInterface().ta1);
        assert.isDefined(TestInterface.getInterface().ta2);

        var testView = M.View.extend().implements([TestInterface]).create();
        assert.isDefined(testView.ta1);
        assert.isDefined(testView.ta2);
        assert.isTrue(testView.ta1 === '_test_attribute_1');
        assert.isTrue(testView.ta2 === '_test_attribute_2');

        testView = null;
        TestInterface = null;
    });

    it('M.Object.implement', function() {

        var testObject = M.Object.design({
            a: true,
            b: true
        });
        var extendObject = M.Interface.design({
            getInterface: function() {
                return {
                    a: false,
                    b: false,
                    c: true,
                    d: true
                }
            }
        });
        testObject.implement(extendObject);

        assert.isTrue(testObject.a);
        assert.isTrue(testObject.b);
        assert.isTrue(testObject.c);
        assert.isTrue(testObject.d);

    });

    it('Attribute of an interface allready defined', function() {

        assert.isUndefined(TestInterface);
        var TestInterface = M.Interface.design({
            getInterface: function() {
                return {
                    _render: false
                };
            }
        });
        general(TestInterface);
        assert.isDefined(TestInterface.getInterface()._render);
        var testView = M.View.extend();
        testView.implements([TestInterface]);
        var t1 = testView.create();
        assert.isDefined(t1._render);
        assert.isFunction(t1._render);

        t1 = null;
        testView = null;
        TestInterface = null;
    });

    it('Mulitple implements', function() {


        var interfaceA = M.Interface.design({
            getInterface: function() {
                return {
                    c: true,
                    d: true,
                    a: false
                }
            }
        });

        var interfaceB = M.Interface.design({
            getInterface: function() {
                return {
                    e: true,
                    f: true,
                    b: false
                }
            }
        });
        var testView = M.View.extend({
            a: true,
            b: true
        }).implements([interfaceA, interfaceB]).create();

        assert.isTrue(testView.a);
        assert.isTrue(testView.b);
        assert.isTrue(testView.c);
        assert.isTrue(testView.d);
        assert.isTrue(testView.e);
        assert.isTrue(testView.f);
    });


});
