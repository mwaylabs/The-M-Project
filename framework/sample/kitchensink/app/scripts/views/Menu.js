Addressbook.Views = Addressbook.Views || {};

(function() {
    'use strict'
    Addressbook.Views.MenuView = M.View.extend({

        template: '<div><div data-childviews="content"></div></div>'

    }, {
        content: M.View.extend({

        }, {

            headline: M.View.extend({
                tagName: 'h2',
                value: 'The-M-Project Kitchensink'
            }),
            listExample: M.ListView.extend({

                scopeKey: 'tmpViews',

                listItemView: M.ListItemView.extend({

                    events: {

                        click: function() {

                            console.log(this);

                        }
                    }
                })
            }),

            sliderExample: M.SliderView.extend({

            })
        })
    });

})();