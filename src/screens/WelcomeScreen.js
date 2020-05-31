import React from 'react';
import { Card, Button, Container, Col, Row } from 'react-bootstrap';

const WelcomeScreen = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="text-center quiz-card">
            <Card.Body>
              <p className="quiz-card-title">Play Quizzes</p>
              <Card.Text>
                Test out your knowledge and play one of our quizzes
              </Card.Text>
              <Button variant="primary" className="btn-white" href="/play">
                Pick A Quiz
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center quiz-card">
            <Card.Body>
              <p className="quiz-card-title">Create a Quiz</p>
              <Card.Text>
                Are you full of questions? Use our creator to make your own quiz
              </Card.Text>
              <Button variant="primary" className="btn-white" href="/create">
                Create a Quiz
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomeScreen;
