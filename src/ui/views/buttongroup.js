(function( scope ) {

    M.ButtonGroupView = M.View.extend({

        _type: 'M.ButtonGroupView',
        _template: _.tmpl(M.TemplateManager.get('M.ButtonGroupView')),

        setActive: function( view ) {
            _.each(this.childViews, function( child ) {
                child.deactivate();
            }, this);
            view.activate();
        },

        getActive: function() {
            return _.find(this._childViews, function( view ) {
                return view.isActive();
            }, this);
        },

        initialize: function() {
            var that = this;
            var gridSize = M.CONST.GRID.COLUMNS / Object.keys(this._childViews).length;
            _.each(this._childViews, function( child, key ) {
                this._childViews[key] = child.extend({
                    grid: 'col-xs-'+gridSize,
                    _internalEvents: {
                        tap: [function( events, element ) {
                            that.setActive(element);
                        },
                            function( events, element ) {
                                console.log('tap');
                            }]
                        ,
                        doubletap: [function( events, element ) {

                        },
                            function( events, element ) {
                                console.log('doubletap');
                            }]
                    }
                })
            }, this);
        }
    });

})(this);