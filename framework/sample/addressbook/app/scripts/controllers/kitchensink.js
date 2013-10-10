/*global define*/

define([
    'underscore', 'backbone', 'themproject', 'data/contacts', 'exports', 'require', 'views/ContactAll'
], function( _, Backbone, M, contacts ) {
    //    'use strict';


    window.TMP = {};

    TMP.View = Backbone.View.extend({

        model: null,

        childViews: null,

        _complexView: null,

        _type: 'M.View',

        template: _.tmpl('<div><%= value %><div data-childviews="CONTENT"></div></div>'),

        initialize: function() {
            this._assignValue();
            this._assignComplexView();
            this._assignContentBinding();
            this.init();
            return this;
        },

        _assignContentBinding: function() {
            if( this.options.contentBinding && this.options.contentBinding.target ) {
                var that = this;
                this.listenTo(this.options.contentBinding.target, this.options.contentBinding.property, function( model ) {
                    that._setModel(model);
                    that.render();
                });
            }
            return this;
        },

        _assignValue: function() {
            if( Backbone.Model.prototype.isPrototypeOf(this.options.value) || Backbone.Collection.prototype.isPrototypeOf(this.options.value) ) {
                this._setModel(this.options.value);
            } else if( this.options.value ) {
                this._setModel({
                    value: this.options.value
                });
            }
            return this;
        },

        _assignTemplate: function() {
            var template = this.options.template || this.template;
            if( template ) {
                if( typeof template === 'function' ) {
                    this.template = template;

                } else if( _.isString(template) ) {
                    this.template = _.tmpl(template);
                }
            }
            return this;
        },

        _assignComplexView: function() {
            this._complexView = ( this.options.contentBinding || this.options.tagName || Backbone.Model.prototype.isPrototypeOf(this.model));
            return this;
        },

        _setModel: function( value ) {
            this.model = value;
            return this;
        },

        _getModel: function() {
            return this.model;
        },

        render: function() {
            this._preRender();
            this._render();
            this._renderChildViews();
            this._postRender();
            return this;
        },

        _render: function() {
            var dom = null;
            if( this.model || (this.model && this.model.attributes) ) {
                dom = this.template(this.model.attributes || this.model);
            } else {
                dom = this.template();
            }
            if( this._complexView ) {
                this.$el.append(dom);
            } else {
                this.$el = $(dom);
                this.el = dom;
            }

            var that =  this;

            this.$el.find('[data-childviews]').each(function(){

                var val = $(this).attr('data-childviews');
                console.log(val);
                $(this).attr('data-childviews', that.cid + '_' + val);
            })
            return this;
        },

        _renderChildViews: function() {

            if( !this.childViews ) {
                this.childViews = this._getChildViews();
            }
            _.each(this.childViews, function( child, name ) {
                var dom = this.$el;
                if( this.$el.find('[data-childviews="' + this.cid + '_' + name + '"]').length ) {
                    dom = this.$el.find('[data-childviews="' + this.cid + '_' + name + '"]');
                }
                if( !_.isArray(child) ) {
                    dom.append(child.render().el);
                } else {
                    _.each(child, function( c ) {
                        dom.append(c.render().el);
                    })

                }

            }, this);
            return this;
        },

        _getChildViews: function() {
            return this.options.childViews;
            var childViews = {};
            var opt = this.options;
            Object.keys(opt).forEach(function( child ) {
                if( TMP.View.prototype.isPrototypeOf(opt[child]) ) {
                    if( child === 'value' ) {
                        console.warn("you named a view 'value' - don't do that, it's an reserved word");
                    }
                    childViews[child] = opt[child];
                } else if( _.isArray(opt[child]) && TMP.View.prototype.isPrototypeOf(opt[child][0]) ) {
                    childViews[child] = opt[child];
                }
            });

            return childViews;
        },

        _postRender: function() {
            if( this._complexView && this.model ) {
                this._assignBinding();
                this.stickit();
            } else {
                this._switchViewToTemplate();
            }
            this.postRender();
            return this;
        },

        _switchViewToTemplate: function() {
            this.setElement(this.$el);
            this.delegateEvents();
            return this;
        },

        _assignBinding: function() {
            var bindings = {};

            _.each(this.model.attributes, function( value, key ) {
                var selector = '[data-binding="' + key + '"]';
                bindings[selector] = {observe: '' + key};
            }, this);

            this.bindings = bindings;
            return this;
        },
        _preRender: function() {
            this.$el.empty();
            this._assignTemplate();
            this.preRender();
            return this;

        },
        preRender: function() {
            return this;
        },
        postRender: function() {
            return this;
        },
        init: function() {
            return this;
        },
        setView: function( options ){

            _.each(options, function(viewOptions, name){
                if(typeof this.options.childViews[name] === 'function'){
                    var childView = this.options.childViews[name].design(viewOptions);
                    this.options.childViews[name] = childView;
                }
            }, this);
        },

        appendToDOM: function(){

        }
    });
    TMP.View.design = function( options, childViews ) {
        var opt = options;
        var elem = options[Object.keys(options)[0]];
        if( TMP.View.prototype.isPrototypeOf(elem) || _.isArray(elem) || _.isFunction(elem) ) {
            opt = {childViews: options};
        }
        if( childViews ) {
            opt['childViews'] = childViews;
        }
        return new this(opt);
    };
    TMP.Layout = TMP.View.extend({
        _type: 'M.Layout',
        template: _.tmpl('<div><div data-childviews="all"></div><div data-childviews="detail"></div></div>'),
        complexView: true,
        domParent: null,
        initialize: function(){
            TMP.View.prototype.initialize.apply(this, arguments);
            if(this.domParent === null){
                this.domParent = $('body');
            }
        },
        render: function(){
            TMP.View.prototype.render.apply(this, arguments);
            this.domParent.html(this.$el)
        }
    });
    TMP.LabelView = TMP.View.extend({
        _type: 'M.LabelView',
        template: _.tmpl(M.TemplateManager.get('labelTemplates'))
    });
    TMP.ButtonView = TMP.View.extend({
        _type: 'M.ButtonView',
        template: _.tmpl(M.TemplateManager.get('buttonTemplates'))
    });
    TMP.ToolbarView = TMP.View.extend({
        _type: 'M.ToolbarView',
        template: _.tmpl(M.TemplateManager.get('toolbarTemplates'))
    });
    TMP.ImageView = TMP.View.extend({
        _type: 'M.ImageView',
        template: _.tmpl(M.TemplateManager.get('imageTemplates'))
    });
    TMP.TextfieldView = TMP.View.extend({
        _type: 'M.TextfieldView',
        template: _.tmpl(M.TemplateManager.get('textfieldTemplates'))
    });
    TMP.ListView = TMP.View.extend({
        _type: 'M.ListView',
        template: _.tmpl(M.TemplateManager.get('listTemplates')),
        _renderChildViews: function() {

        },
        initialize: function() {
            var that = this;
            TMP.View.prototype.initialize.apply(this, arguments);

            this.listenTo(this.model, 'add', function( model, collection ) {
                console.log('add');
            });

            this.listenTo(this.model, 'fetch', function() {
                console.log('fetch');
                //that.addAll();
            });
            this.listenTo(this.model, 'remove', function() {
                console.log('remove');
            });

            this.listenTo(this.model, 'sort', function( collection ) {
                console.log('sort');
                console.time('a');
                var that = this;
                _.each(this.model.models, function( model ) {
                    var view = that.options.listItem.design({
                        value: model
                    });
                    var el = view.render().el;
                    that.$el.append(el);
                });
                console.timeEnd('a');
            });
        }
    });
    TMP.ModelView = TMP.View.extend({
        _type: 'M.ModelView',
        template: _.tmpl(M.TemplateManager.get('modelTemplates'))
    });


    //--------------------------------------------------------------------------------------------------------------------------------

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

            var header =  TMP.ButtonView.design({
                value: 'hello'
            });

            var content =  TMP.ButtonView.design({
                value: 'hello'
            });

            var kitchensinkApp = TMP.Layout.design({
                all: TMP.View.extend({
                    template: '<div class="all"><div class="header" data-childviews="header"></div><div class="content" data-childviews="content"></div></div>'
                })
            });

            kitchensinkApp.setView({
                all:  {header: header, content: content}
            });

            kitchensinkApp.render();

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
                            template: '<h2><%= value %></h2>'
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