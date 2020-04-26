import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  ProgressBar,
  Spinner,
  Button,
} from "react-bootstrap";

import { useParams, useRouteMatch } from "react-router-dom";
import { Context } from "../context/Store";
import Question from "./Question";
import { v4 as uuidv4 } from "uuid";

const QuizContent = () => {
  const [state, dispatch] = useContext(Context);
  const [questionNum, setQuestionNum] = useState(0);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const match = useRouteMatch();

  //Set Up
  let { quizId } = useParams();
  const quiz = state.quizzes.filter((q) => q.details.id.toString() === quizId);

  //Helper functions
  const processAnswer = (selected, localScore) => {
    //Set our returned score
    setScore(localScore);
    setQuestionNum(questionNum + 1);
    setProgress(
      ((questionNum + 1) / quiz[0].questions.length).toFixed(2) * 100
    );
  };

  return (
    <>
      <Container fluid>
        <Row className="text-center">
          {quiz[0] ? (
            <Col>
              <h2 className="quiz-title">{quiz[0].details.name}</h2>
              <div>
                <ProgressBar
                  striped
                  animated
                  variant="info"
                  now={progress}
                  label={`${progress}% through quiz`}
                />
              </div>
              {quiz[0].questions[questionNum] ? (
                <>
                  <Question
                    question={quiz[0].questions[questionNum]}
                    num={questionNum}
                    sendAnswer={(selected, localScore) =>
                      processAnswer(selected, localScore)
                    }
                    key={uuidv4()}
                    score={score}
                  />
                </>
              ) : (
                <div className="score-board">
                  <p className="loading-quiz">That's the end of the quiz</p>
                  <p className="purple-text">
                    You scored {score} out of {quiz[0].questions.length}
                  </p>
                  {(score / quiz[0].questions.length) * 100 >= 75 ? (
                    <p className="purple-text">That's pretty good</p>
                  ) : (
                    <p className="orange-text">
                      Time to revise...better luck next time
                    </p>
                  )}
                  <Button
                    variant="primary"
                    size="sm"
                    href={`${match.url}/play`}
                  >
                    Play Another Quiz
                  </Button>
                </div>
              )}
            </Col>
          ) : (
            <Col>
              <p className="loading-quiz">Quiz is loading...</p>
              <Spinner animation="grow" variant="primary" />
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default QuizContent;
