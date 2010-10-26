// ==========================================================================
// Project:   MProject - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   ...
// ==========================================================================

m_require('m.js');

M.Object = {

    create: function(obj) {
        var f = function(){};
        f.prototype = obj;
        return new f();
    }

};