// test namespace
TEST = {};

test('M Namespace', function () {
    ok(M, 'M is defined.');
    ok(typeof M === 'object', 'M is an object.');

    ok(M.Version && M.hasOwnProperty('Version'), 'M.Version is defined');
    ok(typeof M.Version === 'string', 'M.Version is a string');
    ok(parseInt(M.Version.split('.')[0]) >= 2, 'old TMP version ');

    ok(M.f, 'M.f is defined');
    ok(typeof(M.f) === 'function', 'M.f is a function');

    ok(!NO, 'NO is defined');

    ok(typeof NO === 'boolean', 'NO is a boolean');
    ok(NO === false, 'NO equals false');
    ok(YES, 'YES is defined');

    ok(typeof YES === 'boolean', 'YES is a boolean');
    ok(YES === true, 'YES equals true');
});

test('locale storage', function () {

    var putSomethingToTheLocaleStorage = function () {
        M.Application = M.Application || {};
        M.Application.name = M.Application.name || 'test';
        localStorage.setItem('test0', 'test0');
        localStorage.setItem('test1', 'test1');
        localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'test0', M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'test0');
        localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'test1', M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'test1');
    };

    ok(window && window.localStorage, 'localStorage available');
    putSomethingToTheLocaleStorage();
    localStorage.clear('f');
    equal(localStorage.length, 0, 'localStorage is available and the clear function works with the parameter "f"');

    putSomethingToTheLocaleStorage();
    localStorage.clear();
    equal(localStorage.length, 0, 'localStorage.clear() is implemented as anticipated in the spec');

});