/*global define*/

define([
    'underscore', 'backbone', 'themproject', 'data/contacts', 'exports', 'require', 'views/ContactAll'
], function( _, Backbone, M, contacts ) {
    //    'use strict';

    window.ContactCollection = contacts.create();
    window.ContactCollection.fetch({
        success: function( collection ) {
            KitchenSink.set('CurrentContact', collection.models[0]);
        }
    });


    var ContactView = TMP.ModelView.extend({

    });


    var KitchenSink = M.Controller.create({

        CurrentContact: null,

        applicationStart: function( params ) {
            console.timeEnd('Systemstart');
            var mdl = M.Model.create({
                value: 'YEAH-HAW!'
            });
//                        var layout = {
//                            "TMP.Layout": {
//                                "all": {
//                                    "TMP.View": {
//                                        "header": {
//                                            "TMP.ToolbarView": {
//                                                "buttonGroup": [
//                                                    {"TMP.ButtonView": {
//                                                        "value": "close",
//                                                        "events": {
//                                                            "click": "function(){console.log('click');}"
//                                                        }
//                                                    }},
//                                                    {"TMP.ButtonView": {
//                                                        "value": "hide"
//                                                    }},
//                                                    {"TMP.ButtonView": {
//                                                        "value": "max"
//                                                    }}
//                                                ],
//                                                "headline": {
//                                                    "TMP.View": {
//                                                        "value": {
//                                                            "_val": "mdl"
//                                                        },
//                                                        "template": "<h2><%= value %></h2>"
//                                                    }
//                                                },
//                                                "settings": {
//                                                    "TMP.View": {
//                                                        "value": {
//                                                            "_val": "mdl"
//                                                        }
//                                                    }
//                                                }
//                                            }
//                                        },
//                                        "content": {
//                                            "searchBar": {
//                                                "TMP.TextfieldView": {}
//                                            },
//                                            "contactList": {"TMP.ListView": {
//                                                "listItem": {"TMP.View": {}}
//                                            }},
//                                            "listItemDivider": { "TMP.View": {
//
//                                            }}
//                                        }
//                                    }
//                                },
//                                "detail": {
//                                    "TMP.View": {
//                                        "contact": {
//                                            "TMP.ModelView": {}
//                                        },
//
//                                        "footer": [
//                                            {
//                                                "TMP.ButtonView": {
//                                                    "value": {
//                                                        "object": "mdl"
//                                                    }
//                                                }
//                                            },
//                                            {
//                                                "TMP.ButtonView": {
//                                                    "value": {
//                                                        "object": "mdl"
//                                                    }
//
//                                                }
//
//                                            }
//                                        ]
//                                    }
//                                }
//                            }
//                        };

            var header =  TMP.ToolbarView.design({
                buttonGroup: [
                    TMP.ButtonView.design({
                        value: 'use bootstrap template',
                        //IF THIS PROPERTY IS SET AND THERE IS AN UPDATE TEMPLATE CALL, ALL EVENTS ARE DELETED
//                        tagName: 'span',
                        events: {
                            click: function() {
//                                $('div').css('color', '#' + (function co( lor ) {
//                                    return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ? lor : co(lor);
//                                })(''));
                                console.log('click bootstrap');
                                TMP.TemplateManager._currentUI = 'bootstrap';
                                kitchensinkLayout.updateTemplate().render();
                            }
                        }
                    }), TMP.ButtonView.design({
                        value: 'use topcoat template',
                        events: {
                            click: function(){
                                console.log('click topcoat');
                                TMP.TemplateManager._currentUI = 'topcoat';
                                kitchensinkLayout.updateTemplate().render();
                            }
                        }
                    }), TMP.ButtonView.design({
                        value: 'use jqm template',
                        events: {
                            click: function() {
//                                $('div').css('color', '#' + (function co( lor ) {
//                                    return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ? lor : co(lor);
//                                })(''));
                                console.log('click jqm');
                                TMP.TemplateManager._currentUI = 'jqm';
                                kitchensinkLayout.updateTemplate().render();
                            }
                        }
                    })
                ],
                right: [
                    TMP.ButtonView.design({
                        value: 'use default template',
                        events: {
                            click: function(){
                                console.log('click button');
                                TMP.TemplateManager._currentUI = "defaultTemplate";
                                kitchensinkLayout.updateTemplate().render();
                            }
                        }
                    })
                ],

                headline: TMP.View.design({
                    value: mdl,
                    template: '<div><%= value %></div>'
                }),
                lala: TMP.View.design({
                    value: 'ich habe kinder',
                    template: '<strong data-childviews="CONTENT"></strong>'
                }, {
                    CONTENT: [TMP.View.design({
                    value: 'ich bin ein kind'
                }), TMP.View.design({
                    value: 'ich auch'
                })]
                }),
                settings: TMP.LabelView.design({
                    contentBinding: {
                        target: KitchenSink,
                        property: 'CurrentContact'
                    },
                    template: _.tmpl('<div><div contenteditable="true"><%= lastname %></div><div contenteditable="true"><%= firstname%></div></div>')
                })
            });

            var content =  TMP.View.design({
                searchBar: TMP.LabelView.design({
                    value: "TMP.I18N.get('HALLO STEFAN!!!!!')"
                }),
                contactList: TMP.ListView.design({
                    value: ContactCollection,

                    listItem: TMP.ListItemView.extend({
                        templateExtend: '<div><div><%= lastname %></div><div><%= firstname%></div></div>',
                        events: {
                            click: function() {
                                KitchenSink.set('CurrentContact', this.model);
                            }
                        }
                    }),


                    listItemDivider: TMP.View.design({

                    })
                })
            });

            var kitchensinkLayout = TMP.Layout.design({
                all: TMP.View.extend({
                    template: '<div class="all"><div class="header" data-childviews="header"></div><div class="content" data-childviews="content"></div></div>'
                })
            });

            kitchensinkLayout.setView({
                all:  {header: header, content: content}
            });

            kitchensinkLayout.render();

            window.app = kitchensinkLayout;

            return;

            var layout = TMP.Layout.design({
                all: TMP.View.design({
                    template: '<div class="all"><div class="header" data-childviews="header"></div><div class="content" data-childviews="content"></div></div>'
                },{
                    header: TMP.ToolbarView.design({
                        buttonGroup: [
                            TMP.ButtonView.design({
                                value: 'close',
                                tagName: 'span',
                                events: {
                                    click: function() {
                                        $('div').css('color', '#' + (function co( lor ) {
                                            return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ? lor : co(lor);
                                        })(''));
                                    }
                                }
                            }), TMP.ButtonView.design({
                                value: 'hide'
                            }), TMP.ButtonView.design({
                                value: 'max',
                                events: {
                                    click: function() {
                                        $('div').css('color', '#' + (function co( lor ) {
                                            return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ? lor : co(lor);
                                        })(''));
                                    }
                                }
                            })
                        ],
                        right: [
                            TMP.ButtonView.design({
                                value: 'override buttonGroup'
                            })
                        ],

                        headline: TMP.View.design({
                            value: mdl,
                            template: '<div><%= value %></div>'
                        }),
                        lala: TMP.View.design({
                            value: 'ich habe kinder',
                            template: '<strong data-childviews="CONTENT"></strong>'
                        }, {CONTENT: [TMP.View.design({
                            value: 'ich bin ein kind'
                        }), TMP.View.design({
                            value: 'ich auch'
                        })]}),
                        settings: TMP.LabelView.design({
                            contentBinding: {
                                target: KitchenSink,
                                property: 'CurrentContact'
                            },
                            template: _.tmpl('<div><div contenteditable="true"><%= lastname %></div><div contenteditable="true"><%= firstname%></div></div>')
                        })
                    }),
                    CONTENT: TMP.View.design({
                        searchBar: TMP.TextfieldView.design({

                        }),
                        contactList: TMP.ListView.design({
                            value: ContactCollection,
                            listItem: TMP.View.extend({
                                template: _.tmpl('<div><div><%= lastname %></div><div><%= firstname%></div></div>'),
                                events: {
                                    click: function() {
                                        KitchenSink.set('CurrentContact', this.model);
                                    }
                                }
                            }),
                            listItemDivider: TMP.View.design({

                            })
                        })
                    })
                }),
                detail: TMP.View.design({

                    contact: ContactView.design({
                        tagName: 'h1',
                        value: 'Detail'
                    }),

                    footer: [
                        TMP.ButtonView.design({
                            value: mdl
                        }), TMP.ButtonView.design({
                            value: mdl
                        })
                    ]

                })
            });
            window.Layout = layout;
            $('body').html(layout.render().$el);
        },

        show: function() {

        }
    });

    return KitchenSink;
});