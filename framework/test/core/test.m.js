
describe('M Namespace', function () {
    it('M', function() {
        assert.ok(M, 'M is defined.');
        assert.valueOf(M, 'object', 'M is an object.');
    });

    it('M.Version', function() {
        assert.ok(M.Version && M.hasOwnProperty('Version'), 'M.Version is defined');
        assert.ok(typeof M.Version === 'string', 'M.Version is a string');
        assert.ok(parseInt(M.Version.split('.')[0]) >= 2, 'old TMP version ');
    });

    it('M.f', function() {
        assert.ok(M.f, 'M.f is defined');
        assert.ok(typeof(M.f) === 'function', 'M.f is a function');
    });

    it('YES / NO', function() {
        assert.ok(!NO, 'NO is defined');

        assert.ok(typeof NO === 'boolean', 'NO is a boolean');
        assert.ok(NO === false, 'NO equals false');
        assert.ok(YES, 'YES is defined');

        assert.ok(typeof YES === 'boolean', 'YES is a boolean');
        assert.ok(YES === true, 'YES equals true');
    });
    
    it('locale storage', function () {
    
        var putSomethingToTheLocaleStorage = function () {
            M.Application = M.Application || {};
            M.Application.name = M.Application.name || 'test';
            localStorage.setItem('test0', 'test0');
            localStorage.setItem('test1', 'test1');
            localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'test0', M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'test0');
            localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'test1', M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'test1');
        };
    
        assert.ok(window && window.localStorage, 'localStorage available');
        putSomethingToTheLocaleStorage();
        localStorage.clear('f');
        assert.equal(localStorage.length, 0, 'localStorage is available and the clear function works with the parameter "f"');
    
        putSomethingToTheLocaleStorage();
        localStorage.clear();
        assert.equal(localStorage.length, 0, 'localStorage.clear() is implemented as anticipated in the spec');
    
    });    

});
