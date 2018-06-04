import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Ad from './Ad'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Ad />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          HELLO WORLD
        </p>
      </div>
    );
  }
}

export default App;
