/**
 *
 * @type {M|*}
 *
 * A input field.
 *
 */
M.TextfieldView = M.View.extend({

    /**
     * The type of the input.
     * @private
     */
    _type: 'M.TextfieldView',

    /**
     * The label of the input.
     */
    label: null,

    /**
     * The type of the input. Default is search to have the cancel button
     */
    type: 'search',

    /**
     * HTML Placeholder
     */
    placeholder: null,

    /**
     * String - The icon for a Textfieldview. Use a icon from font-awesome. Default is the icon on the left. give the parent div a class right and it will be displayed on the right
     * @example
     *
     * example1: M.TextfieldView.extend({
                grid: 'col-xs-12',
                label: 'Label',
                value: '',
                icon: 'fa-rocket',
                placeholder: 'Rocket'
            }),

     backgroundRightTextfieldExample: M.TextfieldView.extend({
                grid: 'col-xs-12',
                label: 'Label',
                value: '',
                cssClass: 'right',
                icon: 'fa-dot-circle-o',
                placeholder: 'Dot'
            }),
     *
     */
    icon: null,

    /**
     * the template of the input
     */
    _template: _.tmpl(M.TemplateManager.get('M.TextfieldView')),

    /**
     * Add all the template values
     */
    _assignTemplateValues: function() {
        M.View.prototype._assignTemplateValues.apply(this);
        this._addLabelToTemplateValues();
        this._addTypeToTemplateValues();
        this._addPlaceholderToTemplateValues();
        this._addIconToTemplateValues();
    },

    _addLabelToTemplateValues: function() {
        this._templateValues.label = this._getInternationalizedTemplateValue(this.label);
    },

    _addPlaceholderToTemplateValues: function() {
        this._templateValues.placeholder = this._getInternationalizedTemplateValue(this.placeholder);
    },

    _addTypeToTemplateValues: function() {
        this._templateValues.type = this.type;
    },

    _addIconToTemplateValues: function() {
        this._templateValues.icon = this.icon || '';
    },

    initialize: function() {
        M.View.prototype.initialize.apply(this);
    },

    _attachToDom: function() {
        return YES;
    }
}).implements([M.IconBackground]);