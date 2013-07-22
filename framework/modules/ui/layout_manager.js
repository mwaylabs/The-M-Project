
M.LALA = {};

define([
    "backbone.layoutmanager",
    "M.Object"
],

    function( LayoutManager ) {

        var BackboneLayoutManager = arguments[0];
        var MObject = arguments[1];

        /**
         * Extends the backbone layout manager object
         */
        _.extend(LayoutManager.prototype, {

            transition: null,

            setTransition: function(transition){

            },

            initialize: function(){

            },

            switchToPage: function(){
                this.render();
                $('body').html(this.el);
            },

            navigate: function(settings){
                var url = settings.route + '/';
                var path = _.isArray(settings.params) ? settings.params.join('/') : settings.params ;
                var options = settings.options || true;
                this.setTransition(settings.transition);

                Backbone.history.navigate(url + path, options);
            },

            useLayout: function(template){

                if(this.options.template === template){
                    return this;
                } else {
                    this.el = template;
                    this.constructor(this);
                }
                return this;

            }

        });

        return M.LayoutManager;

    });



//M.Collection =