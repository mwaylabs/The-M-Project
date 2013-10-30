(function( scope ) {


    Kitchensink.Controllers.Page2Controller = M.Controller.extend({

        view: null,

        /**
         * The application start (after reload)
         */
        applicationStart: function() {
            console.log('application start on page2');
        },

        init: function(){
            if(this.view === null){
                this.view = Kitchensink.Views.Page2.create(Kitchensink.overviewController, null, true);
            }
        },


        show: function( settings ) {
            this.init();
            Kitchensink.layout.applyViews({
                content: this.view
            });
            Kitchensink.layout.startTransition();
        }
    });

})(this);