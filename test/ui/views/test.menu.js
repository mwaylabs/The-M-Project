describe.skip('M.MenuView', function () {

    it('general', function () {

        // Basic
        assert.isDefined(M.MenuView);
        assert.isFunction(M.MenuView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.MenuView.create()));
        assert.isTrue(M.MenuView.create()._type === 'M.MenuView');

    });


    it('with default values', function () {

        var testView = M.MenuView.extend({},{}).create().render()

        assert.equal(testView._type, 'M.MenuView');
        assert.equal(testView.leftEdge, 0);
        assert.equal(testView.rightEdge, parseInt(M.ThemeVars.get('m-menu-view-width'), 10) - parseInt(M.ThemeVars.get('m-menu-view-device-swipe-listener-width'), 10));
        assert.isDefined(testView._$backdrop);
        assert.equal(testView._$backdrop[0], testView.$el.find('.movable-backdrop')[0]);
        assert.equal(testView._deviceSwipeListenerWidth, parseInt(M.ThemeVars.get('m-menu-view-device-swipe-listener-width'), 10));

        assert.isNull(testView._transitionTimeout);
        assert.equal(testView._internalCssClasses, 'on-left');
        assert.isTrue(testView.$el.hasClass('on-left'));
    });

    it('with custom values', function ( done ) {
        var LEFT_EDGE = 100;
        var RIGHT_EDGE = 200;
        var CSS_CLASS_1 = 'CSS_CLASS_1';
        var CSS_CLASS_2 = 'CSS_CLASS_2';


        var testView = M.MenuView.extend({
            leftEdge: LEFT_EDGE,
            rightEdge: RIGHT_EDGE,
            cssClass: CSS_CLASS_1 + ' ' + CSS_CLASS_2,
            onRelease: function(event, element){
                assert.equal(element, testView);
                done();
            }

        },{}).create().render();

        assert.equal(testView.leftEdge, LEFT_EDGE);
        assert.equal(testView.rightEdge, RIGHT_EDGE);
        assert.isTrue(testView.$el.hasClass('on-left'));
        assert.isTrue(testView.$el.hasClass(CSS_CLASS_1));
        assert.isTrue(testView.$el.hasClass(CSS_CLASS_2));

        //testView._hammertime.trigger('touchend', {});
    });

    it('onRelease with touch gesture', function ( done ) {
        var testView = M.MenuView.extend({
            onRelease: function(event, element){
                assert.equal(element, testView);
                done();
            }

        },{}).create().render();

        //testView._hammertime.trigger('touchend', {});
    });

    it('onRelease with mouse gesture', function ( done ) {
        var testView = M.MenuView.extend({
            onRelease: function(event, element){
                assert.equal(element, testView);
                done();
            }

        },{}).create().render();

        //testView._hammertime.trigger('mouseup', {});
    });

    it('with child views', function () {

        var testView = M.MenuView.extend({},{
            'menu-content': M.View.extend({},{
                b1 : M.ButtonView.extend({value:'b1'}),
                b2 : M.ButtonView.extend({value:'b2'})
            })

        }).create().render()

        assert.isDefined(testView.childViews);
        assert.isTrue(M.isView(testView.childViews['menu-content']));
        assert.isTrue(M.isView(testView.childViews['menu-content']));
        assert.isTrue(M.isView(testView.childViews['menu-content'].childViews.b1));
        assert.isTrue(M.isView(testView.childViews['menu-content'].childViews.b2));

    });

});
