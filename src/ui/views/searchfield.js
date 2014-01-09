// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.SearchfieldView
 *
 * @type {*}
 * @extends M.TextfieldView
 */
M.SearchfieldView = M.TextfieldView.extend({

    _type: 'M.SearchfieldView',

    placeholder: 'Search',

    _templateString: M.TemplateManager.get('searchfield.ejs'),

    initialize: function () {
        M.View.prototype.initialize.apply(this);
    },

    _assignTemplateValues: function () {
        M.TextfieldView.prototype._assignTemplateValues.apply(this);
        this._templateValues.placeholder = this.placeholder || '';
    }
});
