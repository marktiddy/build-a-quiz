import React from 'react';
import { Spinner, Container, Col, Row } from 'react-bootstrap';

const LoadingScreen = () => {
  return (
    <>

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
