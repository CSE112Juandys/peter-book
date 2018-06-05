import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {encrypt, decrypt} from './crypto.js';
import {likePost} from './dbOperations.js'
import {uploadNewProfilePic} from './Storage.js';
import {getLikesFromPost, checkIfUserLikePost} from './dbQuery.js';

//
// writeNewUser('random_user_ID', "Roy", "yil623@ucsd.edu");
// writeNewUser('random_user_ID2', "Tammy", "tammy@ucsd.edu");
// writeNewUser('random_user_ID3', "Arow", "arow@ucsd.edu");
// writeNewUser('random_user_ID4', "Eric", "eric@ucsd.edu");
// writeNewUser('random_user_ID5', "Chris", "chris@ucsd.edu");


//writeNewPost("postID", "random_user_ID", "10-01-1998");
likePost("random_user_ID2", "random_user_ID", "postID");
getLikesFromPost("random_user_ID", "postID");
checkIfUserLikePost("random_user_ID", "postID", "random_user_ID2")

var crypto = require('crypto'),
    password = 'gTeeLaZt5sU3DbjD';

class App extends Component {
  handleChange(selectorFiles) {
    console.log(selectorFiles);
    var uploader = document.getElementById('uploader');
    var theImage = document.getElementById('myImg'); //, storageRef);
    // storeNewImage('random_user_ID', "postID", selectorFiles[0], uploader, theImage);
    uploadNewProfilePic('random_user_ID', selectorFiles[0], uploader, theImage);
  }

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

        <div>
          <progress value="0" max="100" id="uploader">0%</progress>
          <input type="file" accept="image/*" onChange={ (e) => this.handleChange(e.target.files) }/>
        </div>

        <div>
          <img id="myImg" />
        </div>

      </div>


    );
  }
}

export default App;
