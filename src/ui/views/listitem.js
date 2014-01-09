// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

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
    _templateString: M.TemplateManager.get('listitem.ejs'),

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

                    value: M.Collection.create([
                        {value: 'Android'},
                        {value: 'Linux'},
                        {value: 'Apple'},
                        {value: 'Windows'}
                    ]),

                    listItemView: M.ListItemView.extend({
                        type: M.ListItemView.CONS.ICON,
                        getIcon: function() {
                            return 'fa-' + this.model.get('_value').toLocaleLowerCase();
                        }
                    })

                })
     */
    getIcon: function() {
        if(this.model){
            return this.model.get('icon');
        }
        return this.icon;
    },

    /**
     * Set properties regarding to the selected type
     * @private
     */
    _applyBehaviour: function() {

        if( this.type === M.ListItemView.CONST.ICON ) {
            this.enabled = NO;
        }

        if( this.type === M.ListItemView.CONST.LINKED || this.type === M.ListItemView.CONST.ICON ) {
            this.template = _.tmpl(M.TemplateManager.get('listitemlinked.ejs'));
        }
    },

    _assignTemplateValues: function() {
        M.View.prototype._assignTemplateValues.apply(this, arguments);
        if( this.type === M.ListItemView.CONST.LINKED || this.type === M.ListItemView.CONST.ICON ) {
            this._templateValues.icon = this.getIcon();
        }
    },

    _postRender: function() {
        M.View.prototype._postRender.apply(this, arguments);
        if( this.enabled === NO && this.disable ) {
            this.disable();
        }
    },

    _renderChildViewToDom: function(dom, child) {
        this._appendToDom(dom.find('li'), child.render().$el);
    }

}).implements([M.ActiveState, M.ViewEnableState]);

/**
 * Constant that specifies the behaviour of the ItemView
 * @type {{LINKED: number, BASIC: number, ICON: number}}
 */
M.ListItemView.CONST = {
    LINKED: 1,
    BASIC: 2,
    ICON: 3
};