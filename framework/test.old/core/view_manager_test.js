test('M.ViewManager Test', function() {

    ok(M.hasOwnProperty('ViewManager'), 'M.ViewManager is defined.');

    ok(M.ViewManager.getObjectType() === 'M.ViewManager', 'The type of M.ViewManager is M.ViewManager.');

    ok(M.ViewManager.hasOwnProperty('nextId') && typeof M.ViewManager.nextId === 'number', 'M.ViewManager has nextId property.');

    ok(M.ViewManager.hasOwnProperty('idPrefix') && typeof M.ViewManager.idPrefix === 'string', 'M.ViewManager has idPrefix property.');

    ok(M.ViewManager.hasOwnProperty('_views') && typeof M.ViewManager._views === 'object', 'M.ViewManager has _views property.');

    ok(M.ViewManager.hasOwnProperty('getNewId') && typeof M.ViewManager.getNewId === 'function', 'getNewId function is defined.');

    ok(M.ViewManager.hasOwnProperty('getViewById') && typeof M.ViewManager.getViewById === 'function', 'getViewById function is defined.');

    var id1 = M.ViewManager.getNewId();
    var id2 = M.ViewManager.getNewId();
    ok(id1 !== id2, 'getNewId returns unique id.');

    var idPrefix = id2.substr(0, M.ViewManager.idPrefix.length);
    ok(idPrefix === 'm_', 'M.ViewManager uses m_ as idPrefix.');

    var idNumber1 = parseInt(id1.substr(M.ViewManager.idPrefix.length));
    var idNumber2 = parseInt(id2.substr(M.ViewManager.idPrefix.length));
    ok(idNumber1 + 1 === idNumber2, 'getNewId correctly auto-increments the numerical part of the id.');

    var view = M.View.design({});
    var id3 = M.ViewManager.getNewId(view);
    ok(M.ViewManager.getViewById(id3) === view, 'getViewById returns the correct view.');

    ok(typeof M.ViewManager.getViewById('falsy_id') === 'undefined', 'getViewById returns undefined for invalid ids.');

    /* cleanup */
    view = null;

});