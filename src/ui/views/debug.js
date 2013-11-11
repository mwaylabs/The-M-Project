(function( scope ) {

    M.DebugView = M.View.extend({

        _type: 'M.DebugView',
        _template: _.tmpl(M.TemplateManager.get('M.DebugView')),

        useAsScope: YES,

        toggleGrid: function(events, element) {
            this.childViews['debug-grid'].$el.toggle();
        }

    }, {
        "debug-menu": M.View.extend({

                cssClass: 'debug-menu'
            }, {
                toggleGrid: M.ButtonView.extend({


                    value: 'toggle grid',

                    events: {
                        tap: 'toggleGrid'
                    }
                })

            }),

        "debug-grid": M.View.extend({
            useElement: YES,
            template: '<div class="container debug-grid"><div class="row"> <div class="col-xs-1"></div> <div class="col-xs-1"></div> <div class="col-xs-1"></div> <div class="col-xs-1"></div> <div class="col-xs-1"></div> <div class="col-xs-1"></div> <div class="col-xs-1"></div> <div class="col-xs-1"></div> <div class="col-xs-1"></div> <div class="col-xs-1"></div> <div class="col-xs-1"></div> <div class="col-xs-1"></div> </div></div>'
        })
    });

})(this);