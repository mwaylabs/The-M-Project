Addressbook = M.Application.extend({

    start: function() {

        M.LayoutManager.setLayout(M.Layout.create()).setContent({
            view: new Addressbook.AppView
        });

        //Addressbook.ApplicationController.init();
    }
});