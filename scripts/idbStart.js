import dbRequest from './idbOpen';
import * as logger from 'loglevel';

const errorEvent = (err) => {
  logger.error("There was an error: ", err.target.errorCode);
};

const upgradedEvent = (e) => {
  const db = event.target.result;
  // For the index in the db, you can use keyPath or autoIncrement: true
  const store = db.createObjectStore('BooksStore', { keyPath: 'isbn' });
  const index = store.createIndex('title', 'title', { unique: false });
}

const successEvent = (e) => {
    const db = event.target.result;
    const tx = db.transaction(['BooksStore'], 'readwrite');
    const store = tx.objectStore('BooksStore');
    const index = store.index('title');

    db.onerror = errorEvent;

    store.put({
      isbn: "123456",
      title: "JavaScript for Kids: A Playful Introduction to Programming",
      description: "JavaScript for Kids is a lighthearted introduction that teaches programming essentials through patient, step-by-step examples paired with funny illustrations. You’ll begin with the basics, like working with strings, arrays, and loops, and then move on to more advanced topics, like building interactivity with jQuery and drawing graphics with Canvas."
    });
    store.put({
      isbn: "234567",
      title: "Seven Languages in Seven Weeks: A Pragmatic Guide to Learning Programming Languages (Pragmatic Programmers)",
      description: "You should learn a programming language every year, as recommended by The Pragmatic Programmer. But if one per year is good, how about Seven Languages in Seven Weeks? In this book you'll get a hands-on tour of Clojure, Haskell, Io, Prolog, Scala, Erlang, and Ruby. Whether or not your favorite language is on that list, you'll broaden your perspective of programming by examining these languages side-by-side. You'll learn something new from each, and best of all, you'll learn how to learn a language quickly."
    });

    tx.oncomplete = () => {
      db.close();
    }
  }

const startDB = (dbName) => {
  const request = dbRequest(dbName);

  request.onupgradeneeded = upgradedEvent;
  request.onerror = errorEvent;
  request.onsuccess = successEvent;

  return request;
}

export default startDB;
