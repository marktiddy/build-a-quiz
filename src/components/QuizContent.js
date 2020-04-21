import React, { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "../context/Store";

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

  return (
    <>
      <Container>
        <Row className="text-center">
          {quiz[0] ? (
            <Col>
              <h2>{quiz[0].details.name}</h2>
              {quiz[0].questions[questionNum] ? (
                <>
                  <h4>
                    Question {questionNum + 1}.{" "}
                    {quiz[0].questions[questionNum].question}
                  </h4>
                  <p>
                    {quiz[0].questions[questionNum].answers.map((a) => (
                      <p>{a}</p>
                    ))}
                  </p>
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
