M.Application = M.Controller.extend({

    _type: 'M.Application',

    router: null,

    initialize: function(){
        return this;
    },

    start: function( options ) {
        if(!options.router){
            console.warn('no router was given to the app start');
        }
        this.router =  new options.router();
        Backbone.history.start();
        return this;
    },

    initialRender: function(){
        this.layoutManager.initialRenderProcess();
    },

    _setControllers: function(){
        _.each(this.router.routes, function( route ){

            if(this.router[route] && M.Controller.prototype.isPrototypeOf(this.router[route])){
                this[route] = this.router[route];
            }
        }, this);
    },

    navigate: function( settings ) {

        var url = settings.route;
        var path = '';
        if( settings.params ) {
            path = _.isArray(settings.params) ? settings.params.join('/') : settings.params;
            url += '/';
        }
        var options = settings.options || true;

        //this.setTransition(settings.transition);

        this.isFirstLoad = false;

        Backbone.history.navigate(url + path, options);
    }
});