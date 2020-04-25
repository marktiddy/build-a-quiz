import React, { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "../context/Store";
import Question from "./Question";
import { v4 as uuidv4 } from "uuid";

const QuizContent = () => {
  const [state, dispatch] = useContext(Context);
  const [questionNum, setQuestionNum] = useState(0);

  //Set Up
  let { quizId } = useParams();
  const quiz = state.quizzes.filter((q) => q.details.id.toString() === quizId);

  //To do
  //Create a question component that is a form and logs a user's answer and returns it to this component to check the answer
  //If an answer is right a score state is updated and the question number is updated
  //Add a progress bar

  //Helper functions
  const processAnswer = (selected) => {
    if (quiz[0].questions[questionNum].answer === selected) {
      console.log("correct");
    } else {
      console.log("incorrect");
    }
    console.log(quiz[0].questions[questionNum].answer);
    console.log(selected);
  };

  return (
    <>
      <Container fluid>
        <Row className="text-center">
          {quiz[0] ? (
            <Col>
              <h2 className="quiz-title">{quiz[0].details.name}</h2>
              {quiz[0].questions[questionNum] ? (
                <>
                  <Question
                    question={quiz[0].questions[questionNum]}
                    num={questionNum}
                    sendAnswer={(selected) => processAnswer(selected)}
                    key={uuidv4()}
                  />
                </>
              ) : (
                <h4>End of Quiz</h4>
              )}
            </Col>
          ) : (
            <Col>
              <h2>Quiz is loading...</h2>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default QuizContent;
