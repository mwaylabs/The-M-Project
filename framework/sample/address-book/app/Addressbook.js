Addressbook = M.Application.extend({

    start: function() {

        if(this.runtime === 'browser'){
            M.LayoutManager.setLayout(M.Layout.create()).setContent({
                view: Addressbook.Main
            });
        }

        Addressbook.ApplicationController.init();
    }
});