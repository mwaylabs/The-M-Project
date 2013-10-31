define([
    'themproject', "app", "views/menu", "views/list"
], function( M, app, MenuView, ListView ) {


    //    var view = M.ContainerView.create({
    //
    //        value: 'outer',
    //
    //        views: {
    //            '[data-child-view="main"]': M.ContainerView.create({
    //                value: 'childViews',
    //                views: {
    //                    '[data-child-view="main"]': M.Button.create({
    //                        value: 'press',
    //                        events: {
    //                            'click': function() {
    //                                console.log('asd');
    //                            }
    //                        }
    //                    })
    //                }
    //
    //            })
    //        },
    //
    //        events: {
    //            'click': function() {
    //                console.log('parent');
    //            }
    //        }
    //    });


    var footer = M.Toolbar.extend({
        value: 'footer',
        views: {
            '[data-child-view="right"]': M.Button.create({
                value: 'right',
                events: {
                    'click': function() {
                        console.log('right');
                    }
                }
            }),
            '[data-child-view="left"]': M.Button.create({
                value: 'left',
                events: {
                    'click': function() {
                        console.log('left');
                    }
                }
            })
        }
    });

    var header = M.Toolbar.extend({
        value: 'welcome',
        views: {
            '[data-child-view="right"]': M.Button.create({
                value: 'add',
                events: {
                    'click': function() {
                        console.log('add');
                    }
                }
            })
        }
    });


    var content = ListView.extend({

        value: function(){
            return app.collections.contacts
        }

    });


    var Main = M.Fragment.create({

        initialLoad: function( params ) {
            app.collections.contacts.fetch();
            app.layoutManager.setLayout(new M.SwipeLayout());
            debugger;
            app.layoutManager.applyViews({
                header: header,
                content: content,
                footer: footer
            });
        },

        onPageSwitch: function( params ) {

        }
    });


    return Main;

});