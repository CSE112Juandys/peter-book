import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCns5CRMUSwKAjTrvcl31OlE9XroqUDK04',
  authDomain: 'peter-book-staging.firebaseio.com',
  databaseURL: 'https://peter-book-staging.firebaseio.com/'
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;