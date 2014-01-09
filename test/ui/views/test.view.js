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
        assert.lengthOf(testView.$el.find('div'), 1);
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
        assert.equal(testView._getChildView('0'), testView.childViews.child1);
        assert.equal(testView._getChildView(1), testView.childViews.child2);
        assert.equal(testView._getChildView('1'), testView.childViews.child2);

        assert.isUndefined(testView._getChildView(10));
        assert.isUndefined(testView._getChildView('10'));

        testView = null;

    });

    it('_getChildView when childs are array', function() {

        var testView = M.View.extend({}, [
            M.View.extend({value: 'child1'}), M.View.extend({value: 'child2'})
        ]).create();

        assert.isUndefined(testView._getChildView('child1'), testView.childViews.child1);
        assert.isUndefined(testView._getChildView('child2'), testView.childViews.child2);
        assert.equal(testView._getChildView(0), testView.childViews[0]);
        assert.equal(testView._getChildView('0'), testView.childViews[0]);
        assert.equal(testView._getChildView(1), testView.childViews[1]);
        assert.equal(testView._getChildView('1'), testView.childViews[1]);

        assert.isUndefined(testView._getChildView(10));
        assert.isUndefined(testView._getChildView('10'));

        testView = null;
    });


    it('addChildView object', function() {

        var test = function( testView ) {

            assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[0]]));
            assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[1]]));

            assert.equal(testView.childViews[Object.keys(testView.childViews)[0]].getValue(), 'child3');
            assert.equal(testView.childViews[Object.keys(testView.childViews)[1]].getValue(), 'child4');

            assert.isTrue(M.isView(testView._getChildView(0)));
            assert.isTrue(M.isView(testView._getChildView(1)));

            assert.equal(testView._getChildView(0).getValue(), 'child3');
            assert.equal(testView._getChildView(1).getValue(), 'child4');
        }

        var children = {
            b3: M.View.create({value: 'child3'}),
            b4: M.View.create({value: 'child4'})
        };

        var testView = M.View.create();
        testView.addChildView(children);
        test(testView);

        var testView = M.View.extend({}).create();
        testView.addChildView(children);
        test(testView);

        var testView = M.View.extend({}, {}).create();
        testView.addChildView(children);
        test(testView);


        var testView = M.View.extend({}, {
            b1: M.View.extend({
                value: 'child1'
            }),
            b2: M.View.extend({
                value: 'child2'
            })
        }).create();

        testView.addChildView(children);

        assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[0]]));
        assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[1]]));
        assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[2]]));
        assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[3]]));

        assert.equal(testView.childViews[Object.keys(testView.childViews)[0]].getValue(), 'child1');
        assert.equal(testView.childViews[Object.keys(testView.childViews)[1]].getValue(), 'child2');
        assert.equal(testView.childViews[Object.keys(testView.childViews)[2]].getValue(), 'child3');
        assert.equal(testView.childViews[Object.keys(testView.childViews)[3]].getValue(), 'child4');

        assert.notEqual(testView.childViews[Object.keys(testView.childViews)[0]].getValue(), 'child3');
        assert.notEqual(testView.childViews[Object.keys(testView.childViews)[1]].getValue(), 'child4');

        assert.isTrue(M.isView(testView._getChildView(0)));
        assert.isTrue(M.isView(testView._getChildView(1)));
        assert.isTrue(M.isView(testView._getChildView(2)));
        assert.isTrue(M.isView(testView._getChildView(3)));

        assert.equal(testView._getChildView(0).getValue(), 'child1');
        assert.equal(testView._getChildView(1).getValue(), 'child2');
        assert.equal(testView._getChildView(2).getValue(), 'child3');
        assert.equal(testView._getChildView(3).getValue(), 'child4');

        assert.notEqual(testView._getChildView(0).getValue(), 'child3');
        assert.notEqual(testView._getChildView(1).getValue(), 'child4');

        //---

        assert.isTrue(M.isView(testView._getChildView('0')));
        assert.isTrue(M.isView(testView._getChildView('1')));
        assert.isTrue(M.isView(testView._getChildView('2')));
        assert.isTrue(M.isView(testView._getChildView('3')));

        assert.equal(testView._getChildView('0').getValue(), 'child1');
        assert.equal(testView._getChildView('1').getValue(), 'child2');
        assert.equal(testView._getChildView('2').getValue(), 'child3');
        assert.equal(testView._getChildView('3').getValue(), 'child4');

        assert.notEqual(testView._getChildView('0').getValue(), 'child3');
        assert.notEqual(testView._getChildView('1').getValue(), 'child4');

        testView = null;
    });

    it('_mergeChildView', function() {

        var Test = M.View.extend({}, {
            b1: M.View.extend({
                value: 'child1'
            }),
            b2: M.View.extend({
                value: 'child2'
            })
        });

        var testView = Test.create();

        var childView = M.View.create({value: 'child3'});

        testView = Test.create();
        testView._mergeChildView();
        assert.isObject(testView.childViews.b1);
        assert.isObject(testView.childViews.b2);

        testView = Test.create();
        testView._mergeChildView(null, null);
        assert.isObject(testView.childViews.b1);
        assert.isObject(testView.childViews.b2);

        testView = Test.create();
        testView._mergeChildView('asdf', 'asdf');
        assert.isObject(testView.childViews.b1);
        assert.isObject(testView.childViews.b2);

        testView = Test.create();
        testView._mergeChildView('b1');
        assert.isObject(testView.childViews.b1);
        assert.isObject(testView.childViews.b2);

        testView = Test.create();
        testView._mergeChildView('b1', childView);
        assert.isArray(testView.childViews.b1);
        assert.isObject(testView.childViews.b2);

        testView = null;
        childView = null;

    });

    it('addChildView object when selector is already taken', function() {

        var children = {
            b1: M.View.create({value: 'child3'}),
            b2: M.View.create({value: 'child4'})
        };
        var testView = M.View.extend({}, {
            b1: M.View.extend({
                value: 'child1'
            }),
            b2: M.View.extend({
                value: 'child2'
            })
        }).create();

        testView.addChildView(children);

        assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[0]][0]));
        assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[0]][1]));
        assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[1]][0]));
        assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[1]][1]));

        assert.equal(testView.childViews[Object.keys(testView.childViews)[0]][0].getValue(), 'child1');
        assert.equal(testView.childViews[Object.keys(testView.childViews)[0]][1].getValue(), 'child3');
        assert.equal(testView.childViews[Object.keys(testView.childViews)[1]][0].getValue(), 'child2');
        assert.equal(testView.childViews[Object.keys(testView.childViews)[1]][1].getValue(), 'child4');

        assert.equal(testView._getChildView(0)[0].getValue(), 'child1');
        assert.equal(testView._getChildView(0)[1].getValue(), 'child3');
        assert.equal(testView._getChildView(1)[0].getValue(), 'child2');
        assert.equal(testView._getChildView(1)[1].getValue(), 'child4');


        assert.isTrue(M.isView(testView._getChildView('0')[0]));
        assert.isTrue(M.isView(testView._getChildView('0')[1]));
        assert.isTrue(M.isView(testView._getChildView('1')[0]));
        assert.isTrue(M.isView(testView._getChildView('1')[1]));

        assert.equal(testView._getChildView('0')[0].getValue(), 'child1');
        assert.equal(testView._getChildView('0')[1].getValue(), 'child3');
        assert.equal(testView._getChildView('1')[0].getValue(), 'child2');
        assert.equal(testView._getChildView('1')[1].getValue(), 'child4');

        testView = null;
    });

    it('_getInternationalizedTemplateValue', function() {

        var testView = M.View.create();

        assert.equal(testView._getInternationalizedTemplateValue(), '');
        assert.equal(testView._getInternationalizedTemplateValue(''), '');
        assert.equal(testView._getInternationalizedTemplateValue('a'), 'a');
        assert.equal(testView._getInternationalizedTemplateValue('a'), 'a');

        var localeStyle1 = {
            "global": {
                "button": {
                    "save": "Save document",
                    "emptyTrash": "Empty Trash ({{count}})"
                },
                "error": {
                    "permissionDenied": "Permission denied"
                }
            }
        }

        M.I18N._setDictionary(localeStyle1);
        assert.equal(testView._getInternationalizedTemplateValue(M.I18N.l('global.button.save')), 'Save document');
        assert.equal(testView._getInternationalizedTemplateValue(M.I18N.l('global.button.emptyTrash', {count: 5})), 'Empty Trash (5)');
        assert.equal(testView._getInternationalizedTemplateValue(M.I18N.l('global.error.permissionDenied')), 'Permission denied');
        testView = null;
    });

    it('_addClassNames', function() {

        var testView = M.View.extend({}).create().render();
        assert.isTrue(testView.$el.hasClass('view'));
        var testView = M.View.extend({
            cssClass: 'a'
        }).create().render();
        assert.isTrue(testView.$el.hasClass('view'));
        assert.isTrue(testView.$el.hasClass('a'));
        var testView = M.View.extend({
            cssClass: 'a b'
        }).create().render();
        assert.isTrue(testView.$el.hasClass('view'));
        assert.isTrue(testView.$el.hasClass('a'));
        assert.isTrue(testView.$el.hasClass('b'));

        var testView = M.View.extend({
            cssClass: 'a b',
            _internalCssClasses: 'c d e'
        }).create().render();
        assert.isTrue(testView.$el.hasClass('view'));
        assert.isTrue(testView.$el.hasClass('a'));
        assert.isTrue(testView.$el.hasClass('b'));
        assert.isTrue(testView.$el.hasClass('c'));
        assert.isTrue(testView.$el.hasClass('d'));
        assert.isTrue(testView.$el.hasClass('e'));
    });

    it('_addClassNames with custom _type', function() {

        var testView = M.ButtonView.extend().create().render();
        assert.isTrue(testView.$el.hasClass('buttonview'));

        var testView = M.ButtonView.extend({
            _type: 'MyButtonView'
        }).create().render();

        assert.isTrue(testView.$el.hasClass('MyButtonView'));
    });

    it('_getViewCssClassName', function() {

        var testView = M.View.extend().create();
        assert.equal(testView._getViewCssClassName(), 'view');
        testView._type = '';
        assert.equal(testView._getViewCssClassName(), '');
        testView._type = 'a';
        assert.equal(testView._getViewCssClassName(), 'a');
        testView._type = 'ä';
        assert.equal(testView._getViewCssClassName(), 'ä');
        testView._type = '0';
        assert.equal(testView._getViewCssClassName(), '0');
        testView._type = 0;
        assert.equal(testView._getViewCssClassName(), '0');
        testView._type = 10;
        assert.equal(testView._getViewCssClassName(), '10');
        testView._type = {};
        assert.equal(testView._getViewCssClassName(), '');
        testView._type = [];
        assert.equal(testView._getViewCssClassName(), '');
        testView._type = 'M.QWERTY';
        assert.equal(testView._getViewCssClassName(), 'qwerty');
        testView._type = 'AM.QWERTY';
        assert.equal(testView._getViewCssClassName(), '');
        testView._type = 'AM.QWE.RTY';
        assert.equal(testView._getViewCssClassName(), '');
        testView._type = 'A M.QWE.RT Y';
        assert.equal(testView._getViewCssClassName(), '');
        testView._type = ' M.QWERTY';
        assert.equal(testView._getViewCssClassName(), '');
        testView._type = 'M .QWERTY';
        assert.equal(testView._getViewCssClassName(), '');
        testView._type = 'M. QWERTY';
        assert.equal(testView._getViewCssClassName(), '');
        testView._type = ' ';
        assert.equal(testView._getViewCssClassName(), '');
        testView._type = '.';
        assert.equal(testView._getViewCssClassName(), '');
    });

    it.skip('setChildView', function() {
        var test = function( testView ) {

            assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[0]]));
            assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[1]]));

            assert.equal(testView.childViews[Object.keys(testView.childViews)[0]].getValue(), 'child3');
            assert.equal(testView.childViews[Object.keys(testView.childViews)[1]].getValue(), 'child4');

            assert.isTrue(M.isView(testView._getChildView(0)));
            assert.isTrue(M.isView(testView._getChildView(1)));

            assert.equal(testView._getChildView(0).getValue(), 'child3');
            assert.equal(testView._getChildView(1).getValue(), 'child4');
        }

        var children = {
            b3: M.View.create({value: 'child3'}),
            b4: M.View.create({value: 'child4'})
        };

        var testView = M.View.create();
        testView.setChildView(children);
        test(testView);

        var testView = M.View.extend({}).create();
        testView.setChildView(children);
        test(testView);

        var testView = M.View.extend({}, {}).create();
        testView.setChildView(children);
        test(testView);


        var testView = M.View.extend({}, {
            b1: M.View.extend({
                value: 'child1'
            }),
            b2: M.View.extend({
                value: 'child2'
            })
        }).create();

        testView.setChildView(children);

        assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[0]]));
        assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[1]]));
        assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[2]]));
        assert.isTrue(M.isView(testView.childViews[Object.keys(testView.childViews)[3]]));

        assert.equal(testView.childViews[Object.keys(testView.childViews)[0]].getValue(), 'child1');
        assert.equal(testView.childViews[Object.keys(testView.childViews)[1]].getValue(), 'child2');
        assert.equal(testView.childViews[Object.keys(testView.childViews)[2]].getValue(), 'child3');
        assert.equal(testView.childViews[Object.keys(testView.childViews)[3]].getValue(), 'child4');

        assert.notEqual(testView.childViews[Object.keys(testView.childViews)[0]].getValue(), 'child3');
        assert.notEqual(testView.childViews[Object.keys(testView.childViews)[1]].getValue(), 'child4');

        assert.isTrue(M.isView(testView._getChildView(0)));
        assert.isTrue(M.isView(testView._getChildView(1)));
        assert.isTrue(M.isView(testView._getChildView(2)));
        assert.isTrue(M.isView(testView._getChildView(3)));

        assert.equal(testView._getChildView(0).getValue(), 'child1');
        assert.equal(testView._getChildView(1).getValue(), 'child2');
        assert.equal(testView._getChildView(2).getValue(), 'child3');
        assert.equal(testView._getChildView(3).getValue(), 'child4');

        assert.notEqual(testView._getChildView(0).getValue(), 'child3');
        assert.notEqual(testView._getChildView(1).getValue(), 'child4');

        //---

        assert.isTrue(M.isView(testView._getChildView('0')));
        assert.isTrue(M.isView(testView._getChildView('1')));
        assert.isTrue(M.isView(testView._getChildView('2')));
        assert.isTrue(M.isView(testView._getChildView('3')));

        assert.equal(testView._getChildView('0').getValue(), 'child1');
        assert.equal(testView._getChildView('1').getValue(), 'child2');
        assert.equal(testView._getChildView('2').getValue(), 'child3');
        assert.equal(testView._getChildView('3').getValue(), 'child4');

        assert.notEqual(testView._getChildView('0').getValue(), 'child3');
        assert.notEqual(testView._getChildView('1').getValue(), 'child4');

        testView = null;


    });

    it('assignTemplateValues', function() {
        var TESTVALUE = 'testvalue';
        var testView = M.View.extend({}).create({value: TESTVALUE});
        testView.render();
        testView._templateValues;
        var _templateValues = JSON.parse(JSON.stringify(testView._templateValues));
        assert.isDefined(testView._templateValues);
        assert.deepEqual(_templateValues, testView._templateValues);
        assert.isNull(testView.assignTemplateValues());

        var testProperties = {
            a: 'a',
            b: 'b'
        }

        testView.assignTemplateValues = function() {
            return testProperties;
        }

        testView._assignTemplateValues();
        assert.notEqual(_templateValues, testView._templateValues);
        assert.isDefined(testView._templateValues.a);
        assert.isDefined(testView._templateValues.b);
        assert.isDefined(testView._templateValues._value);
        assert.equal(testView._templateValues.a, 'a');
        assert.equal(testView._templateValues.b, 'b');
        assert.equal(testView._templateValues._value, TESTVALUE);


        var testView = M.View.extend({
            assignTemplateValues: function() {
                return testProperties;
            }
        }).create({
                value: TESTVALUE
            });

        assert.isDefined(testView._templateValues.a);
        assert.isDefined(testView._templateValues.b);
        assert.isDefined(testView._templateValues._value);
        assert.equal(testView._templateValues.a, 'a');
        assert.equal(testView._templateValues.b, 'b');
        assert.equal(testView._templateValues._value, TESTVALUE);


        var testView = M.View.extend({
            assignTemplateValues: function() {
                return testProperties;
            }
        }).create({
                value: {
                    a: 'xxxx'
                }
            });

        assert.isDefined(testView._templateValues.a);
        assert.isDefined(testView._templateValues.b);
        assert.isUndefined(testView._templateValues._value);
        assert.equal(testView._templateValues.a, 'a');
        assert.equal(testView._templateValues.b, 'b');

        assert.equal(testView.getValue().a, 'xxxx');

        var testView = M.View.extend({
            assignTemplateValues: function() {
                return testProperties;
            }
        }).create({
                value: {
                    c: 'xxxx'
                }
            });

        assert.isDefined(testView._templateValues.a);
        assert.isDefined(testView._templateValues.b);
        assert.isDefined(testView._templateValues.c);
        assert.equal(testView._templateValues.a, 'a');
        assert.equal(testView._templateValues.b, 'b');
        assert.equal(testView._templateValues.c, 'xxxx');

        assert.equal(testView.getValue().c, 'xxxx');

    });


    it('_reactOnLocaleChanged', function(){

        var testView = M.View.create();

        assert.isFalse(testView._reactOnLocaleChanged());

    });

    it('template attribute', function(){

        var testView = M.View.extend().create().render();
        assert.equal(testView._template(), _.tmpl(M.TemplateManager.get('view.ejs'), null, {useStickitAttribute: false})());

        var spanTemplate = '<span></span>';
        var testView = M.View.extend({
            template: spanTemplate
        }).create().render();
        assert.equal(testView._template(), _.tmpl(spanTemplate, null, {useStickitAttribute: false})());

        var emptyTemplate = '';
        var testView = M.View.extend({
            template: emptyTemplate
        }).create().render();
        assert.equal(testView._template(), _.tmpl(emptyTemplate, null, {useStickitAttribute: false})());
    });


    it('Parent View', function(){


        var parent = M.View.extend({

        }, {
            c1: M.View.extend({

            }, {
                c11: M.View.extend({

                }, {
                    c111: M.View.extend({

                    })
                })
            })
        }).create();

        assert.equal(parent.childViews.c1._parentView.cid, parent.cid);
        assert.equal(parent.childViews.c1.childViews.c11._parentView._parentView.cid, parent.cid);
        assert.equal(parent.childViews.c1.childViews.c11.childViews.c111._parentView._parentView._parentView.cid, parent.cid);

        assert.equal(parent.childViews.c1.getParent().cid, parent.cid);
        assert.equal(parent.childViews.c1.childViews.c11.getParent().getParent().cid, parent.cid);
        assert.equal(parent.childViews.c1.childViews.c11.childViews.c111.getParent().getParent().getParent().cid, parent.cid);

        assert.deepEqual(parent.childViews.c1._parentView, parent);
        assert.deepEqual(parent.childViews.c1.childViews.c11._parentView._parentView, parent);
        assert.deepEqual(parent.childViews.c1.childViews.c11.childViews.c111._parentView._parentView._parentView, parent);

        assert.deepEqual(parent.childViews.c1.getParent(), parent);
        assert.deepEqual(parent.childViews.c1.childViews.c11.getParent().getParent(), parent);
        assert.deepEqual(parent.childViews.c1.childViews.c11.childViews.c111.getParent().getParent().getParent(), parent);

        assert.deepEqual(parent.childViews.c1.childViews.c11.getParent(), parent.childViews.c1);
        assert.deepEqual(parent.childViews.c1.childViews.c11.childViews.c111.getParent(), parent.childViews.c1.childViews.c11);

    });

});
