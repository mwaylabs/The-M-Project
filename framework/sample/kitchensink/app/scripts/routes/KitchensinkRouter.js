(function() {

    Kitchensink.Routers.KitchensinkRouter = M.Router.extend({
        routes: {
            '': 'overviewController',
            'page2': 'page2Controller',
            'page3': 'page3Controller'
        },


        initialize: function() {

            M.Router.prototype.initialize.apply(this, arguments);
            OverviewController = this.overviewController;
        },

        overviewController: Kitchensink.Controllers.OverviewController.create(),

        page2Controller: M.Controller.extend({
            show: function() {

                var html = M.ButtonView.extend({
                    value: 'page 3',
                    events: {
                        tap: 'nextPage'
                    }
                });

                html = html.create(OverviewController, null, true);

                $('#main').html(html.render().$el);
            }
        }).create(),

        page3Controller: M.Controller.extend({
            show: function() {
                var html = M.ButtonView.extend({
                    value: 'page 1',
                    events: {
                        tap: 'nextPage'
                    }
                }).create(OverviewController, null, true);
                $('#main').html(html.render().$el);
            }
        }).create()

    });

})(this);