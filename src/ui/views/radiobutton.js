/**
 * M.ButtonView inherits from M.View
 * @type {*}
 */

M.RADIOBUTTON_VIEW = 'M.RadiolistView';
M.RADIOOPTION_VIEW = 'M.RadioOptionView';

M.RadiolistView = M.SelectionlistView.extend({

    /**
     * The type of the object
     * @private
     */
    _type: M.RADIOBUTTON_VIEW,

    /**
     * The template of the object before initializing it.2
     * @private
     */
    _template: _.tmpl(M.TemplateManager.get(M.RADIOBUTTON_VIEW)),
    _optionTemplate: _.tmpl(M.TemplateManager.get(M.RADIOOPTION_VIEW)),
    _optionsContainer: 'radio'

});


