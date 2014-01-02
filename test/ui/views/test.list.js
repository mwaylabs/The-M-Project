describe('M.ListView', function () {

    it('general', function () {

        // Basic
        assert.isDefined(M.ListView);
        assert.isFunction(M.ListView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.ListView.create()));

    });

    it('the value has a value attribute', function(){
        var TV = M.ListView.extend({

            value: M.Collection.create([
                {lastname: 'item 1', firstname: 'a', value: 1},
                {lastname: 'item 2', firstname: 'b', value: 2},
                {lastname: 'item 3', firstname: 'c', value: 3},
                {lastname: 'item 4', firstname: 'd', value: 4},
                {lastname: 'item 5', firstname: 'e', value: 5}
            ]),

            listItemView: M.ListItemView.extend({
                extendTemplate: '<span><%= lastname %></span><span><%= firstname %></span><span><%= value %></span>'
            })
        });

        var testView = TV.create();
        testView.render();

        assert.isDefined(testView.$el);
        assert.lengthOf(testView.$el.find('[data-binding="value"]'), 5);
        assert.lengthOf(testView.$el.find('[data-binding="firstname"]'), 5);
        assert.lengthOf(testView.$el.find('[data-binding="lastname"]'), 5);

        testView = null;
        TV = null;

    });

});
