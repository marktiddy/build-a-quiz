import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const QuizDetails = ({ setDetails }) => {
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
    setDetails(name, description);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="quizForm.quizDetails">
          <Form.Label>Name of Quiz</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Give your quiz a name"
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>
        <Form.Group controlId="quizForm.quizDetails-2">
          <Form.Label>Description of your quiz</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Tell users what your quiz is about"
            required
            value={description}
            onChange={handleDescChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="question-form--submit"
          size="sm"
        >
          Submit Quiz Details
        </Button>

        <p className="orange-text divider-text">
          You'll add your questions next...
        </p>
      </Form>
    </>
  );
};

export default QuizDetails;
