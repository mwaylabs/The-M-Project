// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * The {M.RadiolistView} view class render a group of <input type="radio"> HTML elements.
 * An example would be ask the user for his favorite drink. The user can
 * choose between different drinks, but he can only select one of them.
 * @module M.RadiolistView
 *
 * @type {M.RadiolistView}
 * @extend {M.SelectionlistView}
 * @example
 *
 * M.RadioButtonView.extend({
 *     scopeKey: 'userModel.favoriteDrink',
 *     selectOptions: {
 *         collection: [
 *             {id: 1, name: 'Absinthe'},
 *             {id: 2, name: 'Water'},
 *             {id: 3, name: 'Dr Pepper'}
 *         ],
 *         labelPath: 'name',
 *         valuePath: 'id'
 *     }
 * });
 */

M.RadiolistView = M.SelectionlistView.extend({

    /**
     * The type of the object
     * @private
     */
    _type: 'M.RadiolistView',

    /**
     * The template of the object before initializing it.
     * @private
     */
    _templateString: M.TemplateManager.get('radiolist.ejs'),

    /**
     * The template of an option before initializing it.
     * @private
     */
    _optionTemplate: _.tmpl(M.TemplateManager.get('radiooption.ejs')),

    /**
     * Selector name which is used internally to determine the parent dom element.
     * @private
     */
    _optionsContainer: 'radio'
}).implements([M.ActiveState]);


