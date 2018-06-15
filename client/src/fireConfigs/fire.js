import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAPX8UFwLI5AoGNjzp6EyCIzQ_U395uEGQ',
  authDomain: 'helloworld-b7e91.firebaseio.com',
  databaseURL: 'https://helloworld-b7e91.firebaseio.com/'
};

firebase.initializeApp(config);
const database = firebase.database();
const auth     = firebase.auth();
const storage  = firebase.storage();

export { auth, database, storage };
