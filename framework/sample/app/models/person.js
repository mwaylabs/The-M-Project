
SampleApp.Person = M.Model.extend({});

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
/*
SampleApp.Person = M.Model.extend({

    idAttribute: "id",

    sync: function(method, model, options) {
        SampleApp.SqlConnector.sync(method, model,
            _.extend({entity:'person'}, options));
    }

});
*/
