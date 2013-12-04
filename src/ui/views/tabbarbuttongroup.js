// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.ButtonGroupView
 * @type {*}
 * @extends M.View
 */
M.TabbarButtonGroupView = M.ButtonGroupView.extend({

    _type: 'M.TabbarButtonGroupView',

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
});
