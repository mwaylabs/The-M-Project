Addressbook = M.Application.extend({

    start: function() {

        Addressbook.ApplicationController.init();

        if(this.runtime === 'browser'){
            M.LayoutManager.setLayout(M.Layout.create()).setContent({
                view: Addressbook.Main
            });
        }
    }
});