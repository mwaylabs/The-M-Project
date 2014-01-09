// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * A input field.
 * @module M.TextfieldView
 *
 * @type {M|*}
 * @extends M.View
 * @implements M.IconBackground
 *
 * @example
 *
 * example1: M.TextfieldView.extend({
                grid: 'col-xs-12',
                label: 'Label',
                value: '',
                icon: 'fa-rocket',
                placeholder: 'Rocket'
            }),

 backgroundRightTextfieldExample: M.TextfieldView.extend({
                grid: 'col-xs-12',
                label: 'Label',
                value: '',
                cssClass: 'right',
                icon: 'fa-dot-circle-o',
                placeholder: 'Dot'
            }),

 // custom clear icon

 M.TextfieldView.extend({
                grid: 'col-xs-12',
                label: 'Label',
                type: 'clear',
                placeholder: 'clear me',
                //icon: 'fa-dot-circle-o',
                value: M.Model.create({
                    value: ''
                })
            })
 *
 */
M.TextfieldView = M.View.extend({

    /**
     * The type of the input.
     * @private
     */
    _type: 'M.TextfieldView',

    /**
     * The label of the input.
     */
    label: null,

    /**
     * The type of the input. Default is search to have the cancel button
     */
    type: 'search',

    /**
     * HTML Placeholder
     */
    placeholder: null,

    /**
     * String - The icon for a Textfieldview. Use a icon from font-awesome. Default is the icon on the left. give the parent div a class right and it will be displayed on the right
     *
     */
    icon: null,

    /**
     * the template of the input
     */
    _template: null, //_.tmpl(M.TemplateManager.get('TextfieldView')),

    _templateString: M.TemplateManager.get('textfield.ejs'),

    /**
     * If the type of the view is 'clear' use a custom text delete element
     */
    _useCustomClear: NO,

    /**
     *
     */
    useCustomClear: NO,

    /**
     * Initialize the TextfieldView
     */
    initialize: function( options ) {
        if( this.type === 'clear' || options.type === 'clear' || this.useCustomClear  ) {
            //override the type to a html tag attribute - the type gets passed to the template
            this.type = this.type || 'text';
            // to check if the type of the object was from type 'clear' set _useCustomClear to true
            this._useCustomClear = YES;
        }
        M.View.prototype.initialize.apply(this, arguments);
        // If the type of the view is 'clear' use a custom text delete element
        if( this._useCustomClear ) {
            this._addClearButton();
        }
        return this;
    },

    /**
     * If the type of the view is 'clear' use a custom text delete element
     * @private
     */
    _addClearButton: function() {
        //get the value
        var value = this._getValue();
        // if it isn't allready a model, create one
        if( !M.isModel(value) ) {
            var val = value;
            if(!val){
                val = '';
            }
            value = M.Model.create({
                value: val
            });
        }
        // ensure that the value of a textfield is a model
        this._setModel(value);
        this._setValue(value);


        var that = this;
        // the icon of the clear button
        this.icon = this.icon || 'fa-times-circle';
        // the possition of the icon
        this.cssClass = this.cssClass || 'right';
        // if there is a default value show the icon
        if( this.getValue().value === '' ) {
            this.cssClass += ' hidden-icon';
        }
        // toggle the icon when a value is set or empty
        this.onSet = function( val ) {
            if( val ) {
                that.$el.removeClass('hidden-icon');
            } else {
                that.$el.addClass('hidden-icon');
            }
            return val;
        };
        return this;
    },

    /**
     * Add all the template values
     */
    _assignTemplateValues: function() {
        M.View.prototype._assignTemplateValues.apply(this);
        this._addLabelToTemplateValues();
        this._addTypeToTemplateValues();
        this._addPlaceholderToTemplateValues();
        this._addIconToTemplateValues();
        return this;
    },

    /**
     * Gets a internationalized version of the label and add this to the templateValues
     * @private
     */
    _addLabelToTemplateValues: function() {
        this._templateValues.label = this._getInternationalizedTemplateValue(this.label);
        return this;
    },

    /**
     * Gets a internationalized version of the placeholder and add this to the templateValues
     * @private
     */
    _addPlaceholderToTemplateValues: function() {
        this._templateValues.placeholder = this._getInternationalizedTemplateValue(this.placeholder);
        return this;
    },

    /**
     * Add the type of the textfieldview to the template values
     * @private
     */
    _addTypeToTemplateValues: function() {
        this._templateValues.type = this.type;
        return this;
    },

    /**
     * Add the type of the icon to the template values, if no icon is set the value is empty string
     * @private
     */
    _addIconToTemplateValues: function() {
        this._templateValues.icon = this.icon || '';
    },

    /**
     * This function needs to be implemented to render the view if there is no value given
     * @returns {Boolean|Function|YES}
     * @private
     */
    _attachToDom: function() {
        return YES;
    },

    /**
     * Internal function that is called after the render process.
     * @returns {TextfieldView}
     * @private
     */
    _postRender: function() {
        M.View.prototype._postRender.apply(this, arguments);

        // if the type was set to 'clear'
        if( this._useCustomClear ) {
            var that = this;
            // TODO: is this the correct way to bind events?
            // add the clear functionality
            this.$el.find('i').on('click', function() {
                // set the value empty...
                that.value.set('value', '');
                // and hide the clear icon
                that.$el.addClass('hidden-icon');
            });
        }
        return this;
    },

    _extendTemplate: function(){
        if( this.extendTemplate ) {
            console.warn('Extend the Template of a M.TextFieldView is possible but be aware that the value attribute of the input is set with this string. Otherwise overwrite _templateString.');
        }
        M.View.prototype._extendTemplate.apply(this, arguments);
    },

    /**
     * returns the value of the view. if the value was just a string and not a model, then always return the dom value
     * @returns {*}
     */
    getValue: function(){
        var ret = M.View.prototype.getValue.apply(this, arguments);
        // if there isn't a value and no model access the dom to get the value
        if(!ret || !this.model){
            ret = this.$el.find('input').val();
        }
        return ret;
    }
});