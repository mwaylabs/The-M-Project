Kitchensink.Views = Kitchensink.Views || {};

(function() {
    'use strict'
    Kitchensink.Views.Page4 = M.View.extend({

        template: '<div><div data-childviews="content"></div></div>'

    }, {
        content: M.View.extend({
             value:'sdaf'
        }, {
//            headline: M.View.extend({
//                tagName: 'h2',
//                value: M.I18N.get('global.page2')
//            }),
//
//            pageswitchExample: M.ButtonView.extend({
//                className: 'col-xs-4',
//                value: M.I18N.get('global.pageswitch'),
//                events: {
//                    tap: 'nextPage'
//                }
//            }),
//
//            bindingTestInput: M.View.extend({
//
//                scopeKey: 'bindingTestModel',
//                template: '<div><input value="<%= a %>"/> <input value="<%= b %>" /></div>'
//
//            }),
//
//            bindingTestOutput: M.View.extend({
//
//                scopeKey: 'bindingTestModel',
//                template: '<div><input value="<%= a %>"/> <input value="<%= b %>" /></div>'
//
//            }),
//
//            bindingTestAttributeA: M.View.extend({
//                scopeKey: 'bindingTestModel.b'
//            }),
//
//            bindingTestAttributeB: M.View.extend({
//                scopeKey: 'bindingTestModel.a'
//            }),
//
//            eventTest: M.View.extend({
//                scopeKey: 'consoleModel',
//                cssClass: 'box',
//                events: {
//                    hold: 'eventDidHappen',
//                    tap: 'eventDidHappen',
//                    doubletap: 'eventDidHappen',
//                    drag: 'eventDidHappen',
//                    swipe: 'eventDidHappen',
//                    transform: 'eventDidHappen',
//                    rotate: 'eventDidHappen',
//                    pinch: 'eventDidHappen',
//                    touch: 'eventDidHappen'
//                    //                    release: 'eventDidHappen'
//                }
//            }),
//
//            listExample: M.ListView.extend({
//
//                scopeKey: 'tmpViews',
//
//                listItemView: M.ListItemView.extend({
//
//                    events: {
//
//                        tap: 'eventDidHappen'
//                    }
//                })
//            })


        })
    });

})();

var options = {};
var childViews = {}

M.View.extend(options, childViews);
