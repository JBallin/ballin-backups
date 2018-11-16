import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Categories from './components/Categories';
import Login from './components/Login';
import TopNav from './components/TopNav';

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
        <TopNav title="My Sweet Config" />
        <Container>
          {
            !isLoggedIn
              ? <Login attemptLogin={this.attemptLogin} />
              : <Categories />
          }
        </Container>
      </div>
    );
  }
}

export default App;
