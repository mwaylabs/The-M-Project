describe('M.ViewManager', function() {

    var instance;

    it('basic', function() {
        assert.isDefined(M.ViewManager);

        assert.isDefined(M.ViewManager._allViews);
        assert.isDefined(M.ViewManager.registerView);
        assert.isFunction(M.ViewManager.registerView);
        assert.isFunction(M.ViewManager.getView);
        assert.isTrue(M.Object.isPrototypeOf(M.ViewManager));
    });

    it('getView', function() {
        assert.isArray(M.ViewManager.getView());
        assert.isArray(M.ViewManager.getView(false));
        assert.isArray(M.ViewManager.getView(true));
        assert.isArray(M.ViewManager.getView(1));
        assert.isArray(M.ViewManager.getView(0));
        assert.isArray(M.ViewManager.getView(1.0));
        assert.isArray(M.ViewManager.getView(''));
        assert.isArray(M.ViewManager.getView('asdf'));
        assert.isArray(M.ViewManager.getView({}));
        assert.isArray(M.ViewManager.getView([]));

        var testView = M.View.extend({
            value: 0
        }, {
            ultraTestView: M.View.extend({
                value: 1
            }, {
                ultraTestView: M.TextView.extend({
                    value: 2
                }, {
                    ultraTestView: M.ButtonView.extend({
                        value: 3
                    })
                })
            })
        }).create().render();

        var children = M.ViewManager.getView('testView');
        assert.lengthOf(children, 0);

        var children = M.ViewManager.getView('ultraTestView');
        assert.lengthOf(children, 3);

        assert.deepEqual(children[0], testView.childViews.ultraTestView);
        assert.deepEqual(children[1], testView.childViews.ultraTestView.childViews.ultraTestView);
        assert.deepEqual(children[2], testView.childViews.ultraTestView.childViews.ultraTestView.childViews.ultraTestView);


        var children = M.ViewManager.getView('ultraTestView', M.View.prototype._type);
        assert.lengthOf(children, 1);
        assert.deepEqual(children[0], testView.childViews.ultraTestView);

        var children = M.ViewManager.getView('ultraTestView', M.ButtonView.prototype._type);
        assert.lengthOf(children, 1);
        assert.deepEqual(children[0], testView.childViews.ultraTestView.childViews.ultraTestView.childViews.ultraTestView);

        var children = M.ViewManager.getView('ultraTestView', M.TextView.prototype._type);
        assert.lengthOf(children, 1);
        assert.deepEqual(children[0], testView.childViews.ultraTestView.childViews.ultraTestView);

        children = M.ViewManager.getView('ultraTestView', testView);
        assert.lengthOf(children, 3);
        assert.deepEqual(children[0], testView.childViews.ultraTestView);
        assert.deepEqual(children[1], testView.childViews.ultraTestView.childViews.ultraTestView);
        assert.deepEqual(children[2], testView.childViews.ultraTestView.childViews.ultraTestView.childViews.ultraTestView);

        children = M.ViewManager.getView('ultraTestView', testView.childViews.ultraTestView);
        assert.lengthOf(children, 2);
        assert.deepEqual(children[0], testView.childViews.ultraTestView.childViews.ultraTestView);
        assert.deepEqual(children[1], testView.childViews.ultraTestView.childViews.ultraTestView.childViews.ultraTestView);

        children = M.ViewManager.getView('ultraTestView', testView.childViews.ultraTestView.childViews.ultraTestView);
        assert.lengthOf(children, 1);
        assert.deepEqual(children[0], testView.childViews.ultraTestView.childViews.ultraTestView.childViews.ultraTestView);

        children = M.ViewManager.getView(testView.el);
        assert.lengthOf(children, 1);
        assert.deepEqual(children[0], testView);
    });
});
