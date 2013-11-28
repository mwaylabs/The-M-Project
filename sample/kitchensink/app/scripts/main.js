(function( global ) {

    global.Kitchensink = M.Application.extend().create(global.Kitchensink.mconfig);

    $(document).ready(function() {
        'use strict';

        Kitchensink.start({
            routing: {

                routes: {
                    '': 'overviewController',
                    'forms': 'formsController',
                    'page2': 'page2Controller',
                    'page3': 'page3Controller',
                    'page4(/:tab)': 'page4Controller',
                    'page4/:tab': 'page4Controller'
                },

                initialize: function() {

                    M.Router.prototype.initialize.apply(this, arguments);
                    Kitchensink.overviewController = this.overviewController;
                    Kitchensink.page2Controller = this.page2Controller;
                    Kitchensink.formsController = this.formsController;

                },

                overviewController: Kitchensink.Controllers.OverviewController.create(),

                formsController: Kitchensink.Controllers.FormsController.create(),

                page2Controller: Kitchensink.Controllers.Page2Controller.create(),

                page3Controller: M.Controller.extend({
                    show: function() {

                        var html = M.View.extend({

                        }, {
                            btnBack: M.ButtonView.extend({
                                value: 'page 2',
                                grid: 'col-xs-6',
                                events: {
                                    tap: 'backPage'
                                }
                            }),
                            btnNext: M.ButtonView.extend({
                                value: 'page 1',
                                grid: 'col-xs-6',
                                events: {
                                    tap: 'nextPage'
                                }
                            }),
                            tf: M.TextareaView.extend({
                                grid: 'col-xs-4'
                            })

                        }).create(Kitchensink.overviewController, null, true);

                        Kitchensink.getLayout().applyViews({
                            content: html
                        });
                        Kitchensink.getLayout().startTransition();
                    }
                }).create(),

                page4Controller: Kitchensink.Controllers.Page4Controller.create()
            }
        });
    });

})(this);
