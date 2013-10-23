(function(scope){

    M.ListView = M.View.extend({
        _type: 'M.ListView',

        _viewModelMapping: null,

        template: _.tmpl(M.TemplateManager.get('M.ListView')),

        _render: function() {
            M.View.prototype._render.apply(this, arguments);
        },

        _renderChildViews: function() {
            if( this.collection ) {
                this.addItems(this.collection.models);
            }
        },

        initialize: function( options ) {
            var that = this;
            M.View.prototype.initialize.apply(this, arguments);

            if( this.collection ) {
                this._applyListener();
            }
            this._viewModelMapping = {};
        },

        _applyListener: function() {

            //            this.listenTo(this.collection, 'all', function( a,b,c ) {
            //                console.log('ALLLLL', a,b,c);
            //            });

            this.listenTo(this.collection, 'add', function( model, collection ) {
                console.log('add');
                this.addItem(model);
            });

            this.listenTo(this.collection, 'fetch', function() {
                console.log('fetch');
                //that.addAll();
            });
            this.listenTo(this.collection, 'change', function() {
                console.log('change!');
                //that.addAll();
            });
            this.listenTo(this.collection, 'remove', function( model ) {
                this._viewModelMapping[model.cid].$el.remove();
            });

            this.listenTo(this.collection, 'filter', function( models ) {
                console.log('filter');
                //this.addItems(models);
            });

            this.listenTo(this.collection, 'sort', function( collection ) {
                //this.addItems(this.collection.models);
                console.timeEnd('a');
            });
        },

        addItems: function( models ) {
            _.each(models, function( model ) {
                this.addItem(model);
            }, this);
        },

        addItem: function( model ) {
            var view = null;
            if( this.listItemView ) {
                view = this.listItemView.design({
                    scope: this.scope,
                    value: model
                });
                this._viewModelMapping[view.model.cid] = view;
                var el = view.render().$el;
                this.$el.find('[data-childviews="list"]').append(el);
            }
        }
    });

})(this);