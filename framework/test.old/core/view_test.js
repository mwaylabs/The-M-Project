// test namespace
TEST = {};

test('M.View', function () {
    ok(M.View, 'M.View is defined.');
    ok(typeof M.View === 'function', 'M.View is an function.');

    var TEST_STRING = 'teststring';

    var TESTVIEW = M.View.create();

    ok(TESTVIEW && TESTVIEW._type === 'M.View', 'type is M.View');
    ok(TESTVIEW.model instanceof Backbone.Model, 'The Testview has the default model');

    TESTVIEW = M.View.create({value: TEST_STRING});
    ok(TESTVIEW.model instanceof Backbone.Model && TESTVIEW.model.get('value') === TEST_STRING, 'The Testview has a model based on value');

    TESTVIEW = M.View.create({value: {v1: TEST_STRING}});
    ok(TESTVIEW.model instanceof Backbone.Model && TESTVIEW.model.get('value').v1 === TEST_STRING, 'The Testview has a model based on a nested object');

    TESTVIEW = M.View.create({value: new Backbone.Model({value: TEST_STRING})});
    ok(TESTVIEW.model instanceof Backbone.Model && TESTVIEW.model.get('value') === TEST_STRING, 'The Testview has a model based on a backbone model');

    TESTVIEW = null;
});

test('M.Button', function () {

    var btn = M.Button.create();

    ok(btn && btn._type === 'M.Button', 'Button is defined and from type M.Button');
    ok(M.View.prototype.isPrototypeOf(btn), 'Button inherits from M.View');
    ok(M.Button.prototype.isPrototypeOf(btn), 'Button inherits from M.Button');

});

//test('locale storage', function () {
//
//    var putSomethingToTheLocaleStorage = function () {
//        M.Application = M.Application || {};
//        M.Application.name = M.Application.name || 'test';
//        localStorage.setItem('test0', 'test0');
//        localStorage.setItem('test1', 'test1');
//        localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'test0', M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'test0');
//        localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'test1', M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'test1');
//    };
//
//    ok(window && window.localStorage, 'localStorage available');
//    putSomethingToTheLocaleStorage();
//    localStorage.clear('f');
//    equal(localStorage.length, 0, 'localStorage is available and the clear function works with the parameter "f"');
//
//    putSomethingToTheLocaleStorage();
//    localStorage.clear();
//    equal(localStorage.length, 0, 'localStorage.clear() is implemented as anticipated in the spec');
//
//});