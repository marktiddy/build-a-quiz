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
      <Card style={{ width: '18rem' }} className="quiz-chooser-card quiz-card">
        <Card.Body>
          <p className="quiz-card-title">{name}</p>
          <Card.Text>{description}</Card.Text>
          <Button
            variant="primary"
            className="btn-white"
            href={`${match.url}/${id}`}
          >
            Play Quiz
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default QuizCard;
