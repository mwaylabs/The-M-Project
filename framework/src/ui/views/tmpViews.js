(function( _scope_ ) {

    _scope_.TMP = {};

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
            var value = this.value || this.options.value;
            if( Backbone.Model.prototype.isPrototypeOf(value) || Backbone.Collection.prototype.isPrototypeOf(value) ) {
                this._setModel(value);
            } else if( typeof value === 'function' ) {
                this._setModel({
                    value: value()
                });
            } else if( value ) {
                this._setModel({
                    value: value
                });
            } else if(this.options && this.options.contentBinding && this.options.contentBinding.target && this.options.contentBinding.property){
                this._setModel(this.options.contentBinding.target[this.options.contentBinding.property]);
            } else if(this.contentBinding && this.contentBinding.target && this.contentBinding.property){
                this._setModel(this.contentBinding.target[this.contentBinding.property]);
            }
            return this;
        },


        _assignTemplate: function( template ) {
            if( !template ) {
                template = this.options.template || this.template;
            }

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
            //this._assignValue();
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
            // a complexView appends itself to the dom element. prevent to destroy events.
            if( this._complexView ) {
                this.$el.append(dom);
            } else {
                this.$el = $(dom);
                this.el = dom;
            }

            var that = this;

            this.$el.find('[data-childviews]').each(function() {
                var val = $(this).attr('data-childviews');
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
                if( typeof child['render'] === 'function' ) {
                    dom.append(child.render().el);
                } else if( _.isArray(child) ) {
                    _.each(child, function( c ) {
                        dom.append(c.render().el);
                    })
                }
            }, this);
            return this;
        },

        _getChildViews: function() {
            return this.childViews || this.options.childViews;
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

        _emptyHTML: function() {
            // in _render a complexView appends itself to the dom element. so don't distroy it
            if( this._complexView ) {
                this.$el.html('');
            }

        },

        _preRender: function() {
            this._emptyHTML();
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
        setView: function( options ) {

            _.each(options, function( child, name ) {
                if(this.childViews[name]){
                    if(typeof child === 'function'){
                        this.childViews[name] = child.create();
                    }
                    this.childViews[name] = child;
                }

            }, this);

            return this;
        },

        updateTemplate: function( template ) {
            if( !template && this.options.template ) {
                template = this.options.template;
            } else if( !template && this.template) {
                template = this.template;
            } else if( !template ) {
                template = TMP.TemplateManager.get(this._type);
            }

            this._assignTemplate(template);
            this._updateChildViewsTemplate();
            return this;
        },

        _updateChildViewsTemplate: function() {

            if( !this.childViews ) {
                this.childViews = this._getChildViews();
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

    /*
    *
    * cache childViews in _childViews if you overwrite them with the rendered once you loose information
    *
    * */

    TMP.View.design = function( options, childViews ) {
        var opt = options;
        var elem = options[Object.keys(options)[0]];
        if( TMP.View.prototype.isPrototypeOf(elem) || _.isArray(elem) || (Object.keys(options)[0] !== 'value' && _.isFunction(elem)) ) {
            if( typeof childViews === 'function' ) {
                opt = {_childViews: options()};
                opt['childViews'] = {};
            } else if( _.isArray(elem)){
                opt = {_childViews: options};
                opt['childViews'] = [];
            } else {
                opt = {_childViews: options};
                opt['childViews'] = {};
            }


        }
        if( childViews ) {
            if( typeof childViews === 'function' ) {
                opt['_childViews'] = childViews();
            } else {
                opt['_childViews'] = childViews;
            }
            opt['childViews'] = {};

        }
        return this.extend(opt);
    };

    TMP.View.design2 = function( options, childViews ) {
        var opt = options;
        var elem = options[Object.keys(options)[0]];
        if( TMP.View.prototype.isPrototypeOf(elem) || _.isArray(elem) || (Object.keys(options)[0] !== 'value' && _.isFunction(elem)) ) {
            opt = {_childViews: options};
        }
        if( childViews ) {
            opt['_childViews'] = childViews;
        }
        return new this(opt);
    };

    TMP.View.create = function( options, childViews ) {
        var that = new this();
        if( that._childViews ) {
            _.each(that._childViews, function( child, name ) {
                if( typeof child['create'] === 'function' ) {
                    var childView = child.create();
                    that.childViews[name] = childView;
                } else if( _.isArray(child) ) {
                    _.each(child, function( c, cName ) {
                        var childView = c.create();
                        that.childViews.push(childView);
                    })
                }
            }, that);
        }
        return that;
    };

    //    var a = location.hash.split('?');
    //    var _params = {};
    //    _.each(a, function( params ) {
    //        var param = params.split('=');
    //
    //        if( param.length === 2 ) {
    //            console.log(param[0]);
    //            _params[param[0]] = param[1];
    //        }
    //
    //    });


    TMP.TemplateManager = M.Object.extend({

        "M.View": {
            defaultTemplate: '<div><div data-binding="value" contenteditable="true"><%= value %></div><div data-child-view="main"></div>'
        },

        "M.ButtonView": {
            defaultTemplate: '<div>Button: <div data-binding="value"<% if(value) {  } %>><%= value %></div></div>',
            topcoat: '<button class="topcoat-button--large" data-binding="value"><%= value %></button>',
            bootstrap: '<button type="button" class="btn btn-default btn-lg"> <span class="glyphicon glyphicon-star" data-binding="value"></span><%= value %></button>',
            jqm: '<a data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text" data-binding="value"><%= value %></span></span></a>'
        },

        "M.ToolbarView": {
            defaultTemplate: '<div>AAA<div data-child-view="left"></div> <div class="center" data-binding="value"><%= value %></div> <div data-child-view="right"></div></div>',
            bootstrap: '<div class="page-header"><div data-child-view="left"></div><h1><%= value %></h1><div data-child-view="right"></div></div>',
            topcoat: '<div><h2><%= value %></h2><div data-childviews="right"></div></div>',
            jqm: '<div data-role="header" class="ui-header ui-bar-a" role="banner"><div data-child-view="left" class="ui-btn-left"></div><h1 class="ui-title" role="heading" aria-level="1"><%= value %></h1><div data-child-view="right" class="ui-btn-right"></div></div>'
        },

        "M.ImageView": {
            defaultTemplate: '<div><%= value %></div>',
            bootstrap: '<div><%= value %></div>',
            topcoat: '<div><%= value %></div>',
            jqm: '<div><%= value %></div>'
        },

        "M.TextfieldView": {
            defaultTemplate: '<div><%= value %></div>',
            bootstrap: '<div><%= value %></div>',
            topcoat: '<div><%= value %></div>',
            jqm: '<div><%= value %></div>'
        },

        "M.ListView": {
            defaultTemplate: '<div data-childviews="list"></div>',
            bootstrap: '<div data-childviews="list"></div>',
            topcoat: '<div data-childviews="list"></div>',
            jqm: '<div data-childviews="list"></div>'
        },

        "M.ListItemView": {
            defaultTemplate: '<div data-childviews="list"><%= value %></div>',
            bootstrap: '<div data-childviews="list"><%= value %></div>',
            topcoat: '<div data-childviews="list"><%= value %></div>',
            jqm: '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-count ui-first-child ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a class="ui-link-inherit"><%= value %></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>'
        },

        "M.ModelView": {
            defaultTemplate: '<ul><%= value %></ul>',
            bootstrap: '<div><%= value %></div>',
            topcoat: '<div><%= value %></div>',
            jqm: '<div><%= value %></div>'
        },

        "M.LabelView": {
            defaultTemplate: '<div contenteditable="true"><%= value %></div>',
            bootstrap: '<div contenteditable="true"><%= value %></div>',
            topcoat: '<div contenteditable="true"><%= value %></div>',
            jqm: '<div contenteditable="true"><%= value %></div>'
        },

        "M.SearchfieldView": {
            defaultTemplate: '<div contenteditable="true"><%= value %></div>',
            bootstrap: '<div contenteditable="true"><%= value %></div>',
            topcoat: '<div contenteditable="true"><%= value %></div>',
            jqm: '<div class="ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield ui-body-c ui-focus"><input type="text" data-type="search" name="password" id="search" value="" placeholder="<%= placeholder %>" class="ui-input-text ui-body-c"><%= value %><a class="ui-input-clear ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-fullsize ui-btn-icon-notext ui-input-clear-hidden" title="clear text" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="delete" data-iconpos="notext" data-theme="c" data-mini="false"><span class="ui-btn-inner"><span class="ui-btn-text">clear text</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a></div>'
        },

        "M.AccordionView": {
            defaultTemplate: '<ul><%= value %></ul>',
            bootstrap: '<div><%= value %></div>',
            topcoat: '<div><%= value %></div>',
            jqm: '<div data-role="collapsible-set" data-theme="c" data-content-theme="d" class="ui-collapsible-set ui-corner-all" data-childviews="list"></div>'
        },

        "M.AccordionItemView": {
            defaultTemplate: '<ul><%= value %></ul>',
            bootstrap: '<div><%= value %></div>',
            topcoat: '<div><%= value %></div>',
            jqm: '<div data-role="collapsible-set" data-theme="c" data-content-theme="d" class="ui-collapsible-set ui-corner-all" data-childviews="list"></div>'
        },

        _currentUI: 'jqm',

        get: function( template ) {
            if( this[template] ) {
                var tpl = this[template][this._currentUI];
                if( !tpl ) {
                    return this[template]['defaultTemplate'];
                } else {
                    return tpl;
                }
            }
        }
    });

    TMP.Layout = TMP.View.extend({
        _type: 'M.Layout',
        template: _.tmpl('<div><div data-childviews="all"></div><div data-childviews="detail"></div></div>'),
        complexView: true,
        domParent: null,
        initialize: function() {
            TMP.View.prototype.initialize.apply(this, arguments);
            if( this.domParent === null ) {
                this.domParent = $('body');
            }
        },
        render: function() {
            TMP.View.prototype.render.apply(this, arguments);
            this.domParent.html(this.$el)
        }
    });
    TMP.LabelView = TMP.View.extend({
        _type: 'M.LabelView',
        template: _.tmpl(TMP.TemplateManager.get('M.LabelView'))
    });
    TMP.ButtonView = TMP.View.extend({
        _type: 'M.ButtonView',
        template: _.tmpl(TMP.TemplateManager.get('M.ButtonView'))
    });
    TMP.ToolbarView = TMP.View.extend({
        _type: 'M.ToolbarView',
        template: _.tmpl(TMP.TemplateManager.get('M.ToolbarView'))
    });
    TMP.ImageView = TMP.View.extend({
        _type: 'M.ImageView',
        template: _.tmpl(TMP.TemplateManager.get('M.ImageView'))
    });
    TMP.TextfieldView = TMP.View.extend({
        _type: 'M.TextfieldView',
        template: _.tmpl(TMP.TemplateManager.get('M.TextfieldView'))
    });

    TMP.SearchfieldView = TMP.TextfieldView.extend({
        _type: 'M.SearchfieldView',
        template: _.tmpl(TMP.TemplateManager.get('M.SearchfieldView')),
        initialize: function() {
            TMP.View.prototype.initialize.apply(this, arguments);
        }
    });


    TMP.ListView = TMP.View.extend({
        _type: 'M.ListView',
        template: _.tmpl(TMP.TemplateManager.get('M.ListView')),

        _render: function() {
            TMP.View.prototype._render.apply(this, arguments);
        },

        _renderChildViews: function() {
            if(this.model){
                this.addItems(this.model.models);
            }
        },

        initialize: function() {
            var that = this;
            TMP.View.prototype.initialize.apply(this, arguments);
            this._assignValue();
            if( Backbone.Model.prototype.isPrototypeOf(this.model) || Backbone.Collection.prototype.isPrototypeOf(this.model) ) {
                this._applyListener();
            }
        },

        _applyListener: function() {
            this.listenTo(this.model, 'add', function( model, collection ) {
                console.log('add');
                this.addItem(model);
            });

            this.listenTo(this.model, 'fetch', function() {
                console.log('fetch');
                //that.addAll();
            });
            this.listenTo(this.model, 'change', function() {
                console.log('change!');
                //that.addAll();
            });
            this.listenTo(this.model, 'remove', function( model ) {
                console.log('remove');
                model.destroy();
            });

            this.listenTo(this.model, 'filter', function( models ) {
                console.log('filter');
                this.addItems(models);
            });

            this.listenTo(this.model, 'sort', function( collection ) {
                this.addItems(this.model.models);
                console.timeEnd('a');
            });
        },

        addItems: function( models ) {
            this._emptyHTML();
            _.each(models, function( model ) {
                this.addItem(model);
            }, this);
        },

        addItem: function( model ) {
            var view = null;
            if( this.itemView ) {
                view = this.itemView.design({
                    value: model
                }).create();
            } else {
                view = this.options.itemView.design2({
                    value: model
                })
            }

            var el = view.render().el;
            this.$el.append(el);
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
    TMP.ModelView = TMP.View.extend({
        _type: 'M.ModelView',
        template: _.tmpl(TMP.TemplateManager.get('M.ModelView'))
    });

    TMP.AccordionView = TMP.ListView.extend({
        template: _.tmpl(TMP.TemplateManager.get('M.AccordionView'))
    });


    TMP.I18N = {};
    TMP.I18N.get = function( lang ) {


        return (function() {
            return new Date().getTime()
        })
    };

})(this);
