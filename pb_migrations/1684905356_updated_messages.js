migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lxk3zzl0lhm1zk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0hhcxukh",
    "name": "username",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 50,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lxk3zzl0lhm1zk")

  // remove
  collection.schema.removeField("0hhcxukh")

  return dao.saveCollection(collection)
})
