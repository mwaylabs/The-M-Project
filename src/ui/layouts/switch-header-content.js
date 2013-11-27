(function( scope ) {

    /**
     * @type {String} the switchlayout template
     */
    var switchTemplate = M.SwitchLayout.prototype.template;
    /**
     * @type {String} the header template
     */
    var headerTemplate = M.HeaderLayout.prototype.template;
    /**
     * add a header to the both content container
     * @type {String}
     */
    var myTemplate = switchTemplate.replace(/m-page-1">/gi, 'm-page-1">' + headerTemplate.replace(/data-childviews="header"/gi, 'data-childviews="content_page1_header"'));
    myTemplate = myTemplate.replace(/m-page-2">/gi, 'm-page-2">' + headerTemplate.replace(/data-childviews="header"/gi, 'data-childviews="content_page2_header"'));


    /**
     * A Switchlayout with a header and content
     * @type {*|Object|void}
     */
    M.SwitchHeaderContentLayout = M.SwitchLayout.extend({

        /**
         * @type {String} the template - a combination of the header and switch template
         */
        template: myTemplate,

        /**
         * The content gets mapped to the DOM via the Switchlayout. Then map the header to the Layout.
         * @param {Object} the views to display
         * @returns {SwitchHeaderContentLayout}
         */
        applyViews: function( settings ) {

            M.SwitchLayout.prototype.applyViews.apply(this, [settings]);

            if(!this.childViews[this.currentPage + '_header'] && settings.header){
                this.addChildView(this.currentPage + '_header', settings.header);
            }

            if( settings.header && !this._firstRender ) {
                this.$el.find('[data-childviews="' + this._currentPage + '_header' + '"]').html('');
                this.$el.find('[data-childviews="' + this._currentPage + '_header' + '"]').html(settings.header.render().$el);
            }

            return this;
        }
    });


})(this);