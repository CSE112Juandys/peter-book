import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCns5CRMUSwKAjTrvcl31OlE9XroqUDK04',
  authDomain: 'peter-book-staging.firebaseio.com',
  databaseURL: 'https://peter-book-staging.firebaseio.com/',
  storageBucket : 'gs://peter-book-staging.appspot.com',
};

firebase.initializeApp(config);
const database = firebase.database();
const auth     = firebase.auth();
const storage  = firebase.storage();

export { auth, database, storage };