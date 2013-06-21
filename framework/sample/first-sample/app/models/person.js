

SampleApp.Person = M.Model.extend({
    idAttribute: '_id'
});

SampleApp.PersonList = M.Collection.extend({
//    url: 'http://nerds.mway.io:8100/contact',
    url: 'http://localhost:8100/contact',
    model: SampleApp.Person
});
/*
SampleApp.PersonStore = new M.WebSqlStore({
    name: 'test_db',
    version: '1.0',
    entities: {
        contact: {
            idAttribute: '_id',
            fields:  {
                _id:         { type: M.CONST.TYPE.INTEGER, required: YES },
                firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
                sureName:    { type: M.CONST.TYPE.STRING,  required: YES, index: true },
                birthDate:   { type: M.CONST.TYPE.DATE   },
                bmi:         { type: M.CONST.TYPE.FLOAT,   default: 0.0},
                notes:       { type: M.CONST.TYPE.TEXT   },
                address:     { type: M.CONST.TYPE.OBJECT },
                displayName: { type: M.CONST.TYPE.STRING, persistent: NO }
            },
            collection: SampleApp.PersonList
        }
    }
});
*/

SampleApp.PersonStore = new M.LocalStorageStore({
    entities: {
        contact: {
            fields:  {
                _id:         { type: M.CONST.TYPE.STRING, required: YES },
                firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
                sureName:    { type: M.CONST.TYPE.STRING,  required: YES, index: true },
                birthDate:   { type: M.CONST.TYPE.DATE   },
                bmi:         { type: M.CONST.TYPE.FLOAT,   default: 0.0},
                notes:       { type: M.CONST.TYPE.TEXT   },
                address:     { type: M.CONST.TYPE.OBJECT },
                displayName: { type: M.CONST.TYPE.STRING, persistent: NO }
            },
            collection: SampleApp.PersonList
        }
    }
});


SampleApp.PersonStore = new M.SocketStore({
    host: '',
    path: 'live_data',
    entities: {
        contact: {
            channel: 'entity_contact',
            idAttribute: '_id',
            fields:  {
                _id:         { type: M.CONST.TYPE.STRING, required: YES },
                firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
                sureName:    { type: M.CONST.TYPE.STRING,  required: YES, index: true },
                birthDate:   { type: M.CONST.TYPE.DATE   },
                bmi:         { type: M.CONST.TYPE.FLOAT,   default: 0.0},
                notes:       { type: M.CONST.TYPE.TEXT   },
                address:     { type: M.CONST.TYPE.OBJECT },
                displayName: { type: M.CONST.TYPE.STRING, persistent: NO }
            },
            collection: SampleApp.PersonList
        }
    }
});
