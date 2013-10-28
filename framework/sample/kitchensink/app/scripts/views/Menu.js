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
                value: M.I18N.get('global.appName', {aka: 'Absinth'})
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
                value: M.I18N.get('global.switchLanguage'),
                events: {
                    click: function() {
                        console.log("click lang");
                        /*if(M.I18N.locale == 'de') {
                            M.I18N.setLocale('en');
                        } else {
                            M.I18N.setLocale('de');
                        }*/
                    }
                }
            }),

            sliderExample: M.SliderView.extend({

            }),

            textfieldExample: M.TextfieldView.extend({

                label: 'Label',
                value: ''
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
                    tap: function() {
                        //this.$el.append('click');
                        var that = this;
                        this.$el.hide();

                        setTimeout(function(){
                            that.$el.show();
                        }, 2000);
                    },
                    swipe: function() {
                        this.$el.append('swipe');
                    },
                    swiperight: function() {
                        this.$el.append('swiperight');
                    },
                    swipeleft: function() {
                        this.$el.append('left');
                    }
                }
            }),

            searchfieldExample: M.SearchfieldView.extend({
                label: 'Label',
                value: ''
            }),

            loadingExample: M.LoaderView.extend({
                value: 'Loading ...',
                preRender: function(){
                },
                postRender: function(){
                }
            }),

            loaderButtonExample: M.ButtonView.extend({
                value: 'Toggle LoaderView',
                events:{
                    click: function() {
                        this.scope.menu.childViews.content.childViews.loadingExample.toggle();
                    }
                }
            }),

            dialogExample: M.DialogView.extend({
                value: new M.Model({
                    'header': 'Header Text',
                    'message': 'Dialog Message',
                    'cancel' : 'Abbrechen',
                    'ok' : 'Ok'
                })
            })


        })
    });

})();

var options = {};
var childViews = {}

M.View.extend(options, childViews);
