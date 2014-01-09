describe('M.ListView', function() {

    it('general', function() {

        // Basic
        assert.isDefined(M.ListView);
        assert.isFunction(M.ListView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.ListView.create()));
        assert.equal(M.ListView.prototype._type, 'M.ListView');

    });

    it('the value has a value attribute', function() {
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

    it('list item with child views', function() {

        var TV = M.ListView.extend({

            value: M.Collection.create([
                {lastname: 'item 1', firstname: 'a', value: 1},
                {lastname: 'item 2', firstname: 'b', value: 2},
                {lastname: 'item 3', firstname: 'c', value: 3},
                {lastname: 'item 4', firstname: 'd', value: 4},
                {lastname: 'item 5', firstname: 'e', value: 5}
            ]),

            listItemView: M.ListItemView.extend({}, {

                lastname: M.View.extend({
                    useParentValue: YES,
                    extendTemplate: '<%= lastname %>',
                }),
                firstname: M.View.extend({
                    useParentValue: YES,
                    extendTemplate: '<%= firstname %>',
                }),
                val: M.View.extend({
                    useParentValue: YES,
                    extendTemplate: '<%= value %>',
                })
            })
        });

        var testView = TV.create();
        testView.render();

        testView = null;

        TV = null;

    });

    it('getListItemFooter / getListItemHeader', function() {

        var TEST_PROP = 'TEST';

        var testView = M.ListView.create();
        assert.isNull(testView.getListItemFooter);

        var testView = M.ListView.extend({
            getListItemFooter: function() {
                return TEST_PROP
            }
        }).create();
        assert.isFunction(testView.getListItemFooter);
        assert.equal(testView.getListItemFooter(), TEST_PROP);

        var testView = M.ListView.create();
        assert.isNull(testView.getListItemHeader);

        var testView = M.ListView.extend({
            getListItemHeader: function() {
                return TEST_PROP
            }
        }).create();
        assert.isFunction(testView.getListItemHeader);
        assert.equal(testView.getListItemHeader(), TEST_PROP);

        var testView = M.ListView.extend({
            getListItemHeader: function() {
                return TEST_PROP
            },
            getListItemFooter: function() {
                return TEST_PROP
            }
        }).create();
        assert.isFunction(testView.getListItemHeader);
        assert.equal(testView.getListItemHeader(), TEST_PROP);
        assert.isFunction(testView.getListItemFooter);
        assert.equal(testView.getListItemFooter(), TEST_PROP);

    });

    it('_getListItemFooter / _getListItemHeader', function() {

        var TEST_ITEM = {testItem1: '1', testItem2: '2'};

        //----- FOOTER

        var testView = M.ListView.create();

        assert.isNull(testView._getListItemFooter());

        var testView = M.ListView.extend({

            getListItemFooter: function( model, index ) {
                return {
                    item: model,
                    index: index
                }
            }
        }).create();

        assert.isFunction(testView._getListItemFooter);
        assert.deepEqual(testView._getListItemFooter(TEST_ITEM, 1), {
            item: TEST_ITEM,
            index: 1
        });

        //----- HEADER

        var testView = M.ListView.create();

        assert.isNull(testView._getListItemHeader());

        var testView = M.ListView.extend({

            getListItemHeader: function( model, index ) {
                return {
                    item: model,
                    index: index
                }
            }
        }).create();

        assert.isFunction(testView._getListItemHeader);
        assert.deepEqual(testView._getListItemHeader(TEST_ITEM, 1), {
            item: TEST_ITEM,
            index: 1
        });


        //----- BOTH

        var testView = M.ListView.extend({

            getListItemFooter: function( model, index ) {
                return {
                    item: model,
                    index: index
                }
            },

            getListItemHeader: function( model, index ) {
                return {
                    item: model,
                    index: index
                }
            }
        }).create();

        assert.isFunction(testView._getListItemHeader);
        assert.deepEqual(testView._getListItemHeader(TEST_ITEM, 1), {
            item: TEST_ITEM,
            index: 1
        });

        assert.isFunction(testView._getListItemFooter);
        assert.deepEqual(testView._getListItemFooter(TEST_ITEM, 1), {
            item: TEST_ITEM,
            index: 1
        });


    });


    it('_getListItem', function() {

        // default
        var testView = M.ListView.extend().create();
        assert.isTrue(M.isView(testView._getListItem()));
        assert.equal(testView._getListItem()._type, M.ListItemView.prototype._type);
        assert.isTrue(M.ListItemView.prototype.isPrototypeOf(testView._getListItem()));


        // listItemView

        var TEST_PROP = 'TEST'

        var testView = M.ListView.extend({
            listItemView: M.ListItemView.extend({
                testProperty: TEST_PROP
            })
        }).create();
        assert.isTrue(M.isView(testView._getListItem()));
        assert.equal(testView._getListItem()._type, M.ListItemView.prototype._type);
        assert.isTrue(M.ListItemView.prototype.isPrototypeOf(testView._getListItem()));
        assert.equal(testView._getListItem().testProperty, TEST_PROP);

        // getter

        // listItemView

        var TEST_PROP = 'TEST'

        var testView = M.ListView.extend({
            getListItem: function() {
                return this.listItemView;
            },
            listItemView: M.ListItemView.extend({
                testProperty: TEST_PROP
            })
        }).create();
        assert.isTrue(M.isView(testView._getListItem()));
        assert.equal(testView._getListItem()._type, M.ListItemView.prototype._type);
        assert.isTrue(M.ListItemView.prototype.isPrototypeOf(testView._getListItem()));
        assert.equal(testView._getListItem().testProperty, TEST_PROP);
        assert.isFunction(testView.listItemView);


    });

    it('nonsense listItemView', function() {
        // nonsense
        var testView = M.ListView.extend({
            value: M.Collection.create([
                {item: '1'}
            ]),
            listItemView: {}
        });

        assert.throw(testView.create().render, TypeError);

        var testView = M.ListView.extend({
            value: M.Collection.create([
                {item: '1'}
            ]),
            listItemView: true
        });

        assert.throw(testView.create().render, TypeError);

        var testView = M.ListView.extend({
            value: M.Collection.create([
                {item: '1'}
            ]),
            listItemView: 1
        });

        var testView = M.ListView.extend({
            value: M.Collection.create([
                {item: '1'}
            ]),
            getListItem: function() {
            }
        });

        assert.throw(testView.create().render, TypeError);

        var testView = M.ListView.extend({
            value: M.Collection.create([
                {item: '1'}
            ]),
            getListItem: function() {
                return null
            }
        });

        assert.throw(testView.create().render, TypeError);

        var testView = M.ListView.extend({
            value: M.Collection.create([
                {item: '1'}
            ]),
            getListItem: 1
        });

        assert.throw(testView.create().render, TypeError);

        var testView = M.ListView.extend({
            value: M.Collection.create([
                {item: '1'}
            ]),
            getListItem: true
        });

        assert.throw(testView.create().render, TypeError);

    });

    it('_filterValue', function() {

        var testView = M.ListView.extend().create();
        assert.isTrue(testView._filterValue);
        assert.isTrue(testView.getFilterValue());
        testView.setFilterValue(false);
        assert.isFalse(testView.getFilterValue());
    });

    it('filter implementation useRenderUpdateFilter = true', function() {

        var collection = M.Collection.create([
            {lastname: 'black', firstname: 'anton'},
            {lastname: 'müller', firstname: 'aron'},
            {lastname: 'müller', firstname: 'absinthe'},
            {lastname: 'akkerman', firstname: 'bernhard'},
            {lastname: 'kewlman', firstname: 'coolio'},
            {lastname: 'null', firstname: 'druk'},
            {lastname: 'bender', firstname: 'dirk'},
            {lastname: 'false', firstname: 'eric'},
            {lastname: 'drop table *;', firstname: 'erico'}
        ]);

        var testView = M.ListView.extend({

            useRenderUpdateFilter: YES,

            value: collection,

            filterBy: function(model) {

                if(this.getFilterValue() === true){
                    return true;
                }
                var val = this.getFilterValue();
                if(model.get('firstname').indexOf(val.val) >= 0 || model.get('lastname').indexOf(val.val)  >= 0){
                    return true;
                }

                return false;
            },

            getListItem: function( model, index ) {
                return M.ListItemView.extend({
                    childViews: {
                        firstname: M.View.extend({
                            useParentValue: YES,
                            extendTemplate: '<%= firstname %>'
                        }),
                        lastname: M.View.extend({
                            useParentValue: YES,
                            extendTemplate: '<%= lastname %>'
                        })
                    }
                });
            }
        }).create().render();

        assert.lengthOf(testView.$el.find('ul .listitemView'), collection.models.length);
        testView.filter({val: 'anton'});
        assert.lengthOf(testView.$el.find('ul .listitemView'), 1);
        testView.filter(true);
        assert.lengthOf(testView.$el.find('ul .listitemView'), collection.models.length);
        testView.filter({val: 'a'});
        assert.lengthOf(testView.$el.find('ul .listitemView'), 7);
        testView.setFilterValue(true);
        testView.filter();
        assert.lengthOf(testView.$el.find('ul .listitemView'), collection.models.length);
    });

    it('filter implementation useRenderUpdateFilter = false', function() {

        var collection = M.Collection.create([
            {lastname: 'black', firstname: 'anton'},
            {lastname: 'müller', firstname: 'aron'},
            {lastname: 'müller', firstname: 'absinthe'},
            {lastname: 'akkerman', firstname: 'bernhard'},
            {lastname: 'kewlman', firstname: 'coolio'},
            {lastname: 'null', firstname: 'druk'},
            {lastname: 'bender', firstname: 'dirk'},
            {lastname: 'false', firstname: 'eric'},
            {lastname: 'drop table *;', firstname: 'erico'}
        ]);

        var testView = M.ListView.extend({

            value: collection,

            filterBy: function(model) {

                if(this.getFilterValue() === true){
                    return true;
                }
                var val = this.getFilterValue();
                if(model.get('firstname').indexOf(val.val) >= 0 || model.get('lastname').indexOf(val.val)  >= 0){
                    return true;
                }

                return false;
            },

            getListItem: function( model, index ) {
                return M.ListItemView.extend({
                    childViews: {
                        firstname: M.View.extend({
                            useParentValue: YES,
                            extendTemplate: '<%= firstname %>'
                        }),
                        lastname: M.View.extend({
                            useParentValue: YES,
                            extendTemplate: '<%= lastname %>'
                        })
                    }
                });
            }
        }).create().render();

        assert.lengthOf(testView.$el.find('ul .listitemView'), collection.models.length);
        testView.filter({val: 'anton'});
        assert.lengthOf(testView.$el.find('[style*="display: block"]'), 1);
        testView.filter(true);
        assert.lengthOf(testView.$el.find('[style*="display: block"]'), collection.models.length);
        testView.filter({val: 'a'});
        assert.lengthOf(testView.$el.find('[style*="display: block"]'), 7);
        testView.setFilterValue(true);
        testView.filter();
        assert.lengthOf(testView.$el.find('[style*="display: block"]'), collection.models.length);
    });

});
