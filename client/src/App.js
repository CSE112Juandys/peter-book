import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './Post';
import About from './About';
import Picture from './Picture';
import Description from './Description';



class App extends Component {
  render() {
    return (
      <div className="App">
          <Post/>
          <About/>
          <Picture/>
          <Description/>
      </div>
    );
  }
}

export default App;
