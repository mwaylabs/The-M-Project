(function( scope ) {


    var views = [
        {
            _value_: 'SliderView'
        }
    ];

    Addressbook.Controllers.OverviewController = M.Controller.extend({

        tmpViews: null,

        menu: null,

        hello: function() {
            console.log('hello');
        },

        /**
         * The application start (after reload)
         */
        applicationStart: function() {
            console.log('application start');

            //Init the collection
            this.tmpViews = new Addressbook.Collections.TMPViewCollection(views);

            //create the menu
            this.menu = Addressbook.Views.MenuView.create(this, null, true);

            //set a layout
            //            Addressbook.layout = M.SwitchLayout.extend().create(this, null, true);

            //fill the layout with a view and render it
            //            Addressbook.layout.applyViews({
            //                content: this.menu
            //            }).render();

            $('#main').html(this.menu.render().$el);

            //$('#main').html(Addressbook.layout.$el);
        },

        show: function( settings ) {
            console.log('show');
        }
    });

})(this);