M.ButtonGroupView = M.View.extend({

    _type: 'M.ButtonGroupView',

    _template: _.tmpl(M.TemplateManager.get('M.ButtonGroupView')),

    _internalCssClasses: 'clearfix',

    setActive: function (view) {

        var setActiveView = M.isView(view) ? view : this._getChildView(view);
        _.each(this.childViews, function (child) {
            child.deactivate();
        }, this);
        setActiveView.activate();
    },

    getActive: function () {
        return _.find(this._childViews, function (view) {
            return view.isActive();
        }, this);
    },

    initialize: function () {
        M.View.prototype.initialize.apply(this, arguments);
        var that = this;
        if (this._childViews) {
            var gridSize = M.CONST.GRID.COLUMNS / Object.keys(this._childViews).length;
            _.each(this._childViews, function (child, key) {
                this._childViews[key] = child.extend({
                    grid: 'col-xs-' + gridSize,
                    _internalEvents: {
                        tap: [function (events, element) {
                            that.setActive(element);
                        }]
                    }
                });
            }, this);
        }

    },

    _addClassNames: function(){
        M.View.prototype._addClassNames.apply(this, arguments);
    }
});
