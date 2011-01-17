// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.TaskWebSql = M.Model.create({
    __name__: 'Task',

    text: M.Model.attr('String', {
        isRequired: YES
    })

}, M.WebSqlProvider.configure({
    dbName: 'KitchenSinkDB'
}));