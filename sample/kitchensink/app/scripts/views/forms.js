Kitchensink.Views = Kitchensink.Views || {};

(function() {
    'use strict'
    Kitchensink.Views.Forms = M.View.extend({

        template: '<div><div data-childviews="content"></div></div>',
        grid: 'container'

    }, {
        content: M.View.extend({
            grid: 'row'

        }, {
            headline: M.View.extend({
                tagName: 'h2',
                grid: 'col-xs-12',
                value: M.I18N.get('global.forms')
            }),

            textfieldViews: M.View.extend({
                tagName: 'h3',
                grid: 'col-xs-12',
                value: 'M.TextfielView'
            }, {

                textfieldExample: M.TextfieldView.extend({
                    grid: 'col-xs-12',
                    label: 'Label',
                    value: '',
                    placeholder: 'Placeholder'
                }),

                cleartextfieldExample: M.TextfieldView.extend({
                    grid: 'col-xs-12',
                    label: 'Clearbutton (if exists)',
                    value: '',
                    type: 'text',
                    placeholder: 'Placeholder'
                }),

                backgroundLeftTextfieldExample: M.TextfieldView.extend({
                    grid: 'col-xs-12',
                    label: 'Icon left',
                    value: '',
                    type: 'text',
                    icon: 'fa-dot-circle-o',
                    placeholder: 'Placeholder'
                }),

                backgroundLeftWithDeleteTextfieldExample: M.TextfieldView.extend({
                    grid: 'col-xs-12',
                    label: 'Icon left and clear button (if exists)',
                    value: '',
                    icon: 'fa-rocket',
                    placeholder: 'Rocket'
                }),

                backgroundRightTextfieldExample: M.TextfieldView.extend({
                    grid: 'col-xs-12',
                    label: 'Icon right',
                    value: '',
                    type: 'text',
                    cssClass: 'right',
                    icon: 'fa-dot-circle-o',
                    placeholder: 'Placeholder'
                }),

                backgroundRightWithDeleteTextfieldExample: M.TextfieldView.extend({
                    grid: 'col-xs-12',
                    label: 'Icon right with clear button (if exists)',
                    value: '',
                    cssClass: 'right',
                    icon: 'fa-rocket',
                    placeholder: 'Rocket'
                }),

                clearTextfieldExample: M.TextfieldView.extend({
                    grid: 'col-xs-12',
                    label: 'Custom clear',
                    type: 'clear',
                    placeholder: 'clear me',
                    value: M.Model.create({
                        _value_: ''
                    })
                }),

                date1: M.TextfieldView.extend({
                    label: 'Date example',
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

                date2: M.TextfieldView.extend({
                    grid: 'col-xs-12',
                    label: 'Date example',
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

                datePlain: M.View.extend({
                    grid: 'col-xs-12',
                    scopeKey: 'person.birthday'
                })

            }),

            radiolistView: M.View.extend({
                tagName: 'h3',
                grid: 'col-xs-12',
                value: 'M.RadiolistView'
            }, {

                radioButton: M.RadiolistView.extend({
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
                }),

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

            checkboxlistView: M.View.extend({
                tagName: 'h3',
                grid: 'col-xs-12',
                value: 'M.CheckboxlistView'
            }, {
                rb1: M.CheckboxlistView.extend({
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

                rb2: M.CheckboxlistView.extend({
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

            selectView: M.View.extend({
                tagName: 'h3',
                grid: 'col-xs-12',
                value: 'M.SelectView'
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


            multipleSelectView: M.View.extend({
                tagName: 'h3',
                grid: 'col-xs-12',
                value: 'M.SelectView isMultiple:YES'
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

                })

            }),
            toggleSwitchView: M.View.extend({
                tagName: 'h3',
                grid: 'col-xs-12',
                value: 'M.ToggleSwitchView'
            }, {
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


        })

    })
})();

var options = {};
var childViews = {}

M.View.extend(options, childViews);
