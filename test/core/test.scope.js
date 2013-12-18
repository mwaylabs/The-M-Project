describe('Scope', function () {

    var instance;

    it.skip('scope via parameter', function () {

        var VAL = 'testproperty';

        var scope = {
            test: M.Model.create({
                prop: VAL
            })
        };

        var testView = M.View.extend({scopeKey: 'test.prop' }).create(scope, null, true).render();
        assert.equal(testView.getValue, VAL);
        assert.equal(testView.$el.find('[data-binding="value"]').html(), VAL);

    });

    it('scope via controller', function () {

        var VAL = 'testproperty';

        var scope = M.Controller.extend({
            test: M.Model.create({
                prop: VAL
            })
        }).create();

        var TestView = M.View.extend({scopeKey: 'test.prop' });
        var view = TestView.create(scope).render();
        assert.equal(view.getValue(), VAL);
        assert.equal(view.$el.find('[data-binding="value"]').html(), VAL);

    });
});
