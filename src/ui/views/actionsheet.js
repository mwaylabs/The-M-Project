// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * Explanation
 *
 * @module M.ActionSheetView
 * @extends M.ModalView
 * @type {*|Object|void}
 *
 * @example
 *
 *
 *
 *
 */

M.ActionSheetView = M.ModalView.extend({

    /**
     * The type of the View
     * @private
     * @type {String}
     */
    _type: 'M.ActionSheetView',

    /**
     * Defines that the ActionSheet view can be closed by clicking on the overlay.
     * @type {String}
     */
    hideOnOverlayClick: YES,

    /**
     * Defines the title of the ActionSheet view.
     * @type {String}
     */
    title: '',

    cancelButton: YES,

    cancelLabel: 'Cancel',

    /**
     * Duration of the css transition animation
     * @type {Float}
     */
    duration: (parseFloat(M.ThemeVars.get('actionsheet-transition-time','default')))*1000,

    useAsScope: YES,

    _templateString:  M.TemplateManager.get('actionsheet.ejs'),

    assignTemplateValues: function(){
        return {
            title: this.title
        };
    },

    initialize: function(){
        M.ModalView.prototype.initialize.apply(this, arguments);

        this.title = this.title || '';
        this._childViews = this._childViews || {};

        this.cancelLabel = (this.cancelLabel || this.cancelLabel === '') ? this.cancelLabel : 'Cancel';

        var cancelButton = null;
        var buttonGrid = 'col-xs-10 col-xs-offset-1';

        if(this.cancelButton){

            cancelButton = M.ButtonView.extend({
                grid: buttonGrid,
                value: this.cancelLabel,
                cssClass: 'cancelButton m-error',
                events: {
                    tap: '_onCancel'
                }
            });

            if(this._childViews.cancelButton){
                console.log('there is already a cancelButton as childview!');
            } else {
                this._childViews.cancelButton = cancelButton;
            }
        }


        return this;


    },

    _getChildViewRenderDom: function (name) {
        var dom = this.$el;
        if (this.$el.find('[data-childviews="' + name + '"]').length) {
            dom = this.$el.find('[data-childviews="' + name + '"]');
            dom.addClass(name);
        }else {
            dom = this.$el.find('[data-childviews="actionsheetChildren"]');
            dom.addClass('actionsheetChildren');
        }
        return dom;
    },

    onCancel: function() {
    },

    _onCancel: function() {
        var that = this;
        this._toggleVisibility();
        this.onCancel();
        if(this.duration){
            setTimeout(function(){
                that.hide();
            }, this.duration);
        }else {
            this.hide();
        }

    },

    /**
     * Hides the view
     *
     * @param {Event} event
     * @param {M.Modal} view
     * @private
     */
    _closeHandler: function( event, view ) {
        if( this.hideOnOverlayClick && event.target === view.el ) {
            this._toggleVisibility();
            if(this.duration){
                setTimeout(function(){
                    view.hide();
                }, this.duration);
            }else {
                view.hide();
            }
        }
    },

    _toggleVisibility: function(){
        var that = this;
        setTimeout(function(){
            that.$el.toggleClass('is-visible');
        }, 0);

    },

    /**
     * Show the ActionSheet view
     * @param {String} text - The text for the dialog view
     * @returns {DialogView}
     */
    show: function() {
        M.ModalView.prototype.show.apply(this, arguments);
        this._toggleVisibility();

        return this;
    }
});

M.ActionSheet = M.ActionSheetView.create().render();



