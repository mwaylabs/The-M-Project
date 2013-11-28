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
    _template: _.tmpl(M.TemplateManager.get('M.ToolbarView'))

});