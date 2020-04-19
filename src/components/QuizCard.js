import React from "react";
import { Card, Button } from "react-bootstrap";
import QuizImage from "../img/quiz.jpg";

const QuizCard = ({ title, image, description }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image ? image : QuizImage} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default QuizCard;
