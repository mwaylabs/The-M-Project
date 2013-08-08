_.extend(Backbone.Layout.prototype, {

    transition: null,

    currentLayout: null,

    isFirstLoad: true,

    setTransition: function( transition ) {

    },

    initialize: function() {

    },

    applyViews: function( settings ) {
        var views = this.currentLayout.applyViews(settings);
        this.setViews(views);
        this.render();
    },

    initialRenderProcess: function() {
        this.render();
        $('body').html(this.el);
        PageTransitions.init();
    },

    updateViewport: function() {

    },

    navigate: function( settings ) {

        var url = settings.route;
        var path = '';
        if( settings.params ) {
            path = _.isArray(settings.params) ? settings.params.join('/') : settings.params;
            url += '/';
        }
        var options = settings.options || true;

        this.setTransition(settings.transition);

        this.isFirstLoad = false;

        Backbone.history.navigate(url + path, options);
    },

    setLayout: function( layout ) {
        if( this.currentLayout && this.currentLayout.identifier === layout.identifier ) {
            return this;
        } else {
            this.currentLayout = layout;
            this.el = this.currentLayout.template;
            this.constructor(this);
            this.currentLayout.initialize();
            this.isFirstLoad = true;
        }
        return this;

    },

    getLayout: function() {
        return this.currentLayout;
    }


});
