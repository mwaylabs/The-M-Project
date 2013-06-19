
Addressbook.Contact = M.Model.extend({
    idAttribute: '_id'
});

Addressbook.ContactList = M.LiveDataCollection.extend({
    url: 'http://localhost:8100/contacts',
//    url: 'http://nerds.mway.io:8100/contact',
    model: Addressbook.Contact
});

