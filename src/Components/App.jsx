import React, { Component } from 'react';
import '../css/App.css';
const API = process.env.REACT_APP_API;
const gistAPI = 'https://api.github.com/gists'

class App extends Component {
  state = {files: [], categories: []};

  componentDidMount = async () => {
    const usersRes = await fetch(API + '/users');
    const users = await usersRes.json();
    const gist_id = users[0].gist_id;
    const gistRes = await fetch(gistAPI + '/' + gist_id)
    const gist = await gistRes.json();
    const { files } = gist;

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
