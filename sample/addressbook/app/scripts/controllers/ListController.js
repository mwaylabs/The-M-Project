(function( scope ) {

    Addressbook.Controllers.ListController = M.Controller.extend({

        nextPage: '/secondpage',

        testModel: null,

        contactCollection: null,

        listView: null,

        editModel: M.Model.create(),

        applicationStart: function() {

            this._initView();
            Addressbook.setLayout(M.AppLayout.design(this, null, true));
            Addressbook.getLayout().applyViews({
                header: this.header,
                content: this.listView
            });
        },

        show: function() {

            this._initView();
            Addressbook.getLayout().applyViews({
                header: this.header,
                content: this.listView
            });
            Addressbook.getLayout().startTransition();

        },

        nextPage: function() {
            Addressbook.navigate({
                route: '/'
            });
        },

        gotoAddPage: function() {
            Addressbook.navigate({
                route: '/add'
            });
        },

        _initView: function( settings ) {
            if( !this.contactCollection ) {

                Addressbook.contactCollection = this.contactCollection = new Addressbook.Collections.ContactsCollection();

                M.Loader.show();
                var that = this;
                this.contactCollection.fetch({
                    success: function(){
                        that.registerEvents();
                        M.Loader.hide();
                    },
                    error: function(){
                        M.Loader.hide();
                    }
                });
//                var dummyCollection = JSON.parse('[{"firstname":"Marco","lastname":"Hanowski","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c000063"},{"firstname":"Stefan","lastname":"Buck","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c000064"},{"firstname":"Christian","lastname":"Feser","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c000065"},{"firstname":"Yen","lastname":"Nguyen","status":"5","company":"M-Way Consulting","_id":"52728e8996452a7f5c000067"},{"firstname":"Tobias","lastname":"Vetter","status":"3","company":"M-Way Consulting","_id":"52728e8996452a7f5c000068"},{"firstname":"Mirko","lastname":"Bleyh","status":"3","company":"M-Way Consulting","_id":"52728e8996452a7f5c000069"},{"firstname":"Frank","lastname":"Stierle","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c00006a"},{"firstname":"Volker","lastname":"Tietz","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c00006b"},{"firstname":"Thomas","lastname":"Beckmann","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c00006c"},{"firstname":"Alexander","lastname":"Zarges","status":"5","company":"M-Way Solutions","_id":"52728e8996452a7f5c00006d"},{"firstname":"Daniel","lastname":"Müller","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c00006e"},{"firstname":"Martin","lastname":"Ruopp","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c00006f"},{"firstname":"Jonas","lastname":"Kaufmann","status":"3","company":"M-Way Solutions","_id":"52728e8996452a7f5c000070"},{"firstname":"Stefan","lastname":"Jaucker","status":"3","company":"M-Way Solutions","_id":"52728e8996452a7f5c000071"},{"firstname":"Christian","lastname":"Bugyi","status":"5","company":"M-Way Solutions","_id":"52728e8996452a7f5c000072"},{"firstname":"Tobias","lastname":"Weidinger","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c000073"},{"firstname":"Markus","lastname":"Pfeiffer","status":"5","company":"M-Way Solutions","_id":"52728e8996452a7f5c000074"},{"firstname":"Martin","lastname":"Wieland","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c000075"},{"firstname":"Marcus","lastname":"Köhler","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c000076"},{"firstname":"Nataliia","lastname":"Bakaieva","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c000077"},{"firstname":"Peter","lastname":"Wagner","status":"1","company":"Agero","_id":"52728e8996452a7f5c000078"},{"firstname":"Dejan","lastname":"Dujmović","status":"5","company":"M-Way Solutions","_id":"52728e8996452a7f5c000079"},{"firstname":"Ricardo","lastname":"Pabon","status":"5","company":"M-Way Solutions","_id":"52728e8996452a7f5c00007a"},{"firstname":"Kentaro","lastname":"Wakayama","status":"5","company":"M-Way Solutions","_id":"52728e8996452a7f5c00007b"},{"firstname":"Kai","lastname":"Stritzelberger","status":"5","company":"M-Way Solutions","_id":"52728e8996452a7f5c00007c"},{"firstname":"Christian","lastname":"Kahl","status":"3","company":"M-Way Solutions","_id":"52728e8996452a7f5c00007d"},{"firstname":"Martina","lastname":"Dipalo","status":"3","company":"M-Way Solutions","_id":"52728e8996452a7f5c00007e"},{"firstname":"Suado","lastname":"Babic","status":"3","company":"M-Way Solutions","_id":"52728e8996452a7f5c00007f"},{"firstname":"Candogan","lastname":"Ögüt","status":"3","company":"M-Way Solutions","_id":"52728e8996452a7f5c000080"},{"firstname":"Andreas","lastname":"Lichtenberger","status":"3","company":"M-Way Solutions","_id":"52728e8996452a7f5c000081"},{"firstname":"Christop","lastname":"Baldenhofer","status":"3","company":"M-Way Solutions","_id":"52728e8996452a7f5c000082"},{"firstname":"Karina","lastname":"Lichtenberger","status":"5","company":"M-Way Solutions","_id":"52728e8996452a7f5c000083"},{"firstname":"Lali","lastname":"Khidesheli","status":"5","company":"M-Way Solutions","_id":"52728e8996452a7f5c000084"},{"firstname":"Karol","lastname":"Bronke","status":"5","company":"M-Way Solutions","_id":"52728e8996452a7f5c000085"},{"firstname":"Jackson","lastname":"Tchinda","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c000086"},{"firstname":"Christian","lastname":"Heintz","status":"3","company":"M-Way Solutions","_id":"52728e8996452a7f5c000087"},{"firstname":"Jonas","lastname":"Erhorn","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c000088"},{"firstname":"Moritz","lastname":"Mahlmann","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c000089"},{"firstname":"Yann","lastname":"Fischer","status":"1","company":"M-Way Solutions","_id":"52728e8996452a7f5c00008a"},{"firstname":"Natasa","lastname":"Barac","status":"3","company":"M-Way Solutions","_id":"52728e8996452a7f5c00008b"},{"firstname":"Volker","lastname":"Hahn","status":"5","company":"M-Way Solutions","_id":"52728e8996452a7f5c00008c"},{"firstname":"Angela","lastname":"Hahn","status":"5","company":"M-Way Solutions","_id":"52728e8996452a7f5c00008d"},{"firstname":"Richard","lastname":"Malley","status":"5","company":"M-Way Solutions","_id":"52728e8996452a7f5c00008e"},{"firstname":"Georg","lastname":"Strauch","status":"5","company":"M-Way Solutions","_id":"52728e8996452a7f5c00008f"},{"firstname":"Armando","lastname":"Pacetta","status":"5","company":"M-Way Consulting","_id":"52728e8996452a7f5c000066","_time":1383575428395},{"firstname":"Tobias","lastname":"better!","status":"3","company":"M-Way Consulting","_id":"52726ad692764826160024fa","_time":1383578019960}]');
//                this.contactCollection.reset(dummyCollection);
            }

            if( !this.listView ) {
                this.listView = Addressbook.Views.ListView.create(this, null, true);
            }

            if( !this.header ) {
                this.header = M.ToolbarView.extend({
                    value: M.I18N.get('global.contacts'),
                    events:{
                        hold: function(){
                            localStorage.clear();
                            M.Toast.show(M.I18N.l('global.clear_ls'))
                        }
                    }
                },{
//                    first: M.View.extend({},{
//
//                        tutorial: M.ButtonView.extend({
//                            value: M.I18N.get('global.show_tutorial'),
//                            useElement: YES,
//                            events: {
//                                tap: 'showTutorial'
//                            }
//                        })
//                    }),
                    second: M.View.extend({},{

                        addButton: M.ButtonView.extend({
                            cssClass: 'btn-success',
                            value: M.I18N.get('global.add'),
                            useElement: YES,
                            events: {
                                tap: 'gotoAddPage'
                            }
                        })
                    })
                }).create(this, null, true);
            }

            if(localStorage.getItem('tutorial') === 'false' || localStorage.getItem('tutorial') === false){
                this.hideTutorial();
            }
        },

        registerEvents: function(){
            this.listenTo(this.contactCollection, 'change', function ( model ) {
                M.Toast.show('Updated ' + model.get('firstname') + ' ' + model.get('lastname'));
            });

            this.listenTo(this.contactCollection, 'add', function ( model ) {
                M.Toast.show('Added ' + model.get('firstname') + ' ' + model.get('lastname'));
            });

            this.listenTo(this.contactCollection, 'remove', function ( model ) {
                M.Toast.show('Removed ' + model.get('firstname') + ' ' + model.get('lastname'));
            });
        },

        showTutorial: function(){
            //this.listView.childViews.tutorial.$el.show();
        },

        hideTutorial: function(){
            //this.listView.childViews.tutorial.$el.hide();
        }


    });


})(this);