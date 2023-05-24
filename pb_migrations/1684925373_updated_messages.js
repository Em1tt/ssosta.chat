migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lxk3zzl0lhm1zk")

  collection.createRule = "user = @request.auth.id && username = @request.auth.randomName"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lxk3zzl0lhm1zk")

  collection.createRule = null

  return dao.saveCollection(collection)
})
