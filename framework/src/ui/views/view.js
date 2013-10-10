//////////////////////////


//
//    var obj = {
//        f1: 'value_f1',
//        f2: 'value_f2'
//    }
//
//    var test = [
//        '<div></div>',
//        '<div class="a"></div>',
//        '<div><%= f1 %></div>',
//        '<div class="a"><%= f1 %></div>',
//        '<div class="<%= f1 %>"><%= f1 %></div>',
//        '<div class="<%= f1 %>"><%= f2 %></div>',
//        '<div class="<%= f1 %>"><%= f1 %><%= f2 %></div>',
//        '<div class="<% if(f1){ %>a<% } %>"><%= f1 %></div>',
//        '<div id="<%= f1 %>" class="<%= f2 %>"></div>',
//        '<div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"></div>',
//        '<div><div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"></div></div>',
//        '<div><div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"><div><%= f1 %></div></div></div>',
//        '<div><div class="<%= f1 %>" contenteditable="true"><%= f1 %></div><div contenteditable="true"><%= f2 %></div></div>',
//        '<input type="text" name="input" value="<%= f1 %>" />',
//        '<input placeholder="<%= f1 %>" type="text" name="input" value="<%= f1 %>" />'
//    ];
//
//    var results = [
//        '<div></div>',
//        '<div class="a"></div>',
//        '<div data-binding="f1">value_f1</div>',
//        '<div class="a" data-binding="f1">value_f1</div>',
//        '<div class="value_f1" data-binding="f1">value_f1</div>',
//        '<div class="value_f1" data-binding="f2">value_f2</div>',
//        '<div class="value_f1" data-binding="f1">value_f1value_f2</div>',
//        '<div class="a" data-binding="f1">value_f1</div>',
//        '<div id="value_f1" class="value_f2"></div>',
//        '<div id="value_f1" class="value_f1value_f2"></div>',
//        '<div><div id="value_f1" class="value_f1value_f2"></div></div>',
//        '<div><div id="value_f1" class="value_f1value_f2"><div data-binding="f1">value_f1</div></div></div>',
//        '<div><div class="value_f1" contenteditable="true" data-binding="f1">value_f1</div><div contenteditable="true" data-binding="f2">value_f2</div></div>',
//        '<input type="text" name="input" data-binding="f1" value="value_f1" />',
//        '<input placeholder="value_f1" type="text" name="input" data-binding="f1" value="value_f1" />'
//    ]
//
//
//    _.each(test, function(value, ind){
//        var func = _.tmpl(test[ind], null, {stickitAttribute: 'data-binding'});
//        var res = func(obj);
//        if(results[ind] === res){
//
//            console.log('%c' + ind + ' was successfull', 'color: green;' );
//        } else {
//            console.log('%c' + ind + ' error', 'color: red;' );
//            console.log(res);
//            console.log(results[ind]);
//            console.log('');
//        }
//    });
//
//    _.each(test, function(value, ind){
//        var func = _.tmpl(test[ind]);
//        var res = func(obj);
//        if(results[ind] === res){
//
//            console.log('%c' + ind + ' was successfull', 'color: green;' );
//        } else {
//            console.log('%c' + ind + ' error', 'color: red;' );
//            console.log(res);
//            console.log(results[ind]);
//            console.log('');
//        }
//    });

M.View = Backbone.View.extend(M.Object);

M.View.CHILD_VIEW_SELECTOR = 'data-child-view';

