(function( scope ) {

    M.TabLayout = M.Layout.extend({

        _tabMenu: null,

        _type: 'M.TabLayout',

        template: '<div id="m-main" class="m-perspective"><div data-childviews="tab-menu"></div><div data-childviews="tab-content"></div></div>',

        initialize: function() {
            this._tabMenu = M.ButtonGroupView.extend({}, {}).create(this, null, YES);
        },

        _render: function() {
            M.Layout.prototype._render.apply(this, arguments);
        },

        switchToTab: function( index ) {
            this._tabMenu.setActive(index);
            this.$el.find('.m-tab.m-page-current').removeClass('m-page-current');
            this.childViews['tab-content'][index].$el.addClass('m-page-current');
            Kitchensink.navigate({
                route: 'page4/' + index
            });
        },


        applyViews: function( tabs ) {

            var that = this;

            var buttons = [];
            var contents = [];
            var buttonWidth = 12 / tabs.length;
            for( var t = 0; t < tabs.length; t++ ) {
                buttons.push(M.ButtonView.extend({
                    value: tabs[t].headline,
                    index: t,
                    grid: 'col-xs-' + buttonWidth,
                    events: {
                        tap: function( event, element ) {
                            that.switchToTab(element.index);
                        }
                    }
                }).create());
                contents.push(tabs[t].content.create());
            }
            this._tabMenu.addChildView('buttons', buttons);

            this.addChildView('tab-menu', this._tabMenu);
            this.addChildView('tab-content', contents);
        }
    });


    M.TabView = M.View.extend({

        cssClass: 'm-page m-tab'
    });

    Kitchensink.Controllers.Page4Controller = M.Controller.extend({

        view: null,

        /**
         * The application start (after reload)
         */
        applicationStart: function( settings ) {
            console.log(settings.tab);
            console.log('application start on page4');
            this.init();
            this.setLayout(settings.tab);
        },

        initialize: function() {
        },

        init: function() {

            if( this.view === null ) {
                this.view = Kitchensink.Views.Page4.create();
            }
        },


        show: function( settings ) {

        },

        setLayout: function( index ) {
            if( !this.tabLayout ) {
                this.tabLayout = M.TabLayout.extend().create(this, null, true);
            }

            this.tabLayout.applyViews([
                {
                    headline: 'Tab1',
                    content: M.TabView.extend({
                        value: 'Tab1 Content'
                    })
                },
                {
                    headline: 'Tab2',
                    content: M.TabView.extend({
                        value: 'Tab2 Content'
                    })
                },
                {
                    headline: 'Tab3',
                    content: M.TabView.extend({
                        value: 'Tab3 Content'
                    })
                }

            ]);

            this.tabLayout.switchToTab(index || 0);

            $('body').html(this.tabLayout.render().$el)
        }
    });

})(this);