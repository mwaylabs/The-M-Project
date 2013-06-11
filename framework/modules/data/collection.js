// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      02.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.Collection = Backbone.Collection.extend(M.Object);

_.extend(M.Collection.prototype, {

    _type: 'M.Collection',

    select: function(options) {
        var selector   = options.where ? M.DataSelector.create(options.where) : null;
        var collection = M.Collection.create({ model: this.model });

        _.each(this, function(model) {
            if (!selector || selector.matches(model.attributes)) {
                collection.add(record);
            }
        });

        if (options.sort) {
            collection.sortBy(M.DataSelector.compileSort(options.sort));
        }

        return collection;
    }
});

M.Collection.create = M.create;
