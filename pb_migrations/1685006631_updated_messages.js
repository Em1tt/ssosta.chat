migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lxk3zzl0lhm1zk")

  collection.createRule = "username = @request.auth.randomName  || username = \"Unknown\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0lxk3zzl0lhm1zk")

  collection.createRule = null

  return dao.saveCollection(collection)
})
