migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x60kn5mcoitau7p")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x60kn5mcoitau7p")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
