import React, { useState } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";

//TODO
//Allow user to add questions and then select the correct answer
//They submit the question and it appears in the left list
//There should be a 'Done' button on the left list that shows them all their questions to confirm
//It should then add it to the whole question database

const QuizQuestions = ({ handleQuestions, questionCount }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const addAnswer = () => {
    const newAnswers = [...answers, ""];
    setAnswers(newAnswers);
  };

  const handleAnswerChange = (event) => {
    const updatedAnswers = [...answers];
    updatedAnswers[event.target.id] = event.target.value;
    setAnswers(updatedAnswers);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSelect = (event) => {
    setCorrectAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Check the question has a question Mark
    const sub = question.substr(question.length - 1);
    if (sub !== "?") {
      const questionToSubmit = question + "?";
      setQuestion(questionToSubmit);
    }
    handleQuestions(question, answers, correctAnswer);
    //Now clear all our questions
    setQuestion("");
    setAnswers(["", ""]);
    setCorrectAnswer("");
  };

  const removeAnswerOption = (idx) => {
    const newAns = [...answers];
    newAns.splice(idx, 1);
    setAnswers(newAns);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <p className="purple-text">Let's add some questions...</p>
        <Form.Group controlId="questionForm.questionInput">
          <Form.Label>Question {questionCount + 1}</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Your question"
            value={question}
            onChange={handleQuestionChange}
          />
        </Form.Group>
        {answers.map((a, idx) => {
          return (
            <Form.Group key={`${idx}`}>
              <Form.Control
                type="text"
                required
                placeholder={`Answer ${idx + 1}`}
                id={`${idx}`}
                data-idx={idx}
                value={answers[idx]}
                onChange={handleAnswerChange}
              />
              {idx > 1 ? (
                <p className="remove-answer-text">
                  <a href="#" onClick={() => removeAnswerOption(idx)}>
                    Remove Answer
                  </a>
                </p>
              ) : null}
            </Form.Group>
          );
        })}
        <Form.Group>
          <Button
            onClick={() => addAnswer()}
            type="button"
            size="sm"
            className="add-another-answer"
            variant="danger"
          >
            Add another answer
          </Button>
        </Form.Group>
        <Form.Group className="select-correct-answer">
          <Form.Label className="purple-text">
            Select the Correct Answer
          </Form.Label>
          <Form.Control
            as="select"
            id="answer-select"
            onChange={handleSelect}
            required
          >
            <option value="" defaultValue disabled>
              Select the correct answer
            </option>
            {answers.map((a, idx) => {
              return a === "" ? null : <option id={idx}>{a}</option>;
            })}
          </Form.Control>
        </Form.Group>

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
