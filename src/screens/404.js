import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { Container, Col, Row } from 'react-bootstrap';

const ErrorPage = () => {
  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col>
            <h2>
              Oops....something went wrong. Whatever you're looking for isn't
              here
            </h2>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ErrorPage;
