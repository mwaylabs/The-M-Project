describe('All Events', function() {

    it('Bind and Trigger all event', function( done ) {

        var counter = 0;

        var all_events = ["touch", "release", "hold", "tap", "doubletap", "dragstart", "drag", "dragend", "dragleft", "dragright", "dragup", "dragdown", "swipe", "swipeleft", "swiperight", "swipeup", "swipedown", "transformstart", "transform", "transformend", "rotate", "pinch", "pinchin", "pinchout"];

        var events = {};
        _.each(all_events, function( key ) {

            events[key] = 'scopefunction';
        });

        var elem = M.View.extend({
            events: events
        }).create({
                scopefunction: function() {
                    if( counter === all_events.length - 1 ) {
                        done();
                    } else {
                        ++counter;
                    }

                }
            }, null, true).render();

        _.each(all_events, function( key ) {
            elem._hammertime.trigger(key, {});
        });
    });

    it('Bind and Trigger all event without render', function( done ) {

        var counter = 0;

        var all_events = ["touch", "release", "hold", "tap", "doubletap", "dragstart", "drag", "dragend", "dragleft", "dragright", "dragup", "dragdown", "swipe", "swipeleft", "swiperight", "swipeup", "swipedown", "transformstart", "transform", "transformend", "rotate", "pinch", "pinchin", "pinchout"];

        var events = {};
        _.each(all_events, function( key ) {

            events[key] = 'scopefunction';
        });

        var elem = M.View.extend({
            events: events
        }).create({
                scopefunction: function() {
                    if( counter === all_events.length - 1 ) {
                        done();
                    } else {
                        ++counter;
                    }

                }
            }, null, true);

        _.each(all_events, function( key ) {
            elem._hammertime.trigger(key, {});
        });
    });


    it('Bind and Trigger all event with useElement', function( done ) {

        var counter = 0;

        var all_events = ["touch", "release", "hold", "tap", "doubletap", "dragstart", "drag", "dragend", "dragleft", "dragright", "dragup", "dragdown", "swipe", "swipeleft", "swiperight", "swipeup", "swipedown", "transformstart", "transform", "transformend", "rotate", "pinch", "pinchin", "pinchout"];

        var events = {};
        _.each(all_events, function( key ) {

            events[key] = 'scopefunction';
        });

        var elem = M.View.extend({
            useElement: YES,
            events: events
        }).create({
                scopefunction: function() {
                    if( counter === all_events.length - 1 ) {
                        done();
                    } else {
                        ++counter;
                    }

                }
            }, null, true).render();

        _.each(all_events, function( key ) {
            elem._hammertime.trigger(key, {});
        });
    });

    it('Bind and Trigger all event without useElement and not scope function', function( done ) {

        var counter = 0;

        var all_events = ["touch", "release", "hold", "tap", "doubletap", "dragstart", "drag", "dragend", "dragleft", "dragright", "dragup", "dragdown", "swipe", "swipeleft", "swiperight", "swipeup", "swipedown", "transformstart", "transform", "transformend", "rotate", "pinch", "pinchin", "pinchout"];

        var events = {};
        _.each(all_events, function( key ) {

            events[key] = function() {
                if( counter === all_events.length - 1 ) {
                    done();
                } else {
                    ++counter;
                }
            };
        });

        var elem = M.View.extend({
            useElement: NO,
            events: events
        }).create({}, null, true).render();

        _.each(all_events, function( key ) {
            elem._hammertime.trigger(key, {});
        });
    });

    it('Bind and Trigger all event with useElement and not scope function', function( done ) {

        var counter = 0;

        var all_events = ["touch", "release", "hold", "tap", "doubletap", "dragstart", "drag", "dragend", "dragleft", "dragright", "dragup", "dragdown", "swipe", "swipeleft", "swiperight", "swipeup", "swipedown", "transformstart", "transform", "transformend", "rotate", "pinch", "pinchin", "pinchout"];

        var events = {};
        _.each(all_events, function( key ) {

            events[key] = function() {
                if( counter === all_events.length - 1 ) {
                    done();
                } else {
                    ++counter;
                }
            };
        });

        var elem = M.View.extend({
            useElement: YES,
            events: events
        }).create({}, null, true).render();

        _.each(all_events, function( key ) {
            elem._hammertime.trigger(key, {});
        });
    });

    it('Events array', function() {
        var tapCount = 0;
        var TestView = M.View.extend({
            events: {
                tap: [function() {
                    tapCount++;
                }, function() {
                    tapCount++;
                }]
            }
        });

        var view = TestView.create().render();
        view._hammertime.trigger('tap', {});
        assert.equal(tapCount, 2);

    });

    it('internal Events array', function() {

        var tapCount = 0;
        var TestView = M.View.extend({
            _internalEvents: {
                tap: [function() {
                    tapCount++;
                }, function() {
                    tapCount++;
                }]
            }
        });
        var view = TestView.create({
            events: {
                tap: [function() {
                    tapCount++;
                }, function() {
                    tapCount++;
                }]
            }
        }).render();
        view._hammertime.trigger('tap', {});
        assert.equal(tapCount, 4);
    });

    it('internal Events function', function() {

        var tapCount = 0;
        var TestView = M.View.extend({
            _internalEvents: {
                tap: function() {
                    tapCount++;
                }
            }
        });
        var view = TestView.create({
            events: {
                tap: function() {
                    tapCount++;
                }
            }
        }).render();
        view._hammertime.trigger('tap', {});
        assert.equal(tapCount, 2);
    });

    it('unbind Events function', function() {

        var tapCount = 0;
        var view = M.View.create({
            events: {
                tap: function() {
                    tapCount++;
                }
            }
        }).render();

        view._hammertime.trigger('tap', {});
        assert.equal(tapCount, 1);
        view._unbindEvent('tap');
        view._hammertime.trigger('tap', {});
        assert.equal(tapCount, 1);
    });

    it('unbind multipple Events function - first in first out', function() {

        var tapCount = 0;
        var doubletapCount = 0;
        var view = M.View.create({
            events: {
                tap: function() {
                    tapCount++;
                },
                doubletap: function() {
                    doubletapCount++;
                }
            }
        }).render();

        view._hammertime.trigger('tap', {});
        view._hammertime.trigger('doubletap', {});
        assert.equal(tapCount, 1);
        assert.equal(doubletapCount, 1);
        view._unbindEvent('tap');
        view._hammertime.trigger('tap', {});
        view._hammertime.trigger('doubletap', {});
        assert.equal(tapCount, 1);
        assert.equal(doubletapCount, 2);
        view._unbindEvent('doubletap');
        view._hammertime.trigger('tap', {});
        view._hammertime.trigger('doubletap', {});
        assert.equal(tapCount, 1);
        assert.equal(doubletapCount, 2);
    });

    it('unbind multipple Events function - first in last out', function() {

        var tapCount = 0;
        var doubletapCount = 0;
        var view = M.View.create({
            events: {
                tap: function() {
                    tapCount++;
                },
                doubletap: function() {
                    doubletapCount++;
                }
            }
        }).render();

        view._hammertime.trigger('tap', {});
        view._hammertime.trigger('doubletap', {});
        assert.equal(tapCount, 1);
        assert.equal(doubletapCount, 1);
        view._unbindEvent('doubletap');
        view._hammertime.trigger('tap', {});
        view._hammertime.trigger('doubletap', {});
        assert.equal(tapCount, 2);
        assert.equal(doubletapCount, 1);
        view._unbindEvent('tap');
        view._hammertime.trigger('tap', {});
        view._hammertime.trigger('doubletap', {});
        assert.equal(tapCount, 2);
        assert.equal(doubletapCount, 1);
    });

});
