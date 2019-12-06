const request = (dbName) => {
  if (!window.indexedDB) {
    return;
  }

  return window.indexedDB.open(dbName);
}

export default request;
