import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Success = ({ quizName, quizId }) => {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h2 className="quiz-title">Success!</h2>
        </Col>
      </Row>
      <Row>
        <p className="purple-text">Your {quizName} has been added</p>
      </Row>
      <Row>
        <Button variant="primary" href={`/play/${quizId}`}>
          Go and Play Your Quiz!
        </Button>
      </Row>
    </Container>
  );
};

export default Success;
