// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.TabView
 *
 * @type {*}
 * @extends M.View
 */
M.SwitchView = M.View.extend({

    _type: 'M.SwitchView',

    _templateString: M.TemplateManager.get('switch.ejs'),

    /**
     * The SwitchLayout has two container to display the content. This attribute determines which of those 2 is active at the moment
     */
    _currentContainer: null,

    _firstSetChildViewCall: YES,

    _containerA: 'content_a',

    _containerB: 'content_b',

    _attachToDom: function() {
        return true;
    },

    initialize: function() {
        M.View.prototype.initialize.apply(this, arguments);

        this._containerA += this.cid;
        this._containerB += this.cid;

        if( !this.transitions ) {
            this.transitions = M.Transitions.create(this);
        }

        return this;
    },

    destroy: function() {
        this.transitions.destroy();
        this.transitions = null;
    },

    setChildView: function( selector, view, transitionName, callback ) {


        if( !this.transitions.isAnimating() ) {

            var current = this.getChildView();

            if( current && view && current.cid === view.cid ) {
                return;
            }

            if( this._currentContainer === null ) {
                this._currentContainer = this._containerA;

            } else if( this._currentContainer === this._containerA ) {
                this._currentContainer = this._containerB;

            } else if( this._currentContainer === this._containerB ) {
                this._currentContainer = this._containerA;
            }

            // Add new view as childview
            M.View.prototype.setChildView.apply(this, [this._currentContainer, view]);

            //insert the view
            this.$el.find('[data-childviews="' + this._currentContainer + '"]').html('');
            this.$el.find('[data-childviews="' + this._currentContainer + '"]').html(view.render().$el);

            if( !this._firstSetChildViewCall ) {
                this.transitions.animate(transitionName, callback);
            } else {
                this._firstSetChildViewCall = NO;
            }
        }
        return this;
    },

    getChildView: function(selector) {

        if(selector === 'content') {
            return this.childViews[this._currentContainer];
        }

        return M.View.prototype.getChildView.apply(this, arguments);
    },

    /**
     * Initialize the Transitions on first render then call the prototype
     * @private
     */
    _postRender: function() {
        this.transitions.setActivePage();
        M.View.prototype._postRender.apply(this, arguments);
    },

    /**
     * Add all the template values
     */
    _assignTemplateValues: function() {
        M.View.prototype._assignTemplateValues.apply(this);
        this._templateValues.cid = this.cid;
        return this;
    },

    /**
     * Sets the transition for the next transition.
     *
     * @name {M.Transitions.CONST} name
     * @param name
     */
    setTransition: function( name ) {
        this.transitions.setTransition(name);
    }
});