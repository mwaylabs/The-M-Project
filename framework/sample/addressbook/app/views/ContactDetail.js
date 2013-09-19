define([
    'themproject'
],

    function( M ) {

        var detailTemplate = $('<div><div data-child-view="footer"></div></div>');


        //create variante
        //        var Detail = M.View.create({
        //
        //            template: detailTemplate,
        //
        //            views:
        //                {
        //                    '[data-child-view="footer"]': M.Toolbar.create({
        //                        template: {
        //                            topcoat: '<h1 data-child-view="left"></h1>'
        //                        },
        //                        views:
        //                            {
        //                                '[data-child-view="left"]': [
        //                                    M.Button.create({
        //                                        value: 'Edit'
        //                                    }),
        //                                    M.Button.create({
        //                                        value: 'Share'
        //                                    })
        //                                ]
        //                            }
        //
        //                    })
        //                }
        //
        //        });

        //------------------------------


        var Detail = M.View.extend({

            template: detailTemplate,

            //            childViews: {'[data-child-view="footer"]': M.View.extend({value: 'a'})}

            childViews: {
                '[data-child-view="footer"]': M.Toolbar.extend({
                    template: {
                        topcoat: '<h1 data-child-view="left"></h1>'
                    },
                    childViews: {
                        '[data-child-view="left"]': [
                            M.Button.create({
                                value: 'Edit 1'
                            }), M.Button.create({
                                value: 'Share 1'
                            })
                        ],
                        '[data-child-view="right"]': [
                            M.Button.extend({
                                value: 'Edit 2'
                            }), M.Button.extend({
                                value: 'Share 2'
                            })
                        ]
                    }

                })
            }

        });

        D= Detail;

        return Detail;
    });


//
//var ContactBtn = M.FrankView.extend({
//
//    template: _.template('<div><%= value %></div>'),
//    events:{
//        click: 'controller.log'
//    }
//});
//
//
////------ CONTROLLER
//
//
//var contact = Contact.create({name: 'Marco'});
//btn.map('value', 'name');
//btn.appylModel(contact);
//
//var btn = ContactBtn.create();
//btn.addEventListener('click', this.click);