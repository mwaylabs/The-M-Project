Kitchensink.Views = Kitchensink.Views || {};

(function() {
    'use strict'

    Kitchensink.Views.BackHeader = M.ToolbarView.extend({}, {
        first: M.ButtonView.extend({
            cssClass:'first',
            value: 'back',
            events: {
                tap: function(){
                    history.back();
                }
            }
        })
    });

})(this);