/**
 * The default label value for M.ToggleSwitch off state
 * @type {string}
 * @constant
 */
M.TOGGLE_SWITCH_OFF = 'off';
/**
 * The default label value for M.ToggleSwitch on state
 * @type {string}
 * @constant
 */
M.TOGGLE_SWITCH_ON = 'on';

/**
 * @module M.ToggleSwitchView
 *
 * @type {*}
 * @extends M.View
 * @example
 *
 * var scope = {
            person: M.Model.create({
                name: 'egon',
                birthday: '1383751054966',
                favorite: NO
            })
        };

 var toggleSwitch = M.ToggleSwitchView.extend({
            scopeKey: 'person.favorite',
            onValue: YES,
            offValue: NO,
            onLabel: 'on',
            offLabel: 'off'
        }).create(scope, null, true);
 *
 */
M.ToggleSwitchView = M.View.extend({

    /**
     * The type of the view
     * @type {string}
     * @private
     */
    _type: 'M.ToggleSwitchView',

    /**
     * The Template of the view before initializing it
     * @type function
     * @param {object} _templateValues
     * @private
     */
    _template: _.tmpl(M.TemplateManager.get('M.ToggleSwitchView')),

    /**
     * The container to put the options in
     * @private
     */
    _optionsContainer: 'toggleswitch',

    /**
     * The value of the on state
     * @default
     * @type {*}
     */
    onValue: YES,

    /**
     * The value of the off state
     * @default
     * @type {*}
     */
    offValue: NO,

    /**
     * The label on the view of the on state
     * @default
     * @type {string}
     */
    onLabel: M.TOGGLE_SWITCH_ON,

    /**
     * The label on the view of the off state
     * @default
     * @type {string}
     */
    offLabel: M.TOGGLE_SWITCH_OFF,

    /**
     * Use stickit to bind the values like it is done in the M.SelectionListView
     * @private
     */
    selectOptions: null,

    /**
     * Clear the floating
     * @default
     * @type {string}
     * @private
     */
    _internalCssClasses: 'clear',

    /**
     * Add all the template values
     * @private
     */
    _assignTemplateValues: function () {
        M.View.prototype._assignTemplateValues.apply(this, arguments);
        this._addLabelToTemplateValues();
        this._addOnLabelToTemplateValues();
        this._addOffLabelToTemplateValues();

    },

    /**
     * Initialize the View.
     * Before the View gets initialized add stickit support
     * @param options
     */
    initialize: function (options) {
        this._setSelectOptions();
        M.View.prototype.initialize.apply(this, arguments);
        if (this.getValue() === null) {
            this._setValue(this.offValue);
            console.log(this.getValue());
        }
    },

    /**
     * Use intern the stickit API.
     * @private
     */
    _setSelectOptions: function () {
        this.selectOptions = {
            collection: []
        };
    },

    /**
     * @private
     * @returns {Object} returns onValue if the the value equals onValue or onLabel otherwise offValue
     */
    onGet: function () {
        var val = this.getValue();
        if (val === this.onValue || val === this.onLabel) {
            return this.onValue;
        } else {
            return this.offValue;
        }
    },

    /**
     * @private
     * @returns {Object} returns onValue if checked or if unchecked the offValue
     */
    onSet: function () {
        if (this.$el.find('input').prop('checked')) {
            return this.onValue;
        } else {
            return this.offValue;
        }
    },

    /**
     * Gets a internationalized version of the label and add this to the templateValues
     * @private
     */
    _addLabelToTemplateValues: function () {
        this._templateValues.label = this._getInternationalizedTemplateValue(this.label);
    },

    /**
     * Gets a internationalized version of the label and add this to the templateValues
     * @private
     */
    _addOnLabelToTemplateValues: function () {
        this._templateValues.onLabel = this.onLabel || M.TOGGLE_SWITCH_ON;
    },

    /**
     * Gets a internationalized version of the label and add this to the templateValues
     * @private
     */
    _addOffLabelToTemplateValues: function () {
        this._templateValues.offLabel = this.offLabel || M.TOGGLE_SWITCH_OFF;
    }
});