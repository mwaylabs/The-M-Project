/**
 *
 * Use the ViewManager to quick access views
 * @module M.ViewManager
 *
 * @type {*}
 * @extends M.Object
 */
M.ViewManager = M.Object.design({


    /**
     * Object of all registered views
     */
    _allViews: null,


    /**
     * all views register themself inside the initialize function to the ViewManager.
     * @param view
     */
    registerView: function( view ) {

        if( !_.isObject(this._allViews) ) {
            this._allViews = {};
        }

        if( !view.cid ) {
            console.warn('view has no cid');
            return;
        }

        if( this._allViews[view.cid] ) {
            console.warn('view already registered');
        } else {
            this._allViews[view.cid] = view;
        }
    },

    /**
     * @example M.ViewManager.getView($0) // $0 is a selected DOM element
     * @param searchterm
     * @returns {*}
     */
    getView: function( searchterm ) {

        if( !searchterm ) {
            return false;
        }

        if( this._allViews[searchterm] ) {
            return this._allViews[searchterm];
        } else if( searchterm.DOCUMENT_NODE ) {
            return _.find(this._allViews, function( view ) {
                return (view.el === searchterm);
            });
        }
    }

});