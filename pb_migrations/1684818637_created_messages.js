migrate((db) => {
  const collection = new Collection({
    "id": "0lxk3zzl0lhm1zk",
    "created": "2023-05-23 05:10:37.744Z",
    "updated": "2023-05-23 05:10:37.744Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "1ak31p3e",
        "name": "text",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 2000,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "elphdkl8",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "id",
            "username"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "user = @request.auth.id",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0lxk3zzl0lhm1zk");

  return dao.deleteCollection(collection);
})
