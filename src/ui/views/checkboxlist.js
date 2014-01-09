// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

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
    _templateString: M.TemplateManager.get('checkboxlist.ejs'),

    _optionTemplate: _.tmpl(M.TemplateManager.get('checkboxoption.ejs')),

    _optionsContainer: 'checkbox'

});


