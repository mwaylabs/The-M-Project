Addressbook.ContactView = Backbone.View.extend({

    tagName: "div",

    template: _.template('<div class="view"><input class="toggle" type="text" value="<%= firstname %>" /><input class="toggle" type="text" value="<%= lastname %>" /></div>'),

    // The DOM events specific to an item.
    events: {
        "blur input": "changeValue"
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    changeValue: function() {
        var newValues = {
            firstname: this.$('input')[0].value,
            lastname: this.$('input')[1].value
        }
        this.model.save(newValues);
    }

});


// The Application
// ---------------

Addressbook.AppView = Backbone.View.extend({

    el: $("#app"),

    events: {
    },

    initialize: function() {

        this.listenTo(Addressbook.Contacts, 'add', this.addOne);
//        this.listenTo(Addressbook.Contacts, 'reset', this.addAll);
        this.listenTo(Addressbook.Contacts,'all', this.render);

        Addressbook.Contacts.fetch();
    },

    render: function() {

    },

    addOne: function( contact ) {
        var view = new Addressbook.ContactView({model: contact});
        this.$el.append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
        Addressbook.Contacts.each(this.addOne, this);
    }
});

Addressbook.Contacts = Addressbook.ContactList.create()
Addressbook.App = new Addressbook.AppView;

//Addressbook.Main = M.View.create({
//
//    valueView: M.View.create({
//        valuePattern: "<%= firstname %>, <%= lastname %>",
//
//        /*CLONE EVENT ON create*/
//        events: {
//            click: function(a,b,c) {
//                console.log('click');
//            }
//        }
//    })
//
//
//
//});
//
//Addressbook.Detail = M.View.create({
//
//    valuePattern: "<%= firstname %>, <%= lastname %>",
//    events: {
//        "click" : function(){
//            Addressbook.ApplicationController.gotoMain(this);
//        }
//    }
//
//});