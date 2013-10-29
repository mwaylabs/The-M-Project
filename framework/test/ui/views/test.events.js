describe('Events', function () {

    it('Tap', function (done) {

        Hammer.HAS_POINTEREVENTS = false;
        Hammer.HAS_TOUCHEVENTS = true;
        var set_faketouches_type = FakeTouches.TOUCH_EVENTS;

        var elem = M.View.extend({
            a: 0,
            events: {
                tap: function(event, element){
                    done();
                }
            }
        }).create().render().$el;

        var faker = new FakeTouches(elem);
        if(set_faketouches_type) {
            faker.setTouchType(set_faketouches_type);
        }

        faker.triggerGesture('tap');

    });
});
