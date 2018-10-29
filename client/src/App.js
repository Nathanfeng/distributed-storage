import React, { Component } from "react";
import Upload from './components/upload';
import Retrieve from './components/retrieve';

import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Store Your Files in the Distributed Web!</h1>
        <Upload/>
        <Retrieve/>
      </div>
    );
  }
}

export default App;