_.extend(M.View.prototype, {

    //    _type: 'M.View',
    //
    //    value: '',
    //
    //    model: null,
    //
    //    events: null,
    //

    //    getChildViewIdentifier: function( name ) {
    //        console.log('#' + this.options.value + ' [data-child-view="' + name + '"]');
    //        return '#' + this.options.value + ' > [data-child-view="' + name + '"]';
    //    },

    beforeRender: function() {
        this.addChildViews();
    },

    afterRender: function() {
        this._assignBinding();
        this.stickit();
        return this;
    },

    getTemplateIdentifier: function() {
        console.warn('define your f****ing own getter for the templateIdentifier');
        throw new DOMException();
    },

    template: _.tmpl('<div id="<%= value %>" contenteditable="true"><div><%= value %></div><div data-child-view="main"></div></div>'),

    initialize: function() {

        this._assignTemplate();

        this._assignEvents();

        this._assignValue();

        this._assignContentBinding();
    },

    _assignContentBinding: function() {
        if( this.contentBinding && this.contentBinding.target ) {
            var that = this;
            this.listenTo(this.contentBinding.target, this.contentBinding.property, function( model ){
                that._setValue( model );
            });
        }
    },

    _assignBinding: function(){

        var bindings = {};

        _.each(this.model.attributes, function(value, key){
            var selector = '[data-binding="' + key + '"]';
            bindings[selector] = {observe: '' + key};
        }, this);

        this.bindings = bindings;
    },

    _assignEvents: function() {

        var events = {};
        //console.log(this.template());

        _.each(this.events, function( event, eventName ) {

            events[eventName] = {};

            if( _.isFunction(event) ) {
                events[eventName] = event;
            } else if( event.action && _.isFunction(event.action) ){
                events[eventName] = event.action;
            } else if( event.target && event.action ){
                events[eventName] = event.target[event.action];
            }

        }, this);

        this.events = events;
    },

    _assignContentBinding: function() {
        if( this.contentBinding && this.contentBinding.target ) {
            var that = this;
            this.listenTo(this.contentBinding.target, this.contentBinding.property, function( model ){
                that._setValue( model );
            });
        }
    },

    _assignValue: function() {
        var value = this.options.value || this.value;

        if( _.isFunction(value) ) {
            value = value();
        }

        if( value instanceof Backbone.Model || value instanceof Backbone.Collection ) {
            this._setValue(value, true);
        } else if( !this.model ) {
            this.model = new Backbone.Model({value: value });
        }
    },

    _assignTemplate: function() {
        if( this.options.template ) {

            //if the options template is allready an template use this one
            if( _.isFunction(this.options.template) || _.isNodeList(this.options.template) ) {
                this.template = this.options.template;
            } else if( _.isObject(this.options.template) ) {
                // if the template is an object, then it is assumed the M.TemplateManager has an stored template for the given one
                var templateIdentifier = this.getTemplateIdentifier();
                var options = {template: _.extend(M.TemplateManager[templateIdentifier], this.options.template)};
                var template = M.TemplateManager.get.apply(options, ['template']);
                if( template ) {
                    this.template = _.tmpl(template);
                } else {
                    console.warn('template not found');
                }

            } else if( typeof this.options.template === 'string' ) {
                // if the template is just a string, it should be the template - so call _.tmpl on it.
                this.template = _.tmpl(this.options.template);
            }
        }
    },


    //TODO... it is not setValue it is setModel
    _setValue: function( value, doNotRender ) {
        this.model = value;
        if( !doNotRender ) {
            this.render();
        }

    },
    //
    //    // provide data to the template
    serialize: function() {

        return this.model ? this.model.attributes : {};
    },

    applyViews: function() {
        this.prototype.applyViews.apply(this, arguments);
    },

    isView: function( view ) {
        if( view ) {
            return M.View.prototype.isPrototypeOf(view);
        } else {
            return M.View.prototype.isPrototypeOf(this);
        }
    },

    addChildViews: function() {
        var childViews = this.getChildViews();
        childViews = this._applyChildViewBinding(childViews);
        if( childViews ) {
            var children = {};
            _.each(childViews, function( child, query ) {
                if( _.isFunction(child) ) {
                    children[query] = child.create();
                } else if( _.isArray(child) ) {
                    children[query] = [];
                    _.each(child, function( view ) {
                        if( _.isFunction(view) ) {
                            children[query].push(view.create());
                        } else {
                            children[query].push(view);
                        }
                    }, this);
                } else {
                    children[query] = child;
                }
            }, this);
            this.children = children;
            this.setViews(children);
        }
    },

    _applyChildViewBinding: function(childViews){

        //if there are no childviews return
        if(!childViews){
            return
        }
        //if the template contains childViews get there names
        var regEx = new RegExp(M.View.CHILD_VIEW_SELECTOR + '\=\"([a-zA-Z0-9]*)"', 'gi');
        //get the template as a string
        var template = this.template.source || this.template;
        var _childViewKeys = [];
        var childViewKeys = [];
        //and find all childviews in the template
        while ((_childViewKeys = regEx.exec(template)) !== null)
        {
            childViewKeys.push(_childViewKeys[1]);
        }

        var newChildViews = childViews;
        //if there are any differences between the given childViews and the ones defined in the template just stop and use the given childviews
        if(_.difference(Object.keys(childViews), childViewKeys).length === 0){

            newChildViews = {};
            //if there are no differences apply a new key to match the childviews
            //so 'childViewKey': Object is set to: '[data-child-views="childViewKey"]': Object'
            _.each(childViews, function(value, key){

                var _key = '[' + M.View.CHILD_VIEW_SELECTOR + '="' + key + '"]';
                newChildViews[_key] = value;

            }, this);

        } else {
            console.warn('found inconsistencies in child views so these are used: ', newChildViews);
        }

        return newChildViews;
    },

    getChildViews: function() {
        if( this.childViews ) {
            return this.childViews;
        }
        return this.childViews;
    }
});

M.View.create = M.create;