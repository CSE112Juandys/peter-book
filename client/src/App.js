import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {randomstring, crypto, password, base64url, pri_key, generate, encrypt, decrypt, authGAPI, kmsEncrypt, kmsDecrypt} from './crypto.js';

class App extends Component {
  render() {
    generate(randomstring);
    var smg = encrypt(crypto, "HELLOWORLD", password);
    var gms = decrypt(crypto, smg, password);
    authGAPI(crypto, base64url, pri_key);
    var atok = sessionStorage.getItem('atok');
    kmsEncrypt(atok, password);
    var keycipher = sessionStorage.getItem('cipher');
    kmsDecrypt(atok, keycipher);
    var demo = sessionStorage.getItem('demo');

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
