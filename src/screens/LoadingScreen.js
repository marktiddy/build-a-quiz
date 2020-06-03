import React, { useState, useContext } from 'react';
import { Spinner, Container, Col, Row } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';

const LoadingScreen = () => {
  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col className="loading-spinner">
            <Spinner animation="grow" variant="primary" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoadingScreen;
