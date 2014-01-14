// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

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
     *
     * Returns the view to the given parameter. Returns an array with the all found views. If none is found an empty array gets returned
     * @example M.ViewManager.getView($0) // $0 is a selected DOM element
     * @param searchterm
     * @returns {Array}
     * var testView = M.View.extend({
            value: 0
        }, {
            child: M.View.extend({
                value: 1
            }, {
                child: M.TextView.extend({
                    value: 2
                }, {
                    child: M.ButtonView.extend({
                        value: 3
                    })
                })
            })
        }).create().render();

     var children = M.ViewManager.getView('child'); // [child, child, child]
     children[0].getValue(); //1
     children[1].getValue(); //2
     children[2].getValue(); //3

     var children = M.ViewManager.getView('child', testView.childViews.child); // [child, child]
     children[0].getValue(); //2
     children[1].getValue(); //3

     var children = M.ViewManager.getView(testView.el); // [child]
     children[0].getValue(); //0

     var children = M.ViewManager.getView('child', M.ButtonView.prototype._type); // [child]
     children[0].getValue(); //3
     *
     */
    getView: function( searchterm, specifier ) {

        var foundViews = [];
        // if no search term is given return false
        if( !searchterm ) {
            return foundViews;
        }

        if( this._allViews[searchterm] ) {
            // if the search term is a cid return that one
            foundViews.push(this._allViews[searchterm]);
            return foundViews;
        } else if( searchterm.DOCUMENT_NODE ) {
            // if the search term is a DOM element search for it
            foundViews.push(this._getViewByDom(searchterm));
            return foundViews;
        } else if( typeof searchterm === 'string' ) {
            if( M.isView(specifier) ) {
                // if the searchterm is a string and the specifier is a M.View
                // use the specifier as root element and find every childview with the given searchterm
                this._getViewInScope(searchterm, specifier, foundViews);
                return foundViews;
            } else if( typeof searchterm === 'string' ) {
                // if the searchterm is a string and the specifier is a string
                // use the specifier as type
                _.each(this._allViews, function( view ) {
                    // loop over all views
                    if( view.childViews && view.childViews.hasOwnProperty(searchterm) ) {
                        // if the child view contains the child view
                        if( typeof specifier === 'string' ) {
                            // use the specifier as type
                            if( view.childViews[searchterm] && view.childViews[searchterm]._type === specifier ) {
                                foundViews.push(view.childViews[searchterm]);
                            }
                        } else {
                            foundViews.push(view.childViews[searchterm]);
                        }

                    }
                }, this);
            }

            return foundViews;
        }
        return foundViews;
    },

    /**
     * Compares all views with the given dom
     * @param searchterm
     * @returns {M.View}
     * @private
     */
    _getViewByDom: function( dom ) {
        return _.find(this._allViews, function( view ) {
            return (view.el === dom);
        });
    },

    _getViewInScope: function( searchTerm, scope, foundElements ) {
        if( scope.childViews !== {} ) {
            if( scope.childViews.hasOwnProperty(searchTerm) ) {
                foundElements.push(scope.childViews[searchTerm]);
            }
            for( var childView in scope.childViews ) {
                this._getViewInScope(searchTerm, scope.childViews[childView], foundElements);
            }
        }
    }



});