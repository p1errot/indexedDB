// Check for compatibility
if (!window.indexedDB) {
  return;
}

const request = (dbName) => {
  indexedDB.deleteDatabase(dbName);

  return window.indexedDB.open(dbName);
}

export default request;
