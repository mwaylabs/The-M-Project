/*global Addressbook, Backbone*/
Addressbook.Routers = Addressbook.Routers || {};

(function() {

    Addressbook.MainController = M.Controller.extend({

        testModel: null,

        contactCollection: null,

        initialize: function() {

            var that = this;
            var collection = new Addressbook.Collections.ContactsCollection(/*dummy*/);
            collection.fetch({
                success: function() {
                    //                        listView.render();
                    //Addressbook.testModel.set('lastname', collection.models[0].get('lastname'));
                    //Addressbook.testModel.set('firstname', collection.models[0].get('firstname'));
                    //Addressbook.testModel.set('value', collection.models[0].get('firstname') + ' - ' + collection.models[0].get('lastname'));
                }
            });

            this.contactCollection = collection;

            this.editModel = new Addressbook.Models.ContactsModel({
                firstname: 'aaa',
                lastname: 'aaa'
            });

            this.currentModel = this.editModel;

            this.detailView = Addressbook.Views.DetailView.design(this, null, true);

            $('#main').prepend(this.detailView.render().$el);

        },

        topcoatTheme: function() {
            M.TemplateManager._currentUI = 'topcoat';
            Addressbook.detailView.updateTemplate();
            Addressbook.detailView.render();
        },

        addEntry: function() {
            this.scope.contactCollection.create(this.scope.editModel.attributes);
        },

        removeEntry: function() {
            this.scope.currentModel.destroy();
        },

        updateEntry: function() {
            this.scope.currentModel.save(this.scope.editModel.attributes);
        }
    });

    Addressbook.Routers.MainRouter = Backbone.Router.extend({
        routes: {
            '': 'indexCtrl',
            'edit': 'editCtrl'
        },


        indexCtrl: function() {
            mainctrl = Addressbook.MainController.create();
            return mainctrl;
        },

        editCtrl: function() {

        }
    });

})();

