/**
 * @module M.ImageView
 *
 * @type {*}
 * @extends M.View
 */
M.ImageView = M.View.extend({

    _type: 'M.ImageView',
    _template: _.tmpl(M.TemplateManager.get('M.ImageView')),

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

        if (this.model) {
            if (M.isModel(this._value_)) {
            } else {
                this._templateValues.alt = this.model.get(this.alt.attribute);
            }
        } else if (this._value_ || typeof this._value_ === 'string') {
            this._templateValues.alt = this.alt;
        }
        return this;
    }
});