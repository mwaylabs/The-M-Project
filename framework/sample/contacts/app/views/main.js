define([
    'themproject', "app", "views/menu"
], function( M, app, MenuView ) {

    var Main = function( isFirstLoad ) {


        var view = M.ContainerView.create({

            value: 'outer',
            views: {
                '[data-child-view="main"]': M.ContainerView.create({
                    value: 'childViews',
                    views: {
                        '[data-child-view="main"]': M.Button.create({
                            value: 'press',
                            events: {
                                'click': function() {
                                    console.log('asd');
                                }
                            }
                        })
                    }

                })
            },

            events: {
                'click': function() {
                    console.log('parent');
                }
            }
        });

        v = view;

        var footer = M.Toolbar.create({
            value: 'welcome',
            views: {
                '[data-child-view="right"]': M.Button.create({
                    value:'right',
                    events: {
                        'click': function() {
                            console.log('right');
                        }
                    }
                }),
                '[data-child-view="left"]': M.Button.create({
                    value:'left',
                    events: {
                        'click': function() {
                            console.log('left');
                        }
                    }
                })
            }
        });

        if( isFirstLoad ) {
            app.layoutManager.setLayout(new M.SwipeLayout());
            app.layoutManager.applyViews({
                content: view,
                footer: footer
            });
        }

        if( !app.layoutManager.isFirstLoad ) {
            PageTransitions.next();
        } else {
            app.layoutManager.initialRenderProcess();
        }
    }


    return Main;

});