describe('M.SwitchView', function() {

    it('general', function() {

        // Basic
        assert.isDefined(M.SwitchView);
        assert.isFunction(M.SwitchView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.SwitchView.create()));
    });

    it('instance simple with default parameters', function() {

        var testView = M.SwitchView.create();
        assert.equal(testView._type, 'M.SwitchView');

        assert.isDefined(testView._template);
        assert.isString(testView._templateString);
        assert.equal(testView._templateString, M.TemplateManager.get('switch.ejs'));

        testView = null;
    });

    it('check childView', function() {

        var switchView = M.SwitchView.extend({
            transition: M.Transitions.CONST.NONE
        }).create();

        var viewA = M.View.design({value: 'viewA'});
        var viewB = M.View.design({value: 'viewB'});
        var viewC = M.View.design({value: 'viewC'});

        switchView.setChildView('content', viewA);
        assert.isTrue(switchView.getChildView('content') === viewA, 'childView content is viewA');

        switchView.setChildView('content', viewB);
        assert.isTrue(switchView.getChildView('content') === viewB, 'childView content is viewB');

        switchView.setChildView('content', viewC);
        assert.isTrue(switchView.getChildView('content') === viewC, 'childView content is viewC');

        switchView = null;
        viewA = null;
        viewB = null;
        viewC = null;
    });

    it('check dom', function() {

        var switchView = M.SwitchView.extend({
            transition: M.Transitions.CONST.NONE
        }).create();
        switchView.render();

        var viewA = M.View.design({value: 'viewA'});
        var viewB = M.View.design({value: 'viewB'});
        var viewC = M.View.design({value: 'viewC'});

        var $contentA = switchView.$el.find('[data-childviews="content_a' + switchView.cid + '"]');
        var $contentB = switchView.$el.find('[data-childviews="content_b' + switchView.cid + '"]');

        assert.equal(switchView.$el.find('[data-childviews^="content_"]').length, 2);
        assert.equal($contentA.children().length, 0);

        // Set viewA
        switchView.setChildView('content', viewA);
        assert.equal($contentA.children().length, 1);
        assert.equal($contentA.children()[0], viewA.el);

        // Set viewB
        switchView.setChildView('content', viewB);
        assert.equal($contentA.children().length, 1);
        assert.equal($contentA.children()[0], viewA.el);
        assert.equal($contentB.children().length, 1);
        assert.equal($contentB.children()[0], viewB.el);

        // Set viewC
        switchView.setChildView('content', viewC);
        assert.equal($contentB.children().length, 1);
        assert.equal($contentB.children()[0], viewB.el);
        assert.equal($contentA.children().length, 1);
        assert.equal($contentA.children()[0], viewC.el);


        switchView = null;
        viewA = null;
        viewB = null;
        viewC = null;
    });

});
