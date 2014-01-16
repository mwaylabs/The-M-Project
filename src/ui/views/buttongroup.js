// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.ButtonGroupView
 * @type {*}
 * @extends M.View
 */
M.ButtonGroupView = M.View.extend({

    _type: 'M.ButtonGroupView',

    _templateString: M.TemplateManager.get('buttongroup.ejs'),

    _internalCssClasses: 'clearfix',

    setActive: function( view ) {

        var setActiveView = M.isView(view) ? view : this._getChildView(view);
        _.each(this.childViews, function( child ) {
            child.deactivate();
        }, this);
        setActiveView.activate();
    },

    getActive: function() {
        return _.find(this._childViews, function( view ) {
            return view.isActive();
        }, this);
    },

    initialize: function() {
        M.View.prototype.initialize.apply(this, arguments);
        var that = this;
        if( this._childViews ) {
            _.each(this._childViews, function( child, key ) {

                this._childViews[key] = child.extend({
                    _isInButtonGroup: YES,
                    _internalEvents: {
                        touchstart: [function( events, element ) {
                            that.setActive(element);
                        }],
                        mousedown: [function( events, element ) {
                            that.setActive(element);
                        }]
                    }
                });
            }, this);
        }

    },

    _preRender: function() {
        M.View.prototype._preRender.apply(this, arguments);
        _.each(this.childViews, function( child ) {
            if( child.selected ) {
                this.setActive(child);
            }
        }, this);
    },

    _addClassNames: function() {
        M.View.prototype._addClassNames.apply(this, arguments);
    }
});
