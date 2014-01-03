describe.skip ('M.View Templates', function() {

    it('data binding', function() {

        var testView = M.View.extend().create({value: 'asdf'}).render();
        assert.lengthOf(testView.$el.find('[data-binding="value"]'), 0);

        var testView = M.View.extend().create({value:M.Model.create({value: 'asdf'})}).render();
        assert.lengthOf(testView.$el.find('[data-binding="value"]'), 1);

    });


});
