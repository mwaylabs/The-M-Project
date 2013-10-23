test('M.View Test', function() {

    ok(M.hasOwnProperty('View'), 'M.View is defined.');

    ok(M.View.getObjectType() === 'M.View', 'The type of M.View is M.View.');

    ok(M.View.hasOwnProperty('_dom') && typeof M.View._dom === 'object', 'M.View has _dom property.');

    ok(M.View.hasOwnProperty('_id'), 'M.View has _id property.');

    ok(M.View.hasOwnProperty('isMView') && typeof M.View.isMView === 'boolean', 'M.View has isMView property.');

    ok(M.View.hasOwnProperty('isMView') && typeof M.View.isMView === 'boolean' && M.View.isMView === YES, 'M.View isMView is true.');

    ok(M.View.hasOwnProperty('cssClass'), 'M.View has cssClass property.');

    ok(M.View.hasOwnProperty('value'), 'M.View has value property.');

    ok(M.View.hasOwnProperty('design') && typeof M.View.design === 'function', 'design function is defined.');

    var view = M.View.design();

    ok(view && view.getObjectType() === 'M.View', 'design() returns an instance of M.View.');

    ok(view && view._id, 'design() did set the view\'s _id property');

    ok(M.View.hasOwnProperty('_normalize') && typeof M.View._normalize === 'function', '_normalize function is defined.');

    ok(typeof(M.View._normalize()) === 'object', '_normalize() returns an object, even if it was called without params.');

    ok(M.View.hasOwnProperty('_init') && typeof M.View.design === 'function', '_init function is defined.');

    ok(M.View.hasOwnProperty('_preRender') && typeof M.View.design === 'function', '_preRender function is defined.');

    var updatedValue = 'Updated in preRender';
    view = M.View.design({
        value: 'hi dom',
        events: {
            preRender: function() {
                    this.value = updatedValue;
            },
            postRender: {
                action: function() {
                    M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_UI, 'my post render callback!');
                }
            }
        }
    });
    var viewDOM = view.render();

    ok(view && view.value === updatedValue, '_preRender was called and updated the view\'s value.');

    ok(viewDOM && viewDOM.text() === updatedValue, '_preRender was called before the actual rendering/markup generation.');

    ok(M.View.hasOwnProperty('_postRender') && typeof M.View.design === 'function', '_postRender function is defined.');

    ok(M.View.hasOwnProperty('_createDOM') && typeof M.View.design === 'function', '_createDOM function is defined.');

    ok(M.View.hasOwnProperty('_generateMarkup') && typeof M.View.design === 'function', '_generateMarkup function is defined.');

    ok(M.View.hasOwnProperty('_addId') && typeof M.View.design === 'function', '_addId function is defined.');

    ok(M.View.hasOwnProperty('getId') && typeof M.View.design === 'function', 'getId function is defined.');

    ok(M.View.hasOwnProperty('_addTMPClasses') && typeof M.View.design === 'function', '_addTMPClasses function is defined.');

    ok(M.View.hasOwnProperty('_getTMPClasses') && typeof M.View.design === 'function', '_getTMPClasses function is defined.');

    ok(M.View.hasOwnProperty('_getCssClassByType') && typeof M.View.design === 'function', '_getCssClassByType function is defined.');

    ok(M.View.hasOwnProperty('_renderChildViews') && typeof M.View.design === 'function', '_renderChildViews function is defined.');

    ok(M.View.hasOwnProperty('_appendChildView') && typeof M.View.design === 'function', '_appendChildView function is defined.');

    ok(M.View.hasOwnProperty('_getChildViewsAsArray') && typeof M.View.design === 'function', '_getChildViewsAsArray function is defined.');

    ok(M.View.hasOwnProperty('_style') && typeof M.View.design === 'function', '_style function is defined.');

    ok(M.View.hasOwnProperty('getDOM') && typeof M.View.design === 'function', 'getDOM function is defined.');

    ok(M.View.hasOwnProperty('render') && typeof M.View.design === 'function', 'render function is defined.');

    ok(M.View.hasOwnProperty('getValue') && typeof M.View.design === 'function', 'getValue function is defined.');

    ok(M.View.hasOwnProperty('_getValueFromDOM') && typeof M.View.design === 'function', '_getValueFromDOM function is defined.');

    ok(M.View.hasOwnProperty('setValue') && typeof M.View.design === 'function', 'setValue function is defined.');

    ok(M.View.hasOwnProperty('_getValueForDOM') && typeof M.View.design === 'function', '_getValueForDOM function is defined.');

    ok(M.View.hasOwnProperty('update') && typeof M.View.design === 'function', 'update function is defined.');

    ok(M.View.hasOwnProperty('theme') && typeof M.View.design === 'function', 'theme function is defined.');

    ok(M.View.hasOwnProperty('_themeChildViews') && typeof M.View.design === 'function', '_themeChildViews function is defined.');

    /* cleanup */
    view = null;

//    var renderString = M.View.render();
//
//    ok(typeof renderString === 'string', '_render returns a string.');
//
//    M.Test = M.View.extend({
//        postRender: function(){
//            ok(true, 'postRender was called in the render process.');
//        },
//
//        preRender: function(){
//            ok(true, 'preRender was called in the render process.');
//        }
//    });
//
//    M.Test.render();
//
//    ok(M.View.hasOwnProperty('_theme')  && typeof M.View._theme === 'function', '_theme function is defined.');
//
//    ok(M.View.hasOwnProperty('_registerEvents') && typeof M.View._registerEvents === 'function', '_registerEvents function is defined.');
//
//    ok(M.View.hasOwnProperty('_renderUpdate') && typeof M.View._renderUpdate === 'function', '_renderUpdate function is defined.');
//
//    ok(M.View.hasOwnProperty('preRender') && typeof M.View.preRender === 'function', 'preRender function is defined.');
//
//    ok(M.View.hasOwnProperty('postRender') && typeof M.View.postRender === 'function', 'postRender function is defined.');
//
//    ok(M.View.hasOwnProperty('design') && typeof M.View.design === 'function', 'design function is defined.');
//
//    ok(M.View.hasOwnProperty('_type') && typeof M.View._type === 'string' && M.View.type === 'M.View', 'M.View._type is part of M.View.');
//
//    ok(M.View.hasOwnProperty('_isView') && typeof M.View._isView === 'boolean', 'M.View has the boolean _isView.');
//
//    ok(M.View.hasOwnProperty('isView') && typeof M.View.isView === 'function', 'M.View has getter isView.');
//
//    ok(M.View.hasOwnProperty('_value') && typeof M.View._value === 'object', 'M.View has the object _value.');
//
//    ok(M.View.hasOwnProperty('cssClass') && typeof M.View.cssClass === 'string', 'M.View has the string cssClass.');
//
//    ok(M.View.hasOwnProperty('getValue') && typeof M.View.getValue === 'function', 'M.View has getter getValue.');
//
//    ok(M.View.hasOwnProperty('getValues') && typeof M.View.getValues === 'function', 'M.View has getter getValues.');
//
//    ok(M.View.hasOwnProperty('setValue') && typeof M.View.setValue === 'function', 'M.View has setter setValue.');
//
//    ok(M.View.hasOwnProperty('clearValue') && typeof M.View.clearValue === 'function', 'M.View has the function clearValue.');
//
//    ok(M.View.hasOwnProperty('clearValues') && typeof M.View.clearValues === 'function', 'M.View has the function clearValues.');
//
//    ok(M.View.hasOwnProperty('_computedValue') && typeof M.View._computedValue === 'object', 'M.View has the object _computedValue.');
//
//    ok(M.View.hasOwnProperty('_contentBinding') && typeof M.View._contentBinding === 'object', 'M.View has the object _contentBinding.');
//
//    ok(M.View.hasOwnProperty('_contentBindingReverse') && typeof M.View._contentBindingReverse === 'object', 'M.View has the object _contentBindingReverse.');
//
//    ok(M.View.hasOwnProperty('childViews') && typeof M.View.childViews === 'string', 'M.View has the string childViews.');
//
//    ok(M.View.hasOwnProperty('getChildViews') && typeof M.View.getChildViews === 'function', 'M.View has the function getChildViews.');
//
//    ok(M.View.hasOwnProperty('getChildViewsAsArray') && typeof M.View.getChildViewsAsArray === 'function', 'M.View has the function getChildViewsAsArray.');
//
//    ok(M.View.hasOwnProperty('_contentDidChange') && typeof M.View._contentDidChange === 'function', 'M.View has the function _contentDidChange.');
//
//    ok(M.View.hasOwnProperty('getParentView') && typeof M.View.getParentView === 'function', 'M.View has the function getParentView.');
//
//    M.Test = M.View.design({});
//
//    ok(Object.getPrototypeOf(M.Test) === M.View, 'M.View is extendable.');
//
//    var childViewsAsArray = M.Test.getChildViewsAsArray();
//
//    ok(Array.isArray(childViewsAsArray) && childViewsAsArray.length === 0, 'getChildViewsAsArray returns an empty Array.');
//
//    M.Test.childViews = 'firstChild';
//
//    childViewsAsArray = M.Test.getChildViewsAsArray();
//
//    ok(childViewsAsArray.lenght === 1 && childViewsAsArray[0] === 'firstChild', 'getChildViewsAsArray returns an Array with one element.');
//
//    M.Test.childViews = 'firstChild secondChild';
//
//    var childViewsAsArray = M.Test.getChildViewsAsArray();
//
//    ok(childViewsAsArray.lenght === 2 && childViewsAsArray[0] === 'firstChild' && childViewsAsArray[1] === 'secondChild', 'getChildViewsAsArray returns an Array with two elements.');
//
//
//
//    /* cleanup */
//    M.Test = null;
//    childViewsAsArray = null;

//    ok(M.Object.bindToCaller(M.NewObject, M.NewObject.testMethod, null)() === 123, 'M.Object.bindToCaller() binds the method call properly.');
//
//    throws(M.Object.bindToCaller(M.NewObject, 'testMethod', null), /^M.Exception.INVALID_INPUT_PARAMETER$/, M.Exception.INVALID_INPUT_PARAMETER.message);
//
//    throws(M.Object.bindToCaller('test', M.NewObject.testMethod, null), /^M.Exception.INVALID_INPUT_PARAMETER$/, M.Exception.INVALID_INPUT_PARAMETER.message);
//
//    throws(M.Object.bindToCaller(), /^M.Exception.INVALID_INPUT_PARAMETER$/, M.Exception.INVALID_INPUT_PARAMETER.message);

});