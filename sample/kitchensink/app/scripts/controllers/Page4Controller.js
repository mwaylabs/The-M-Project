(function( scope ) {

    M.TabLayout = M.Layout.extend({

        _tabMenu: null,

        _type: 'M.TabLayout',

        scrolling: NO,

        template: '<div id="m-main" class="m-perspective"><div data-childviews="tab-menu"></div><div data-childviews="tab-content"></div></div>',

        initialize: function() {
            this._tabMenu = M.ButtonGroupView.extend({}, {}).create(this, null, YES);
        },

        _render: function() {
            M.Layout.prototype._render.apply(this, arguments);
        },

        _postRender: function() {
            M.Layout.prototype._postRender.apply(this, arguments);
            this.$el.addClass(this.scrolling ? 'scrolling' : '');

        },

        switchToTab: function( index ) {
            if( index < 0 || index >= Object.keys(this._tabMenu.childViews).length ) {
                return;
            }
            //$tablayout-menu-scroll-button-width: 200px;
            var buttonWidth = 200;
            this.$el.find('[data-childviews=tab-menu]').scrollLeft( index * buttonWidth - 50 );
            this._tabMenu.setActive(index);
            this.$el.find('.m-tab.m-page-current').removeClass('m-page-current');
            this.childViews['tab-content'][index].$el.addClass('m-page-current');
            Kitchensink.navigate({
                route: 'page4/' + index
            });
        },


        applyViews: function( tabs ) {

            var that = this;

            var contents = [];
            var grid = 'col-xs-' + (12 / tabs.length);
            if( this.scrolling ) {
                grid = '';
            }
            for( var t = 0; t < tabs.length; t++ ) {
                var button = this._createButton({
                    index: t,
                    grid: grid,
                    headline: tabs[t].headline
                });
                this._tabMenu.addChildView('button' + t, button);
                contents.push(this._extendContent({
                    index: t,
                    content: tabs[t].content
                }));
            }

            this.addChildView('tab-menu', this._tabMenu);
            this.addChildView('tab-content', contents);
        },

        _createButton: function( options ) {
            var that = this;
            return M.ButtonView.extend({
                value: options.headline,
                index: options.index,
                grid: options.grid,
                events: {
                    tap: function( event, element ) {
                        that.switchToTab(element.index);
                    }
                }
            }).create();
        },

        _extendContent: function( options ) {
            var that = this;
            return options.content.extend({
                events: {
                    dragleft: function( event, element ) {
                        that.switchToTab(options.index + 1);
                    },
                    dragright: function( event, element ) {
                        that.switchToTab(options.index - 1);
                    }
                }
            }).create()
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
                this.tabLayout = M.TabLayout.extend({
                    scrolling: YES
                }).create(this, null, true);
            }

            this.tabLayout.applyViews([
                {
                    headline: 'Tab1',
                    content: M.TabView.extend({
                        value: 'Tab1 Content'
                    }, {
                        c1: M.View.extend({
                            cssClass: 'inner-content',
                            value: 'content content',
                            events: {
                                drag: function( event, element ) {
                                    element._setValue('drag did happen');
                                    element.render();
                                },
                                dragleft: function( event, element ) {
                                    element._setValue('dragleft did happen');
                                },
                                dragright: function( event, element ) {
                                    element._setValue('dragright did happen');
                                }
                            }
                        })
                    })
                },
                {
                    headline: 'Tab2',
                    content: M.TabView.extend({
                        value: 'Tab2 Content'
                    }, {
                        c2: M.View.extend({
                            cssClass: 'inner-content',
                            value: 'content content',
                            events: {
                                drag: function( event, element ) {
                                    element._setValue('drag did happen');
                                    element.render();
                                },
                                dragleft: function( event, element ) {
                                    element._setValue('dragleft did happen');
                                },
                                dragright: function( event, element ) {
                                    element._setValue('dragright did happen');
                                }
                            }
                        })
                    })
                },
                {
                    headline: 'Tab3',
                    content: M.TabView.extend({
                        value: 'Tab3 Content'
                    }, {
                        c3: M.View.extend({
                            cssClass: 'inner-content',
                            value: 'content content',
                            events: {
                                drag: function( event, element ) {
                                    element._setValue('drag did happen');
                                    element.render();
                                },
                                dragleft: function( event, element ) {
                                    element._setValue('dragleft did happen');
                                },
                                dragright: function( event, element ) {
                                    element._setValue('dragright did happen');
                                }
                            }
                        })
                    })
                },
                {
                    headline: 'Tab4',
                    content: M.TabView.extend({
                        value: 'Tab4 Content'
                    }, {
                        c4: M.View.extend({
                            cssClass: 'inner-content',
                            value: 'content content',
                            events: {
                                drag: function( event, element ) {
                                    element._setValue('drag did happen');
                                    element.render();
                                },
                                dragleft: function( event, element ) {
                                    element._setValue('dragleft did happen');
                                },
                                dragright: function( event, element ) {
                                    element._setValue('dragright did happen');
                                }
                            }
                        })
                    })
                },
                {
                    headline: 'Tab5',
                    content: M.TabView.extend({
                        value: 'Tab5 Content'
                    }, {
                        c5: M.View.extend({
                            cssClass: 'inner-content',
                            value: 'content content',
                            events: {
                                drag: function( event, element ) {
                                    element._setValue('drag did happen');
                                    element.render();
                                },
                                dragleft: function( event, element ) {
                                    element._setValue('dragleft did happen');
                                },
                                dragright: function( event, element ) {
                                    element._setValue('dragright did happen');
                                }
                            }
                        })
                    })
                },
                {
                    headline: 'Tab6',
                    content: M.TabView.extend({
                        value: 'Tab6 Content'
                    }, {
                        c6: M.View.extend({
                            cssClass: 'inner-content',
                            value: 'content content',
                            events: {
                                drag: function( event, element ) {
                                    element._setValue('drag did happen');
                                    element.render();
                                },
                                dragleft: function( event, element ) {
                                    element._setValue('dragleft did happen');
                                },
                                dragright: function( event, element ) {
                                    element._setValue('dragright did happen');
                                }
                            }
                        })
                    })
                },
                {
                    headline: 'Tab7',
                    content: M.TabView.extend({
                        value: 'Tab7 Content'
                    }, {
                        c7: M.View.extend({
                            cssClass: 'inner-content',
                            value: 'content content',
                            events: {
                                drag: function( event, element ) {
                                    element._setValue('drag did happen');
                                    element.render();
                                },
                                dragleft: function( event, element ) {
                                    element._setValue('dragleft did happen');
                                },
                                dragright: function( event, element ) {
                                    element._setValue('dragright did happen');
                                }
                            }
                        })
                    })
                }

            ]);

            this.tabLayout.switchToTab(index || 0);

            $('body').html(this.tabLayout.render().$el)
        }
    });

})(this);