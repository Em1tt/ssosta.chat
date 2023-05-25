migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lxk3zzl0lhm1zk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1ak31p3e",
    "name": "text",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 3,
      "max": 1000,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lxk3zzl0lhm1zk")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
