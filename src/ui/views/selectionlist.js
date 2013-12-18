// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.SelectionlistView
 *
 * @type {*}
 * @extends M.View
 */
M.SelectionlistView = M.View.extend({

    /**
     * The type of the object
     * @private
     */
    _type: 'M.SelectionlistView',

    /**
     * The template of the object before initializing it.
     * @private
     */
    _template: null,

    _templateString: null,

    /**
     * The template of an option before initializing it.
     * @private
     */
    _optionTemplate: null,

    /**
     * Selector name which is used internally to determine the parent dom element.
     * @private
     */
    _optionsContainer: '',

    /**
     * Override this function to call the '_renderOptions' method.
     *
     * @override
     * @returns {this}
     * @private
     */
    _render: function () {

        M.View.prototype._render.apply(this, arguments);
        this._renderOptions();
        return this;
    },

    /**
     * This method renders the options based on the selectOptions property.
     *
     * @returns {this}
     * @private
     */
    _renderOptions: function () {

        if (this.selectOptions && this.selectOptions.collection) {
            var dom = '';
            _.each(this.selectOptions.collection, function (value) {
                dom += this._optionTemplate({
                    name: this.cid + '-option',
                    value: value[this.selectOptions.valuePath || 'value'],
                    label: value[this.selectOptions.labelPath || 'label']
                });
            }, this);

            this.$el.children('div').children('[data-childviews="' + this._optionsContainer + '-options"]').append(dom);
        }

        return this;
    }
}).implements([M.ActiveState]);


