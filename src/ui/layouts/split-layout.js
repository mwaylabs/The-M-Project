// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * @module M.SwitchLayout
 * @type {*}
 * @extends M.Layout
 */
M.SplitLayout = M.SwitchLayout.extend({

    /**
     * The type of the Layout
     */
    _type: 'M.SplitLayout',

    /**
     * Bootstrap grid class for the left container
     * @type {String}
     */
    gridLeft: 'col-xs-4',

    /**
     * Bootstrap grid class for the right container
     * @type {String}
     */
    gridRight: 'col-xs-8',

    /**
     * The template of the Layout
     */
    template: '<div id="m-main" class="m-perspective">' +
            '<div id="leftContainer" data-childviews="left"></div>' +
            '<div id="rightContainer">' +
              '<div class="m-page m-page-1">' +
                  '<div data-childviews="content_page1" class="content-wrapper"></div>' +
              '</div>' +
              '<div class="m-page m-page-2">' +
                  '<div data-childviews="content_page2" class="content-wrapper"></div>' +
              '</div>' +
           '</div>' +
        '</div>',

    /**
     * The SwitchLayout has two container to display the content. This attribute determines which of those 2 is active at the moment
     */
    _currentPage: null,

    initialize: function () {
        M.View.prototype.initialize.apply(this, arguments);
    },

    _applyAdditionalBehaviour: function () {
        var left = this._getLeftContainer();
        var right = this._getRightContainer();
        this.applyAdditionalBehaviourLeftContainer(left, this);
        this.applyAdditionalBehaviourRightContainer(right, this);
    },

    /**
     * Override this function to perform individual behaviour for the right container
     *
     * @param element {jQuery}
     * @param layout {M.SplitLayout}
     */
    applyAdditionalBehaviourLeftContainer: function (element, layout) {
        element.addClass('hidden-xs');
    },

    /**
     * Override this function to perform individual behaviour for the left container
     *
     * @param element {jQuery}
     * @param layout {M.SplitLayout}
     */
    applyAdditionalBehaviourRightContainer: function (element, layout) {
        element.addClass('col-xs-12');
    },

    /**
     * Map views to dom
     * @param settings
     * @returns {M.SplitLayout}
     */
    applyViews: function (settings) {
        M.SwitchLayout.prototype.applyViews.apply(this, arguments);

        this._applyAdditionalBehaviour();

        if(!this._firstRender && settings.left){
            this.$el.find('[data-childviews="left"]').html(settings.left.render().$el);
        }

        return this;
    },

    _postRender: function() {
        M.SwitchLayout.prototype._postRender.apply(this, arguments);

        // Add grid classes
        this._getLeftContainer().addClass(this.gridLeft);
        this._getRightContainer().addClass(this.gridRight);

        return this;
    },

    /**
     * Returns an jQuery element which represents the left container
     *
     * @returns {*|Mixed}
     * @private
     */
    _getLeftContainer: function() {
        return this.$el.find('#leftContainer');
    },

    /**
     * Returns an jQuery element which represents the right container
     *
     * @returns {*|Mixed}
     * @private
     */
    _getRightContainer: function() {
        return this.$el.find('#rightContainer');
    }
});
