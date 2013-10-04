M.ListView = M.View.extend({

    _type: 'M.ListView',

    template: _.tmpl('<div data-child-view="list"></div>'),

    viewMapping: {},

    _lastDividerValue: null,

    beforeRender: function() {
        console.log('before list render');
        if( this.hasRendered ) {
            this.addAll();
        }

    },

    initialize: function() {
        var that = this;
        M.View.prototype.initialize.apply(this, arguments);

        this.listenTo(this.model, 'add', function( model, collection ) {
            that.addOne(model, true);
        });

        this.listenTo(this.model, 'fetch', function() {
            console.log('fetch');
            that.addAll();
        });
        this.listenTo(this.model, 'remove', this.removeOne);

        this.listenTo(this.model, 'sort', this._onSort);

        //            this.listenTo(this.model, 'sync', function( a, b, c ) {
        //                debugger;
        //                //                that.render();
        //            });

        //            this.listenToOnce(this.model, 'reset', function( a, b, c ) {
        //                debugger;
        //                //                that.render();
        //            });

        //            this.addAll.apply(this);
    },

    removeOne: function( removedObj, collection, xhr ) {

        this._getViewMapping(removedObj.cid).remove();
        this._removeViewMapping(removedObj.cid);
    },

    serialize: function() {
        return this;
    },

    addAll: function( render ) {
        this._lastDividerValue = null;
        _.each(this.model.models, function( model ) {
            this._addDivider(model);
            this.addOne.apply(this, [model, render]);
        }, this);


    },

    _addDivider: function( model ) {
        var _divider = this.divider(model);
        var _dividerValue = _divider.options ? _divider.options.value : _divider;
        if( this._lastDividerValue !== _dividerValue ) {
            this._lastDividerValue = _dividerValue;
            this._insertDivider(_divider);
        }
    },

    _insertDivider: function( _divider ) {

        var dividerView = _divider;
        if( !(_.isObject(dividerView) && dividerView.isView()) ) {
            dividerView = M.View.create({
                value: _divider
            });
        }

        this.insertView('[data-child-view="list"]', dividerView);
        dividerView.render();
    },

    addOne: function( model, render ) {

        var view = this.listItemView.create({
            template: this.listItemView.template,
            value: model
        });

        this._addDivider(model);

        this._insertView(view);

        if( render ) {
            view.render();
        }

        //this._setViewMapping(view, model.cid);
    },

    _insertView: function( view ) {
        this.insertView('[data-child-view="list"]', view);
    },

    _setViewMapping: function( view, cid ) {

        this.viewMapping[cid] = view;
    },

    _getViewMapping: function( cid ) {

        return this.viewMapping[cid];
    },

    _removeViewMapping: function( cid ) {

        delete this.viewMapping[cid];
    },

    _renderUpdate: function() {
        this.removeView();
        this.addAll(true);
    },

    _onSort: function( collection ) {
        console.log('SORT');
        this._renderUpdate();
    }
});