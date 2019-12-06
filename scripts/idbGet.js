import dbOpen from './idbOpen';
import * as logger from 'loglevel';

const drawItem = (element) => {
  const $app = document.getElementById('app');
  const $parent = document.createElement('div');
  const bookItem = `
    <h3>${element.title}</h3>
    <p>${element.description}</p>
    <p class="book-isbn">ISBN: ${element.isbn}</p>
  `;

  $parent.classList.add('book-item');
  $parent.innerHTML = bookItem;
  $app.appendChild($parent);

  return $app;
}

const successData = (event) => {
  const responseData = event.target.result;
  
  responseData.forEach(drawItem);
  logger.debug('idb data: ', responseData);
}

const successEvent = (event) => {
  const db = event.target.result;
  const tx = db.transaction(['BooksStore']);
  const store = tx.objectStore('BooksStore');
  const gettingData = store.getAll();

  gettingData.onsuccess = successData;

  tx.oncomplete = (e) => {
    db.close();
  }
};

const gettingResults = (dbName) => {
  const request = dbOpen(dbName);
  request.onsuccess = successEvent;

  return request;
}

export default gettingResults;
