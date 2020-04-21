import React from "react";
import { Card, Button } from "react-bootstrap";
import QuizImage from "../img/quiz.jpg";
import { useRouteMatch } from "react-router-dom";

//NOTES
//THIS CURRENTLY DOESN'T GO TO THE RIGHT PLACE BECAUSE ITS A SEPARATE COMPONENT
//THIS COMPONENT NEEDS TO GO UP A LEVEL SO THAT IT ROUTES TO THE RIGHT PLACE!
//OR THE ROUTER MESSAGE COULD PASS BACK AND BE CALLED FROM THE PREVIOUS COMPONENT

const QuizCard = ({ content }) => {
  const match = useRouteMatch();
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={content.details.image ? content.details.image : QuizImage}
        />
        <Card.Body>
          <Card.Title className="text-capitalize">
            {content.details.name}
          </Card.Title>
          <Card.Text>{content.details.description}</Card.Text>
          <Button variant="primary" href={`${match.url}/${content.details.id}`}>
            Play Quiz
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default QuizCard;
