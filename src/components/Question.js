import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

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
    </>
  );
};

export default Question;
