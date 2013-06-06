test('M.EventDispatcher implementation', function() {
    /**
     * GENERAL
     */
    ok(M.Exception, 'M.EventDispatcher is defined');
    ok(typeof M.Exception === 'object', 'M.EventDispatcher is an object');

    ok(M.EventDispatcher._type && M.EventDispatcher._type === 'M.EventDispatcher', 'M.EventDispatcher._type is M.EventDispatcher');
    ok(typeof M.EventDispatcher._type === 'string', 'M.EventDispatcher._type is a string');

    /* check if correctly applied */
    ok(M.EventDispatcher._globalEvents instanceof Array, '_globalEvents is an array.');
    ok(typeof(M.EventDispatcher._eventRegistry) === 'object', '_eventRegistry is an object.')

    /* check event type (global vs. dom) */
    ok(M.EventDispatcher._isGlobalEvent('orientationchange'), 'orientationchange correctly determined as global');
    ok(!M.EventDispatcher._isGlobalEvent('tap'), 'tap correctly determined as non-global');
    ok(!M.EventDispatcher._isGlobalEvent('whatever'), 'whatever correctly determined as non-global');

    /* creating registry entry */
    var eventType = 'swipeleft';
    M.EventDispatcher._createRegistryEntryForType(eventType);
    ok(typeof(M.EventDispatcher._eventRegistry[eventType]) === 'object', 'creating registry entry for DOM event works');

    eventType = 'resize';
    M.EventDispatcher._createRegistryEntryForType(eventType, YES);
    ok(M.EventDispatcher._eventRegistry[eventType] instanceof Array, 'creating registry entry for global event works');
});

test('M.EventDispatcher checkHandler', function() {

    var obj = {
        f: function() {
        },
        arr: []
    };

    // valid
    var handler1 = {
        target: obj,
        action: 'f'
    };

    // invalid
    var handler2 = {
        target: obj,
        action: 'bla'
    };

    // invalid
    var handler3 = {
        target: obj
    };

    // invalid
    var handler4 = {
        action: 'f'
    };

    // valid
    var handler5 = {
        action: function() {
        }
    };

    // valid
    var handler6 = function() {
    };

    // invalid
    var handler7 = 'bla';

    // valid
    var handler8 = {
        target: window,
        action: 'setTimeout'
    };

    // invalid
    var handler9 = {
        target: obj,
        action: 'arr'
    };

    ok(M.EventDispatcher.checkHandler(handler1), 'Checked correctly: valid handler (target is object, action is string).');
    ok(!M.EventDispatcher.checkHandler(handler2), 'Checked correctly: invalid handler (target is object, action is string but doesn\'t name function).');
    ok(!M.EventDispatcher.checkHandler(handler3), 'Checked correctly: invalid handler (target is object, action is not defined)');
    ok(!M.EventDispatcher.checkHandler(handler4), 'Checked correctly: invalid handler (target is not defined, action is string)');
    ok(M.EventDispatcher.checkHandler(handler5), 'Checked correctly: valid handler (target is not defined, action is function)');
    ok(M.EventDispatcher.checkHandler(handler6), 'Checked correctly: valid handler (handler is function)');
    ok(!M.EventDispatcher.checkHandler(handler7), 'Checked correctly: invalid handler (handler is string)');
    ok(M.EventDispatcher.checkHandler(handler8), 'Checked correctly: valid handler (target is object (window), action is string (setTimeout))');
    ok(!M.EventDispatcher.checkHandler(handler9), 'Checked correctly: invalid handler (target is object, action is string but defines no function but array)');

});

asyncTest("M.EventDispatcher: Testing DOM events", function() {
    /**
     * REGISTERING EVENTS
     */

    // creating a disliked global
    var counter = 0;

    // creating a dummy view prototype
    var View = function( id ) {
        return {
            _id: 'm_' + id,

            _events: {
                tap: {
                    target: this,
                    action: function() {
                        counter = counter + 1;
                    }
                },

                doubletap: {
                    target: this,
                    action: function() {
                        console.log('doubletap');
                    }
                }
            },

            getId: function() {
                return this._id;
            },

            getEventHandler: function( type ) {
                return this._events[type];
            },

            getHtmlRepresentation: function() {
                return '<div id="' + this.getId() + '" style="display: none;" />';
            }
        }
    };

    var view1 = new View(1);
    $('body').append(view1.getHtmlRepresentation());

    M.EventDispatcher.registerEvent({
        source: view1,
        type: 'tap'
    });

    ok(M.EventDispatcher._eventRegistry.tap, 'Tap registered');
    ok(M.EventDispatcher._eventRegistry.tap[view1.getId()], 'Tap bound to correct view id');
    ok(typeof(M.EventDispatcher._eventRegistry.tap[view1.getId()]) === 'object', 'Tap bound to correct view id and event handler');


    /* Trigger tap event three times to increase view1's internal counter */
    var $view1 = $('#' + view1.getId());
    $view1.trigger('tap');
    $view1.trigger('tap');
    $view1.trigger('tap');

    window.setTimeout(function() {
        ok(counter === 3, 'Event trigger and delegation finished successfully.');
        start();
    }, 100);
});

