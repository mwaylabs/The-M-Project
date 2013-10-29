describe('Tap Events', function () {

    it('Tap with render', function (done) {

        var elem = M.View.extend({
            events: {
                tap: function(event, element){
                    done();
                }
            }
        }).create();
        elem.render();
        elem.hammertime.trigger('tap', {});
    });

    it('Tap without render', function (done) {

        var elem = M.View.extend({
            events: {
                tap: function(event, element){
                    done();
                }
            }
        }).create();
        elem.hammertime.trigger('tap', {});
    });

    it('Tap with render and useElement set to YES', function (done) {

        var elem = M.View.extend({
            useElement: YES,
            events: {
                tap: function(event, element){
                    done();
                }
            }
        }).create();
        elem.render();
        elem.hammertime.trigger('tap', {});
    });

    it('Event is bound to the correct dom element', function () {

        var elem = M.View.extend({
            useElement: YES,
            events: {
                tap: function(event, element){

                }
            }
        }).create();
        var before = elem.el;
        elem.render();
        assert.isTrue(elem.hammertime.element === elem.el);
    });

    it('Tap without render and useElement set to YES -> hammertime should be undefined', function () {

        var elem = M.View.extend({
            useElement: YES,
            events: {
                tap: function(event, element){

                }
            }
        }).create();

        assert.isUndefined(elem.hammertime);
    });

    it('Tap a function from the scope', function (done) {

        var elem = M.View.extend({
            events: {
                tap: 'scopefunction'
            }
        }).create({
                scopefunction: function(){
                    done();
                }
            }, null, true);

        elem.hammertime.trigger('tap', {});
    });

    it('Tap a function from the scope with render call', function (done) {

        var elem = M.View.extend({
            events: {
                tap: 'scopefunction'
            }
        }).create({
                scopefunction: function(){
                    done();
                }
            }, null, true).render();

        elem.hammertime.trigger('tap', {});
    });

    it('Tap a function from the scope with useElement', function (done) {

        var elem = M.View.extend({
            useElement: YES,
            events: {
                tap: 'scopefunction'
            }
        }).create({
                scopefunction: function(){
                    done();
                }
            }, null, true).render();

        elem.hammertime.trigger('tap', {});
    });
});
