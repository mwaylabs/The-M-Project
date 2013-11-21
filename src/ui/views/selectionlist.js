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
    _template: null,//_.tmpl(M.TemplateManager.get(M.CHECKBOXBUTTON_VIEW)),

    _optionTemplate: null,// _.tmpl(M.TemplateManager.get(M.CHECKBOXOPTION_VIEW)),

    _optionsContainer: null,

    _render: function () {

        M.View.prototype._render.apply(this, arguments);
        this._renderOptions();
        return this;
    },

    _renderOptions: function () {

        if (this.selectOptions && this.selectOptions.collection) {
            var dom = '';
            _.each(this.selectOptions.collection, function (value) {
                dom += this._optionTemplate({
                    name: this.cid + '-option',
                    _value_: value[this.selectOptions.valuePath || 'value'],
                    label: value[this.selectOptions.labelPath || 'label']
                });
            }, this);

            this.$el.children('div').children('[data-childviews="' + this._optionsContainer + '-options"]').append(dom);
        }

        return this;
    }
});


