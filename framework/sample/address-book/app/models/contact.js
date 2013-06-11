Addressbook.Contact = M.Model.extend({});

Addressbook.Contacts = M.Collection.extend({
    url: 'http://nerds.mway.io:8100/contact'
});