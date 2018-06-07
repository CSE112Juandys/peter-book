import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {password, pri_key, generate, encrypt, decrypt, authGAPI, kmsEncrypt, kmsDecrypt} from './crypto.js';
import {addFd, deleteFd} from './friends.js';
import firebase from 'firebase';

class App extends Component {
  render() {
    // Set the configuration for your app
    var config = {
      apiKey: "AIzaSyAPX8UFwLI5AoGNjzp6EyCIzQ_U395uEGQ",
      authDomain: "helloworld-b7e91.firebaseapp.com",
      databaseURL: "https://helloworld-b7e91.firebaseio.com",
      storageBucket: "gs://helloworld-b7e91.appspot.com"
    };
    firebase.initializeApp(config);

    generate();
    var smg = encrypt("HELLOWORLD", password);
    var gms = decrypt(smg, password);
    authGAPI(pri_key);
    var atok = sessionStorage.getItem('atok');
    kmsEncrypt(atok, password);
    var keycipher = sessionStorage.getItem('cipher');
    sessionStorage.removeItem('cipher');
    kmsDecrypt(atok, keycipher);
    var demo = sessionStorage.getItem('demo');
    sessionStorage.removeItem('demo');

    addFd('User1', 'User2', keycipher);
    deleteFd('User1', 'User2');

    /*var timestamp = Date.now()/1000;
    var payload = {
      "Post1": {
          "Data": smg,
          "Owner": "Yes",
          "Timestamp": timestamp
      }
    };


    var dbrf= firebase.database().ref("User1/Friends/User2/Posts");
    dbrf.set (payload).then(
      success => {
        console.log('success',success);
      },
      error => {
        console.log('error',error);
      }
    );*/

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Encrypted: {smg}
        </p>
        <p>Decrypted: {gms}</p>
        <p>Key: {demo}</p>
      </div>
    );
  }
}

export default App;
