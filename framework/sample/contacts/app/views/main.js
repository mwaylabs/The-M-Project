define([
    'themproject', "app", "views/menu"
], function( M, app, MenuView ) {

    var Main = function( isFirstLoad ) {

        var Toolbar = M.Toolbar.create({

            value: 'Hello',

            childViews: {

                left: M.View.create({
                    value: 'a',
                    childViews: {
                        left: M.Button.create({
                            value: '0one one'
                        })
                    }
                }),

                right: M.ContainerView.create({
                    value: 'b',
                    childViews: [
                        M.ContainerView.create({value: '1two one'}), M.ContainerView.create({value: '2two two'}), M.ContainerView.create({value: '3two two'}), M.ContainerView.create({value: '4two two'})
                    ]
                })
            }
        });

        T = Toolbar;
        //
        //
        //        b = M.ContainerView.create({
        //
        //            value: 'inner'
        //        });
        //
        //        c = M.Button.create({
        //
        //            value: 'inner -- inner'
        //
        //        });

        //opt.
        //T.render();

        if( isFirstLoad ) {
            app.layoutManager.setLayout(new M.SwipeLayout());
            app.layoutManager.applyViews({
                content: Toolbar
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