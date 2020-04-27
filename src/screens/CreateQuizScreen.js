import React, { useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../context/Store";

import QuizDetails from "../components/QuizForm/QuizDetails";
import QuizQuestions from "../components/QuizForm/QuizQuestions";
import Success from "../components/QuizForm/Success";

import firebase from "../keys/firebase";

const CreateQuizScreen = () => {
  const [state, dispatch] = useContext(Context);
  const [quizDetails, setQuizDetails] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [successState, setSuccessState] = useState(false);

  //Set up firebase
  var db = firebase.firestore();

  const handleQuizDetails = (name, description) => {
    let quizDetailsObject = {
      description,
      name,
      id: uuidv4(),
      questions: 0,
    };
    setQuizDetails(quizDetailsObject);
  };

  const handleQuestions = (question, answers, correctAnswer) => {
    const newQuestion = {
      question,
      answers,
      answer: correctAnswer,
    };
    const existingQuestions = [...questionList];
    existingQuestions.push(newQuestion);
    setQuestionList(existingQuestions);
  };

  const submitQuiz = () => {
    //Add correct number of questions to quiz details
    const finalDetails = quizDetails;
    quizDetails.questions = questionList.length;
    //Prepare whole thing as an object
    const quizObject = { details: finalDetails, questions: questionList };
    //call firebase
    db.collection("quizzes")
      .doc(uuidv4())
      .set(quizObject)
      .then(() => setSuccessState(true))
      .catch((e) => console.log(e));
  };

  const deleteQuestion = (idx) => {
    const newList = questionList;
    newList.splice(idx, 1);
    setQuestionList(newList);
  };

  return (
    <>
      {successState === true ? (
        <Success quizId={quizDetails.id} quizName={quizDetails.name} />
      ) : (
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
                <QuizQuestions
                  questionCount={questionList.length}
                  handleQuestions={(question, answers, correctAnswer) =>
                    handleQuestions(question, answers, correctAnswer)
                  }
                />
              ) : (
                <QuizDetails
                  setDetails={(name, description) =>
                    handleQuizDetails(name, description)
                  }
                />
              )}
            </Col>
            <Col xs={12} md={4}>
              <p className="purple-text">
                {quizDetails.name
                  ? `${quizDetails.name} Questions`
                  : "Questions in your quiz..."}
              </p>
              <ol>
                {questionList.map((q, idx) => {
                  return (
                    <li id={idx} key={idx}>
                      {q.question}
                      <p className="remove-answer-text">
                        <a href="#" onClick={() => deleteQuestion(idx)}>
                          Delete
                        </a>
                      </p>
                    </li>
                  );
                })}
              </ol>
              <Button onClick={() => submitQuiz()} type="button" size="sm">
                Finished adding questions?
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default CreateQuizScreen;
