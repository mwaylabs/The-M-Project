(function( scope ) {

    M.TabLayout = M.Layout.extend({

        _tabMenu: null,

        _type: 'M.TabLayout',

        template: '<div class="asdf"><div data-childviews="tab-menu"><div></div></div></div>',

        initialize: function() {
            this._tabMenu = M.ButtonGroupView.extend({},{}).create(this, null, YES);
        },

        _render: function() {
            M.Layout.prototype._render.apply(this, arguments);
            debugger;
        },


        applyViews: function( tabs ) {

            for( var t = 0; t < tabs.length; t++ ) {
                var btn = M.ButtonView.create({
                    value: tabs[t].headline
                });

                this._tabMenu.addChildView('div', btn);
            }

            debugger;

        }
    });

    Kitchensink.Controllers.Page4Controller = M.Controller.extend({

        view: null,

        /**
         * The application start (after reload)
         */
        applicationStart: function() {
            console.log('application start on page4');
            this.init();
            this.setLayout();
        },

        init: function() {
            if( this.view === null ) {
                this.view = Kitchensink.Views.Page4.create();
            }
        },


        show: function( settings ) {
            console.log('show');
            this.init();
            this.setLayout();
        },

        setLayout: function() {
            if( !this.tabLayout ) {
                this.tabLayout = M.TabLayout.extend().create(this, null, true);
            }

            this.tabLayout.applyViews([
                {
                    headline: 'Tab1',
                    content: M.View.extend({
                        value: 'Tab1 Content'
                    })
                },
                {
                    headline: 'Tab2',
                    content: M.View.extend({
                        value: 'Tab2 Content'
                    })
                },
                {
                    headline: 'Tab3',
                    content: M.View.extend({
                        value: 'Tab3 Content'
                    })
                }

            ]);

            $('body').html(this.tabLayout.render().$el)
        }
    });

})(this);