import React from 'react';
import { Container } from 'reactstrap';

const NoMatch = () => {
  document.title = 'Not Found | My Sweet Config';

  return (
    <Container className="main-wrapper">
      <h3>404: Not Found</h3>
    </Container>
  );
};

export default NoMatch;
