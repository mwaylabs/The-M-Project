(function( global ) {

    global.Addressbook = M.Application.extend().create(global.Addressbook.mconfig);

    $(document).ready(function() {
        'use strict';

        Addressbook.start({
            routing: {
                routes: {
                    '': 'indexCtrl',
                    'detail/:id': 'detailCtrl',
                    'edit/:id': 'editCtrl',
                    'add': 'addCtrl'
                },

                initialize: function() {
                    M.Router.prototype.initialize.apply(this, arguments);
                    Addressbook.ListController = this.indexCtrl;
                },

                indexCtrl: Addressbook.Controllers.ListController.create(),
                detailCtrl: Addressbook.Controllers.DetailController.create(),
                editCtrl: Addressbook.Controllers.EditController.create(),
                addCtrl: Addressbook.Controllers.AddController.create()
            }
        });
    });

})(this);

