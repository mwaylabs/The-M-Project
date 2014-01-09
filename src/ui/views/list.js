// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.ListView
 *
 * @type {*}
 * @extends M.View
 * @example
 * M.ListView.extend({

                    value: M.Collection.create([
                        {lastname: 'black', firstname: 'anton', header: true},
                        {lastname: 'müller', firstname: 'aron'},
                        {lastname: 'müller', firstname: 'absinthe', footer: true},
                        {lastname: 'akkerman', firstname: 'bernhard', header: true, footer: true},
                        {lastname: 'kewlman', firstname: 'coolio', header: true, footer: true},
                        {lastname: 'null', firstname: 'druk', header: true},
                        {lastname: 'bender', firstname: 'dirk',footer: true},
                        {lastname: 'false', firstname: 'eric', header: true},
                        {lastname: 'drop table *;', firstname: 'erico', header: true, footer: true}
                    ]),

                    getListItemHeader: function(model, index){
                        if(model.get('header')){
                            return M.ListItemView.extend({
                                cssClass: 'listHeader',
                                value: 'Start: ' + model.get('firstname').slice(0,1).toUpperCase(),
                                enabled: NO
                            });
                        }
                    },

                    getListItemFooter: function(model, index){
                        if(model.get('footer')){
                            return M.ListItemView.extend({
                                cssClass: 'listFooter',
                                value: 'End: ' + model.get('firstname').slice(0,1).toUpperCase(),
                                enabled: NO
                            });
                        }
                    },

                    getListItem: function(model, index){

                        var cssClass = 'even';
                        if(index % 2){
                            cssClass = 'odd'
                        }
                        return M.ListItemView.extend({
                            cssClass: cssClass,
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
                });

 // SortBy Example:

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
 // display only the first entry
 testView.filter({val: 'anton'});
 // display all
 testView.filter();
 // or
 testView.setFilterValue(true);
 testView.filter();
 *
 *
 */
M.ListView = M.View.extend({


    /**
     * The type of the view
     * @type {String}
     * @private
     */
    _type: 'M.ListView',

    /**
     * A map to access the view with the model cid
     * @type {Object}
     * @private
     */
    _viewModelMapping: null,


    /**
     * The template of the view
     * @type {function}
     * @private
     */
    _template: null,

    /**
     * The template blueprint of the view
     * @type {String}
     * @private
     */
    _templateString: M.TemplateManager.get('M.ListView'),

    /**
     * The blueprint for every list item. Overwrite the property with a view prototype to display every list entry with this object.
     * @type {function}
     */
    listItemView: null,


    /**
     * The childViews of a list are the items therefore the renderChildViews implements its own add strategie
     * @private
     * @returns {M.ListView}
     */
    _renderChildViews: function() {
        if( this.collection ) {
            // add all models to the view
            this._renderItems(this.collection.filter(this.filterBy, this));
        }
        // TODO: evaluate this:
        //        else if(this.getValue()) {
        //            this._renderItems(this.collection.filter(this.filterBy, context));
        //        }
        return this;
    },

    /**
     * The initialization of the view
     * @returns {M.ListView}
     */
    initialize: function() {
        // call super
        M.View.prototype.initialize.apply(this, arguments);
        // if there is a collection add collection listener
        if( this.collection ) {
            this._applyListener();
        }
        // initialize the mapping to cache the access to a view
        this._viewModelMapping = {};
        return this;
    },

    /**
     * Adds listeners 'add', 'fetch, 'change', 'remove' and 'sort'for the collection.
     * @private
     * @returns {M.ListView}
     */
    _applyListener: function() {
        this.listenTo(this.collection, 'add', function( model ) {
            // add an item to the view
            this._renderEntry(model);
        });

        this.listenTo(this.collection, 'fetch', function() {
            // TODO: implement behavior
        });
        this.listenTo(this.collection, 'change', function() {
            // TODO: implement behavior
        });
        this.listenTo(this.collection, 'remove', function( model ) {
            this._viewModelMapping[model.cid].$el.remove();
        });

        this.listenTo(this.collection, 'sort', function() {
            // TODO: implement a better behavior
            this.render();
        });

        return this;
    },

    /**
     * renders all items of the view
     * @param models
     * @returns {M.ListView}
     */
    _renderItems: function( models ) {
        _.each(models, function( model, index ) {
            this._renderEntry(model, index);
        }, this);
        return this;
    },

    /**
     * Render a single entry. First render its header then the actual content and then as last a possible footer.
     * @param model the model of the entry
     * @param index the index of the entry
     * @returns {M.ListView}
     */
    _renderEntry: function( model, index ) {
        this._renderItem(this._getListItemHeader(model, index));
        this._renderItem(this._getListItem(model, index));
        this._renderItem(this._getListItemFooter(model, index));
        return this;
    },

    /**
     * Renders the given view to the list.
     * @param listItemView
     * @returns {M.ListView|undefined}
     * @private
     */
    _renderItem: function( listItemView ) {

        // if there is no given view return undefined
        if( !listItemView ) {
            return void 0;
        }

        if( M.View.prototype.isPrototypeOf(listItemView.prototype) && _.isFunction(listItemView) ) {
            listItemView = listItemView.create();
        }

        listItemView.render();
        this.$el.find('[data-childviews="list"]').append(listItemView.$el);
        if( listItemView.model && listItemView.model.cid ) {
            this._viewModelMapping[listItemView.model.cid] = listItemView;
        }
        listItemView.delegateEvents();
        return this;
    },

    /**
     * Returns a instance of a ListItem. The highest priority has the getListItem getter. then the listItemView property. If nothing is given a M.ListItemView instance gets returned.
     * @param model
     * @param index
     * @returns {M.ListView}
     * @private
     */
    _getListItem: function( model, index ) {

        // if the getListItem function is implemented return an instance of the view that gets returned from the getListItem function
        if( _.isFunction(this.getListItem) ) {
            return this.getListItem(model, index).create({
                scope: this.scope,
                value: model
            });
        }

        // if the getListItem function is not implemented but the listItemView property return an instance of the listItemView property
        if( this.listItemView ) {
            return this.listItemView.create({
                scope: this.scope,
                value: model
            });
        }

        // if none of the above kicks in return a instance of the ListItemView
        return M.ListItemView.create({
            scope: this.scope,
            value: model,
            enable: NO
        });
    },

    /**
     * Overwrite this with a function that gets called for every listItem. Return a View prototype of the content that represents an entry
     * @param model
     * @param index
     * @type {Function}
     */
    getListItem: null,

    /**
     * Internal call for the list item header
     * @param model
     * @param index
     * @returns {*}
     * @private
     */
    _getListItemHeader: function( model, index ) {
        // if the user overwrites the getListItemHeader with a function return that
        if( _.isFunction(this.getListItemHeader) ) {
            return this.getListItemHeader(model, index);
        }
        return this.getListItemHeader;
    },

    /**
     * Overwrite this with a function that gets called for every listItem. Return a View prototype of the content that represents an entry. This will be displayed above the getListItem element.
     */
    getListItemHeader: null,

    /**
     * Internal call for the list item footer
     * @param model
     * @param index
     * @returns {*}
     * @private
     */
    _getListItemFooter: function( model, index ) {
        // if the user overwrites the getListItemHeader with a function return that
        if( _.isFunction(this.getListItemFooter) ) {
            return this.getListItemFooter(model, index);
        }
        return this.getListItemFooter;
    },

    /**
     * Overwrite this with a function that gets called for every listItem. Return a View prototype of the content that represents an entry. This will be displayed below the getListItem element.
     * @param model
     * @param index
     * @type {Function}
     */
    getListItemFooter: null,

    /**
     * Gets called for every collection entry. Return true to add the entry to the list and false to remove it from the list view
     * @param model
     * @returns {*}
     *
     */
    filterBy: function( model ) {
        return this.getFilterValue();
    },

    /**
     * Trigger a filter on the list. This will not effect the collection only the visibility of a list entry
     * The given filterValue is accessable with the getter: getFilterValue
     * @param filterValue
     * @returns {*}
     */
    filter: function( filterValue ) {
        this.setFilterValue(filterValue);
        this.$el.find('[data-childviews="list"]').empty();
        this._renderChildViews();
        return this;
    },

    /**
     * Stores an object to access in the filterBy method.
     * The value can be set via setFilterValue and get with getFilterValue.
     */
    _filterValue: true,

    /**
     * Sets the _filterValue property
     * @param filterValue
     * @returns {*}
     */
    setFilterValue: function( filterValue ) {
        var val = typeof filterValue === 'undefined' ? YES : filterValue;
        this._filterValue = val;
        return this;
    },

    /**
     * Return the _filterValue property
     * @returns {boolean}
     */
    getFilterValue: function() {
        return this._filterValue;
    }
});