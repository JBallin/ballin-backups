import React, { Component } from 'react';
import '../css/App.css';
import fetch from 'isomorphic-fetch';
import Category from './Category'

const API = process.env.REACT_APP_API;

class App extends Component {
  state = {files: [], gistID: ''};

  componentDidMount = async () => {
    const files = await fetch(`${API}/files`).then(r => r.json());
    const users = await fetch(`${API}/users`).then(r => r.json());
    const gistID = users[0].gist_id;
    this.setState({ files, gistID });
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">My Sweet Config</h1>
        {this.state.files.map((category, i) => (
          <Category category={category} gistID={this.state.gistID} key={i} />)
        )}
      </div>
    );
  }
}

export default App;
