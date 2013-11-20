/**
 *
 * @type {M|*}
 *
 * A input field.
 * @implements M.IconBackground
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

    /**
     * Gets a internationalized version of the label and add this to the templateValues
     * @private
     */
    _addLabelToTemplateValues: function() {
        this._templateValues.label = this._getInternationalizedTemplateValue(this.label);
    },

    /**
     * Gets a internationalized version of the placeholder and add this to the templateValues
     * @private
     */
    _addPlaceholderToTemplateValues: function() {
        this._templateValues.placeholder = this._getInternationalizedTemplateValue(this.placeholder);
    },

    /**
     * Add the type of the textfieldview to the template values
     * @private
     */
    _addTypeToTemplateValues: function() {
        this._templateValues.type = this.type;
    },

    /**
     * Add the type of the icon to the template values, if no icon is set the value is empty string
     * @private
     */
    _addIconToTemplateValues: function() {
        this._templateValues.icon = this.icon || '';
    },

    /**
     * This function needs to be implemented to render the view if there is no value given
     * @returns {Boolean|Function|YES}
     * @private
     */
    _attachToDom: function(){
        return YES;
    }
});