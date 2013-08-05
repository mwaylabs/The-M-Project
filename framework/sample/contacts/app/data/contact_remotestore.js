define([
    "app/data/contact_collection"
],
    function( Collection ) {

        var host = 'http://nerds.mway.io:8200';

        var RemoteStore = new M.SocketStore({
            host: host, // for message usage
            path: 'live_data',
            version: '1.0',
            entities: {
                contact: {
                    channel: 'entity_contact',
                    idAttribute: '_id',
                    fields:  {
                        _id:         { type: M.CONST.TYPE.STRING, required: YES },
                        firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
                        lastName:    { type: M.CONST.TYPE.STRING,  required: YES, index: true },
                        birthDate:   { type: M.CONST.TYPE.DATE   },
                        bmi:         { type: M.CONST.TYPE.FLOAT,   default: 0.0},
                        notes:       { type: M.CONST.TYPE.TEXT   },
                        address:     { type: M.CONST.TYPE.OBJECT },
                        displayName: { type: M.CONST.TYPE.STRING, persistent: NO }
                    },
                    collection: Collection
                }
            }
        });

        return RemoteStore;
    });