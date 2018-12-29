import React from 'react';
import { Container } from 'reactstrap';

import AppRouter from './components/AppRouter';
import TopNav from './components/TopNav';

import './css/swal.css';

const App = () => (
  <div>
    <TopNav title="My Sweet Config" />
    <Container>
      <AppRouter />
    </Container>
  </div>
);

export default App;
