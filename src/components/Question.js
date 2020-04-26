import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Question = ({
  question: { question, answer, answers },
  sendAnswer,
  num,
  score,
}) => {
  const [selected, setSelected] = useState(answers[0]);
  const [showQuestion, setShowQuestion] = useState(true);
  const [localScore, setLocalScore] = useState(score);

  const answerCheck = (selected) => {
    if (selected === answer) {
      //they're correct. update local score
      setLocalScore(localScore + 1);
    }
    //Finally show the answer
    setShowQuestion(false);
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
              {showQuestion ? (
                answers.map((a) => {
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
                })
              ) : (
                <div className="show-answers-container">
                  <p>
                    You answered:{" "}
                    <span className="show-answers-span">{selected}</span>
                  </p>
                  <p>
                    The correct answer is:{" "}
                    <span className="show-answers-span">{answer}</span>
                  </p>
                  {localScore === score ? (
                    <p className="purple-text">
                      Sorry, better luck with the next question
                    </p>
                  ) : (
                    <p className="purple-text">Well done! You're right</p>
                  )}
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {showQuestion ? (
                <Button
                  variant="primary"
                  type="button"
                  className="question-form--submit"
                  size="sm"
                  onClick={() => {
                    answerCheck(selected);
                  }}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="button"
                  className="question-form--submit"
                  size="sm"
                  onClick={() => {
                    sendAnswer(selected, localScore);
                  }}
                >
                  Go to the next question...
                </Button>
              )}
            </Col>
            <Col className="question--form-col">
              <p className="question-form--score">Score: {localScore}</p>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export default Question;
