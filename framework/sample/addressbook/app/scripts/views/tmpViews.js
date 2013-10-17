(function( scope ) {


    /**
     *
     * create TMP Namespace
     *
     * */
    scope.TMP = {};


    /**
     *
     * TMP.View inherits from Backbone.View
     *
     * @type {*}
     */
    TMP.View = Backbone.View.extend({

        /*
         * define a template based on the tmpl template engine
         */
        template: _.tmpl('<div></div>'),

        /**
         * implement render function
         * @returns {this}
         */
        render: function() {
            console.log('render: ', this.value, this._type);
            return this;
        },
        _type: 'TMP.View'

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
    TMP.View.design = function( scope, childViews, scopeAreOptions ) {
        var f = new this(scopeAreOptions === false ? {} : scope);
        f.scope = scope;
        if(f._childViews){
            f.childViews = {};
            _.each(f._childViews, function( childView, name ) {
                f.childViews[name] = childView.design(scope, null, false);
            });
        }
        if(childViews){
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

        _type: 'TMP.ButtonView',

        template: _.template('<button></button>')
    });

    TMP.RedButtonView = TMP.ButtonView.extend({

        _type: 'TMP.RedButtonView'
    });


})(this);