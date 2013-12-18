describe('M.ActiveState implementation', function() {

    var general = function( testInterface ) {
        assert.isTrue(testInterface._type === 'M.Interface');
        assert.isDefined(testInterface.isMInterface);
        assert.isTrue(testInterface.isMInterface);
        assert.isFunction(testInterface.getInterface);
    }

    it('general', function() {
        general(M.Interface);

        assert.equal(M.ActiveState._type, 'M.ActiveState');
    });

    it('_registerActiveState', function() {
        var TestView = M.ButtonView.extend().implements([M.ActiveState]);
        var t1 = TestView.create();
        assert.isDefined(t1._events);
        assert.isDefined(t1._events['touchstart']);
        assert.isDefined(t1._events['touchend']);
        assert.isDefined(t1._events['touchcancel']);

    });

    it('_registerActiveState at view without internalEvents', function() {
        var eventCounter = 0;

        var TestView = M.View.extend({}).implements([M.ActiveState]);
        var t1 = TestView.create().render();
        assert.isDefined(t1._events);
        assert.isTrue(t1._events['touchstart'].length === 2);
        assert.isTrue(t1._events['touchend'].length === 2);
        assert.isTrue(t1._events['touchcancel'].length === 1);


        var touchstartEvent = Hammer.DOCUMENT.createEvent('Event');
        touchstartEvent.initEvent('touchstart', true, true);
        touchstartEvent.gesture = {};
        touchstartEvent.touches = [];

        var touchendEvent = Hammer.DOCUMENT.createEvent('Event');
        touchendEvent.initEvent('touchend', true, true);
        touchendEvent.gesture = {};
        touchendEvent.touches = [];

        var touchcancelEvent = Hammer.DOCUMENT.createEvent('Event');
        touchcancelEvent.initEvent('touchcancel', true, true);
        touchcancelEvent.gesture = {};
        touchcancelEvent.touches = [];

        t1.el.dispatchEvent(touchstartEvent);
        assert.isTrue(t1.$el.hasClass('active'));

        t1.el.dispatchEvent(touchendEvent);
        assert.isFalse(t1.$el.hasClass('active'));

        t1.el.dispatchEvent(touchstartEvent);
        assert.isTrue(t1.$el.hasClass('active'));

        t1.el.dispatchEvent(touchcancelEvent);
        assert.isFalse(t1.$el.hasClass('active'));
    });


    it('_registerActiveState at view with internalEvents', function() {
        var eventCounter = 0;

        var touchstartEvent = Hammer.DOCUMENT.createEvent('Event');
        touchstartEvent.initEvent('touchstart', true, true);
        touchstartEvent.gesture = {};
        touchstartEvent.touches = [];

        var touchendEvent = Hammer.DOCUMENT.createEvent('Event');
        touchendEvent.initEvent('touchend', true, true);
        touchendEvent.gesture = {};
        touchendEvent.touches = [];

        var touchcancelEvent = Hammer.DOCUMENT.createEvent('Event');
        touchcancelEvent.initEvent('touchcancel', true, true);
        touchcancelEvent.gesture = {};
        touchcancelEvent.touches = [];


        var TestView = M.ButtonView.extend({
            _internalEvents: {
                touchstart: function(){
                    eventCounter += 1;
                },
                touchend: function(){
                    eventCounter += 1;
                },
                touchcancel: function(){
                    eventCounter += 1;
                }
            }
        }).implements([M.ActiveState]);

        var t1 = TestView.create({value:'asdf'}).render();

        assert.isDefined(t1._events);
        assert.isTrue(t1._events['touchstart'].length > 1);
        assert.isTrue(t1._events['touchend'].length > 1);
        assert.isTrue(t1._events['touchcancel'].length > 1);

        t1.el.dispatchEvent(touchstartEvent);
        assert.isTrue(t1.$el.hasClass('active'));
        assert.equal(eventCounter,1);

        t1.el.dispatchEvent(touchendEvent);
        assert.isFalse(t1.$el.hasClass('active'));
        assert.equal(eventCounter,2);

        t1.el.dispatchEvent(touchstartEvent);
        assert.isTrue(t1.$el.hasClass('active'));
        assert.equal(eventCounter,3);

        t1.el.dispatchEvent(touchcancelEvent);
        assert.isFalse(t1.$el.hasClass('active'));
        assert.equal(eventCounter,4);

    });

    it('_registerActiveState at view with internalEvents and useElement', function() {
        var eventCounter = 0;
        var touchstartEvent = Hammer.DOCUMENT.createEvent('Event');
        touchstartEvent.initEvent('touchstart', true, true);
        touchstartEvent.gesture = {};
        touchstartEvent.touches = [];

        var touchendEvent = Hammer.DOCUMENT.createEvent('Event');
        touchendEvent.initEvent('touchend', true, true);
        touchendEvent.gesture = {};
        touchendEvent.touches = [];

        var touchcancelEvent = Hammer.DOCUMENT.createEvent('Event');
        touchcancelEvent.initEvent('touchcancel', true, true);
        touchcancelEvent.gesture = {};
        touchcancelEvent.touches = [];


        var TestView = M.ButtonView.extend({
            useElement: YES,
            _internalEvents: {
                touchstart: function(){
                    eventCounter += 1;
                },
                touchend: function(){
                    eventCounter += 1;
                },
                touchcancel: function(){
                    eventCounter += 1;
                }
            }
        }).implements([M.ActiveState]);

        var t1 = TestView.create({value:'asdf'}).render();

        assert.isDefined(t1._events);
        assert.isTrue(t1._events['touchstart'].length > 1);
        assert.isTrue(t1._events['touchend'].length > 1);
        assert.isTrue(t1._events['touchcancel'].length > 1);


        t1.el.dispatchEvent(touchstartEvent);
        assert.isTrue(t1.$el.hasClass('active'));
        assert.equal(eventCounter,1);

        t1.el.dispatchEvent(touchendEvent);
        assert.isFalse(t1.$el.hasClass('active'));
        assert.equal(eventCounter,2);

        t1.el.dispatchEvent(touchstartEvent);
        assert.isTrue(t1.$el.hasClass('active'));
        assert.equal(eventCounter,3);

        t1.el.dispatchEvent(touchcancelEvent);
        assert.isFalse(t1.$el.hasClass('active'));
        assert.equal(eventCounter,4);

    });

});
