// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * A View to display text. It's like a Textfieldview with icon and label but without edit mode
 * @type {*|Object|void}
 * @module M.TextView
 * @example
 * M.TextView.extend({
        label: 'Cloud',
        icon: 'fa-cloud',
        value: 'Cloud based Saas'
    }),
 *
 */
M.TextView = M.View.extend({

    /**
     * The type of the input.
     * @private
     */
    _type: 'M.TextView',

    /**
     * The label of the input.
     */
    label: null,

    /**
     * String - The icon for a Textfieldview. Use a icon from font-awesome. Default is the icon on the left. give the parent div a class right and it will be displayed on the right
     *
     */
    icon: null,

    /**
     * the template of the input
     */
    _templateString: M.TemplateManager.get('text.ejs'),

    /**
     * Add all the template values
     */
    _assignTemplateValues: function() {
        M.View.prototype._assignTemplateValues.apply(this);
        this._addLabelToTemplateValues();
        this._addIconToTemplateValues();
        return this;
    },

    /**
     * Gets a internationalized version of the label and add this to the templateValues
     * @private
     */
    _addLabelToTemplateValues: function() {
        this._templateValues.label = this._getInternationalizedTemplateValue(this.label);
        return this;
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
    _attachToDom: function() {
        return YES;
    }
});