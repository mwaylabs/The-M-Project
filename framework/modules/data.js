require.config({


    "packages": [
        {
            "name": "request",
            "location": "modules/connection",
            "main": "request"
        },
        {
            "name": "request_manager",
            "location": "modules/connection",
            "main": "request_manager"
        },
        {
            "name": "socket_io",
            "location": "modules/connection",
            "main": "socket_io"
        },
        {
            "name": "field",
            "location": "modules/data",
            "main": "field"
        },
        {
            "name": "entity",
            "location": "modules/data",
            "main": "entity"
        },
        {
            "name": "model",
            "location": "modules/data",
            "main": "model"
        },
        {
            "name": "collection",
            "location": "modules/data",
            "main": "collection"
        },
        {
            "name": "data_selector",
            "location": "modules/data",
            "main": "data_selector"
        },
        {
            "name": "sql_selector",
            "location": "modules/data",
            "main": "sql_selector"
        },
        {
            "name": "store",
            "location": "modules/data/stores",
            "main": "store"
        },
        {
            "name": "store.local_storage",
            "location": "modules/data/stores",
            "main": "local_storage"
        },
        {
            "name": "store.socket",
            "location": "modules/data/stores",
            "main": "local_storage"
        },
        {
            "name": "store.web_sql",
            "location": "modules/data/stores",
            "main": "web_sql"
        }
    ],
    "shim": {
        "request": {
            "deps": ["modules/core"],
            "exports": "M.Request"
        },
        "request_manager": {
            "deps": ["modules/core"],
            "exports": "M.RequestManager"
        },
        "socket_io": {
            "deps": ["modules/core"],
            "exports": "M.SocketIO"
        },
        "field": {
            "deps": [ "modules/core" ],
            "exports": "quo"
        },
        "data_selector": {
            "deps": [ "modules/core" ],
            "exports": "M.DataSelector"
        },
        "sql_selector": {
            "deps": [ "modules/core" ],
            "exports": "M.SqlSelector"
        },
        "entity": {
            "deps": [ "modules/core" ],
            "exports": "entity"
        },
        "model": {
            "deps": [ "modules/core", "field", "entity"],
            "exports": "M.Model"
        },
        "collection": {
            "deps": ["model", "data_selector"],
            "exports": "M.Collection"
        },
        "store": {
            "deps": ["model", "collection"],
            "exports": "M.Store"
        },
        "store.local_storage": {
            "deps": ["store"],
            "exports": "M.LocalStorageStore"
        },
        "store.socket": {
            "deps": ["store", "socket_io", "store.local_storage"],
            "exports": "M.SocketStore"
        },
        "store.web_sql": {
            "deps": ["store", "sql_selector"],
            "exports": "M.WebSqlStore"
        }
    }
});

define([
    'model',
    'collection',
    'store.local_storage',
    'store.socket',
    'store.web_sql'
]);
