/**
 * @module M.ListItemView
 *
 * @type {*}
 * @extends M.View
 */
M.ListItemView = M.View.extend({

    /**
     * The type of the view
     * @type String
     * @private
     */
    _type: 'M.ListItemView',

    /**
     * The template of the view
     *
     */
    _template: _.tmpl(M.TemplateManager.get('M.ListItemView')),

    /**
     * The type of the listitem. Default is 'basic' and just displays the value
     * @type {String} select from the M.ListItemView.CONS
     * @example
     *
     * M.ListItemView.extend({
     *
     *   type: M.ListItemView.CONS.LINKED
     *
     * });
     *
     */
    type: 'basic',

    initialize: function() {
        M.View.prototype.initialize.apply(this, arguments);
        if( this.templateExtend ) {
            this.template = _.tmpl(this.template({value: this.templateExtend}));
        }
    }
}).implements([M.ActiveState]);


M.ListItemView.CONS = {
    LINKED: 'linked',
    BASIC: 'basic'
}