// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

(function( scope ) {

    /**
     * the switchlayout template
     * @type {string}
     */
    var switchTemplate = M.SwitchLayout.prototype.template;
    /**
     * the header template
     * @type {string}
     */
    var headerTemplate = M.HeaderLayout.prototype.template;
    /**
     * add a header to the both content container
     * @type {string}
     */
    var myTemplate = switchTemplate.replace(/m-page-1">/gi, 'm-page-1">' + headerTemplate.replace(/data-childviews="header"/gi, 'data-childviews="content_page1_header"'));
    myTemplate = myTemplate.replace(/m-page-2">/gi, 'm-page-2">' + headerTemplate.replace(/data-childviews="header"/gi, 'data-childviews="content_page2_header"'));

    /**
     * A Switchlayout with a header and content
     * @type {*|Object|void}
     */
    M.SwitchHeaderContentLayout = M.SwitchLayout.extend({

        _type: 'M.SwitchHeaderContentLayout',

        /**
         * the template - a combination of the header and switch template
         * @type {string}
         */
        template: myTemplate,

        cssClass:'switch-header-content-layout',

        /**
         * The content gets mapped to the DOM via the Switchlayout. Then map the header to the Layout.
         * @param {Object} the views to display
         * @returns {SwitchHeaderContentLayout}
         */
        applyViews: function( settings ) {

            M.SwitchLayout.prototype.applyViews.apply(this, [settings]);

            if(!this.childViews[this._currentPage + '_header'] && settings.header){
                this.setChildView(this._currentPage + '_header', settings.header);
            }

            if( settings.header && !this._firstRender ) {
                this.$el.find('[data-childviews="' + this._currentPage + '_header' + '"]').html('');
                this.$el.find('[data-childviews="' + this._currentPage + '_header' + '"]').html(settings.header.render().$el);
            }

            return this;
        }
    });


})(this);