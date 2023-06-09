migrate((db) => {
  const collection = new Collection({
    "id": "x60kn5mcoitau7p",
    "created": "2023-06-08 10:32:10.166Z",
    "updated": "2023-06-08 10:32:10.166Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zspepksl",
        "name": "content",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "swr2koy9",
        "name": "user",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("x60kn5mcoitau7p");

  return dao.deleteCollection(collection);
})
