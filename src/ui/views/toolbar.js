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
    _template: _.tmpl(M.TemplateManager.get('M.ToolbarView')),

    /**
     * Determines if the Toolbar should display a back button or not
     * @type {Boolean|Object}
     */
//    backButton: NO,

//    initialize: function(){
//        M.View.prototype.initialize.apply(this, arguments);
//    }



});