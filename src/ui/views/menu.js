// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * M.MenuView inherits from M.View
 * @module M.MenuView
 *
 * @type {*}
 * @extends M.View
 */
M.MenuView = M.MovableView.extend({

    /**
     * The type of the object
     * @private
     */
    _type: 'M.MenuView',

    /**
     * The template of the object before initializing it.
     * @private
     */
    _template: _.tmpl(M.TemplateManager.get('M.MenuView')),

    leftEdge: 200,

    rightEdge: 400,

    onRelease: function(){

        if( this._currentPos.deltaX > 0 ) {
            this.toRight();
        } else {
            this.toLeft();
        }
    }
});