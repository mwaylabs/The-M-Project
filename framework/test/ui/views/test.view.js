describe('M.View', function () {

    it('M.View general', function () {

        // Basic
        assert.isDefined(M.View);
        assert.isFunction(M.View);
        assert.isTrue(Backbone.View.prototype.isPrototypeOf(M.View.create()));

    });

    it('M.View.extend', function () {
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

    it('M.View.create', function () {
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

    it('M.View usage', function(){
        var TEST_ATTR = '__test_attribute__';
        var CHILD = '__test_childview__';
        assert.isTrue(M.View.extend({'__test_attribute__' : TEST_ATTR}).create()[TEST_ATTR] === TEST_ATTR);
        assert.isUndefined(M.View.extend([{'__mocha_test_attribute__':TEST_ATTR}]).create()[TEST_ATTR]);
        assert.isTrue(M.View.extend({'__test_attribute__' : TEST_ATTR}).extend({}).create()[TEST_ATTR] === TEST_ATTR);
        assert.isTrue(M.View.extend({'__test_attribute__' : TEST_ATTR}).extend().create()[TEST_ATTR] === TEST_ATTR);
        assert.isTrue(M.View.extend({'__test_attribute__' : TEST_ATTR}).extend({}).create()[TEST_ATTR] === TEST_ATTR);
        assert.isTrue(M.View.extend({'__test_attribute__' : TEST_ATTR}).extend(null).create()[TEST_ATTR] === TEST_ATTR);
        assert.throws(M.View.extend({'__test_attribute__' : TEST_ATTR}).extend({}, {'__test_attribute__' : TEST_ATTR}).create, TypeError);
        assert.isString(M.View.extend({'__test_attribute__' : TEST_ATTR}).extend({}, {'__test_attribute__' : M.View.extend()}).create()[TEST_ATTR]);
        assert.isObject(M.View.extend({'__test_attribute__' : TEST_ATTR}).extend({}, {'__test_attribute__' : M.View.extend()}).create().childViews[TEST_ATTR]);

        assert.isObject(M.View.extend({},{'__test_childview__': M.View.extend()}).create().childViews[CHILD]);
        assert.isTrue(M.View.extend({},{'__test_childview__': M.View.extend()}).create().childViews[CHILD]._type === 'M.View');

        assert.isObject(M.View.extend({},{'__test_childview__': M.View.extend()}).extend().create().childViews[CHILD]);
        assert.isObject(M.View.extend({}).extend({},{'__test_childview__': M.View.extend()}).create().childViews[CHILD]);
        assert.isObject(M.View.extend({},{'__test_childview__': M.View.extend()}).extend({},{'__test_childview__': M.View.extend()}).create().childViews[CHILD]);
        assert.isUndefined(M.View.extend({},{'__test_childview__': M.View.extend()}).extend({},{}).create().childViews[CHILD]);
    });

    it.skip('events', function () {
        var clickCount = 0;
        var ClickView = M.View.extend({
            events: {
                click: function() {
                    clickCount++;
                }
            }
        });
        var view = new ClickView();
        view.$el.trigger('click');
        assert.equal(clickCount, 1);

        view.$el.trigger('click');
        assert.equal(clickCount, 2);
    });

    it('delegate', function () {
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
    })

//    M.View.extend = function( options, childViews ) {
//        options = options || {};
//        options._childViews = childViews || {};
//        return Backbone.View.extend.apply(this, [options]);
//    };

});