//var dummy = null;
//
//dummy = [
//    {
//        "firstname": "Marco",
//        "lastname": "Hanowski",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b140000fc"
//    },
//    {
//        "firstname": "Armando",
//        "lastname": "Pacetta",
//        "status": "5",
//        "company": "M-Way Consulting",
//        "_id": "52594742efd4a63b140000ff"
//    },
//    {
//        "firstname": "Thomas",
//        "lastname": "Beckmann",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000105"
//    },
//    {
//        "firstname": "Martin",
//        "lastname": "Ruopp",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000108"
//    },
//    {
//        "firstname": "Christian",
//        "lastname": "Kahl",
//        "status": "3",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000116"
//    },
//    {
//        "firstname": "Karol",
//        "lastname": "Bronke",
//        "status": "5",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b1400011e"
//    },
//    {
//        "firstname": "Jackson",
//        "lastname": "Tchinda",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b1400011f"
//    },
//    {
//        "firstname": "Christian",
//        "lastname": "Heintz",
//        "status": "3",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000120"
//    },
//    {
//        "firstname": "Moritz",
//        "lastname": "Mahlmann",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000122"
//    },
//    {
//        "firstname": "Yann",
//        "lastname": "Fischer",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000123"
//    },
//    {
//        "firstname": "Natasa",
//        "lastname": "Barac",
//        "status": "3",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000124"
//    },
//    {
//        "firstname": "Volker",
//        "lastname": "Hahn",
//        "status": "5",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000125"
//    },
//    {
//        "firstname": "Angela",
//        "lastname": "Hahn",
//        "status": "5",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000126"
//    },
//    {
//        "firstname": "Richard",
//        "lastname": "Malley",
//        "status": "5",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000127"
//    },
//    {
//        "firstname": "Georg",
//        "lastname": "Strauch",
//        "status": "5",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000128"
//    },
//    {
//        "firstname": "Stefan",
//        "lastname": "Buck",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b140000fd"
//    },
//    {
//        "firstname": "Christian",
//        "lastname": "Feser",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b140000fe"
//    },
//    {
//        "firstname": "Yen",
//        "lastname": "Nguyen",
//        "status": "5",
//        "company": "M-Way Consulting",
//        "_id": "52594742efd4a63b14000100"
//    },
//    {
//        "firstname": "Tobias",
//        "lastname": "Vetter",
//        "status": "3",
//        "company": "M-Way Consulting",
//        "_id": "52594742efd4a63b14000101"
//    },
//    {
//        "firstname": "Mirko",
//        "lastname": "Bleyh",
//        "status": "3",
//        "company": "M-Way Consulting",
//        "_id": "52594742efd4a63b14000102"
//    },
//    {
//        "firstname": "Frank",
//        "lastname": "Stierle",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000103"
//    },
//    {
//        "firstname": "Volker",
//        "lastname": "Tietz",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000104"
//    },
//    {
//        "firstname": "Alexander",
//        "lastname": "Zarges",
//        "status": "5",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000106"
//    },
//    {
//        "firstname": "Daniel",
//        "lastname": "Müller",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000107"
//    },
//    {
//        "firstname": "Jonas",
//        "lastname": "Kaufmann",
//        "status": "3",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000109"
//    },
//    {
//        "firstname": "Stefan",
//        "lastname": "Jaucker",
//        "status": "3",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b1400010a"
//    },
//    {
//        "firstname": "Christian",
//        "lastname": "Bugyi",
//        "status": "5",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b1400010b"
//    },
//    {
//        "firstname": "Tobias",
//        "lastname": "Weidinger",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b1400010c"
//    },
//    {
//        "firstname": "Markus",
//        "lastname": "Pfeiffer",
//        "status": "5",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b1400010d"
//    },
//    {
//        "firstname": "Martin",
//        "lastname": "Wieland",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b1400010e"
//    },
//    {
//        "firstname": "Marcus",
//        "lastname": "Köhler",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b1400010f"
//    },
//    {
//        "firstname": "Nataliia",
//        "lastname": "Bakaieva",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000110"
//    },
//    {
//        "firstname": "Peter",
//        "lastname": "Wagner",
//        "status": "1",
//        "company": "Agero",
//        "_id": "52594742efd4a63b14000111"
//    },
//    {
//        "firstname": "Dejan",
//        "lastname": "Dujmović",
//        "status": "5",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000112"
//    },
//    {
//        "firstname": "Ricardo",
//        "lastname": "Pabon",
//        "status": "5",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000113"
//    },
//    {
//        "firstname": "Kentaro",
//        "lastname": "Wakayama",
//        "status": "5",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000114"
//    },
//    {
//        "firstname": "Kai",
//        "lastname": "Stritzelberger",
//        "status": "5",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000115"
//    },
//    {
//        "firstname": "Martina",
//        "lastname": "Dipalo",
//        "status": "3",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000117"
//    },
//    {
//        "firstname": "Suado",
//        "lastname": "Babic",
//        "status": "3",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000118"
//    },
//    {
//        "firstname": "Candogan",
//        "lastname": "Ögüt",
//        "status": "3",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000119"
//    },
//    {
//        "firstname": "Andreas",
//        "lastname": "Lichtenberger",
//        "status": "3",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b1400011a"
//    },
//    {
//        "firstname": "Christop",
//        "lastname": "Baldenhofer",
//        "status": "3",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b1400011b"
//    },
//    {
//        "firstname": "Karina",
//        "lastname": "Lichtenberger",
//        "status": "5",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b1400011c"
//    },
//    {
//        "firstname": "Lali",
//        "lastname": "Khidesheli",
//        "status": "5",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b1400011d"
//    },
//    {
//        "firstname": "Jonas",
//        "lastname": "Erhorn",
//        "status": "1",
//        "company": "M-Way Solutions",
//        "_id": "52594742efd4a63b14000121"
//    },
//    {
//        "firstname": "Thomas",
//        "lastname": "IsCool",
//        "_id": "525fe16eb8be4023328aecbe",
//        "_time": 1382015656680
//    }
//];
