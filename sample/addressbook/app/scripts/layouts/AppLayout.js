(function( scope ) {


    var switchTemplate = M.SwitchLayout.prototype.template;
    var headerTemplate = M.HeaderLayout.prototype.template;
    var myTemplate = switchTemplate.replace(/m-page-1">/gi, 'm-page-1">' + headerTemplate.replace(/data-childviews="header"/gi, 'data-childviews="content_page1_header"'));
    myTemplate = myTemplate.replace(/m-page-2">/gi, 'm-page-2">' + headerTemplate.replace(/data-childviews="header"/gi, 'data-childviews="content_page2_header"'));


    M.AppLayout = M.SwitchLayout.extend({

        template: myTemplate,

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