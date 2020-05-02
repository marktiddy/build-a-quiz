import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';

const QuizCard = ({
  content: {
    details: { image, description, name, id },
  },
}) => {
  const match = useRouteMatch();
  return (
    <>
      <Card style={{ width: '18rem' }} className="quiz-chooser-card">
        <Card.Header className="quiz-chooser-card--header text-capitalize">
          {name}
        </Card.Header>
        <Card.Body>
          <Card.Text>{description}</Card.Text>
          <Button variant="primary" href={`${match.url}/${id}`}>
            Play Quiz
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default QuizCard;
