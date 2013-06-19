
//SampleApp.Files = M.Collection.extend({});
//
//var files = SampleApp.Files.create({});
//files.url = "http://mdm.dev.mwaysolutions.com/relution/api/v1/files";
//
//files.fetch({
//    success: function() {
//        debugger;
//    }
//});

/*

Addressbook.WebSqlAdapter = M.DataAdapter.create({
    version: '1.0',
    name: 'http://localhost:8100',
    entities: {
        // name of the entity
        contacts: {
            idAttribute: '_id',
            url:         'http://nerds.mway.io:8100/contact',
            model:       Addressbook.Contact,
            collection:  Addressbook.ContactList
        }
    }
});

Addressbook.Contact     = Addressbook.WebSqlAdapter.getModel('contacts');
Addressbook.ContactList = Addressbook.WebSqlAdapter.getCollection('contacts');

 */

SampleApp.Person = M.Model.extend({
    idAttribute: '_id'
});

SampleApp.PersonList = M.Collection.extend({
    model: SampleApp.Person,
    url: 'http://localhost:8100/person'
//    url: 'http://nerds.mway.io:8100/contact'
});

// SampleApp.LiveConnector = M.DataConnector.create({});
SampleApp.LiveConnector = M.DataConnectorLive.create({
    version: '1.0',
    entities: {
        // name of the entity
        person: {
            collection: SampleApp.PersonList
        }
    }
});
/*
SampleApp.LiveConnector = M.DataConnectorLive.create({
    version: '1.0',
    socket_url: 'http://localhost:8100',
    entities: {
        // name of the entity
        contact: {
            url: 'http://localhost:8100/contacts',
            idAttribute: '_id'
        }
    }
});
*/

/*
Addressbook.ContactList = M.LiveDataCollection.extend({
//    url: 'http://localhost:8100/contacts',
    url: 'http://nerds.mway.io:8100/contact',
    model: Addressbook.Contact
});
*/


/*
SampleApp.RESTConnector = M.RESTConnector.create({
    config: {
        name: 'MyDatabase',
        version: '1.0',
        entities: {
            // name of the entity
            person: {
                name:   'person',
                key:    'id',
                model:   SampleApp.Person,

                fields:  {
                    id:          { type: M.CONST.TYPE.INTEGER, required: YES },
                    firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
                    sureName:    { type: M.CONST.TYPE.STRING,  required: YES, index: true },
                    birthDate:   { type: M.CONST.TYPE.DATE   },
                    bmi:         { type: M.CONST.TYPE.FLOAT,   default: 0.0},
                    notes:       { type: M.CONST.TYPE.TEXT   },
                    address:     { type: M.CONST.TYPE.OBJECT },
                    displayName: { type: M.CONST.TYPE.STRING, persistent: NO }
                }
            }
        }
    }
});

SampleApp.SqlConnector = M.DataConnectorWebSql.create({
    config: {
        version: '1.0',
        name: 'test',
        entities: {
            // name of the entity
            person: {
                name:   'person',
                key:    'id',
                model:   SampleApp.Person,

                fields:  {
                    id:          { type: M.CONST.TYPE.INTEGER, required: YES },
                    firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
                    sureName:    { type: M.CONST.TYPE.STRING,  required: YES, index: true },
                    birthDate:   { type: M.CONST.TYPE.DATE   },
                    bmi:         { type: M.CONST.TYPE.FLOAT,   default: 0.0},
                    notes:       { type: M.CONST.TYPE.TEXT   },
                    address:     { type: M.CONST.TYPE.OBJECT },
                    displayName: { type: M.CONST.TYPE.STRING, persistent: NO }
                }
            }
        }
    }
});
*/
//SampleApp.LiveConnector = M.DataConnectorLive.create({
//    config: {
//        version: '1.0',
//        name: 'http://localhost:8100',
//        entities: {
//            // name of the entity
//            person: {
//                key:    'id',
//                model:   SampleApp.Person
//            }
//        }
//    }
//});

/*
SampleApp.Person = M.Model.extend({

    idAttribute: "id",

    sync: function(method, model, options) {
        SampleApp.SqlConnector.sync(method, model,
            _.extend({entity:'person'}, options));
    }

});
*/
