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
     * The template of the Layout
     */
    template: '<div id="m-main" class="m-perspective">' +
            '<div class="col-xs-4 leftContainer" data-childviews="left"></div>' +
            '<div class="col-xs-8 rightContainer">' +
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
        var containerLeft = this.$el.find('[data-childviews="left"]');
        var containerRight = this.$el.find('.rightContainer').eq(0);
        this.applyAdditionalBehaviourLeftContainer(containerLeft, this);
        this.applyAdditionalBehaviourRightContainer(containerRight, this);
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
    }
});
