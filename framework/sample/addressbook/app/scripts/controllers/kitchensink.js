/*global define*/

define([
    'underscore', 'backbone', 'themproject', 'data/contacts', 'exports', 'require'
], function( _, Backbone, M, contacts ) {
    //    'use strict';


    window.ContactCollection = contacts.create();
    window.ContactCollection.fetch({
        success: function( collection ) {
            KitchenSink.set('CurrentContact', collection.models[0]);
        }
    });

    var KitchenSink = M.Controller.create({

        CurrentContact: null,

        applicationStart: function( params ) {
            console.timeEnd('Systemstart');
            var mdl = M.Model.create({
                value: 'YEAH-HAW!'
            });


            var header = TMP.ToolbarView.design({
                buttonGroup: [
                    TMP.ButtonView.design({
                        value: 'use bootstrap template',
                        //IF THIS PROPERTY IS SET AND THERE IS AN UPDATE TEMPLATE CALL, ALL EVENTS ARE DELETED
                        //                        tagName: 'span',
                        events: {
                            click: function() {
                                TMP.TemplateManager._currentUI = 'bootstrap';
                                kitchensinkLayout.updateTemplate().render();
                            }
                        }
                    }), TMP.ButtonView.design({
                        value: 'use topcoat template',
                        events: {
                            click: function() {
                                TMP.TemplateManager._currentUI = 'topcoat';
                                kitchensinkLayout.updateTemplate().render();
                            }
                        }
                    }), TMP.ButtonView.design({
                        value: 'use jqm template',
                        events: {
                            click: function() {
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
                            click: function() {
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
                changeHeadline: TMP.View.design({
                    value: mdl,
                    template: '<div contenteditable="true"><%= value %></div>'
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

            var content = TMP.View.design({
                searchBar: TMP.SearchfieldView.design({
                    value: M.Model.create({
                        value: ''
                    }),
                    placeholder: "TMP.I18N.get('HALLO STEFAN!!!!!')",
                    events: {
                        keyup: function() {
                            var that = this;
                            ContactCollection.applyFilter(function( model ) {
                                if( model.get('firstname').toLowerCase().indexOf(that.model.attributes.value.toLowerCase()) === 0 ) {
                                    return model.get('firstname')
                                }
                            });
                        }
                    }
                }),
                contactList: TMP.ListView.design({
                    value: ContactCollection,

                    itemView: TMP.ListItemView.extend({
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

//                AccordionView: TMP.AccordionView.design({
//                    itemView
//                })
            });

            var kitchensinkLayout = TMP.Layout.design({
                all: TMP.View.extend({
                    template: '<div class="all"><div class="header" data-childviews="header"></div><div class="content" data-childviews="content"></div></div><div class="detail"></div>'
                })
            });

            kitchensinkLayout.setView({
                all: {header: header, content: content}
            });

            kitchensinkLayout.render();

            window.app = kitchensinkLayout;
            window.KitchenSink = KitchenSink;

        },

        show: function() {

        }
    });

    return KitchenSink;
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