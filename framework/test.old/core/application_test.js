test('M.Application Test', function() {

    ok(M.hasOwnProperty('Application'), 'M.Application is defined.');

    ok(M.Application.getObjectType() === 'M.Application', 'The type of M.Application is M.Application.');

    ok(M.Application.hasOwnProperty('config') && typeof M.Application.config === 'object', 'M.Application has config property.');

    ok(M.Application.hasOwnProperty('start') && typeof M.Application.start === 'function', 'M.Application has a start() method.');

    ok(M.Application.hasOwnProperty('getConfig') && typeof M.Application.getConfig === 'function', 'M.Application has a getConfig() method.');

    M.Application.config = {
        prop1: 'test',
        prop2: 123,
        prop3: {
            a: 'a',
            b: 'b'
        }
    };

    ok(M.Application.getConfig('prop1') === 'test', 'getConfig() returns the right config property with the correct data type (string).');

    ok(M.Application.getConfig('prop2') === 123, 'getConfig() returns the right config property with the correct data type (number).');

    ok(typeof M.Application.getConfig('prop3') === 'object' && JSON.stringify(M.Application.getConfig('prop3')) === JSON.stringify({a: 'a',b: 'b'}), 'getConfig() returns the right config property with the correct data type (object).');

    throws(function() {M.Application.start()}, /^M.Exception.APPLICATION_START_NOT_DEFINED$/, M.Exception.APPLICATION_START_NOT_DEFINED.message);

    ok(M.Application.hasOwnProperty('loadScript') && typeof M.Application.loadScript === 'function', 'M.Application has a loadScript() method.');

    ok(M.Application.hasOwnProperty('addUndefinedContentBinding') && typeof M.Application.addUndefinedContentBinding === 'function', 'M.Application has a addUndefinedContentBinding() method.');

    M.Application._undefinedContentBindings = [];
    M.Application.addUndefinedContentBinding(M.View);

    ok(M.Application._undefinedContentBindings.length === 1, 'M.Application.addUndefinedContentBinding() adds a valid object (M.View in this case) to the internally used _undefinedContentBindings array.');

    M.Application.addUndefinedContentBinding(M.Object);

    ok(M.Application._undefinedContentBindings.length === 1, 'M.Application.addUndefinedContentBinding() ignores invalid object that do not implement the M.ContentBinding interface.');

    ok(M.Application.hasOwnProperty('_attachUndefinedContentBindings') && typeof M.Application._attachUndefinedContentBindings === 'function', 'M.Application has a _attachUndefinedContentBindings() method.');

});

asyncTest('M.Application: Testing loadScript()', function() {

    M.Application.loadScript('_requestable/dummyJS.js', {
        success: function() {
            ok(true, 'M.Application.loadScript() with invalid src triggers error callback.');
            start();
        },
        error: function() {
            start();
        }
    });

    M.Application.loadScript('invalid_url.js', {
        success: function() {
            start();
        },
        error: function() {
            ok(true, 'M.Application.loadScript() with valid src triggers success callback.');
            start();
        }
    })

});