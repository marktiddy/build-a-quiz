import React from "react";
import { Card, Button, Container, Col, Row } from "react-bootstrap";

const WelcomeScreen = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="text-center">
            <Card.Header>Play Quizzes</Card.Header>
            <Card.Body>
              <Card.Text>
                Test out your knowledge and play one of our quizzes
              </Card.Text>
              <Button variant="primary" href="/play">
                Pick A Quiz
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Header>Write a Quiz</Card.Header>
            <Card.Body>
              <Card.Text>
                Are you full of questions? Use our creator to make your own quiz
              </Card.Text>
              <Button variant="primary">Create a Quiz</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomeScreen;
