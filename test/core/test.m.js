
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

    it('M.isCollection', function () {

        assert.isFalse(M.isCollection());
        assert.isFalse(M.isCollection(''));
        assert.isFalse(M.isCollection(0));
        assert.isFalse(M.isCollection(1));
        assert.isFalse(M.isCollection({}));
        assert.isFalse(M.isCollection([]));
        assert.isFalse(M.isCollection(M.Collection));
        assert.isTrue(M.isCollection(M.Collection.create()));
        assert.isTrue(M.isCollection(M.Collection.extend().create()));
        assert.isFalse(M.isCollection(M.Model));
        assert.isFalse(M.isCollection(M.Model.create()));
        assert.isFalse(M.isCollection(M.Model.extend().create()));
        assert.isFalse(M.isCollection(M.View));
        assert.isFalse(M.isCollection(M.View.create()));
        assert.isFalse(M.isCollection(M.View.extend().create()));
        assert.isFalse(M.isCollection(M.View.extend({_type:''}).create()));

    });

    it('M.isModel', function () {

        assert.isFalse(M.isModel());
        assert.isFalse(M.isModel(''));
        assert.isFalse(M.isModel(0));
        assert.isFalse(M.isModel(1));
        assert.isFalse(M.isModel({}));
        assert.isFalse(M.isModel([]));
        assert.isFalse(M.isModel(M.Collection));
        assert.isFalse(M.isModel(M.Collection.create()));
        assert.isFalse(M.isModel(M.Collection.extend().create()));
        assert.isFalse(M.isModel(M.Model));
        assert.isTrue(M.isModel(M.Model.create()));
        assert.isTrue(M.isModel(M.Model.extend().create()));
        assert.isFalse(M.isModel(M.View));
        assert.isFalse(M.isModel(M.View.create()));
        assert.isFalse(M.isModel(M.View.extend().create()));
        assert.isFalse(M.isModel(M.View.extend({_type:''}).create()));

    });



    it('M.isView', function () {

        assert.isFalse(M.isView());
        assert.isFalse(M.isView(''));
        assert.isFalse(M.isView(0));
        assert.isFalse(M.isView(1));
        assert.isFalse(M.isView({}));
        assert.isFalse(M.isView([]));
        assert.isFalse(M.isView(M.Collection));
        assert.isFalse(M.isView(M.Collection.create()));
        assert.isFalse(M.isView(M.Collection.extend().create()));
        assert.isFalse(M.isView(M.Model));
        assert.isFalse(M.isView(M.Model.create()));
        assert.isFalse(M.isView(M.Model.extend().create()));
        assert.isFalse(M.isView(M.View));
        assert.isTrue(M.isView(M.View.create()));
        assert.isTrue(M.isView(M.View.extend().create()));
        assert.isTrue(M.isView(M.View.extend({_type:''}).create()));

    });

});
