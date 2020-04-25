import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Question = ({
  //TODO
  //CHECK ANSWER HERE AND SIMPLY RETURN TRUE OR FALSE TO OTHER COMPONENT
  //AFTER SHOWING A 'CORRECT...NEXT QUESTION' MESSAGE

  question: { question, answer, answers },
  sendAnswer,
  num,
  score,
}) => {
  const [selected, setSelected] = useState(answers[0]);

  const answerCheck = (selected) => {
    if (selected === answer) {
      console.log("correct");
    }
  };

  return (
    <>
      <Form className="question-form">
        <Container>
          <Row>
            <Col>
              <Form.Label className="question-form--title text-capitalize">
                Question {num + 1} - {question}
              </Form.Label>
              {answers.map((a) => {
                return (
                  <Form.Check
                    type="radio"
                    id={a}
                    label={a}
                    className="question-form--check "
                    name="answerradios"
                    value={a}
                    checked={selected === a}
                    onChange={() => setSelected(a)}
                  />
                );
              })}
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="primary"
                type="button"
                className="question-form--submit"
                size="sm"
                onClick={() => {
                  answerCheck(selected);
                  sendAnswer(selected);
                }}
              >
                Submit Answer
              </Button>
            </Col>
            <Col className="question--form-col">
              <p className="question-form--score">Score: {score}</p>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export default Question;
