window.M = M || {};
M.ListView = M.View.extend({

    _type: 'M.ListView',

    template: '<div data-child-view="list"></div>',

    viewMapping: {},

    _lastDividerValue: null,

    beforeRender: function() {
        console.log('before list render');
        if( !this.hasRendered ) {
            this.addAll_2();
        }
    },

    initialize: function() {
        var that = this;
        M.View.prototype.initialize.apply(this, arguments);

        this.listenTo(this.model, 'add', function( model, collection ) {
            //that.addOne(model, true);
        });

        this.listenTo(this.model, 'fetch', function() {
            console.log('fetch');
            //that.addAll();
        });
        this.listenTo(this.model, 'remove', this.removeOne);

        this.listenTo(this.model, 'sort', function() {
            console.log('sort');
            that._onSort();
        });

        //            this.listenTo(this.model, 'sync', function( a, b, c ) {
        //                debugger;
        //                //                that.render();
        //            });

        //            this.listenToOnce(this.model, 'reset', function( a, b, c ) {
        //                debugger;
        //                //                that.render();
        //            });

        //            this.addAll.apply(this);
    },

    _assignValue: function(){
        var value = this.options.value || this.value;

        if( _.isFunction(value) ) {
            value = value();
        }

        if( value instanceof Backbone.Model || value instanceof Backbone.Collection ) {
            this._setValue(value, true);
        } else if( !this.model ) {
            this.model = new Backbone.Collection(value);
        }
    },

    removeOne: function( removedObj, collection, xhr ) {

        this._getViewMapping(removedObj.cid).remove();
        this._removeViewMapping(removedObj.cid);
    },

    serialize: function() {
        return this;
    },

    addAll_5: function( render ) {

        //console.time('addAll2');
        this._lastDividerValue = null;
        var template = _.tmpl(this.listItemTemplate);
        var events = this.listItemEvents;
        var that = this;

        var _d = $('<div></div>');
        _.each(this.model.models, function( model ) {
            //that.addOne({value: model, template: template, events: events}, render);

            var a = template(model.serialize());
            _d.append(a);

        }, this);

        this.$el.html(_d);

        _.each(events, function( callback, ev ) {

            this.$el.on(ev, function( ev ) {

                var sell = {};
                var ind = $(ev.target).index();
                sell.model = that.model.models[ind];
                sell.template = template;
                sell.events = events;

                callback.apply(sell);
            })
        }, this);
        //this.renderViews();
        //console.timeEnd('addAll2');
    },

    addAll_4: function( render ) {

        //console.time('addAll2');
        this._lastDividerValue = null;
        var template = _.tmpl(this.listItemTemplate);
        var events = this.listItemEvents;
        var that = this;
        var t = $(template());
        var _d = $('<div></div>');
        _.each(this.model.models, function( model ) {
            var a = template(model.serialize());
            this._insertView(a);
        }, this);
        //this.renderViews();
        //console.timeEnd('addAll2');
    },

    addAll_3: function( render ) {

        //console.time('addAll2');
        this._lastDividerValue = null;
        var template = _.tmpl(this.listItemTemplate);
        var events = this.listItemEvents;
        var that = this;
        _.each(this.model.models, function( model ) {
            that.addOne({value: model, template: template, events: events}, render);
        }, this);
        //this.renderViews();
        //console.timeEnd('addAll2');
    },

    addAll_2: function( render ) {
        //console.time('addAll2');
        this._lastDividerValue = null;
        this.removeView();
        var template = _.tmpl(this.listItemTemplate);
        var events = this.listItemEvents;
        var that = this;
        _.each(this.model.models, function( model ) {
            that.addOne({value: model, template: template, events: events}, render);
        }, this);
        this.renderViews();
        //console.timeEnd('addAll2');
    },

    addAll_1: function( render ) {
        //console.time('addAll1');
        this._lastDividerValue = null;
        var template = _.tmpl(this.listItemTemplate);
        var events = this.listItemEvents;
        var that = this;
        _.each(this.model.models, function( model ) {
            that.addOne({value: model, template: template, events: events}, render);
        }, this);
        //console.timeEnd('addAll1');
    },

    _addDivider: function( model ) {
        var _divider = this.divider(model);
        var _dividerValue = _divider.options ? _divider.options.value : _divider;
        if( this._lastDividerValue !== _dividerValue ) {
            this._lastDividerValue = _dividerValue;
            this._insertDivider(_divider);
        }
    },

    _insertDivider: function( _divider ) {

        var dividerView = _divider;
        if( !(_.isObject(dividerView) && dividerView.isView()) ) {
            dividerView = M.View.create({
                value: _divider
            });
        }

        this.insertView('[data-child-view="list"]', dividerView);
        dividerView.render();
    },

    addOne: function( opt, render ) {
        //a: 669.190ms
        var view = M.View.create({
            value: opt.value,
            template: opt.template,
            events: opt.events,
            //SPEED UP!!
            afterRender: function() {
                return this;
            }
        });

        //a: 439.951ms
        //        var view = new Backbone.View({
        //            model: opt.value,
        //            template: opt.template,
        ////            events: opt.events
        //        });

        //this._addDivider(opt.value);
        this._insertView(view);

        if( render ) {
            view.render();
        }


        //this._setViewMapping(view, model.cid);
    },

    _insertView: function( view ) {
        this.insertView('[data-child-view="list"]', view);
    },

    _setViewMapping: function( view, cid ) {

        this.viewMapping[cid] = view;
    },

    _getViewMapping: function( cid ) {

        return this.viewMapping[cid];
    },

    _removeViewMapping: function( cid ) {

        delete this.viewMapping[cid];
    },

    _renderUpdate: function() {
        this.removeView();
        this.addAll_2(true);
    },

    _onSort: function( collection ) {
        console.log('SORT');
        this._renderUpdate();
    }
});


