/**
 * M.ButtonView inherits from M.View
 * @type {*}
 */

M.RADIOBUTTON_VIEW = 'M.RadioButtonView';
M.RADIOOPTION_VIEW = 'M.RadioOptionView';

M.RadioButtonView = M.View.extend({

    /**
     * The type of the object
     * @private
     */
    _type: M.RADIOBUTTON_VIEW,

    /**
     * The template of the object before initializing it.2
     * @private
     */
    _template: _.tmpl(M.TemplateManager.get(M.RADIOBUTTON_VIEW)),
    _optionTemplate: _.tmpl(M.TemplateManager.get(M.RADIOOPTION_VIEW)),


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

            this.$el.children('div').children('[data-childviews="radio-options"]').append(dom);
        }

        return this;
    }
});


