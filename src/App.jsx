import React, { Component } from 'react';
import Categories from './components/Categories';

class App extends Component {
  state = {}

  render() {
    return (
      <div>
        <h1 className="text-center">My Sweet Config</h1>
        <div className="container mt-4">
          <Categories />
        </div>
      </div>
    );
  }
}

export default App;
