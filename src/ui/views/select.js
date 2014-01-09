// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.SelectView
 *
 * @type {*}
 * @extends M.View
 */
M.SelectView = M.View.extend({

    _type: 'M.SelectView',

    isMultiple: NO,

    _templateString: M.TemplateManager.get('select.ejs'),

    _assignBinding: function () {
        M.View.prototype._assignBinding.apply(this, arguments);
        if (this.selectOptions) {
            _.each(this.bindings, function (value) {
                value.selectOptions = this.selectOptions;
            }, this);
        }
        return this;
    },

    _assignTemplateValues: function () {
        M.View.prototype._assignTemplateValues.apply(this);
        this._templateValues.isMultiple = this.isMultiple;
    }
});