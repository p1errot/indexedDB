
const deleteDB = (dbName) => {
  indexedDB.deleteDatabase(dbName);
}

export default deleteDB
