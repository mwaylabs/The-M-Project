M.LoaderView = M.View.extend({

    _type: 'M.LoaderView',

    _template: _.tmpl(M.TemplateManager.get('M.LoaderView')),

    initialize: function () {
        M.View.prototype.initialize.apply(this, arguments);
    },

    render: function (settings) {
        //this._assignValue();
        this._preRender(settings);
        this._render(settings);
        this._renderChildViews(settings);
        this._postRender(settings);
        return this;
    },

    show: function () {
        $('html').addClass('ui-loading');
        return this;
    },

    hide: function () {
        $('html').removeClass('ui-loading');
        return this;
    },

    isShown: function () {
        return $('html').hasClass('ui-loading');
    },

    toggle: function () {
        if(this.isShown()) {
            this.hide();
        } else {
            this.show();
        }
    }
});