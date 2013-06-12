SampleApp = M.Application.extend({

    start: function() {

        SampleApp.ApplicationController.init();

        if(this.runtime === 'browser'){
            M.LayoutManager.setLayout(new M.Layout()).setContent({
                view: SampleApp.Main
            });
        }



    }
});