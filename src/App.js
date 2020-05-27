import React from 'react';
import logo from './logo.svg';
import BitsoApi from './containers/BitsoApi';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <>
   
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Bitso-Summary
      </Navbar.Brand>
    </Navbar>
    <Container>
      <Row >
        <BitsoApi />
      </Row>
    </Container>
    
    </>
  );
}

export default App;
