describe('Swipe Events', function () {

    it(' with render', function (done) {

        var elem = M.View.extend({
            events: {
                swipe: function(event, element){
                    done();
                }
            }
        }).create();
        elem.render();
        elem._hammertime.trigger('swipe', {});
    });

    it('Swipe without render', function (done) {

        var elem = M.View.extend({
            events: {
                swipe: function(event, element){
                    done();
                }
            }
        }).create();
        elem._hammertime.trigger('swipe', {});
    });

    it('Swipe with render and useElement set to YES', function (done) {

        var elem = M.View.extend({
            useElement: YES,
            events: {
                swipe: function(event, element){
                    done();
                }
            }
        }).create();
        elem.render();
        elem._hammertime.trigger('swipe', {});
    });

    it('Event is bound to the correct dom element', function () {

        var elem = M.View.extend({
            useElement: YES,
            events: {
                swipe: function(event, element){

                }
            }
        }).create();
        var before = elem.el;
        elem.render();
        assert.isTrue(elem._hammertime.element === elem.el);
    });

    it('Swipe without render and useElement set to YES -> _hammertime should be undefined', function () {

        var elem = M.View.extend({
            useElement: YES,
            events: {
                swipe: function(event, element){

                }
            }
        }).create();

        assert.isNull(elem._hammertime);
    });

    it('Swipe a function from the scope', function (done) {

        var elem = M.View.extend({
            events: {
                swipe: 'scopefunction'
            }
        }).create({
                scopefunction: function(){
                    done();
                }
            }, null, true);

        elem._hammertime.trigger('swipe', {});
    });

    it('Swipe a function from the scope with render call', function (done) {

        var elem = M.View.extend({
            events: {
                swipe: 'scopefunction'
            }
        }).create({
                scopefunction: function(){
                    done();
                }
            }, null, true).render();

        elem._hammertime.trigger('swipe', {});
    });

    it('Swipe a function from the scope with useElement', function (done) {

        var elem = M.View.extend({
            useElement: YES,
            events: {
                swipe: 'scopefunction'
            }
        }).create({
                scopefunction: function(){
                    done();
                }
            }, null, true).render();

        elem._hammertime.trigger('swipe', {});
    });

    it('Syncronous event trigger calls', function (done) {

        var tapWasCalled = false;
        var elem = M.View.extend({
            useElement: YES,
            events: {
                swipe: 'scopefunction',
                tap: 'tap'
            }
        }).create({
                scopefunction: function(){
                    if(tapWasCalled){
                        done();
                    } else {
                        throw(new Error());
                    }
                },
                tap: function(){
                    tapWasCalled = true;
                }
            }, null, true).render();

        elem._hammertime.trigger('tap', {});
        elem._hammertime.trigger('swipe', {});

    });

    it('Swipeleft not called with swipe', function (done) {

        var elem = M.View.extend({
            useElement: YES,
            events: {
                swipeleft: 'scopefunction',
                tap: 'tap'
            }
        }).create({
                scopefunction: function(){
                    throw(new Error());
                },
                tap: function(){
                    done();
                }
            }, null, true).render();

        elem._hammertime.trigger('swipe', {});
        elem._hammertime.trigger('tap', {});
    });

    it('Swipe not called with swipeleft', function (done) {

        var elem = M.View.extend({
            useElement: YES,
            events: {
                swipe: 'scopefunction',
                tap: 'tap'
            }
        }).create({
                scopefunction: function(){
                    done();
                },
                tap: function(){
                    done();
                }
            }, null, true).render();

        elem._hammertime.trigger('swipeleft', {});
        elem._hammertime.trigger('tap', {});
    });

    it('Swipe not called with swipeleft and swiperight', function (done) {

        var counter = 0;
        var elem = M.View.extend({
            useElement: YES,
            events: {
                swipeleft: 'scopefunction',
                swipe: function(){
                    throw(new Error());
                },
                swiperight: 'scopefunction'
            }
        }).create({
                scopefunction: function(){
                    if(counter > 0){
                        done();
                    } else {
                        ++counter;
                    }

                }
            }, null, true).render();

        elem._hammertime.trigger('swipeleft', {});
        elem._hammertime.trigger('swiperight', {});
    });

    it('Swipeleft or swiperight not called with swipe', function (done) {

        var counter = 0;
        var elem = M.View.extend({
            events: {
                swipeleft: 'scopefunction',
                swipe: function(){
                    done();
                },
                swiperight: 'scopefunction'
            }
        }).create({
                scopefunction: function(){
                    throw(new Error());
                }
            }, null, true).render();

        elem._hammertime.trigger('swipe', {});
    });
});
