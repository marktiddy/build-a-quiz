import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ProgressBar,
} from 'react-bootstrap';

const Question = ({
  question: { question, answer, answers },
  sendAnswer,
  num,
  score,
  updateScore,
}) => {
  const [selected, setSelected] = useState(answers[0]);
  const [showQuestion, setShowQuestion] = useState(true);
  const [localScore, setLocalScore] = useState(score);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const currentTime = time;
    const timer = () => {
      setTimeout(() => {
        setTime(currentTime + 5);
      }, 1000);
    };

    if (time !== 100) {
      timer();
    } else {
      answerCheck(selected);
    }
  }, [time]);

  const selectAnswer = (a) => {
    setSelected(a);
    answerCheck(a);
  };

  const answerCheck = (userAns) => {
    if (userAns === answer) {
      console.log('comparing ' + userAns + ' with ' + answer);
      //they're correct. update local score

      setLocalScore(localScore + 1);
    }
    //Finally show the answer
    setShowQuestion(false);
  };

  return (
    <>
      <Container>
        <Row>
          <Col className="question-box">{question}</Col>
        </Row>
        {showQuestion ? (
          <>
            <Row>
              <Col className="time-box">
                <ProgressBar
                  striped
                  animated
                  variant="info"
                  className="time-progress"
                  now={time}
                />
              </Col>
            </Row>
            <Row>
              {answers.map((a) => {
                return (
                  <Col
                    md={6}
                    className="answer-box"
                    id={a}
                    onClick={() => selectAnswer(a)}
                  >
                    {a}
                  </Col>
                );
              })}
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col className="revealed-answer-box">
                <p>You Answered</p>
                <p>{selected}</p>
              </Col>
              <Col className="revealed-answer-box">
                <p>The Correct Answer Is</p>
                <p>{answer}</p>
              </Col>
            </Row>
            <Row>
              {localScore === score ? (
                <Col className="question-box" style={{ background: '#8b0000' }}>
                  {' '}
                  Sorry, better luck with the next question
                </Col>
              ) : (
                <Col className="question-box" style={{ background: 'green' }}>
                  Well done! You're Right
                </Col>
              )}

              <Col
                className="next-question-box"
                onClick={() => {
                  sendAnswer(selected, localScore);
                }}
              >
                {' '}
                Go to the next question
              </Col>
            </Row>
          </>
        )}
      </Container>
      <p className="score-tracker">Score: {localScore}</p>
      {/* <Form className="question-form">
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
                    You answered:{' '}
                    <span className="show-answers-span">{selected}</span>
                  </p>
                  <p>
                    The correct answer is:{' '}
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
          <Col>
            <Row>
              {showQuestion ? (
                <div className="question-timer">
                  <p>Time remaining to answer...</p>
                  <ProgressBar striped animated variant="info" now={time} />
                </div>
              ) : null}
            </Row>
          </Col>
        </Container>
      </Form> */}
    </>
  );
};

export default Question;
