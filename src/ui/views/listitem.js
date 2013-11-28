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
     * select from the M.ListItemView.CONS
     * @type {String}
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

    icon: 'fa-angle-right',

    /**
     * sets the view in the creation process to be enabled or disabled
     * @type {Boolean}
     */

    initialize: function() {
        M.View.prototype.initialize.apply(this, arguments);
        this._applyBehaviour();
    },

    /**
     * returns the value of the icon inside of the listitem view
     * @returns {*|String|Array|Object|Choice|Undefined|key|*}
     * @type {function}
     * @example
     *
     * linkedCustomIconOnList: M.ListView.extend({

                    grid: 'col-xs-12',

                    _value_: M.Collection.create([
                        {_value_: 'Android'},
                        {_value_: 'Linux'},
                        {_value_: 'Apple'},
                        {_value_: 'Windows'}
                    ]),

                    listItemView: M.ListItemView.extend({
                        type: M.ListItemView.CONS.ICON,
                        getIcon: function() {
                            return 'fa-' + this.model.get('_value_').toLocaleLowerCase();
                        }
                    })

                })
     */
    getIcon: function() {
        return this.model.get('icon') || this.icon;
    },

    /**
     * Set properties regarding to the selected type
     * @private
     */
    _applyBehaviour: function() {

        if( this.type === M.ListItemView.CONS.ICON ) {
            this.enabled = NO;
        }

        if( this.type === M.ListItemView.CONS.LINKED || this.type === M.ListItemView.CONS.ICON ) {
            this.template = _.tmpl(M.TemplateManager.get('M.ListItemViewLinked'));
        }

        if( this.templateExtend ) {
            this.template = _.tmpl(this.template({value: this.templateExtend}));
        }
    },

    _assignTemplateValues: function() {
        M.View.prototype._assignTemplateValues.apply(this, arguments);
        if( this.type === M.ListItemView.CONS.LINKED || this.type === M.ListItemView.CONS.ICON ) {
            this._templateValues.icon = this.getIcon();
        }
    },

    _postRender: function() {
        M.View.prototype._postRender.apply(this, arguments);
        if( this.enabled === NO && this.disable ) {
            this.disable();
        }
    }

}).implements([M.ActiveState, M.ViewEnableState]);

/**
 * Constant that specifies the behaviour of the ItemView
 * @type {{LINKED: number, BASIC: number, ICON: number}}
 */
M.ListItemView.CONS = {
    LINKED: 1,
    BASIC: 2,
    ICON: 3
};