// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.ImageView
 *
 * @type {*}
 * @extends M.View
 */
M.ImageView = M.View.extend({

    _type: 'M.ImageView',

    _templateString: M.TemplateManager.get('image.ejs'),

    /**
     * Represents the alt attribute of the img tag
     */
    alt: null,

    initialize: function () {
        M.View.prototype.initialize.apply(this, arguments);
        this.alt = this.alt || '';
        return this;
    },

    /**
     * Override this function to add 'alt' parameter
     * @private
     * @returns this
     */
    _assignTemplateValues: function () {

        M.View.prototype._assignTemplateValues.apply(this, arguments);

        var _value = this._getValue();

        if (this.model) {
            if (M.isModel(_value)) {
            } else {
                this._templateValues.alt = this.model.get(this.alt.attribute);
            }
        } else if (_value || typeof _value === 'string') {
            this._templateValues.alt = this.alt;
        }
        return this;
    }
});