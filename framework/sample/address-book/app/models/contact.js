Addressbook.Contact = M.Model.extend({});

Addressbook.ContactList = M.Collection.extend({
    url: 'http://nerds.mway.io:8100/contact'
});