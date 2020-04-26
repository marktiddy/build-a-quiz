import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const QuizQuestions = ({ setDetails }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("adding a question");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <p className="purple-text">Let's add some questions...</p>

        <Button
          variant="primary"
          type="submit"
          className="question-form--submit"
          size="sm"
        >
          Submit Question
        </Button>

        <p className="orange-text divider-text">
          You'll add more questions next...
        </p>
      </Form>
    </>
  );
};

export default QuizQuestions;
