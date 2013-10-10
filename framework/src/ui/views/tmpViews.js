(function( _scope_ ) {

    _scope_.TMP = {};

    TMP.View = Backbone.View.extend({

        model: null,

        childViews: null,

        _complexView: null,

        _type: 'M.View',

        template: _.tmpl('<div><%= value %><div data-childviews="CONTENT"></div></div>'),

        initialize: function() {
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
            console.log(this.options.value, this._type);
            if( Backbone.Model.prototype.isPrototypeOf(this.options.value) || Backbone.Collection.prototype.isPrototypeOf(this.options.value) ) {
                this._setModel(this.options.value);
            } else if( typeof this.options.value === 'function' ) {
                this._setModel({
                    value: this.options.value()
                });
            } else if( this.options.value ) {
                this._setModel({
                    value: this.options.value
                });
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
            this._assignValue();
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

            var that = this;

            this.$el.find('[data-childviews]').each(function() {

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
        setView: function( options ) {

            _.each(options, function( viewOptions, name ) {
                if( typeof this.options.childViews[name] === 'function' ) {
                    var childView = this.options.childViews[name].design(viewOptions);
                    this.options.childViews[name] = childView;
                }
            }, this);
            return this;
        },

        updateTemplate: function( template ) {

            if( !template && this.options.template ) {
                template = this.options.template;
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

    TMP.View.design = function( options, childViews ) {
        var opt = options;
        var elem = options[Object.keys(options)[0]];
        if( TMP.View.prototype.isPrototypeOf(elem) || _.isArray(elem) || (Object.keys(options)[0] !== 'value' && _.isFunction(elem)) ) {
            opt = {childViews: options};
        }
        if( childViews ) {
            opt['childViews'] = childViews;
        }
        return new this(opt);
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

        _currentUI: 'topcoat',

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
    TMP.ListView = TMP.View.extend({
        _type: 'M.ListView',
        template: _.tmpl(TMP.TemplateManager.get('M.ListView')),
        _renderChildViews: function() {

        },
        initialize: function() {
            var that = this;
            TMP.View.prototype.initialize.apply(this, arguments);
            this._assignValue();
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
        template: _.tmpl(TMP.TemplateManager.get('M.ModelView'))
    });


    TMP.I18N = {};
    TMP.I18N.get = function( lang ){


        return (function(){return new Date().getTime()})
    };

})(this);