asyncTest("M.EventDispatcher: Testing global events", function() {
    /**
     * Checking global events
     */

    /* reset counter */
    var counter = 0;

    var generalObj = function() {
        return {
            _events: {
                orientationchange: {
                    target: this,
                    action: function() {
                        counter = counter + 1;
                    }
                }
            },

            getEventHandler: function( type ) {
                return this._events[type];
            }
        }
    };


    M.EventDispatcher.registerEvent({
        source: new generalObj(),
        type: 'orientationchange'
    });

    $(document).trigger('orientationchange');

    window.setTimeout(function() {
        ok(counter === 1, "event handler successfully called");
        start();
    }, 100);

});

test("M.EventDispatcher: Unregistering Events", function() {

    var generalObj = function() {
        return {
            _events: {
                deviceorientation: {
                    target: this,
                    action: function() {
                        counter = counter + 1;
                    }
                }
            },

            getEventHandler: function( type ) {
                return this._events[type];
            }
        }
    };

    var View = function( id ) {
        return {
            _id: 'm_' + id,

            _events: {
                focus: {
                    target: this,
                    action: function() {
                        counter = counter + 1;
                    }
                }
            },

            getId: function() {
                return this._id;
            },

            getEventHandler: function( type ) {
                return this._events[type];
            },

            getHtmlRepresentation: function() {
                return '<div id="' + this.getId() + '" style="display: none;" />';
            }
        }
    };

    /**
     * 1. Register events
     */

    var view1 = new View(1);
    var view2 = new View(2);
    var view3 = new View(3);

    var global1 = new generalObj();
    var global2 = new generalObj();

    $('body').append(view1.getHtmlRepresentation());
    $('body').append(view2.getHtmlRepresentation());
    $('body').append(view3.getHtmlRepresentation());

    // events that have not been used in previous tests
    var eventTypeDOM = 'focus';
    var eventTypeGlobal = 'deviceorientation';

    M.EventDispatcher.registerEvent({
        source: view1,
        type: eventTypeDOM
    });

    M.EventDispatcher.registerEvent({
        source: view2,
        type: eventTypeDOM
    });

    M.EventDispatcher.registerEvent({
        source: view3,
        type: eventTypeDOM
    });

    M.EventDispatcher.registerEvent({
        source: global1,
        type: eventTypeGlobal
    });

    M.EventDispatcher.registerEvent({
        source: global2,
        type: eventTypeGlobal
    });

    equal(3, Object.keys(M.EventDispatcher._eventRegistry[eventTypeDOM]).length, 'DOM Events correctly registered');
    equal(2, M.EventDispatcher._eventRegistry[eventTypeGlobal].length, 'Global events correctly registered');

    /**
     * 2. Unregister one event for each type
     */

    M.EventDispatcher.unregisterEvent({
        source: view1,
        type: eventTypeDOM
    });

    M.EventDispatcher.unregisterEvent({
        source: global1,
        type: eventTypeGlobal
    });

    equal(2, Object.keys(M.EventDispatcher._eventRegistry[eventTypeDOM]).length, 'One event handler for ' + eventTypeDOM +  ' correctly unregistered');
    equal(1, M.EventDispatcher._eventRegistry[eventTypeGlobal].length, 'One event handler for ' + eventTypeGlobal +  ' correctly unregistered');

    /**
     * 3. Unregister all left events
     */

    M.EventDispatcher.unregisterEvent({
        source: view2,
        type: eventTypeDOM
    });

    M.EventDispatcher.unregisterEvent({
        source: view3,
        type: eventTypeDOM
    });

    M.EventDispatcher.unregisterEvent({
        source: global2,
        type: eventTypeGlobal
    });

    ok(!M.EventDispatcher._eventRegistry[eventTypeDOM], 'All event handlers for ' + eventTypeDOM +  ' correctly unregistered');
    ok(!M.EventDispatcher._eventRegistry[eventTypeGlobal], 'All event handlers for ' + eventTypeGlobal + ' correctly unregistered');



    /* Clean up */
    $('#' + view1.getId()).remove();
    $('#' + view2.getId()).remove();
    $('#' + view3.getId()).remove();


});