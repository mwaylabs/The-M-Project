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

            views: {'[data-child-view="footer"]': M.View.extend({value: 'a'})}

            //            views:
            //            {
            //                '[data-child-view="footer"]': [M.Toolbar.extend({
            //                    template: {
            //                        topcoat: '<h1 data-child-view="left"></h1>'
            //                    }
            ////                    ,
            ////                    views:
            ////                    {
            ////                        '[data-child-view="left"]': [
            ////                            M.Button.create({
            ////                                value: 'Edit'
            ////                            }),
            ////                            M.Button.create({
            ////                                value: 'Share'
            ////                            })
            ////                        ]
            ////                    }
            //
            //                })]
            //            }

        });

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