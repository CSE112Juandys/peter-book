import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {encrypt, decrypt} from './crypto.js'

var crypto = require('crypto'),
    password = 'gTeeLaZt5sU3DbjD';

class App extends Component {
  render() {
    var smg = encrypt(crypto, "HELLOWORLD", password);
    var gms = decrypt(crypto, smg, password);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Encrypted: {smg}
        </p>
        <p>Decryped: {gms}</p>
      </div>
    );
  }
}

export default App;
