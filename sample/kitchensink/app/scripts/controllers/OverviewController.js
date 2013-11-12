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

        person: M.Model.create({
            name: 'egon',
            birthday: '1383751054966'
        }),

        consoleModel: M.Model.create({
            _value_: ''
        }),

        bindingTestModel: M.Model.create({
            a: 'first attribute',
            b: 'second attribute'
        }),

        selectionListModel: M.Model.create({water:'evian'}),
        multipleSelectionListModel: M.Model.create({water: ['evian']}),

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
            var transition = M.PageTransitions.MOVE_TO_LEFT_FROM_RIGHT;

            if(this._nextPage === 'page2'){
                this._nextPage = 'page3';
                transition = M.PageTransitions.NONE;
            } else if(this._nextPage === 'page3'){
                this._nextPage = '/';
            } else if(this._nextPage === '/'){
                this._nextPage = 'page2';
            }

            Kitchensink.navigate({
                route: this._nextPage,
                transition: transition
            });
        },

        backPage: function(){
            var transition = M.PageTransitions.MOVE_TO_RIGHT_FROM_LEFT;

            if(this._nextPage === 'page3'){
                this._nextPage = 'page2';
                transition = M.PageTransitions.NONE;
            } else if(this._nextPage === 'page2'){
                this._nextPage = 'page1';
            } else if(this._nextPage === 'page1'){
                this._nextPage = '/';
            }

            Kitchensink.navigate({
                route: this._nextPage,
                transition: transition
            });
        },

        /**
         * The application start (after reload)
         */
        applicationStart: function() {
            console.log('application start');

            egon = this.person;

            //Init the collection
            this.tmpViews = new Kitchensink.Collections.TMPViewCollection(views);

            //create the menu
            this.menu = Kitchensink.Views.MenuView.create(this, null, true);

//            $('#main').html(this.menu.render().$el);

            //set a layout
            Kitchensink.layout = M.SwitchLayout.extend().create(this, null, true);

            //fill the layout with a view and render it
            Kitchensink.layout.applyViews({
                content: this.menu
            }).render();

            $('body').html(Kitchensink.layout.$el);
        },

        show: function( settings ) {
            this._nextPage = '/';
            Kitchensink.layout.applyViews({
                content: this.menu
            });
            Kitchensink.startTransition();
        }
    });

})(this);