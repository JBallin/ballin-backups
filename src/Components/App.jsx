import React, { Component } from 'react';
import '../css/App.css';
import fetch from 'isomorphic-fetch';
import Category from './Category'

const API = process.env.REACT_APP_API;
const gistAPI = 'https://api.github.com/gists'

class App extends Component {
  state = {files: [], categories: []};

  componentDidMount = async () => {
    const usersFetch = await fetch(API + '/users');
    const users = await usersFetch.json();
    const { gist_id } = users[0];

    let files = [];
    if (gist_id) {
      const gistFetch = await fetch(gistAPI + '/' + gist_id)
      const gist = await gistFetch.json();
      files = Object.keys(gist.files);
    }

    const categoriesFetch = await fetch(API + '/categories');
    const categories = await categoriesFetch.json();

    this.setState({files, categories});
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">My Sweet Config</h1>
        {this.state.categories.map(c => <Category title={c.title} key={c.id} />)}
      </div>
    );
  }
}

export default App;
