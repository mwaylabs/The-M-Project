// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsListViewController = M.Controller.extend({

    controlsList: null,

    page1: null,

    page2: null,

    page3: null,

    page4: null,

    callback: null,

    searchString: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default list",
                    page: "controlsListView1"

                },

                {

                    name: "Segmented list",
                    page: "controlsListView2"

                },

                {

                    name: "Complex list",
                    page: "controlsListView3"

                },

                {

                    name: "Counted list",
                    page: "controlsListView4"

                },

                {

                    name: "Default searchbar list",
                    page: "controlsListView5"

                },

                {

                    name: "Custom searchbar list",
                    page: "controlsListView6"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    initPage1: function(isFirstLoad) {

        if(isFirstLoad) {

            var page1 = [

                {

                    name: "Item 1"

                },

                {

                    name: "Item 2"

                },

                {

                    name: "Item 3"

                },

                {

                    name: "Item 4"

                },

                {

                    name: "Item 5"

                }

            ];

            this.set('page1', page1);

        }

    },

    initPage2: function(isFirstLoad) {

        if(isFirstLoad) {

            var page2 = {

                'List 1': [

                    {

                        name: "Item 1"

                    },

                    {

                        name: "Item 2"

                    }

                ],

                'List 2': [

                    {

                        name: "Item 1"

                    },

                    {

                        name: "Item 2"

                    },

                    {

                        name: "Item 3"

                    }

                ],

                'List 3': [

                    {

                        name: "Item 1"

                    }

                ]

            };

            this.set('page2', page2);

        }

    },

    initPage3: function(isFirstLoad) {

        if(isFirstLoad) {

            var page3 = [

                {

                    name: "Item 1",

                    subtitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr...",

                    image: "square_cyan.png"

                },

                {

                    name: "Item 2",

                    subtitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr...",

                    image: "square_yellow.png"

                },

                {

                    name: "Item 3",

                    subtitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr...",

                    image: "square_magenta.png"

                },

                {

                    name: "Item 4",

                    subtitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr...",

                    image: "square_green.png"

                },

                {

                    name: "Item 5",

                    subtitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr...",

                    image: "square_red.png"

                }

            ];

            this.set('page3', page3);

        }

    },


    initPage4: function(isFirstLoad) {

        if(isFirstLoad) {

            var page4 = [

                {

                    name: "Item 1",

                    number: "2"

                },

                {

                    name: "Item 2",

                    number: "9"

                },

                {

                    name: "Item 3",

                    number: "24"

                },

                {

                    name: "Item 4",

                    number: "4"

                },

                {

                    name: "Item 5",

                    number: "11"

                }

            ];

            this.set('page4', page4);

        }

    },

    initPage5: function(isFirstLoad) {

        if(isFirstLoad) {

            var page5 = [

                {

                    name: "Item 1"

                },

                {

                    name: "Item 2"

                },

                {

                    name: "Item 3"

                },

                {

                    name: "Item 4"

                },

                {

                    name: "Item 5"

                }

            ];

            this.set('page5', page5);

        }

    },

    initPage6: function(isFirstLoad) {

        if(isFirstLoad) {

            var page6 = [

                {

                    name: "Item 1"

                },

                {

                    name: "Item 2"

                },

                {

                    name: "Item 3"

                },

                {

                    name: "Item 4"

                },

                {

                    name: "Item 5"

                }

            ];

            this.set('page6', page6);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsListView', M.TRANSITION.SLIDE, YES);

    },

    searchStringDidChange: function(str) {

        str = str ? str : '-';

        this.set('searchString', str);

    }

});