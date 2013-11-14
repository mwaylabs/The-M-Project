describe('M.View', function() {

    it('basic', function() {
        assert.isDefined(M.View);
        assert.isDefined(M.View.design);
        assert.isDefined(M.View.create);
        assert.isDefined(M.View.extend);

        assert.isFunction(M.View);
        assert.isFunction(M.View.design);
        assert.isFunction(M.View.create);
        assert.isFunction(M.View.extend);

        var instance = M.View.create();
        assert.isDefined(instance);
        assert.isObject(instance);
        assert.isDefined(instance._type);
        assert.isString(instance._type);
        assert.equal(instance._type, 'M.View');
        assert.isTrue(Backbone.View.prototype.isPrototypeOf(M.View.create()));
    });

    it('M.View.extend', function() {
        // Basic
        assert.isFunction(M.View.extend);
        assert.isFunction(M.View.extend());
        assert.isFunction(M.View.extend().create);
        assert.isFunction(M.View.extend({}).create);
        assert.isFunction(M.View.extend(undefined));
        assert.isFunction(M.View.extend(null));
        assert.isFunction(M.View.extend([]));
        assert.isFunction(M.View.extend(''));
        assert.isFunction(M.View.extend(1));
    });

    it('M.View.create', function() {
        assert.isFunction(M.View.create);
        assert.isFunction(M.View.extend().create);
        assert.isObject(M.View.extend().create());
        assert.isObject(M.View.extend({}).create());
        assert.isObject(M.View.extend(undefined).create());
        assert.isObject(M.View.extend(null).create());
        assert.isObject(M.View.extend([]).create());
        assert.isObject(M.View.extend('').create());
        assert.isObject(M.View.extend(1).create());
    });

    it('M.View DOM element without empty value container', function() {
        var TEST_STRING = 'TEST';
        var testView = M.View.create();
        assert.isNull(testView.getValue());
        testView.render();
        assert.lengthOf(testView.$el.find('[data-binding]'), 0);

        var testView = M.View.create({
            value: TEST_STRING
        });
        assert.equal(testView.getValue(), TEST_STRING);
        testView.render();
        assert.lengthOf(testView.$el.find('[data-binding]'), 1);
        TEST_STRING = null;
        testView = null;
    });

    it('M.View usage', function() {
        var TEST_ATTR = '__test_attribute__';
        var CHILD = '__test_childview__';
        assert.isTrue(M.View.extend({'__test_attribute__': TEST_ATTR}).create()[TEST_ATTR] === TEST_ATTR);
        assert.isUndefined(M.View.extend([
            {'__mocha_test_attribute__': TEST_ATTR}
        ]).create()[TEST_ATTR]);
        assert.isTrue(M.View.extend({'__test_attribute__': TEST_ATTR}).extend({}).create()[TEST_ATTR] === TEST_ATTR);
        assert.isTrue(M.View.extend({'__test_attribute__': TEST_ATTR}).extend().create()[TEST_ATTR] === TEST_ATTR);
        assert.isTrue(M.View.extend({'__test_attribute__': TEST_ATTR}).extend({}).create()[TEST_ATTR] === TEST_ATTR);
        assert.isTrue(M.View.extend({'__test_attribute__': TEST_ATTR}).extend(null).create()[TEST_ATTR] === TEST_ATTR);
        assert.throws(M.View.extend({'__test_attribute__': TEST_ATTR}).extend({}, {'__test_attribute__': TEST_ATTR}).create, TypeError);
        assert.isString(M.View.extend({'__test_attribute__': TEST_ATTR}).extend({}, {'__test_attribute__': M.View.extend()}).create()[TEST_ATTR]);
        assert.isObject(M.View.extend({'__test_attribute__': TEST_ATTR}).extend({}, {'__test_attribute__': M.View.extend()}).create().childViews[TEST_ATTR]);

        assert.isObject(M.View.extend({}, {'__test_childview__': M.View.extend()}).create().childViews[CHILD]);
        assert.isTrue(M.View.extend({}, {'__test_childview__': M.View.extend()}).create().childViews[CHILD]._type === 'M.View');

        assert.isObject(M.View.extend({}, {'__test_childview__': M.View.extend()}).extend().create().childViews[CHILD]);
        assert.isObject(M.View.extend({}).extend({}, {'__test_childview__': M.View.extend()}).create().childViews[CHILD]);
        assert.isObject(M.View.extend({}, {'__test_childview__': M.View.extend()}).extend({}, {'__test_childview__': M.View.extend()}).create().childViews[CHILD]);
        assert.isUndefined(M.View.extend({}, {'__test_childview__': M.View.extend()}).extend({}, {}).create().childViews[CHILD]);
    });

    it('delegate', function() {
        var clickCount = 0;
        var ClickView = M.View.extend();
        var view = new ClickView();

        view.clickHandler = function() {
            clickCount++;
        };

        var events = {'click': 'clickHandler'};
        view.delegateEvents(events);

        view.$el.trigger('click');
        assert.equal(clickCount, 1);

        view.$el.trigger('click');
        assert.equal(clickCount, 2);

        view.undelegateEvents(events);
        view.$el.trigger('click');
        assert.equal(clickCount, 2);
    });

    it('_getChildView', function() {

        var testView = M.View.extend({}, {
            child1: M.View.extend({value: 'child1'}),
            child2: M.View.extend({value: 'child2'})
        }).create();

        assert.equal(testView._getChildView('child1'), testView.childViews.child1);
        assert.equal(testView._getChildView('child2'), testView.childViews.child2);
        assert.equal(testView._getChildView('child2').getValue(), 'child2');
        assert.equal(testView._getChildView(0), testView.childViews.child1);
        assert.isUndefined(testView._getChildView('0'));
        assert.equal(testView._getChildView(1), testView.childViews.child2);
        assert.isUndefined(testView._getChildView('1'));

        assert.isUndefined(testView._getChildView(10));
        assert.isUndefined(testView._getChildView('10'));

        testView = null;

    });

    it('_getChildView when childs are array', function() {

        var testView = M.View.extend({}, [
                M.View.extend({value: 'child1'}),
                M.View.extend({value: 'child2'})
            ]
        ).create();

        assert.isUndefined(testView._getChildView('child1'), testView.childViews.child1);
        assert.isUndefined(testView._getChildView('child2'), testView.childViews.child2);
        assert.equal(testView._getChildView(0), testView.childViews[0]);
        assert.equal(testView._getChildView('0'),testView.childViews[0]);
        assert.equal(testView._getChildView(1), testView.childViews[1]);
        assert.equal(testView._getChildView('1'), testView.childViews[1]);

        assert.isUndefined(testView._getChildView(10));
        assert.isUndefined(testView._getChildView('10'));

        testView = null;
    });


    it('addChildView array', function() {

        var test = function(testView){
            assert.isTrue(M.isView(testView.childViews[0]));
            assert.isTrue(M.isView(testView.childViews[1]));

            assert.equal(testView.childViews[0].getValue(), 'child3');
            assert.equal(testView.childViews[1].getValue(), 'child4');

            assert.isTrue(M.isView(testView._getChildView(0)));
            assert.isTrue(M.isView(testView._getChildView(1)));

            assert.equal(testView._getChildView(0).getValue(), 'child3');
            assert.equal(testView._getChildView(1).getValue(), 'child4');
        }

        var children = [
            M.View.create({value: 'child3'}),
            M.View.create({value: 'child4'})
        ];

        var testView = M.View.create();
        testView.addChildView(children);
        test(testView);

        var testView = M.View.extend({}).create();
        testView.addChildView(children);
        test(testView);

        var testView = M.View.extend({}, {}).create();
        testView.addChildView(children);
        test(testView);

        var testView = M.View.extend({}, [
            M.View.extend({
                value: 'child1'
            }),
            M.View.extend({
                value: 'child2'
            })
        ]).create();
        testView.addChildView(children);

        assert.isTrue(M.isView(testView.childViews[0]));
        assert.isTrue(M.isView(testView.childViews[1]));
        assert.isTrue(M.isView(testView.childViews[2]));
        assert.isTrue(M.isView(testView.childViews[3]));

        assert.equal(testView.childViews[0].getValue(), 'child1');
        assert.equal(testView.childViews[1].getValue(), 'child1');
        assert.equal(testView.childViews[2].getValue(), 'child3');
        assert.equal(testView.childViews[3].getValue(), 'child4');

        assert.notEqual(testView.childViews[0].getValue(), 'child3');
        assert.notEqual(testView.childViews[1].getValue(), 'child4');

        assert.isTrue(M.isView(testView._getChildView(0)));
        assert.isTrue(M.isView(testView._getChildView(1)));
        assert.isTrue(M.isView(testView._getChildView(2)));
        assert.isTrue(M.isView(testView._getChildView(3)));

        assert.equal(testView._getChildView(0).getValue(), 'child3');
        assert.equal(testView._getChildView(1).getValue(), 'child4');
        assert.equal(testView._getChildView(2).getValue(), 'child3');
        assert.equal(testView._getChildView(3).getValue(), 'child4');

        assert.notEqual(testView._getChildView(0).getValue(), 'child3');
        assert.notEqual(testView._getChildView(1).getValue(), 'child4');

        testView = null;
    });

});
