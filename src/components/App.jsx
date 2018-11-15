import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Spinner from './Spinner';
import Category from './Category';

const API = process.env.REACT_APP_API;

class App extends Component {
  state = {
    files: [],
    gistID: '',
    isLoading: true,
    error: false,
  };

  componentDidMount = async () => {
    try {
      const delay = 700;
      const delayedPromise = new Promise(resolve => setTimeout(resolve, delay));
      const getFiles = fetch(`${API}/files`).then(r => r.json());
      const files = (await Promise.all([getFiles, delayedPromise]))[0];
      const users = await fetch(`${API}/users`).then(r => r.json());
      const gistID = users[0].gist_id;
      if (files.error) {
        this.setState({ error: files.error, isLoading: false });
      } else {
        this.setState({ files, gistID, isLoading: false });
      }
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  render() {
    const {
      files, gistID, isLoading, error,
    } = this.state;
    const header = (
      <h1 className="text-center">
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
    const errorMessage = <h3>{ `Error: ${error}` }</h3>;
    const displayApp = () => {
      if (error) return errorMessage;
      if (isLoading) return <Spinner />;
      return fileCategories;
    };

    return (
      <div className="App">
        { header }
        <div className="container mt-4">
          { displayApp() }
        </div>
      </div>
    );
  }
}

export default App;
