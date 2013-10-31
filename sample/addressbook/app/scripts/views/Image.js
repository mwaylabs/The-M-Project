(function( scope ) {

    M.CompanyLogo = M.View.extend({

        template: '<div class="company-logo <%= company %>" ></div>',

        _assignTemplateValues: function() {
            M.View.prototype._assignTemplateValues.apply(this, arguments);
            if(this.company){
                this._templateData['company'] = this.company;
            }
        }
    });

})(this)