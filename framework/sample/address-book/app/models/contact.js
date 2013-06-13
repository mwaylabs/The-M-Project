Addressbook.Contact = M.Model.extend({
    idAttribute: '_id'
});

Addressbook.ContactList = M.LiveDataCollection.extend({
    url: 'http://nerds.mway.io:8100/contact',
    model: Addressbook.Contact
});

//Addressbook.LiveConnector = M.DataConnectorLive.create({
//    config: {
//        version: '1.0',
//        name: 'http://localhost:8100',
//        entities: {
//            // name of the entity
//            contacts: {
//                key: '_id',
//                model:   Addressbook.Contact
//            }
//        }
//    }
//});
