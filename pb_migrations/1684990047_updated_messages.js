migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lxk3zzl0lhm1zk")

  collection.createRule = "username = @request.auth.randomName"

  // remove
  collection.schema.removeField("elphdkl8")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lxk3zzl0lhm1zk")

  collection.createRule = null

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
