import React from 'react';
import { Container } from 'reactstrap';

import AppRouter from './AppRouter';
import TopNav from './components/TopNav';

const App = () => (
  <div>
    <TopNav title="My Sweet Config" />
    <Container>
      <AppRouter />
    </Container>
  </div>
);

export default App;
