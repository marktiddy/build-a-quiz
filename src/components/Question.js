import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Question = ({
  question: { question, answer, answers },
  sendAnswer,
  num,
}) => {
  const [selected, setSelected] = useState(answers[0]);

  return (
    <>
      <Form className="question-form">
        <Form.Label className="question-form--title">
          Question {num + 1} - {question}
        </Form.Label>
        {answers.map((a) => {
          return (
            <Form.Check
              type="radio"
              id={a}
              label={a}
              className="question-form--check"
              name="answerradios"
              value={a}
              checked={selected === a}
              onChange={() => setSelected(a)}
            />
          );
        })}
        <Button
          variant="primary"
          type="button"
          className="question-form--submit"
          onClick={() => {
            sendAnswer(selected);
          }}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Question;
