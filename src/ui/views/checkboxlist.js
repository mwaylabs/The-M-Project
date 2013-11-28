/**
 * @module M.CheckboxlistView
 *
 * @type {*}
 * @extends M.SelectionlistView
 */
M.CheckboxlistView = M.SelectionlistView.extend({

    /**
     * The type of the object
     * @private
     */
    _type: 'M.CheckboxlistView',

    /**
     * The template of the object before initializing it.
     * @private
     */
    _template: _.tmpl(M.TemplateManager.get('M.CheckboxlistView')),

    _optionTemplate: _.tmpl(M.TemplateManager.get('M.CheckboxOptionView')),

    _optionsContainer: 'checkbox'

});


