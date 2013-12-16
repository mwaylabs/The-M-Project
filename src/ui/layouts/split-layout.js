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
    template: '<div id="m-main" class="m-perspective">' + '<div id="leftContainer">' + '<div class="m-page m-page-1">' + '<div data-childviews="left_page1"></div>' + '</div>' + '<div class="m-page m-page-2">' + '<div data-childviews="left_page2"></div>' + '</div>' + '</div>' + '<div id="rightContainer">' + '<div class="m-page m-page-1">' + '<div data-childviews="content_page1" class="content-wrapper"></div>' + '</div>' + '<div class="m-page m-page-2">' + '<div data-childviews="content_page2" class="content-wrapper"></div>' + '</div>' + '</div>' + '</div>',

    /**
     * The SwitchLayout has two container to display the content. This attribute determines which of those 2 is active at the moment
     */
    _currentPage: null,

    initialize: function() {
        M.View.prototype.initialize.apply(this, arguments);
    },

    _applyAdditionalBehaviour: function() {
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
    applyAdditionalBehaviourLeftContainer: function( element, layout ) {
        element.addClass('hidden-xs');
    },

    /**
     * Override this function to perform individual behaviour for the left container
     *
     * @param element {jQuery}
     * @param layout {M.SplitLayout}
     */
    applyAdditionalBehaviourRightContainer: function( element, layout ) {
        element.addClass('col-xs-12');
    },

    /**
     * Map views to dom
     * @param settings
     * @returns {M.SplitLayout}
     */
    applyViews: function( settings, firstInit ) {

        if( settings.content ) {
            this._currentContent = this._applyViews(this._currentContent, 'content', settings.content);
        }

        if( settings.left ) {
            this._currentLeft = this._applyViews(this._currentLeft, 'left', settings.left);
        }
        this._applyAdditionalBehaviour();


        return this;
    },

    _applyViews: function( current, name, view ) {

        var nameA = name + '_page1';
        var nameB = name + '_page2';

        if( current === null || current === undefined || current === nameB ) {
            current = nameA;

        } else if( current === nameA ) {
            current = nameB;
        }

        if( view && !this.childViews[current] ) {
            this.setChildView(current, view);
        } else if( view && this.childViews[current] !== view ) {
            this.setChildView(current, view);
        }

        if( !this._firstRender && view ) {
            //clear the dom before inserting the view
            this.$el.find('[data-childviews="' + current + '"]').html('');
            //insert the view
            this.$el.find('[data-childviews="' + current + '"]').html(view.render().$el);
        }

        M.Layout.prototype.applyViews.apply(this, arguments);

        return current;
    },

    /**
     * Initialize the Transitions on first render then call the prototype
     * @private
     */
    _postRender: function() {

        if( this._firstRender ) {
            this.rightTransition = M.PageTransitions.design().init(this.$el.find('#rightContainer'));
            this.leftTransition = M.PageTransitions.design().init(this.$el.find('#leftContainer'));
        }
        M.Layout.prototype._postRender.apply(this, arguments);

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
    },

    isAnimating: function() {
        return this.rightTransition.isAnimating() || this.leftTransition.isAnimating();
    }
});
