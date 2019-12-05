import * as log from 'loglevel';
import './style.css';

// Check for compatibility
if (!window.indexedDB) {
  window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
}

const request = window.indexedDB.open('libraryDB', 1, function(upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains('BooksStore')) {
      const store = upgradeDb.createObjectStore('people', {keyPath: 'email'});
      store.createIndex('title', 'title', { unique: false });
    }
});

/*
request.onupgradeneeded = (e) => {
  const db = event.target.result;
  // For the index in the db, you can use keyPath or autoIncrement: true
  const store = db.createObjectStore('BooksStore', { keyPath: 'isbn' });
  const index = store.createIndex('title', 'title', { unique: false });
}
*/

request.onerror = (err) => {
  log.error("There was an error: ", err.target.errorCode);
};

/*
request.onsuccess = (e) => {
  const db = event.target.result;
  const tx = db.transaction(['BooksStore'], 'readwrite');
  const store = tx.objectStore('BooksStore');
  const index = store.index('title');

  db.onerror = (e) => {
    log.error("Error: ", err.target.errorCode);
  };

  store.put({
    isbn: "123456",
    title: "JavaScript for Kids: A Playful Introduction to Programming",
    description: "JavaScript for Kids is a lighthearted introduction that teaches programming essentials through patient, step-by-step examples paired with funny illustrations. You’ll begin with the basics, like working with strings, arrays, and loops, and then move on to more advanced topics, like building interactivity with jQuery and drawing graphics with Canvas."
  },
  {
    isbn: "234567",
    title: "Seven Languages in Seven Weeks: A Pragmatic Guide to Learning Programming Languages (Pragmatic Programmers)",
    description: "You should learn a programming language every year, as recommended by The Pragmatic Programmer. But if one per year is good, how about Seven Languages in Seven Weeks? In this book you'll get a hands-on tour of Clojure, Haskell, Io, Prolog, Scala, Erlang, and Ruby. Whether or not your favorite language is on that list, you'll broaden your perspective of programming by examining these languages side-by-side. You'll learn something new from each, and best of all, you'll learn how to learn a language quickly."
  });

  tx.oncomplete = () => {
    db.close();
  }
}
*/
