import firebase from "firebase";

var config = {
  apiKey: "AIzaSyDh7nRBJGRkLmPmw8Lp_GROKsyb6H1ymwA",
  authDomain: "cse112-e7734.firebaseapp.com",
  databaseURL: "https://cse112-e7734.firebaseio.com",
  storageBucket: "gs://cse112-e7734.appspot.com",
};
firebase.initializeApp(config);

export default firebase;
