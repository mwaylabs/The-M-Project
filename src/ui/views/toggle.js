// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.ToggleView
 *
 * @type {*}
 * @extends M.View
 */
M.ToggleView = M.View.extend({

    _type: 'M.ToggleView',

    _templateString: M.TemplateManager.get('toggle.ejs'),

    initialize: function () {
        M.View.prototype.initialize.apply(this, arguments);
    },

    render: function (settings) {
        //this._assignValue();
        this._preRender(settings);
        this._render(settings);
        this._renderChildViews(settings);
        this._postRender(settings);
        return this;
    }

});