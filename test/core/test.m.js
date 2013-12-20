
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
        assert.isFalse(M.isCollection(M.Controller));
        assert.isFalse(M.isCollection(M.Controller.create()));
        assert.isFalse(M.isCollection(M.Controller.extend().create()));
        assert.isFalse(M.isCollection(M.Controller.extend({_type:''}).create()));

        assert.isFalse(M.isCollection(M.I18NItem.create()));
//        assert.isFalse(M.isCollection(M.I18NItem.extend().create()));
//        assert.isFalse(M.isCollection(M.I18NItem.extend({_type:''}).create()));

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
        assert.isFalse(M.isModel(M.Controller));
        assert.isFalse(M.isModel(M.Controller.create()));
        assert.isFalse(M.isModel(M.Controller.extend().create()));
        assert.isFalse(M.isModel(M.Controller.extend({_type:''}).create()));
        assert.isFalse(M.isModel(M.I18NItem.create()));
//        assert.isFalse(M.isModel(M.I18NItem.extend().create()));
//        assert.isFalse(M.isModel(M.I18NItem.extend({_type:''}).create()));
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
        assert.isFalse(M.isView(M.Controller));
        assert.isFalse(M.isView(M.Controller.create()));
        assert.isFalse(M.isView(M.Controller.extend().create()));
        assert.isFalse(M.isView(M.Controller.extend({_type:''}).create()));

        assert.isFalse(M.isView(M.I18NItem.create()));
//        assert.isFalse(M.isView(M.I18NItem.extend().create()));
//        assert.isFalse(M.isView(M.I18NItem.extend({_type:''}).create()));
    });

    it('M.isController', function () {

        assert.isFalse(M.isController());
        assert.isFalse(M.isController(''));
        assert.isFalse(M.isController(0));
        assert.isFalse(M.isController(1));
        assert.isFalse(M.isController({}));
        assert.isFalse(M.isController([]));
        assert.isFalse(M.isController(M.Collection));
        assert.isFalse(M.isController(M.Collection.create()));
        assert.isFalse(M.isController(M.Collection.extend().create()));
        assert.isFalse(M.isController(M.Model));
        assert.isFalse(M.isController(M.Model.create()));
        assert.isFalse(M.isController(M.Model.extend().create()));
        assert.isFalse(M.isController(M.View));
        assert.isFalse(M.isController(M.View.create()));
        assert.isFalse(M.isController(M.View.extend().create()));
        assert.isFalse(M.isController(M.View.extend({_type:''}).create()));

        assert.isFalse(M.isController(M.I18NItem.create()));
//        assert.isFalse(M.isController(M.I18NItem.extend().create()));
//        assert.isFalse(M.isController(M.I18NItem.extend({_type:''}).create()));

        assert.isFalse(M.isController(M.Controller));
        assert.isTrue(M.isController(M.Controller.create()));
        assert.isTrue(M.isController(M.Controller.extend().create()));
        assert.isTrue(M.isController(M.Controller.extend({_type:''}).create()));

    });

    it('M.isI18NItem', function () {

        assert.isFalse(M.isI18NItem());
        assert.isFalse(M.isI18NItem(''));
        assert.isFalse(M.isI18NItem(0));
        assert.isFalse(M.isI18NItem(1));
        assert.isFalse(M.isI18NItem({}));
        assert.isFalse(M.isI18NItem([]));
        assert.isFalse(M.isI18NItem(M.Collection));
        assert.isFalse(M.isI18NItem(M.Collection.create()));
        assert.isFalse(M.isI18NItem(M.Collection.extend().create()));
        assert.isFalse(M.isI18NItem(M.Model));
        assert.isFalse(M.isI18NItem(M.Model.create()));
        assert.isFalse(M.isI18NItem(M.Model.extend().create()));
        assert.isFalse(M.isI18NItem(M.View));
        assert.isFalse(M.isI18NItem(M.View.create()));
        assert.isFalse(M.isI18NItem(M.View.extend().create()));
        assert.isFalse(M.isI18NItem(M.View.extend({_type:''}).create()));

        assert.isTrue(M.isI18NItem(M.I18NItem));
        //assert.isTrue(M.isI18NItem(M.I18NItem.create()));
        //assert.isTrue(M.isI18NItem(M.isI18NItem.extend().create()));
        //assert.isTrue(M.isI18NItem(M.isI18NItem.extend({_type:''}).create()));

    });

});
