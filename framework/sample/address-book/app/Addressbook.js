Addressbook = M.Application.extend({

    start: function() {

        M.LayoutManager.setLayout(M.Layout.create()).setContent({
            view: Addressbook.Main
        });

        Addressbook.ApplicationController.init();
    }
});