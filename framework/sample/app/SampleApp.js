window.SampleApp = M.Application.extend({

    start: function() {
        M.LayoutManager.setLayout(new M.Layout()).setContent({
            view: SampleApp.Main
        });

        SampleApp.ApplicationController.init();
    }
});