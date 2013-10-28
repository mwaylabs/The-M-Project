(function( scope ) {


    var views = [
        {
            _value_: 'M.View'

        },
        {
            _value_: 'M.SliderView'
        }
    ];

    Kitchensink.Controllers.OverviewController = M.Controller.extend({

        _nextPage: '/',

        consoleModel: M.Model.create({
            _value_: ''
        }),

        eventDidHappen: function( ev, elem ) {

//            var val = this.consoleModel.get('_value_');
            this.consoleModel.set('_value_', '');
            var val = elem._type + ' ' + ev.type + ' ' + elem.getValue();
            this.consoleModel.set('_value_', val);
        },

        tmpViews: null,

        menu: null,

        hello: function() {
            console.log('hello');
        },

        nextPage: function(){
            if(this._nextPage === 'page2'){
                this._nextPage = 'page3'
            } else if(this._nextPage === 'page3'){
                this._nextPage = '/'
            } else if(this._nextPage === '/'){
                this._nextPage = 'page2'
            }

            Kitchensink.navigate({
                route: this._nextPage
            });
        },

        /**
         * The application start (after reload)
         */
        applicationStart: function() {
            console.log('application start');

            //Init the collection
            this.tmpViews = new Kitchensink.Collections.TMPViewCollection(views);

            //create the menu
            this.menu = Kitchensink.Views.MenuView.create(this, null, true);

            menu = this.menu;

            //set a layout
            //            Kitchensink.layout = M.SwitchLayout.extend().create(this, null, true);

            //fill the layout with a view and render it
            //            Kitchensink.layout.applyViews({
            //                content: this.menu
            //            }).render();

            $('#main').html(this.menu.render().$el);

            //$('#main').html(Kitchensink.layout.$el);
        },

        show: function( settings ) {
            $('#main').html(this.menu.render().$el);
        }
    });

})(this);