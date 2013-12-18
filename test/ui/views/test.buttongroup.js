describe('M.ButtonGroupView', function() {

    it('general', function() {

        // Basic
        assert.isDefined(M.ButtonGroupView);
        assert.isFunction(M.ButtonGroupView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.ButtonGroupView.create({})));

    });

    it('childviews event binding', function() {

        var buttonGroup = M.ButtonGroupView.extend({}, {

            button1: M.ButtonView.extend({
                value: 'button1'
            }),
            button2: M.ButtonView.extend({
                value: 'button2'
            }),
            button3: M.ButtonView.extend({
                value: 'button2'
            })

        }).create(this, null, YES);


        assert.isArray(buttonGroup.childViews.button1._events.touchstart);
        assert.isFunction(buttonGroup.childViews.button1._events.touchstart[0]);
        assert.isArray(buttonGroup.childViews.button1._events.mousedown);
        assert.isFunction(buttonGroup.childViews.button1._events.mousedown[0]);
        assert.lengthOf(Object.keys(buttonGroup.childViews), 3);

    });

    it('childviews event binding overwritten', function() {

        var tapCounter = 0;
        var buttonGroup = M.ButtonGroupView.extend({

            initialize: function() {
                M.View.prototype.initialize.apply(this, arguments);
                var that = this;
                _.each(this._childViews, function( child, key ) {
                    this._childViews[key] = child.extend({
                        _internalEvents: {
                            tap: [function( events, element ) {
                                tapCounter += 1;
                            }]
                        }
                    })
                }, this);
            }
        }, {

            button1: M.ButtonView.extend({
                value: 'button1'
            }),
            button2: M.ButtonView.extend({
                value: 'button2'
            }),
            button3: M.ButtonView.extend({
                value: 'button2'
            })

        }).create(this, null, YES);

        buttonGroup.childViews.button1._hammertime.trigger('tap', {});
        assert.equal(tapCounter, 1);
        buttonGroup.childViews.button2._hammertime.trigger('tap', {});
        assert.equal(tapCounter, 2);
        buttonGroup.childViews.button3._hammertime.trigger('tap', {});
        assert.equal(tapCounter, 3);

    });

    it('setActive with given view and 1 button item', function() {
        var buttonGroup = M.ButtonGroupView.extend({}, {

            button1: M.ButtonView.extend({
                value: 'button1'
            })

        }).create(this, null, YES).render();

        buttonGroup.setActive(buttonGroup.childViews.button1);
        assert.lengthOf(buttonGroup.$el.find('.active'), 1);
        assert.equal(buttonGroup.$el.find('.active').index(), 0);

     });

    it('setActive with given view and 3 button items', function() {

        var buttonGroup = M.ButtonGroupView.extend({}, {

            button1: M.ButtonView.extend({
                value: 'button1'
            }),
            button2: M.ButtonView.extend({
                value: 'button2'
            }),
            button3: M.ButtonView.extend({
                value: 'button2'
            })

        }).create(this, null, YES).render();

        buttonGroup.setActive(buttonGroup.childViews.button1);
        assert.lengthOf(buttonGroup.$el.find('.active'), 1);
        assert.equal(buttonGroup.$el.find('.active').index(), 0);
        buttonGroup.setActive(buttonGroup.childViews.button2);
        assert.lengthOf(buttonGroup.$el.find('.active'), 1);
        assert.equal(buttonGroup.$el.find('.active').index(), 1);
        buttonGroup.setActive(buttonGroup.childViews.button3);
        assert.lengthOf(buttonGroup.$el.find('.active'), 1);
        assert.equal(buttonGroup.$el.find('.active').index(), 2);

    });

    it('setActive with given index', function() {

        var buttonGroup = M.ButtonGroupView.extend({}, {

            button1: M.ButtonView.extend({
                value: 'button1'
            }),
            button2: M.ButtonView.extend({
                value: 'button2'
            }),
            button3: M.ButtonView.extend({
                value: 'button2'
            })

        }).create(this, null, YES).render();

        buttonGroup.setActive(0);
        assert.lengthOf(buttonGroup.$el.find('.active'), 1);
        assert.equal(buttonGroup.$el.find('.active').index(), 0);
        buttonGroup.setActive(1);
        assert.lengthOf(buttonGroup.$el.find('.active'), 1);
        assert.equal(buttonGroup.$el.find('.active').index(), 1);
        buttonGroup.setActive(2);
        assert.lengthOf(buttonGroup.$el.find('.active'), 1);
        assert.equal(buttonGroup.$el.find('.active').index(), 2);

    });

});
