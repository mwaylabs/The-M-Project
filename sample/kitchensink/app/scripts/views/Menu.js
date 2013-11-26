Kitchensink.Views = Kitchensink.Views || {};

(function() {
    'use strict'
    Kitchensink.Views.MenuView = M.View.extend({

        template: '<div><div data-childviews="content"></div></div>',
        grid: 'container'


    }, {

        content: M.View.extend({
            grid: 'row'
        }, {

            headline: M.View.extend({
                tagName: 'h2',
                grid: 'col-md-12',
                value: M.I18N.get('global.appName', {aka: 'Absinth'}),
                events: {
                    tap: function() {
                        console.log('tap');
                    }
                }
            }),

            buttonModal: M.ButtonView.extend({
                value: 'Open custom modal',
                gri1d: 'col-xs-12',
                events: {
                    tap: function() {
                        M.ModalView.extend({}, {
                            content: M.View.extend({
                                cssClass: 'custom-modal',
                                value: 'Custom Modal'
                            })
                        }).create().render().show();
                    }
                }
            }),

            button: M.ButtonView.extend({
                value: 'button active',
                gri1d: 'col-xs-12'
            }),

            buttongroupExample: M.ButtonGroupView.extend({

            }, {

                firstButton: M.ButtonView.extend({
                    value: 'first button',
                    gri1d: 'col-xs-3'
                }),

                secondButton: M.ButtonView.extend({
                    value: 'second button',
                    grid1: 'col-xs-2'
                }),

                thirdButton: M.ButtonView.extend({
                    value: 'third button',
                    gri1d: 'col-xs-3'
                }),

                fourthButton: M.ButtonView.extend({
                    value: 'fourth button',
                    gri1d: 'col-xs-4',
                    events: {
                        tap: [function() {
                            console.log('tap1');
                        }, function() {
                            console.log('tap2');
                        }]
                    }
                })
            })
        }),

        contentBinding: M.View.extend({
            grid: 'row'
        }, {

            bindingTestInput: M.View.extend({
                scopeKey: 'bindingTestModel',
                grid: 'col-xs-4 clearfix',
                extendTemplate: '<div><input value="<%= a %>"/> <input value="<%= b %>" /></div>'
            }),

            bindingTestOutput: M.View.extend({
                scopeKey: 'bindingTestModel',
                grid: 'col-xs-4 clearfix',
                template: '<div class=""><input value="<%= a %>"/> <input value="<%= b %>" /></div>'
            }),

            bindingTestAttributeA: M.View.extend({
                grid: 'col-xs-3',
                scopeKey: 'bindingTestModel.a'
            }),

            bindingTestAttributeB: M.View.extend({
                grid: 'col-xs-3',
                scopeKey: 'bindingTestModel.b'
            })

        }),
        eventsRow: M.View.extend({
            grid: 'row'
        }, {

            eventTest: M.View.extend({
                scopeKey: 'consoleModel',
                cssClass: 'box',
                grid: 'col-xs-6 col-xs-offset-3',
                events: {
                    hold: 'eventDidHappen',
                    tap: 'eventDidHappen',
                    doubletap: 'eventDidHappen',
                    drag: 'eventDidHappen',
                    swipe: 'eventDidHappen',
                    transform: 'eventDidHappen',
                    rotate: 'eventDidHappen',
                    pinch: 'eventDidHappen',
                    touch: 'eventDidHappen'
                    //                    release: 'eventDidHappen'
                }
            })
        }),

        eventsRow2: M.View.extend({
            grid: 'row'
        }, {
            listExample: M.ListView.extend({
                grid: 'col-xs-12',
                scopeKey: 'tmpViews',

                listItemView: M.ListItemView.extend({

                    events: {

                        tap: 'eventDidHappen'
                    }
                })
            })
        }),

        localeRow: M.View.extend({
            grid: 'row'
        }, {
            localizationExample: M.ButtonView.extend({
                grid: 'col-xs-4',
                cssClass: 'btn-info',
                value: M.I18N.get('global.switchLanguage'),
                events: {
                    tap: function() {
                        if( M.I18N._activeLocale == 'de' ) {
                            M.I18N.setLocale('en');
                        } else {
                            M.I18N.setLocale('de');
                        }
                    }
                }
            }),

            pageswitchExample: M.ButtonView.extend({
                grid: 'col-xs-6 clear',
                value: M.I18N.get('global.pageswitch'),
                events: {
                    tap: 'nextPage'
                }
            }),

            sliderExample: M.SliderView.extend({
                events: {
                    change: function( event, element ) {
                        console.log(element.$el);
                    }
                }
            }),

            tablayoutExample: M.ButtonView.extend({
                grid: 'col-xs-6 clear',
                value: M.I18N.get('global.tablayoutExample'),
                events: {
                    tap: 'gotoTablayoutExample'
                }
            }),

            textfieldExample: M.TextfieldView.extend({
                grid: 'col-xs-12',
                label: 'Label',
                value: '',
                placeholder: 'Placeholder'
            }),

            cleartextfieldExample: M.TextfieldView.extend({
                grid: 'col-xs-12',
                label: 'Label',
                value: '',
                type: 'text',
                placeholder: 'Placeholder'
            }),

            backgroundLeftWithDeleteTextfieldExample: M.TextfieldView.extend({
                grid: 'col-xs-12',
                label: 'Label',
                value: '',
                icon: 'fa-rocket',
                placeholder: 'Rocket'
            }),

            backgroundLeftTextfieldExample: M.TextfieldView.extend({
                grid: 'col-xs-12',
                label: 'Label',
                value: '',
                type: 'text',
                icon: 'fa-dot-circle-o',
                placeholder: 'Placeholder'
            }),

            backgroundRightWithDeleteTextfieldExample: M.TextfieldView.extend({
                grid: 'col-xs-12',
                label: 'Label',
                value: '',
                cssClass: 'right',
                icon: 'fa-rocket',
                placeholder: 'Rocket'
            }),

            backgroundRightTextfieldExample: M.TextfieldView.extend({
                grid: 'col-xs-12',
                label: 'Label',
                value: '',
                type: 'text',
                cssClass: 'right',
                icon: 'fa-dot-circle-o',
                placeholder: 'Placeholder'
            }),

            clearTextfieldExample: M.TextfieldView.extend({
                grid: 'col-xs-12',
                label: 'Label',
                type: 'clear',
                placeholder: 'clear me',
                value: M.Model.create({
                    _value_: ''
                })
            }),

            //            toggleExample: M.ToggleView.extend({
            //
            //                value: 'ICH BIN DER VALUE',
            //                preRender: function(){
            //
            //                },
            //                postRender: function(){
            //                    console.log(this.$el, this.el);
            //
            //                }
            //
            //            },{
            //                first: M.ButtonView.extend({
            //                    value: 'btn1',
            //                    events:{
            //                        tap: function(event, element){
            //                            console.log(element);
            //                        }
            //                    }
            //                }),
            //                second: M.ButtonView.extend({
            //                    value: 'btn2'
            //                })
            //            }),



            imageExample: M.ImageView.extend({
                value: 'http://www.bhmpics.com/thumbs/success_kid-t2.jpg',
                alt: 'success',
                grid: 'col-xs-12',
                events: {
                    tap: function() {
                        //this.$el.append('click');
                        var that = this;
                        this.$el.hide();

                        setTimeout(function() {
                            that.$el.show();
                        }, 2000);
                    },
                    swipe: 'eventDidHappen',
                    swiperight: 'eventDidHappen',
                    swipeleft: 'eventDidHappen'
                }
            }),

            searchfieldExample: M.SearchfieldView.extend({
                grid: 'col-xs-12',
                label: 'Label',
                value: ''
            }),

            loaderButtonExample: M.ButtonView.extend({
                grid: 'col-xs-12',
                value: 'Toggle LoaderView',
                events: {
                    tap: function() {
                        M.Loader.toggle('loading');
                    }
                }
            }),

            dialogExample: M.DialogView.extend({
                value: new M.Model({
                    'header': 'Header Text',
                    'message': 'Dialog Message',
                    'cancel': 'Abbrechen',
                    'ok': 'Ok'
                })
            })
        }),


        radioButtonRow: M.View.extend({
            grid: 'row'
        }, {
            rb: M.RadiolistView.extend({
                grid: 'col-xs-12',
                scopeKey: 'selectionListModel.water',
                selectOptions: {
                    collection: [
                        {id: 1, name: 'fountain'},
                        {id: 2, name: 'evian'},
                        {id: 3, name: 'dasina'}
                    ],
                    labelPath: 'name',
                    valuePath: 'name'
                }
            })
        }),

        radioButtonRow2: M.View.extend({
            grid: 'row'
        }, {
            rb: M.RadiolistView.extend({
                grid: 'col-xs-12',
                scopeKey: 'selectionListModel.water',
                selectOptions: {
                    collection: [
                        {id: 1, name: 'fountain'},
                        {id: 2, name: 'evian'},
                        {id: 3, name: 'dasina'}
                    ],
                    labelPath: 'name',
                    valuePath: 'name'
                }
            })
        }),

        selectRow: M.View.extend({
            grid: 'row'
        }, {
            selectionlistExample: M.SelectView.extend({
                grid: 'col-xs-12',
                scopeKey: 'selectionListModel.water',
                selectOptions: {
                    collection: [
                        {id: 1, name: 'fountain'},
                        {id: 2, name: 'evian'},
                        {id: 3, name: 'dasina'}
                    ],
                    labelPath: 'name',
                    valuePath: 'name'
                }
            })
        }),

        checkboxRow: M.View.extend({
            grid: 'row'
        }, {
            rb: M.CheckboxlistView.extend({
                grid: 'col-xs-12',
                scopeKey: 'multipleSelectionListModel.water',
                selectOptions: {
                    collection: [
                        {id: 1, name: 'fountain'},
                        {id: 2, name: 'evian'},
                        {id: 3, name: 'dasina'}
                    ],
                    labelPath: 'name',
                    valuePath: 'name'
                }
            })
        }),

        checkboxRow2: M.View.extend({
            grid: 'row'
        }, {
            rb: M.CheckboxlistView.extend({
                grid: 'col-xs-12',
                scopeKey: 'multipleSelectionListModel.water',
                selectOptions: {
                    collection: [
                        {id: 1, name: 'fountain'},
                        {id: 2, name: 'evian'},
                        {id: 3, name: 'dasina'}
                    ],
                    labelPath: 'name',
                    valuePath: 'name'
                }
            })
        }),

        multiSelectRow: M.View.extend({
            grid: 'row'
        }, {
            mulitpleSelectionListViewExample: M.SelectView.extend({
                isMultiple: YES,
                grid: 'col-xs-12',
                scopeKey: 'multipleSelectionListModel.water',
                selectOptions: {
                    collection: [
                        {id: 1, name: 'fountain'},
                        {id: 2, name: 'evian'},
                        {id: 3, name: 'dasina'}
                    ],
                    labelPath: 'name',
                    valuePath: 'name'
                }

            }),

            birthday: M.View.extend({
                grid: 'col-xs-12',
                value: 'Birthday:'
            }),

            birthdayPlain: M.View.extend({
                grid: 'col-xs-12',
                scopeKey: 'person.birthday'
            }),

            egon: M.TextfieldView.extend({
                grid: 'col-xs-12',
                scopeKey: 'person.birthday',
                type: 'date',
                cssClass: 'right',
                icon: 'fa-calendar',
                onGet: function( value ) {
                    var date = M.Date.create(parseInt(value)).format('YYYY-MM-DD');
                    return date;
                },
                onSet: function( value ) {
                    return M.Date.create(value).unix() * 1000;
                }
            }),

            egon2: M.TextfieldView.extend({
                grid: 'col-xs-12',
                scopeKey: 'person',
                template: '<input type="date" value="<%= birthday %>" />',
                onGet: function( value ) {
                    var date = M.Date.create(parseInt(value)).format('YYYY-MM-DD');
                    return date;
                },
                onSet: function( value ) {
                    return M.Date.create(value).unix() * 1000;
                }
            }),

            toggleSwitch: M.ToggleSwitchView.extend({
                grid: 'col-xs-12',
                label: 'Is Favorite',
                scopeKey: 'person.favorite',
                onValue: YES,
                offValue: NO,
                onLabel: 'on',
                offLabel: 'off'
            }),

            isFavorite: M.View.extend({
                scopeKey: 'person.favorite'
            })
        })
    });

})();

var options = {};
var childViews = {}

M.View.extend(options, childViews);
