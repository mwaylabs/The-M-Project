// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('../core/foundation/view.js');

M.LabelView = M.View.extend({

    text: null,

    render: function() {
        html = '<div id="' + this.id + '">' + this.text + '</div>';
        document.write(html);
    },

    renderUpdate: function() {
        $('#' + this.id).html(this.text);
    },

    contentDidChange: function(){
        var bindingPath = this.contentBinding.split('.');
        if(bindingPath && bindingPath.length === 3) {
            this.text = eval(bindingPath[0])[bindingPath[1]][bindingPath[2]];
            this.renderUpdate();
        } else {
            M.Logger.log('bindingPath not valid', M.WARN);
        }
    }

});