Addressbook.ContactView = M.View.extend({

    //TODO general
    tagName: "div",

    //TODO neue lösung finden
    //template: _.template('<div class="view"><h1></h1><input class="firstname" class="toggle" type="text" value="<%= firstname %>" /><input class="lastname" class="toggle" type="text" value="<%= lastname %>" /> <div class="emails"><%= emails %></div> <span>X</span></div>'),
    template: _.tpl('<div class="view"><h1></h1><input class="toggle" type="text" value="<%= firstname %>" /><input class="toggle" type="text" value="<%= lastname %>" /> <div><%= emails %></div> <span>X</span></div>'),

    // The DOM events specific to an item.
    //TODO ??
    events: {
        "click span": "removeEntry",
        "click .view": "click",
        "blur input": "changeValue"
    },

    //TODO evtl. hier direkt mit dem template zusammen ein property - nicht 3 mal firstname schreiben
    bindings: {
        '[data-binding="lastname"]': {
            observe: 'lastname',
            updateView: false
        },
        '[data-binding="emails"]': 'emails',
        '[data-binding="firstname"]': {
            observe: 'firstname',
            onSet: function( val, options ) {
                return val.toUpperCase();
            },
            getVal: function( $el, event, options ) {
                return $el.val();
            }
        },
        'h1': {
            observe: ['lastname', 'firstname'],
            onGet: function( values ) {
                return values[0] + ' - ' + values[1]
            }
        }
        ,
        ':el': {
            observe: 'lastname',
            onGet: function( value ) {
                console.log(value);
            }
        }

    },

    //TODO ???
    initialize: function() {
        this.listenTo(this.model, 'change', this.log);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        //TODO general
        this.$('.view').attr('id', this.cid);
        M.ViewManager.addView(this);
        this.stickit();
        return this;
    },

    changeValue: function() {
        var newValues = {
            firstname: this.$('input')[0].value,
            lastname: this.$('input')[1].value
        }
        //this.model.save();
    },

    removeEntry: function() {
        this.unstickit();
        this.model.destroy();
    },

    click: function() {
//        var v = new Addressbook.ContactDetailView({model: this.model});
//        M.LayoutManager.setContent({view: v});
    }

});


Addressbook.ContactDetailView = Backbone.View.extend({

    template: _.template('<div class="view"><div class="firstname"><%= firstname %></div><div class="lastname"><%= lastname %></div></div>'),

    events: {
        "click .view": "click"
    },

    initialize: function() {

    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    click: function() {
//        M.LayoutManager.next();
    }
});


// The Application
// ---------------

Addressbook.AppView = Backbone.View.extend({

    //    el: $("#app"),


    events: {
    },

    initialize: function() {

        this.listenTo(Addressbook.Contacts, 'add', this.addOne);
        //        this.listenTo(Addressbook.Contacts, 'reset', this.addAll);
        this.listenTo(Addressbook.Contacts, 'all', this.render);

        Addressbook.Contacts.fetch();
    },

    render: function() {

        return this;
    },

    addOne: function( contact ) {
        this.$el.append('...................................');
        var view = new Addressbook.ContactView({model: contact});
        this.$el.append(view.render().el);

        var view2 = new Addressbook.ContactView({model: contact});
        this.$el.append(view2.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
        Addressbook.Contacts.each(this.addOne, this);
    }
});

Addressbook.Contacts = Addressbook.ContactList.create()
//Addressbook.App = new Addressbook.AppView;
