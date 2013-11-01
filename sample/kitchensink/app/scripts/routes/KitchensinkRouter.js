(function() {

    Kitchensink.Routers.KitchensinkRouter = M.Router.extend({

        routes: {
            '': 'overviewController',
            'page2': 'page2Controller',
            'page3': 'page3Controller'
        },


        initialize: function() {

            M.Router.prototype.initialize.apply(this, arguments);
            Kitchensink.overviewController = this.overviewController;
            Kitchensink.page2Controller = this.page2Controller;

        },

        overviewController: Kitchensink.Controllers.OverviewController.create(),

        page2Controller: Kitchensink.Controllers.Page2Controller.create(),

//        page2Controller: M.Controller.extend({
//            show: function() {
//
//                var html = M.ButtonView.extend({
//                    value: 'page 3',
//                    events: {
//                        tap: 'nextPage'
//                    }
//                });
//
//                html = html.create(OverviewController, null, true);
//
//                Kitchensink.layout.applyViews({
//                    content: html
//                });
//                Kitchensink.layout.startTransition();
//            }
//        }).create(),

        page3Controller: M.Controller.extend({
            show: function() {
                var html = M.ButtonView.extend({
                    value: 'page 1',
                    events: {
                        tap: 'nextPage'
                    }
                }).create(Kitchensink.overviewController, null, true);

                Kitchensink.layout.applyViews({
                    content: html
                });
                Kitchensink.layout.startTransition();
            }
        }).create()

    });

})(this);