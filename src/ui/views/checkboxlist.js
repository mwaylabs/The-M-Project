/**
 * M.ButtonView inherits from M.View
 * @type {*}
 */

M.CHECKBOXBUTTON_VIEW = 'M.CheckboxlistView';
M.CHECKBOXOPTION_VIEW = 'M.CheckboxOptionView';

M.CheckboxlistView = M.SelectionlistView.extend({

    /**
     * The type of the object
     * @private
     */
    _type: M.CHECKBOXBUTTON_VIEW,

    /**
     * The template of the object before initializing it.
     * @private
     */
    _template: _.tmpl(M.TemplateManager.get(M.CHECKBOXBUTTON_VIEW)),

    _optionTemplate: _.tmpl(M.TemplateManager.get(M.CHECKBOXOPTION_VIEW)),

    _optionsContainer: 'checkbox'

});


