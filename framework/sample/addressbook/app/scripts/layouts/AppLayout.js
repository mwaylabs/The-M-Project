(function( scope ) {


    var switchTemplate = M.SwitchLayout.prototype.template;
    var headerTemplate = M.HeaderLayout.prototype.template;
    var myTemplate = switchTemplate.replace(/m-page-1">/gi, 'm-page-1">' + headerTemplate);
    myTemplate = myTemplate.replace(/m-page-2">/gi, 'm-page-2">' + headerTemplate);


    M.AppLayout = M.SwitchLayout.extend({

        template: myTemplate,

        applyViews: function( settings ){
            M.HeaderLayout.prototype.applyViews.apply(this, [settings]);
            M.SwitchLayout.prototype.applyViews.apply(this, [settings]);
            return this;
        }
    });


})(this);