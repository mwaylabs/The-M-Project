(function( scope ) {

    M.SelectionListView = M.View.extend({

        _type: 'M.SelectionListView',

        template: M.TemplateManager.get('M.SelectionListView'),

        _assignBinding: function() {
            M.View.prototype._assignBinding.apply(this, arguments);
            if( this.selectOptions ) {
                _.each(this.bindings, function( value ) {
                    value['selectOptions'] = this.selectOptions;
                }, this)
            }
            return this;
        }

    });

    M.MulitpleSelectionListView = M.View.extend({

        _type: 'M.MulitpleSelectionListView',

        cssClass: '',

        template: M.TemplateManager.get('M.MulitpleSelectionListView'),

        _assignBinding: function() {
            M.View.prototype._assignBinding.apply(this, arguments);
            if( this.selectOptions ) {
                _.each(this.bindings, function( value ) {
                    value['selectOptions'] = this.selectOptions;
                }, this)
            }
            return this;
        }

    });


})(this);