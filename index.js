import dbRequest from './scripts/idbOpen';
import idbStart from './scripts/idbStart';
import './style.css';

const dbName = 'libraryDB';
idbStart(dbName);

const request = dbRequest(dbName);

request.onsuccess = (e) => {
  const db = event.target.result;
  const tx = db.transaction(['BooksStore'], 'readwrite');
  const store = tx.objectStore('BooksStore');

  const gettingData = store.get('123456');

  gettingData.onsuccess = (e) => {
    console.log('gettingData', gettingData.result);
  }

  tx.oncomplete = (e) => {
    console.log('tx.oncomplete: ', e.target.result);
    db.close();
  }
};