//test = function() {
//
//    var time = 0;
//    //    for(var i = 0; i<= 100; i++){
//    //        Addressbook.IndexController.AllContacts.removeView();
//    //        var startTime =  new Date().getTime();
//    //        Addressbook.IndexController.AllContacts.addAll_1(true);
//    //        time += (new Date().getTime() - startTime);
//    //    }
//    //    console.log(time);
//    //
//    //    var time = 0;
//    //
//    //    for(var i = 0; i<= 100; i++){
//    //        Addressbook.IndexController.AllContacts.remove();
//    //        var startTime =  new Date().getTime();
//    //        Addressbook.IndexController.AllContacts.addAll_2(false);
//    //        time += (new Date().getTime() - startTime);
//    //    }
//    //
//    //    console.log(time);
//    //
//    //    var time = 0;
//    //
//    //    for(var i = 0; i<= 100; i++){
//    //        Addressbook.IndexController.AllContacts.remove();
//    //        var startTime =  new Date().getTime();
//    //        Addressbook.IndexController.AllContacts.addAll_3(true);
//    //        time += (new Date().getTime() - startTime);
//    //    }
//    //
//    //    console.log(time);
//
//    var time = 0;
//
//    for( var i = 0; i <= 100; i++ ) {
//        var startTime = new Date().getTime();
//        Addressbook.IndexController.AllContacts.addAll_4(true);
//        time += (new Date().getTime() - startTime);
//    }
//
//    console.log(time);
//
//    var time = 0;
//
//    for( var i = 0; i <= 100; i++ ) {
//        var startTime = new Date().getTime();
//        Addressbook.IndexController.AllContacts.addAll_5(true);
//        time += (new Date().getTime() - startTime);
//    }
//
//    console.log(time);
//
//}


//View = {
//
//    models: {},
//
//    dom: {},
//
//    setModel: function( model ) {
//        var m = model
//        if(!this.models[m.cid]) {
//            this.models[m.cid] = model;
//            this.modelEventBinding(m);
//            this.currentModel = m;
//        } else {
//            this.currentModel = this.models[model.cid];
//        }
//
//        this.render();
//    },
//
//
//    preRender: function(){
//
//    },
//
//    postRender: function(){
//
//    },
//
//    init: function() {
//        this.template = _.tmpl('<div><div><%= name %></div><div><%= lastname %></div></div>');
//        return this;
//    },
//
//    modelEventBinding: function(model) {
//        var that = this;
//        model.on('change',function(model){
//            that.modelAttributeDidChange.apply(that,[model]);
//        });
//    },
//
//    modelAttributeDidChange: function( model ) {
//
//        var domEl = this.dom[model.cid];
//        _.each(model.changed, function(value, key){
//            domEl.find('[data-binding="' + key + '"]').html(value);
//        });
//    },
//
//    render: function(){
//        this.preRender();
//        this.$dom = $(this.template(this.currentModel.attributes));
//        this.$dom.attr('data-id', this.currentModel.cid);
//        this.dom[this.currentModel.cid] = this.$dom;
//        this.postRender();
//    },
//
//    getDom: function(){
//        var dom = $('<div></div>');
//        _.each(this.dom, function(value, key){
//            dom.append(value);
//        }, this);
//        return dom;
//    }
//
//};
//
//Button = {
//    init: function() {
//        this.template = _.tmpl('<div>BUTTON: <div><%= name %></div><div><%= lastname %></div></div>');
//        return this;
//    }
//}
//
////a = M.Model.create({name: 'name1', lastname: 'lastname1'})
////b = M.Model.create({name: 'name2', lastname: 'lastname2'})
//
//TMP = {};
//TMP.View = Object.create(View);
//
//TMP.Button = Object.create(View, Button);
////v.init();
////
////_.each(Addressbook.ContactCollection.models, function(model){
////    v.setModel(model);
////});
////
////v = Object.create(View);
////
////$('body').append(v.getDom());
