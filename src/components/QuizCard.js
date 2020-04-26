import React from "react";
import { Card, Button } from "react-bootstrap";
import QuizImage from "../img/quiz.jpg";
import { useRouteMatch } from "react-router-dom";

const QuizCard = ({
  content: {
    details: { image, description, name, id },
  },
}) => {
  const match = useRouteMatch();
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={image ? image : QuizImage} />
        <Card.Body>
          <Card.Title className="text-capitalize">{name}</Card.Title>
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
