M.TextfieldView = M.View.extend({

    _type: 'M.TextfieldView',

    label: null,

    type: 'search',

    placeholder: null,

    _template: _.tmpl(M.TemplateManager.get('M.TextfieldView')),

    _assignTemplateValues: function() {
        M.View.prototype._assignTemplateValues.apply(this);
        this._addLabelToTemplateValues();
        this._addTypeToTemplateValues();
        this._addPlaceholderToTemplateValues();
        this._addIconToTemplateValues();
    },

    _addLabelToTemplateValues: function() {
        this._templateValues.label = this._getInternationalizedTemplateValue(this.label);
    },

    _addPlaceholderToTemplateValues: function() {
        this._templateValues.placeholder = this._getInternationalizedTemplateValue(this.placeholder);
    },

    _addTypeToTemplateValues: function() {
        this._templateValues.type = this.type;
    },

    _addIconToTemplateValues: function() {
        this._templateValues.icon = this.icon || '';
    },

    initialize: function() {
        M.View.prototype.initialize.apply(this);
    },

    _attachToDom: function() {
        return YES;
    }
}).implements([M.IconBackground]);