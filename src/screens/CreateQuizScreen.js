import React, { useState, useContext } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../context/Store";

import QuizDetails from "../components/QuizForm/QuizDetails";
import QuizQuestions from "../components/QuizForm/QuizQuestions";

const CreateQuizScreen = () => {
  const [state, dispatch] = useContext(Context);
  const [quizDetails, setQuizDetails] = useState([]);
  const [questionList, setQuestionList] = useState([]);

  //Component notes
  //2 parts - quiz details, quiz content
  //quiz details are submitted first and dealt with here but validated in other component
  //quiz questions are appended here

  const handleQuizDetails = (name, description) => {
    let quizDetailsObject = {
      description,
      name,
      id: uuidv4(),
      questions: 0,
    };
    setQuizDetails(quizDetailsObject);
    console.log(quizDetails);
  };

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h2 class="quiz-title">Create Your Own Quiz</h2>
          <p>To create your own quiz simple use the form below</p>
        </Col>
      </Row>
      <Row>
        <Col>
          {quizDetails.name ? (
            <QuizQuestions questionCount={questionList.length} />
          ) : (
            <QuizDetails
              setDetails={(name, description) =>
                handleQuizDetails(name, description)
              }
            />
          )}
        </Col>
        <Col xs={4}>
          <p className="purple-text">
            {quizDetails.name
              ? `${quizDetails.name} Questions`
              : "Questions in your quiz..."}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateQuizScreen;
