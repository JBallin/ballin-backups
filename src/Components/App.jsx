import React, { Component } from 'react';
import '../css/App.css';
const API = process.env.REACT_APP_API;

class App extends Component {
  state = {files: [], categories: []};

  componentDidMount = async () => {
    const categoriesRes = await fetch(API + '/categories');
    const categories = await categoriesRes.json();

    this.setState({files, categories});
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">My Sweet Config</h1>
      </div>
    );
  }
}

export default App;
