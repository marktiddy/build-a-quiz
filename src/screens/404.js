import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

const ErrorPage = () => {
  return (
    <>
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
