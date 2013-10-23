(function( scope ) {


    /**
     *
     * create TMP Namespace
     *
     * */
    scope.TMP = {};


    TMP.TemplateManager = M.Object.extend({

        "M.View": {
            defaultTemplate: '<div><%= _value_ %></div>'
        },

        "M.ButtonView": {
            defaultTemplate: '<div>Button: <div data-binding="_value_"<% if(_value_) {  } %>><%= _value_ %></div></div>',
            topcoat: '<button class="topcoat-button--large" data-binding="_value_"><%= _value_ %></button>',
            bootstrap: '<button type="button" class="btn btn-default btn-lg"> <span class="glyphicon glyphicon-star" data-binding="_value_"></span><%= _value_ %></button>',
            jqm: '<a data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text" data-binding="_value_"><%= _value_ %></span></span></a>'
        },

        "M.ToolbarView": {
            defaultTemplate: '<div>AAA<div data-child-view="left"></div> <div class="center" data-binding="_value_"><%= _value_ %></div> <div data-child-view="right"></div></div>',
            bootstrap: '<div class="page-header"><div data-child-view="left"></div><h1><%= _value_ %></h1><div data-child-view="right"></div></div>',
            topcoat: '<div><h2><%= _value_ %></h2><div data-childview="right"></div></div>',
            jqm: '<div data-role="header" class="ui-header ui-bar-a" role="banner"><div data-child-view="left" class="ui-btn-left"></div><h1 class="ui-title" role="heading" aria-level="1"><%= _value_ %></h1><div data-child-view="right" class="ui-btn-right"></div></div>'
        },

        "M.ImageView": {
            defaultTemplate: '<div><%= _value_ %></div>',
            bootstrap: '<div><%= _value_ %></div>',
            topcoat: '<div><%= _value_ %></div>',
            jqm: '<div><%= _value_ %></div>'
        },

        //TODO implement label for=""
        "M.TextfieldView": {
            defaultTemplate: '<% if(label) {  %><label><%= label %><% } %><input type="text" value="<%= _value_ %>"><% if(label) {  %></label><% } %>',
            bootstrap: '<% if(label) {  %><label><%= label %></label><% } %><input type="text" class="form-control" value="<%= _value_ %>">',
            topcoat: '<input value="<%= _value_ %>"/>',
            jqm: '<input value="<%= _value_ %>" />'
        },

        "M.ListView": {
            defaultTemplate: '<div data-childviews="list"></div>',
            bootstrap: '<ul class="list-group" data-childviews="list"></ul>',
            topcoat: '<div data-childviews="list"></div>',
            jqm: '<div data-childviews="list"></div>'
        },

        "M.ListItemView": {
            defaultTemplate: '<div data-childviews="list"><%= _value_ %></div>',
            bootstrap: '<li class="list-group-item"><%= _value_ %></li>',
            topcoat: '<div data-childviews="list"><%= _value_ %></div>',
            jqm: '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-count ui-first-child ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a class="ui-link-inherit"><%= _value_ %></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>'
        },

        "M.ModelView": {
            defaultTemplate: '<ul><%= _value_ %></ul>',
            bootstrap: '<div><%= _value_ %></div>',
            topcoat: '<div><%= _value_ %></div>',
            jqm: '<div><%= _value_ %></div>'
        },

        "M.LabelView": {
            defaultTemplate: '<div contenteditable="true"><%= _value_ %></div>',
            bootstrap: '<div contenteditable="true"><%= _value_ %></div>',
            topcoat: '<div contenteditable="true"><%= _value_ %></div>',
            jqm: '<div contenteditable="true"><%= _value_ %></div>'
        },

        "M.SearchfieldView": {
            defaultTemplate: '<div contenteditable="true"><%= _value_ %></div>',
            bootstrap: '<div contenteditable="true"><%= _value_ %></div>',
            topcoat: '<div contenteditable="true"><%= _value_ %></div>',
            jqm: '<div class="ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield ui-body-c ui-focus"><input type="text" data-type="search" name="password" id="search" _value_="" placeholder="<%= placeholder %>" class="ui-input-text ui-body-c"><%= _value_ %><a class="ui-input-clear ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-fullsize ui-btn-icon-notext ui-input-clear-hidden" title="clear text" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="delete" data-iconpos="notext" data-theme="c" data-mini="false"><span class="ui-btn-inner"><span class="ui-btn-text">clear text</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a></div>'
        },

        "M.AccordionView": {
            defaultTemplate: '<ul><%= _value_ %></ul>',
            bootstrap: '<div><%= _value_ %></div>',
            topcoat: '<div><%= _value_ %></div>',
            jqm: '<div data-role="collapsible-set" data-theme="c" data-content-theme="d" class="ui-collapsible-set ui-corner-all" data-childviews="list"></div>'
        },

        "M.AccordionItemView": {
            defaultTemplate: '<ul><%= _value_ %></ul>',
            bootstrap: '<div><%= _value_ %></div>',
            topcoat: '<div><%= _value_ %></div>',
            jqm: '<div data-role="collapsible-set" data-theme="c" data-content-theme="d" class="ui-collapsible-set ui-corner-all" data-childviews="list"></div>'
        },

        _currentUI: 'bootstrap',

        get: function( template ) {

            if( this[template] ) {
                //use TMP.TemplateManager._currentUI because this function is called in another this context
                var tpl = this[template][TMP.TemplateManager._currentUI];
                if( !tpl ) {
                    return this[template]['defaultTemplate'];
                } else {
                    return tpl;
                }
            }
        }
    });


    /**
     *
     * TMP.View inherits from Backbone.View
     *
     * @type {*}
     */
    TMP.View = Backbone.View.extend({

        /**
         * The View type
         */
        _type: 'M.View',

        /*
         * define a user template
         */
        template: null,

        /*
         * define a template based on the tmpl template engine
         */
        _template: _.tmpl(TMP.TemplateManager.get('M.View')),

        /**
         * use this property to define which data are given to the template
         */
        _templateData: null,


        /**
         * extend the default template with this one. It gets injected into the <%= _value_ %> placeholder
         */
        templateExtend: null,

        /**
         * Constructor
         * @returns {*}
         */

        /**
         * The Value of the view
         */
        _value_: null,

        _setModel: function( value ) {
            this.model = value;
            return this;
        },

        _getModel: function() {
            return this.model;
        },

        getPropertyValue: function( propertyString, data ) {
            var o = data;
            _.each(propertyString.split('.'), function( key ) {
                if( o[key] ) {
                    o = o[key];
                } else if( M.isModel(o) || M.isCollection(o) ) {
                    //o = o.get(key);
                    o = {
                        model: o,
                        attribute: key
                    }
                } else {
                    o = null;
                }
            });
            return o;
        },

        constructor: function( options ) {
            this.cid = _.uniqueId('view');
            options || (options = {});
            var viewOptions = ['scope', 'model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];
            _.extend(this, _.pick(options, viewOptions));
            this._ensureElement();
            this.initialize.apply(this, arguments);
            this.delegateEvents();
        },

        initialize: function( options ) {

            this._assignValue(options);
            this._assignTemplateValues();
            this._mapEvents(this.scope);
            this._assignContentBinding();

            //            this._assignComplexView();
            //            this.init();
            return this;
        },

        _assignValue: function( options ) {
            //don't write _value_ in the view definition - write value and here it gets assigned
            if( this.value ) {
                this._value_ = this.value;
            } else if( this.scopeKey ) {
                this._value_ = this.getPropertyValue(this.scopeKey, this.scope);
            } else if( options && options.value ) {
                this._value_ = options.value;
            }

            if( this._value_ && M.isModel(this._value_.model) ) {
                this.model = this._value_.model;
            } else if( this._value_ && M.isModel(this._value_) ) {
                this.model = this._value_;
            } else if( M.isCollection(this._value_) ) {
                this.collection = this._value_;
            }
            return this;
        },

        _assignTemplateValues: function() {

            if( this.model ) {
                if( M.isModel(this._value_) ) {
                    this._templateData = this.model.attributes;
                } else {
                    this._templateData = {};
                    this._templateData['_value_'] = this.model.get(this._value_.attribute);
                }
            } else if( this._value_ ) {
                this._templateData = {};
                this._templateData['_value_'] = this._value_;
            }
        },

        _assignContentBinding: function() {
            var that = this;
            if( this.scopeKey && M.isModel(this._value_) ) {

                this.listenTo(this.scope, this.scopeKey, function( model ) {
                    that._setModel(model);
                    that.render();
                });
            } else if( this.scopeKey && this._value_ && M.isModel(this._value_.model) && this._value_.attribute ) {

                this.listenTo(this.scope, this.scopeKey.split('.')[0], function( model ) {
//                    that._value_.model.set(that._value_.attribute, model.get(that._value_.attribute));
                });
            }
            return this;
        },

        _mapEvents: function( scope ) {
            if( this.events ) {
                var events = [];
                _.each(this.events, function( value, key ) {
                    if( typeof value === 'string' ) {
                        if( scope && typeof scope[value] === 'function' ) {
                            events[key] = scope[value];
                        }
                    }
                }, this);
                if( events != [] ) {
                    this.events = _.extend(this.events, events);
                }

            }
        },

        /**
         * implement render function
         * @returns {this}
         */
        render: function() {
            //this._assignValue();
            this._preRender();
            this._render();
            this._renderChildViews();
            this._postRender();
            return this;
        },

        _preRender: function() {
            this._assignTemplate();
            this._extendTemplate();
            this.preRender();
            return this;
        },

        _assignTemplate: function( template ) {
            var template = template || this.template;
            if( template ) {
                if( typeof template === 'function' ) {
                    this._template = template;

                } else if( _.isString(template) ) {
                    this._template = _.tmpl(template);
                } else if( _.isObject(template) ) {
                    this._template = _.tmpl(TMP.TemplateManager.get.apply(this, ['template']))
                }
            }
            return this;
        },

        _extendTemplate: function() {
            if( this.extendTemplate ) {
                this._template = _.tmpl(this._template({_value_: this.extendTemplate}));
            }
        },

        preRender: function() {

        },

        _render: function() {
            this.$el.html(this._template(this._templateData));
            return this;
        },

        _renderChildViews: function() {

            if( !this.childViews ) {
                return;
                //this.childViews = this._getChildViews();
            }
            _.each(this.childViews, function( child, name ) {
                var dom = this.$el;

                if( this.$el.find('[data-childviews="' + this.cid + '_' + name + '"]').length ) {
                    dom = this.$el.find('[data-childviews="' + this.cid + '_' + name + '"]');
                }

                if( typeof child['render'] === 'function' ) {
                    dom.append(child.render().$el);
                    child.delegateEvents();
                } else if( _.isArray(child) ) {
                    _.each(child, function( c ) {
                        dom.append(c.render().$el);
                        c.delegateEvents();
                    })
                }

            }, this);

            return this;
        },

        _postRender: function() {
            if( this.model ) {
                this._assignBinding();
                this.stickit();
            } else {

            }
            this.postRender();
            return this;
        },

        _assignBinding: function() {
            var bindings = {};
            var data = this._templateData;

            if( this.model && !M.isModel(this._value_) ) {
                var selector = '[data-binding="_value_"]';
                bindings[selector] = {observe: '' + this._value_.attribute};
            } else if( this.model && M.isModel(this._value_) ) {
                _.each(this.model.attributes, function( value, key ) {
                    var selector = '[data-binding="' + key + '"]';
                    bindings[selector] = {observe: '' + key};
                }, this);
            } else if( this.templateExtend === null && this.scopeKey ) {
                var selector = '[data-binding="_value_"]';
                bindings[selector] = {observe: '' + this.scopeKey};
            } else {
                _.each(this._templateData, function( value, key ) {
                    var selector = '[data-binding="' + key + '"]';
                    bindings[selector] = {observe: '' + key};
                }, this);
            }

            this.bindings = bindings;

            return this;
        },

        postRender: function() {

        },

        updateTemplate: function() {
            var template = this.template || TMP.TemplateManager.get(this._type);
            this._assignTemplate(template);
            this._updateChildViewsTemplate();
            return this;
        },

        _updateChildViewsTemplate: function() {

            if( !this.childViews ) {
                return;
            }
            _.each(this.childViews, function( child, name ) {
                if( typeof child['updateTemplate'] === 'function' ) {
                    child.updateTemplate();
                } else if( _.isArray(child) ) {
                    _.each(child, function( c ) {
                        c.updateTemplate();
                    });
                }

            }, this);
            return this;
        }

    });

    /**
     * extend the Backbone.View extend function with a childViews parameter
     * @param options
     * @param childViews
     * @returns {*}
     */
    TMP.View.extend = function( options, childViews ) {
        options._childViews = childViews;
        return Backbone.View.extend.apply(this, [options]);
    };

    /**
     *
     * @param scope
     * @returns {this}
     */
    TMP.View.design = function( scope, childViews, isScope ) {
        var _scope = isScope ? {scope: scope} : scope;
        var f = new this(_scope);
        if( f._childViews ) {
            f.childViews = {};
            _.each(f._childViews, function( childView, name ) {
                f.childViews[name] = childView.design(scope, null, true);
            });
        }
        if( childViews ) {
            f.childViews = f.childViews || {};
            _.each(childViews, function( childView, name ) {
                f.childViews[name] = childView;
            });
        }
        return f;
    };

    /**
     * TMP.ButtonView inherits from TMP.View
     * @type {*}
     */
    TMP.ButtonView = TMP.View.extend({

        _type: 'M.ButtonView',
        _template: _.tmpl(TMP.TemplateManager.get('M.ButtonView'))

    });

    TMP.RedButtonView = TMP.ButtonView.extend({

        _type: 'M.RedButtonView'
    });

    TMP.TextfieldView = TMP.View.extend({

        _type: 'M.TextfieldView',

        label: null,

        _template: _.tmpl(TMP.TemplateManager.get('M.TextfieldView')),

        _assignTemplateValues: function() {
            TMP.View.prototype._assignTemplateValues.apply(this);
            this._templateData['label'] = this.label;
        }

    });

    TMP.ListView = TMP.View.extend({
        _type: 'M.ListView',

        _viewModelMapping: null,

        template: _.tmpl(TMP.TemplateManager.get('M.ListView')),

        _render: function() {
            TMP.View.prototype._render.apply(this, arguments);
        },

        _renderChildViews: function() {
            if( this.model ) {
                this.addItems(this.model.models);
            }
        },

        initialize: function( options ) {
            var that = this;
            TMP.View.prototype.initialize.apply(this, arguments);

            if( this.collection ) {
                this._applyListener();
            }
            this._viewModelMapping = {};
        },

        _applyListener: function() {

//            this.listenTo(this.collection, 'all', function( a,b,c ) {
//                console.log('ALLLLL', a,b,c);
//            });

            this.listenTo(this.collection, 'add', function( model, collection ) {
                console.log('add');
                this.addItem(model);
            });

            this.listenTo(this.collection, 'fetch', function() {
                console.log('fetch');
                //that.addAll();
            });
            this.listenTo(this.collection, 'change', function() {
                console.log('change!');
                //that.addAll();
            });
            this.listenTo(this.collection, 'remove', function( model ) {
                this._viewModelMapping[model.cid].$el.remove();
            });

            this.listenTo(this.collection, 'filter', function( models ) {
                console.log('filter');
                //this.addItems(models);
            });

            this.listenTo(this.collection, 'sort', function( collection ) {
                //this.addItems(this.collection.models);
                console.timeEnd('a');
            });
        },

        addItems: function( models ) {
            _.each(models, function( model ) {
                this.addItem(model);
            }, this);
        },

        addItem: function( model ) {
            var view = null;
            if( this.listItemView ) {
                view = this.listItemView.design({
                    scope: this.scope,
                    value: model
                });
                this._viewModelMapping[view.model.cid] = view;
                var el = view.render().$el;
                this.$el.find('[data-childviews="list"]').append(el);
            }
        }
    });

    TMP.ListItemView = TMP.View.extend({
        _type: 'M.ListItemView',
        template: _.tmpl(TMP.TemplateManager.get('M.ListItemView')),
        initialize: function() {
            TMP.View.prototype.initialize.apply(this, arguments);
            if( this.templateExtend ) {
                this.template = _.tmpl(this.template({value: this.templateExtend}));
            }
        }
    });


})(this);

//
//(function( _scope_ ) {
//
//    _scope_.TMP = {};
//
//    TMP.View = Backbone.View.extend({
//
//        model: null,
//
//        childViews: null,
//
//        _complexView: null,
//
//        _type: 'M.View',
//
//        template: _.tmpl('<div><%= value %><div data-childviews="CONTENT"></div></div>'),
//
//        initialize: function() {
//            this._assignValue();
//            this._assignComplexView();
//            this._assignContentBinding();
//            this.init();
//            return this;
//        },
//
//        _assignContentBinding: function() {
//            if( this.options.contentBinding && this.options.contentBinding.target ) {
//                var that = this;
//                this.listenTo(this.options.contentBinding.target, this.options.contentBinding.property, function( model ) {
//                    that._setModel(model);
//                    that.render();
//                });
//            }
//            return this;
//        },
//
//        _assignValue: function() {
//            var value = this.value || this.options.value;
//            if( Backbone.Model.prototype.isPrototypeOf(value) || Backbone.Collection.prototype.isPrototypeOf(value) ) {
//                this._setModel(value);
//            } else if( typeof value === 'function' ) {
//                this._setModel({
//                    value: value()
//                });
//            } else if( value ) {
//                this._setModel({
//                    value: value
//                });
//            } else if(this.options && this.options.contentBinding && this.options.contentBinding.target && this.options.contentBinding.property){
//                this._setModel(this.options.contentBinding.target[this.options.contentBinding.property]);
//            } else if(this.contentBinding && this.contentBinding.target && this.contentBinding.property){
//                this._setModel(this.contentBinding.target[this.contentBinding.property]);
//            }
//            return this;
//        },
//
//
//        _assignTemplate: function( template ) {
//            if( !template ) {
//                template = this.options.template || this.template;
//            }
//
//            if( template ) {
//                if( typeof template === 'function' ) {
//                    this.template = template;
//
//                } else if( _.isString(template) ) {
//                    this.template = _.tmpl(template);
//                }
//            }
//            return this;
//        },
//
//        _assignComplexView: function() {
//            this._complexView = ( this.options.contentBinding || this.options.tagName || Backbone.Model.prototype.isPrototypeOf(this.model));
//            return this;
//        },
//
//        _setModel: function( value ) {
//            this.model = value;
//            return this;
//        },
//
//        _getModel: function() {
//            return this.model;
//        },
//
//        render: function() {
//            //this._assignValue();
//            this._preRender();
//            this._render();
//            this._renderChildViews();
//            this._postRender();
//            return this;
//        },
//
//        _render: function() {
//            var dom = null;
//            if( this.model || (this.model && this.model.attributes) ) {
//                dom = this.template(this.model.attributes || this.model);
//            } else {
//                dom = this.template();
//            }
//            // a complexView appends itself to the dom element. prevent to destroy events.
//            if( this._complexView ) {
//                this.$el.append(dom);
//            } else {
//                this.$el = $(dom);
//                this.el = dom;
//            }
//
//            var that = this;
//
//            this.$el.find('[data-childviews]').each(function() {
//                var val = $(this).attr('data-childviews');
//                $(this).attr('data-childviews', that.cid + '_' + val);
//            })
//            return this;
//        },
//
//        _renderChildViews: function() {
//
//            if( !this.childViews ) {
//                this.childViews = this._getChildViews();
//            }
//            _.each(this.childViews, function( child, name ) {
//                var dom = this.$el;
//                if( this.$el.find('[data-childviews="' + this.cid + '_' + name + '"]').length ) {
//                    dom = this.$el.find('[data-childviews="' + this.cid + '_' + name + '"]');
//                }
//                if( typeof child['render'] === 'function' ) {
//                    dom.append(child.render().el);
//                } else if( _.isArray(child) ) {
//                    _.each(child, function( c ) {
//                        dom.append(c.render().el);
//                    })
//                }
//            }, this);
//            return this;
//        },
//
//        _getChildViews: function() {
//            return this.childViews || this.options.childViews;
//            var childViews = {};
//            var opt = this.options;
//            Object.keys(opt).forEach(function( child ) {
//                if( TMP.View.prototype.isPrototypeOf(opt[child]) ) {
//                    if( child === 'value' ) {
//                        console.warn("you named a view 'value' - don't do that, it's an reserved word");
//                    }
//                    childViews[child] = opt[child];
//                } else if( _.isArray(opt[child]) && TMP.View.prototype.isPrototypeOf(opt[child][0]) ) {
//                    childViews[child] = opt[child];
//                }
//            });
//
//            return childViews;
//        },
//
//        _postRender: function() {
//            if( this._complexView && this.model ) {
//                this._assignBinding();
//                this.stickit();
//            } else {
//                this._switchViewToTemplate();
//            }
//            this.postRender();
//            return this;
//        },
//
//        _switchViewToTemplate: function() {
//            this.setElement(this.$el);
//            this.delegateEvents();
//            return this;
//        },
//
//        _assignBinding: function() {
//            var bindings = {};
//
//            _.each(this.model.attributes, function( value, key ) {
//                var selector = '[data-binding="' + key + '"]';
//                bindings[selector] = {observe: '' + key};
//            }, this);
//
//            this.bindings = bindings;
//
//            return this;
//        },
//
//        _emptyHTML: function() {
//            // in _render a complexView appends itself to the dom element. so don't distroy it
//            if( this._complexView ) {
//                this.$el.html('');
//            }
//
//        },
//
//        _preRender: function() {
//            this._emptyHTML();
//            this._assignTemplate();
//            this.preRender();
//            return this;
//
//        },
//        preRender: function() {
//            return this;
//        },
//        postRender: function() {
//            return this;
//        },
//        init: function() {
//            return this;
//        },
//        setView: function( options ) {
//
//            _.each(options, function( child, name ) {
//                if(this.childViews[name]){
//                    if(typeof child === 'function'){
//                        this.childViews[name] = child.create();
//                    }
//                    this.childViews[name] = child;
//                }
//
//            }, this);
//
//            return this;
//        },
//
//        updateTemplate: function( template ) {
//            if( !template && this.options.template ) {
//                template = this.options.template;
//            } else if( !template && this.template) {
//                template = this.template;
//            } else if( !template ) {
//                template = TMP.TemplateManager.get(this._type);
//            }
//
//            this._assignTemplate(template);
//            this._updateChildViewsTemplate();
//            return this;
//        },
//
//        _updateChildViewsTemplate: function() {
//
//            if( !this.childViews ) {
//                this.childViews = this._getChildViews();
//            }
//            _.each(this.childViews, function( child, name ) {
//                if( typeof child['updateTemplate'] === 'function' ) {
//                    child.updateTemplate();
//                } else if( _.isArray(child) ) {
//                    _.each(child, function( c ) {
//                        c.updateTemplate();
//                    });
//                }
//
//            }, this);
//            return this;
//        }
//    });
//
//    /*
//    *
//    * cache childViews in _childViews if you overwrite them with the rendered once you loose information
//    *
//    * */
//
//    TMP.View.design = function( options, childViews ) {
//        var opt = options;
//        var elem = options[Object.keys(options)[0]];
//        if( TMP.View.prototype.isPrototypeOf(elem) || _.isArray(elem) || (Object.keys(options)[0] !== 'value' && _.isFunction(elem)) ) {
//            if( typeof childViews === 'function' ) {
//                opt = {_childViews: options()};
//                opt['childViews'] = {};
//            } else if( _.isArray(elem)){
//                opt = {_childViews: options};
//                opt['childViews'] = [];
//            } else {
//                opt = {_childViews: options};
//                opt['childViews'] = {};
//            }
//
//
//        }
//        if( childViews ) {
//            if( typeof childViews === 'function' ) {
//                opt['_childViews'] = childViews();
//            } else {
//                opt['_childViews'] = childViews;
//            }
//            opt['childViews'] = {};
//
//        }
//        return this.extend(opt);
//    };
//
//    TMP.View.design2 = function( options, childViews ) {
//        var opt = options;
//        var elem = options[Object.keys(options)[0]];
//        if( TMP.View.prototype.isPrototypeOf(elem) || _.isArray(elem) || (Object.keys(options)[0] !== 'value' && _.isFunction(elem)) ) {
//            opt = {_childViews: options};
//        }
//        if( childViews ) {
//            opt['_childViews'] = childViews;
//        }
//        return new this(opt);
//    };
//
//    TMP.View.create = function( options, childViews ) {
//        var that = new this();
//        if( that._childViews ) {
//            _.each(that._childViews, function( child, name ) {
//                if( typeof child['create'] === 'function' ) {
//                    var childView = child.create();
//                    that.childViews[name] = childView;
//                } else if( _.isArray(child) ) {
//                    _.each(child, function( c, cName ) {
//                        var childView = c.create();
//                        that.childViews.push(childView);
//                    })
//                }
//            }, that);
//        }
//        return that;
//    };
//
//    //    var a = location.hash.split('?');
//    //    var _params = {};
//    //    _.each(a, function( params ) {
//    //        var param = params.split('=');
//    //
//    //        if( param.length === 2 ) {
//    //            console.log(param[0]);
//    //            _params[param[0]] = param[1];
//    //        }
//    //
//    //    });
//
//
//    TMP.TemplateManager = M.Object.extend({
//
//        "M.View": {
//            defaultTemplate: '<div><div data-binding="value" contenteditable="true"><%= value %></div><div data-child-view="main"></div>'
//        },
//
//        "M.ButtonView": {
//            defaultTemplate: '<div>Button: <div data-binding="value"<% if(value) {  } %>><%= value %></div></div>',
//            topcoat: '<button class="topcoat-button--large" data-binding="value"><%= value %></button>',
//            bootstrap: '<button type="button" class="btn btn-default btn-lg"> <span class="glyphicon glyphicon-star" data-binding="value"></span><%= value %></button>',
//            jqm: '<a data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text" data-binding="value"><%= value %></span></span></a>'
//        },
//
//        "M.ToolbarView": {
//            defaultTemplate: '<div>AAA<div data-child-view="left"></div> <div class="center" data-binding="value"><%= value %></div> <div data-child-view="right"></div></div>',
//            bootstrap: '<div class="page-header"><div data-child-view="left"></div><h1><%= value %></h1><div data-child-view="right"></div></div>',
//            topcoat: '<div><h2><%= value %></h2><div data-childviews="right"></div></div>',
//            jqm: '<div data-role="header" class="ui-header ui-bar-a" role="banner"><div data-child-view="left" class="ui-btn-left"></div><h1 class="ui-title" role="heading" aria-level="1"><%= value %></h1><div data-child-view="right" class="ui-btn-right"></div></div>'
//        },
//
//        "M.ImageView": {
//            defaultTemplate: '<div><%= value %></div>',
//            bootstrap: '<div><%= value %></div>',
//            topcoat: '<div><%= value %></div>',
//            jqm: '<div><%= value %></div>'
//        },
//
//        "M.TextfieldView": {
//            defaultTemplate: '<div><%= value %></div>',
//            bootstrap: '<div><%= value %></div>',
//            topcoat: '<div><%= value %></div>',
//            jqm: '<div><%= value %></div>'
//        },
//
//        "M.ListView": {
//            defaultTemplate: '<div data-childviews="list"></div>',
//            bootstrap: '<div data-childviews="list"></div>',
//            topcoat: '<div data-childviews="list"></div>',
//            jqm: '<div data-childviews="list"></div>'
//        },
//
//        "M.ListItemView": {
//            defaultTemplate: '<div data-childviews="list"><%= value %></div>',
//            bootstrap: '<div data-childviews="list"><%= value %></div>',
//            topcoat: '<div data-childviews="list"><%= value %></div>',
//            jqm: '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-count ui-first-child ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a class="ui-link-inherit"><%= value %></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>'
//        },
//
//        "M.ModelView": {
//            defaultTemplate: '<ul><%= value %></ul>',
//            bootstrap: '<div><%= value %></div>',
//            topcoat: '<div><%= value %></div>',
//            jqm: '<div><%= value %></div>'
//        },
//
//        "M.LabelView": {
//            defaultTemplate: '<div contenteditable="true"><%= value %></div>',
//            bootstrap: '<div contenteditable="true"><%= value %></div>',
//            topcoat: '<div contenteditable="true"><%= value %></div>',
//            jqm: '<div contenteditable="true"><%= value %></div>'
//        },
//
//        "M.SearchfieldView": {
//            defaultTemplate: '<div contenteditable="true"><%= value %></div>',
//            bootstrap: '<div contenteditable="true"><%= value %></div>',
//            topcoat: '<div contenteditable="true"><%= value %></div>',
//            jqm: '<div class="ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield ui-body-c ui-focus"><input type="text" data-type="search" name="password" id="search" value="" placeholder="<%= placeholder %>" class="ui-input-text ui-body-c"><%= value %><a class="ui-input-clear ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-fullsize ui-btn-icon-notext ui-input-clear-hidden" title="clear text" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="delete" data-iconpos="notext" data-theme="c" data-mini="false"><span class="ui-btn-inner"><span class="ui-btn-text">clear text</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a></div>'
//        },
//
//        "M.AccordionView": {
//            defaultTemplate: '<ul><%= value %></ul>',
//            bootstrap: '<div><%= value %></div>',
//            topcoat: '<div><%= value %></div>',
//            jqm: '<div data-role="collapsible-set" data-theme="c" data-content-theme="d" class="ui-collapsible-set ui-corner-all" data-childviews="list"></div>'
//        },
//
//        "M.AccordionItemView": {
//            defaultTemplate: '<ul><%= value %></ul>',
//            bootstrap: '<div><%= value %></div>',
//            topcoat: '<div><%= value %></div>',
//            jqm: '<div data-role="collapsible-set" data-theme="c" data-content-theme="d" class="ui-collapsible-set ui-corner-all" data-childviews="list"></div>'
//        },
//
//        _currentUI: 'jqm',
//
//        get: function( template ) {
//            if( this[template] ) {
//                var tpl = this[template][this._currentUI];
//                if( !tpl ) {
//                    return this[template]['defaultTemplate'];
//                } else {
//                    return tpl;
//                }
//            }
//        }
//    });
//
//    TMP.Layout = TMP.View.extend({
//        _type: 'M.Layout',
//        template: _.tmpl('<div><div data-childviews="all"></div><div data-childviews="detail"></div></div>'),
//        complexView: true,
//        domParent: null,
//        initialize: function() {
//            TMP.View.prototype.initialize.apply(this, arguments);
//            if( this.domParent === null ) {
//                this.domParent = $('body');
//            }
//        },
//        render: function() {
//            TMP.View.prototype.render.apply(this, arguments);
//            this.domParent.html(this.$el)
//        }
//    });
//    TMP.LabelView = TMP.View.extend({
//        _type: 'M.LabelView',
//        template: _.tmpl(TMP.TemplateManager.get('M.LabelView'))
//    });
//    TMP.ButtonView = TMP.View.extend({
//        _type: 'M.ButtonView',
//        template: _.tmpl(TMP.TemplateManager.get('M.ButtonView'))
//    });
//    TMP.ToolbarView = TMP.View.extend({
//        _type: 'M.ToolbarView',
//        template: _.tmpl(TMP.TemplateManager.get('M.ToolbarView'))
//    });
//    TMP.ImageView = TMP.View.extend({
//        _type: 'M.ImageView',
//        template: _.tmpl(TMP.TemplateManager.get('M.ImageView'))
//    });
//    TMP.TextfieldView = TMP.View.extend({
//        _type: 'M.TextfieldView',
//        template: _.tmpl(TMP.TemplateManager.get('M.TextfieldView'))
//    });
//
//    TMP.SearchfieldView = TMP.TextfieldView.extend({
//        _type: 'M.SearchfieldView',
//        template: _.tmpl(TMP.TemplateManager.get('M.SearchfieldView')),
//        initialize: function() {
//            TMP.View.prototype.initialize.apply(this, arguments);
//        }
//    });
//
//
//    TMP.ListView = TMP.View.extend({
//        _type: 'M.ListView',
//        template: _.tmpl(TMP.TemplateManager.get('M.ListView')),
//
//        _render: function() {
//            TMP.View.prototype._render.apply(this, arguments);
//        },
//
//        _renderChildViews: function() {
//            if(this.model){
//                this.addItems(this.model.models);
//            }
//        },
//
//        initialize: function() {
//            var that = this;
//            TMP.View.prototype.initialize.apply(this, arguments);
//            this._assignValue();
//            if( Backbone.Model.prototype.isPrototypeOf(this.model) || Backbone.Collection.prototype.isPrototypeOf(this.model) ) {
//                this._applyListener();
//            }
//        },
//
//        _applyListener: function() {
//            this.listenTo(this.model, 'add', function( model, collection ) {
//                console.log('add');
//                this.addItem(model);
//            });
//
//            this.listenTo(this.model, 'fetch', function() {
//                console.log('fetch');
//                //that.addAll();
//            });
//            this.listenTo(this.model, 'change', function() {
//                console.log('change!');
//                //that.addAll();
//            });
//            this.listenTo(this.model, 'remove', function( model ) {
//                console.log('remove');
//                model.destroy();
//            });
//
//            this.listenTo(this.model, 'filter', function( models ) {
//                console.log('filter');
//                this.addItems(models);
//            });
//
//            this.listenTo(this.model, 'sort', function( collection ) {
//                this.addItems(this.model.models);
//                console.timeEnd('a');
//            });
//        },
//
//        addItems: function( models ) {
//            this._emptyHTML();
//            _.each(models, function( model ) {
//                this.addItem(model);
//            }, this);
//        },
//
//        addItem: function( model ) {
//            var view = null;
//            if( this.itemView ) {
//                view = this.itemView.design({
//                    value: model
//                }).create();
//            } else {
//                view = this.options.itemView.design2({
//                    value: model
//                })
//            }
//
//            var el = view.render().el;
//            this.$el.append(el);
//        }
//    });
//    TMP.ListItemView = TMP.View.extend({
//        _type: 'M.ListItemView',
//        template: _.tmpl(TMP.TemplateManager.get('M.ListItemView')),
//        initialize: function() {
//            TMP.View.prototype.initialize.apply(this, arguments);
//            if( this.templateExtend ) {
//                this.template = _.tmpl(this.template({value: this.templateExtend}));
//            }
//        }
//    });
//    TMP.ModelView = TMP.View.extend({
//        _type: 'M.ModelView',
//        template: _.tmpl(TMP.TemplateManager.get('M.ModelView'))
//    });
//
//    TMP.AccordionView = TMP.ListView.extend({
//        template: _.tmpl(TMP.TemplateManager.get('M.AccordionView'))
//    });
//
//
//    TMP.I18N = {};
//    TMP.I18N.get = function( lang ) {
//
//
//        return (function() {
//            return new Date().getTime()
//        })
//    };
//
//})(this);