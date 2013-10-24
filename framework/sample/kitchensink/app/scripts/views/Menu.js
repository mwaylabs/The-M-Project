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

            buttonExample: M.ButtonView.extend({

                value: 'Hello'
            }),

            sliderExample: M.SliderView.extend({

            }),

            toggleExample: M.ToggleView.extend({

                value: 'ICH BIN DER VALUE',
                preRender: function(){

                },
                postRender: function(){
                    console.log(this.$el, this.el);

                }

            },{
                first: M.ButtonView.extend({
                    value: 'btn1',
                    events:{
                        click: function(){
                            console.log(this.scope);
                            this.scope.hello();
                        }
                    }
                }),
                second: M.ButtonView.extend({
                    value: 'btn2'
                })
            }),

            imageExample: M.ImageView.extend({
                value: 'http://www.bhmpics.com/thumbs/success_kid-t2.jpg',
                alt: 'success',

                events: {
                    click: function() {
                        console.log('click auf bild!');
                    }
                }
            })

        })
    });

})();

var options = {};
var childViews = {}

M.View.extend(options, childViews);