import React, { Component } from 'react';
import '../css/App.css';
import fetch from 'isomorphic-fetch';
import Category from './Category';

const API = process.env.REACT_APP_API;

class App extends Component {
  state = {
    files: [],
    gistID: '',
  };

  componentDidMount = async () => {
    const files = await fetch(`${API}/files`).then(r => r.json());
    const users = await fetch(`${API}/users`).then(r => r.json());
    const gistID = users[0].gist_id;
    this.setState({ files, gistID });
  }

  render() {
    const { files, gistID } = this.state;
    const header = (
      <h1 className="App-title">
        My Sweet Config
      </h1>
    );
    const fileCategories = files.map(({
      category, id, files: filesArr,
    }) => (
      <Category
        category={category}
        files={filesArr}
        key={id}
        gistID={gistID}
      />
    ));

    return (
      <div className="App">
        { header }
        { fileCategories }
      </div>
    );
  }
}

export default App;
