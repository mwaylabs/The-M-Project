// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.ToolbarView
 *
 * @type {*}
 * @extends M.View
 */
M.ToolbarView = M.View.extend({

    /**
     * The type of the view
     * @private
     * @type {String}
     */
    _type: 'M.ToolbarView',

    /**
     * The template of the view
     * @private
     * @type {function}
     */
    _templateString: M.TemplateManager.get('toolbar.ejs')

});