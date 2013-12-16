// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

M.Themes.registerTemplateForTheme(M.Themes.DEFAULT_THEME, 'switch-layout', '<div id="m-main" class="m-perspective"><div class="m-page m-page-1"><div data-childviews="content_page1" class="content-wrapper"></div></div><div class="m-page m-page-2"><div data-childviews="content_page2" class="content-wrapper"></div></div></div>');
/**
 *
 * @module M.SwitchLayout
 * @type {*}
 * @extends M.Layout
 */
M.SwitchLayout = M.Layout.extend({

    /**
     * The type of the Layout
     */
    _type: 'M.SwitchLayout',

    /**
     * The template of the Layout
     */
    template: M.Themes.getTemplateByName('switch-layout'),

    /**
     * The SwitchLayout has two container to display the content. This attribute determines which of those 2 is active at the moment
     */
    _currentPage: null,

    /**
     * Map views to dom
     * @param settings
     * @returns {SwitchLayout}
     */
    applyViews: function( settings ){

        if(this._currentPage === null || this._currentPage === undefined || this._currentPage === 'content_page2'){
            this._currentPage = 'content_page1';

        } else if(this._currentPage === 'content_page1'){
            this._currentPage = 'content_page2';
        }

        if(!this.childViews[this._currentPage]){
            if(settings.content){
                this.setChildView(this._currentPage, settings.content);
            }

        } else if(this.childViews[this._currentPage] !== settings.content){
            if(settings.content){
                this.setChildView(this._currentPage, settings.content);
            }

        }

        if(!this._firstRender){
            //clear the dom before inserting the view
            this.$el.find('[data-childviews="' + this._currentPage + '"]').html('');
            //insert the view
            this.$el.find('[data-childviews="' + this._currentPage + '"]').html(settings.content.render().$el);
        }

        M.Layout.prototype.applyViews.apply(this, arguments);
        return this;
    },

    /**
     * Initialize the Transitions on first render then call the prototype
     * @private
     */
    _postRender: function(){

        if(this._firstRender){
            M.PageTransitions.init(this.$el.find('#m-main'));
        }
        M.Layout.prototype._postRender.apply(this, arguments);
    }
});
