(function( scope ) {

    M.SelectionListView = M.View.extend({

        _type: 'M.SelectionListView',

        isMultiple: NO,

        template: M.TemplateManager.get('M.SelectionListView'),

        _assignBinding: function() {
            M.View.prototype._assignBinding.apply(this, arguments);
            if( this.selectOptions ) {
                _.each(this.bindings, function( value ) {
                    value['selectOptions'] = this.selectOptions;
                }, this)
            }
            return this;
        },

       _assignTemplateValues: function() {
            M.View.prototype._assignTemplateValues.apply(this);
            this._templateValues['isMultiple'] = this.isMultiple;
        }
    });



})(this);