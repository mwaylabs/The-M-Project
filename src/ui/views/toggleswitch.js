// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.ToggleSwitchView
 *
 * @type {*}
 * @extends M.ToggleSwitchView
 * @example
 *
 * M.ToggleSwitchView.extend({
    grid: 'col-xs-12',
    label: 'Wifi',
    offLabel: 'Off',
    onLabel: 'On',
    scopeKey: 'settings',
    extendTemplate: '<%= wifistatus  %>',
    onValue: '1',
    offValue: '2'
 })
 *
 *
 */
M.ToggleSwitchView = M.MovableView.extend({

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
    _templateString: M.TemplateManager.get('toggleswitch.ejs'),

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

    rightEdge: 35,

    /**
     * Use stickit to bind the values like it is done in the M.SelectionListView
     * @private
     */
    selectOptions: null,

    /**
     * Add all the template values
     * @private
     */
    _assignTemplateValues: function() {
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
    initialize: function( options ) {
        this._setSelectOptions();
        var that = this;
        this._internalEvents.tap = function() {
            that.toggle();
        };
        M.View.prototype.initialize.apply(this, arguments);
        if( this.getValue() === null ) {
            this._setValue(this.offValue);
        }
    },

    /**
     * Use intern the stickit API.
     * @private
     */
    _setSelectOptions: function() {
        this.selectOptions = {
            collection: []
        };
    },

    /**
     * @private
     * @returns {Object} returns onValue if the the value equals onValue or onLabel otherwise offValue
     */
    onGet: function( value ) {
        if( value === this.onValue || value === this.onLabel ) {
            M.MovableView.prototype.toLeft.apply(this, arguments);
            return this.onValue;
        } else {
            M.MovableView.prototype.toRight.apply(this, arguments);
            return this.offValue;
        }
    },

    /**
     * @private
     * @returns {Object} returns onValue if checked or if unchecked the offValue
     */
    onSet: function() {
        if( this.$el.hasClass('on-left') ) {
            return this.onValue;
        } else if( this.$el.hasClass('on-right') ) {
            return this.offValue;
        }
    },

    toLeft: function() {
        M.MovableView.prototype.toLeft.apply(this, arguments);
        this._$valueContainer.trigger('change');
    },

    toRight: function() {
        M.MovableView.prototype.toRight.apply(this, arguments);
        this._$valueContainer.trigger('change');
    },

    _$valueContainer: null,

    _postRender: function() {
        M.MovableView.prototype._postRender.apply(this, arguments);
        this._$valueContainer = this.$el.find('[contenteditable="true"]');
    },

    /**
     * Gets a internationalized version of the label and add this to the templateValues
     * @private
     */
    _addLabelToTemplateValues: function() {
        this._templateValues.label = this._getInternationalizedTemplateValue(this.label);
    },

    /**
     * Gets a internationalized version of the label and add this to the templateValues
     * @private
     */
    _addOnLabelToTemplateValues: function() {
        this._templateValues.onLabel = this.onLabel || M.TOGGLE_SWITCH_ON;
    },

    /**
     * Gets a internationalized version of the label and add this to the templateValues
     * @private
     */
    _addOffLabelToTemplateValues: function() {
        this._templateValues.offLabel = this.offLabel || M.TOGGLE_SWITCH_OFF;
    }
});

/**
 * Constant that specifies the behaviour of the ItemView
 * @type {{LINKED: number, BASIC: number, ICON: number}}
 */
M.ToggleSwitchView.CONST = {
    TOGGLE_SWITCH_ON: 1,
    TOGGLE_SWITCH_OFF: 2
};