describe('M.MenuView', function () {

    it('general', function () {

        // Basic
        assert.isDefined(M.MenuView);
        assert.isFunction(M.MenuView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.MenuView.create()));
        assert.isTrue(M.MenuView.create()._type === 'M.MenuView');

    });

    it('with default values', function () {

        var testView = M.MenuView.extend({},{}).create();

        assert.equal(testView._type, 'M.MenuView', '1');
        assert.equal(testView.leftEdge, 0, '2');
        assert.equal(testView._rightEdge, parseInt(M.ThemeVars.get('m-menu-view-width'), 10) - parseInt(M.ThemeVars.get('m-menu-view-device-swipe-listener-width'), 10), '3');
        assert.isNull(testView._transitionTimeout, '4');
        assert.equal(testView._internalCssClasses, 'on-left', '5');
        assert.isNull(testView._movableWidth, '6');
        assert.isNull(testView._containerWidth, '7');
        assert.isNull(testView._$movableContent, '8');
        assert.isFalse(testView._isAnimating, '9');

        testView.render();
        assert.isDefined(testView._$movableContent, '10');
        assert.isTrue(testView._getMovableContent()[0] === testView.$el.find('.movable-container')[0], '11');
        assert.isTrue(testView._getMovableContent()[0] === testView._$movableContent[0], '12');

        assert.isTrue(testView.$el.hasClass('on-left'), '13');
        assert.isDefined(testView._$backdrop, '14');
        assert.equal(testView._$backdrop[0], testView.$el.find('.movable-backdrop')[0], '15');
        assert.equal(testView._deviceSwipeListenerWidth, parseInt(M.ThemeVars.get('m-menu-view-device-swipe-listener-width'), 10), '16');
    });

    it('with custom values', function ( ) {
        var LEFT_EDGE = 100;
        var RIGHT_EDGE = 200;
        var CSS_CLASS_1 = 'CSS_CLASS_1';
        var CSS_CLASS_2 = 'CSS_CLASS_2';


        var testView = M.MenuView.extend({
            leftEdge: LEFT_EDGE,
            rightEdge: RIGHT_EDGE,
            cssClass: CSS_CLASS_1 + ' ' + CSS_CLASS_2

        },{}).create().render();

        assert.equal(testView.leftEdge, LEFT_EDGE);
        assert.equal(testView.rightEdge, RIGHT_EDGE);
        assert.isTrue(testView.$el.hasClass('on-left'));
        assert.isTrue(testView.$el.hasClass(CSS_CLASS_1));
        assert.isTrue(testView.$el.hasClass(CSS_CLASS_2));
    });

    it('event binding', function (done) {
        var callback = function(event, element){
            assert.equal(element, childView);
            done();
        };

        var testView = M.MenuView.extend({},{
            'menu-content': M.View.extend({},{
                c1: M.ButtonView.extend({
                    value: 'tap me',
                    events: {
                        tap: callback
                    }
                })
            })

        }).create().render()

        var childView = testView.childViews['menu-content'].childViews['c1'];
        childView._hammertime.trigger('tap', {});

        assert.isDefined(testView._events);
        assert.isDefined(testView._events.dragleft);
        assert.lengthOf(testView._events.dragleft, 1);
        assert.isDefined(testView._events.mouseup);
        assert.lengthOf(testView._events.mouseup, 1);
        assert.isDefined(testView._events.touchend);
        assert.lengthOf(testView._events.touchend, 1);

    });

    it('_getEventOptions', function () {
        var testView = M.MenuView.extend().create();
        var eventOptions = testView._getEventOptions();
        assert.isTrue(eventOptions['prevent_default']);
        assert.isTrue(eventOptions['no_mouseevents']);
        assert.isObject(eventOptions['stop_browser_behavior']);

    });

    it('_setDimensions', function () {
        var testView = M.MenuView.extend({}).create();

        assert.isNull(testView._movableWidth);
        assert.isNull(testView._containerWidth);
        assert.equal(testView._rightEdge, 180);
        testView.render();
        testView.$el.outerWidth('100');
        testView._$movableContent.outerWidth('10');
        testView.setDimensions();
        assert.equal(testView._containerWidth, 100);
        assert.equal(testView._movableWidth, 10);
        assert.equal(testView._rightEdge, 180);
    });

    it('with child views', function () {

        var testView = M.MenuView.extend({},{
            'menu-content': M.View.extend({},{
                b1 : M.ButtonView.extend({value:'b1'}),
                b2 : M.ButtonView.extend({value:'b2'})
            })

        }).create().render();

        assert.isDefined(testView.childViews);
        assert.isTrue(M.isView(testView.childViews['menu-content']));
        assert.isTrue(M.isView(testView.childViews['menu-content']));
        assert.isTrue(M.isView(testView.childViews['menu-content'].childViews.b1));
        assert.isTrue(M.isView(testView.childViews['menu-content'].childViews.b2));

    });


    it('toRight and toLeft', function ( done ) {

        var testView = M.MenuView.extend().create().render();
        testView.toRight();
        assert.isTrue(testView.$el.hasClass('on-right'), '1');
        assert.isFalse(testView.$el.hasClass('on-left'), '2');
        assert.isFalse(testView.$el.hasClass('on-move'), '3');
        assert.equal(testView._lastPos.x, testView._rightEdge, '4');
        assert.isTrue(testView._getMovableContent().attr('style').indexOf('3d(' + testView._rightEdge +  'px') >= 0, '5');
        assert.isTrue(testView._$backdrop.hasClass('in'), '6');
        assert.equal(testView._$backdrop.css('opacity'), 0.8, '7');
        testView.toLeft();

        assert.isFalse(testView.$el.hasClass('on-right'), '8');
        assert.isTrue(testView.$el.hasClass('on-left'), '9');
        assert.isFalse(testView.$el.hasClass('on-move'), '10');
        assert.equal(testView._lastPos.x, testView.leftEdge, '11');

        assert.isFalse(testView._$backdrop.hasClass('in'), '12');
        assert.equal(testView._$backdrop.css('opacity'), 0, '13');

        setTimeout(function(){
            assert.isFalse(testView.$el.hasClass('on-move'));
            done();
        }, parseInt(M.ThemeVars.get('m-menu-transition'), 10) + 10);
    });

    it('_setCss', function () {
        var shouldBeSetCounter = 0;
        var wasSetCounter = 0;
        var test = function(param, shouldBeSet){
            if(testView._setCss(param) === testView){
                assert.isTrue(testView._getMovableContent().attr('style').indexOf('translate3d(' + parseInt(param.x, 10) +  'px') >= 0, JSON.stringify(testView._getMovableContent().attr('style')));
                wasSetCounter+=1;
            }
            if(shouldBeSet){
                shouldBeSetCounter+=1;
            }
        }

        var testView = M.MenuView.extend().create().render();
        assert.isUndefined(testView._setCss());

        test({});
        test({
            x: null
        });
        test({
            x: undefined
        });
        test({
            x: ''
        });
        test({
            x: 'äüö'
        });
        test({
            x: {}
        });
        test({
            x: []
        });
        test({
            x: '10px'
        }, true);
        test({
            x: '10'
        });
        test({
            x: 10
        }, true);
        test({
            x: 0
        }, true);
        test({
            x: 10000000000
        }, true);

        assert.equal(wasSetCounter, shouldBeSetCounter);

        testView._setCss({x:'08'});
        assert.isTrue(testView._getMovableContent().attr('style').indexOf('translate3d(8px') >= 0);
        testView._setCss({x:08});
        assert.isTrue(testView._getMovableContent().attr('style').indexOf('translate3d(8px') >= 0);
    });

    it('_getOpacityByPosition', function () {
        var testView = M.MenuView.extend().create().render();
        assert.isUndefined(testView._getOpacityByPosition());
        assert.isUndefined(testView._getOpacityByPosition('a'));
        assert.isUndefined(testView._getOpacityByPosition('äöü'));
        assert.isUndefined(testView._getOpacityByPosition({}));
        assert.isUndefined(testView._getOpacityByPosition(''));
        assert.isUndefined(testView._getOpacityByPosition([]));
        assert.isUndefined(testView._getOpacityByPosition('asdf888888'));

        assert.equal(testView._getOpacityByPosition(280), 0.9);
        assert.equal(testView._getOpacityByPosition('00280'), 0.9);
        assert.equal(testView._getOpacityByPosition('17'), 0);
        assert.equal(testView._getOpacityByPosition('27'), 0.3);
        assert.equal(testView._getOpacityByPosition('08'), 0);
        assert.equal(testView._getOpacityByPosition('000080'), 0.7);

    });



    it.skip('onRelease with touch gesture', function ( done ) {
        var testView = M.MenuView.extend({
            onRelease: function(event, element){
                assert.equal(element, testView);
                done();
            }

        },{}).create().render();
    });

    it.skip('onRelease with mouse gesture', function ( done ) {
        var testView = M.MenuView.extend({
            onRelease: function(event, element){
                assert.equal(element, testView);
                done();
            }

        },{}).create().render();
    });


});
