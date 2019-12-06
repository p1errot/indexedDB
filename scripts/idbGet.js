import dbOpen from './idbOpen';
import * as logger from 'loglevel';

const drawItem = (element) => {
  const $app = document.getElementById('app');
  const $parent = document.createElement('div');
  const $title = document.createElement('h3');
  const $isbn = document.createElement('p');
  const $description = document.createElement('p');

  $title.innerHTML = element.title;
  $isbn.innerHTML = `ISBN: ${element.isbn}`;
  $description.innerHTML = element.description;

  $parent.classList.add('book-item');
  $isbn.classList.add('book-isbn');

  $parent.appendChild($title);
  $parent.appendChild($description);
  $parent.appendChild($isbn);
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
