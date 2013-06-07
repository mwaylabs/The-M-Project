SampleApp = M.Application.extend({

    start: function() {

        if(this.runtime === 'browser'){
            M.LayoutManager.setLayout(new M.Layout()).setContent({
                view: SampleApp.Main
            });
        }


        SampleApp.ApplicationController.init();
    }
});