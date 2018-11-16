import React, { Component } from 'react';
import Categories from './components/Categories';
import Login from './components/Login';

class App extends Component {
  state = {
    isLoggedIn: false,
  }

  attemptLogin = (username, password) => {
    console.log('username', username);
    console.log('password', password);
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <div>
        <h1 className="text-center">My Sweet Config</h1>
        <div className="container mt-4">
          {
            !isLoggedIn
              ? <Login attemptLogin={this.attemptLogin} />
              : <Categories />
          }
        </div>
      </div>
    );
  }
}

export default App;
