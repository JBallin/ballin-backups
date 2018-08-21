import React, { Component } from 'react';
import '../css/App.css';
import fetch from 'isomorphic-fetch';
import Category from './Category'

const API = process.env.REACT_APP_API;

class App extends Component {
  state = {files: []};

  componentDidMount = async () => {
    const files = await fetch(`${API}/files`).then(r => r.json());
    this.setState({files});
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">My Sweet Config</h1>
        {this.state.files.map((category, i) => <Category category={category} key={i} />)}
      </div>
    );
  }
}

export default App;
