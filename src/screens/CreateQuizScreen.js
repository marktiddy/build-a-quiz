import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import NavigationBar from '../components/NavigationBar';

import QuizDetails from '../components/QuizForm/QuizDetails';
import QuizQuestions from '../components/QuizForm/QuizQuestions';
import Success from '../components/QuizForm/Success';

import firebase from '../keys/firebase';

const CreateQuizScreen = () => {
  const [quizDetails, setQuizDetails] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [successState, setSuccessState] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState(null);
  const [editingIdx, setEditingIdx] = useState(null);

  //Set up firebase
  var db = firebase.firestore();

  useEffect(() => {
    //Check if the user is already putting a quiz together
    var localQuiz = JSON.parse(localStorage.getItem('quizDetails'));
    if (localQuiz) {
      setQuizDetails(localQuiz);
    }
    var localQuestions = JSON.parse(localStorage.getItem('quizQuestions'));
    if (localQuestions) {
      setQuestionList(localQuestions);
    }
  }, []);

  const handleQuizDetails = (name, description) => {
    let quizDetailsObject = {
      description,
      name,
      id: uuidv4(),
      questions: 0,
    };
    setQuizDetails(quizDetailsObject);

    //Save it to local storage
    localStorage.setItem('quizDetails', JSON.stringify(quizDetailsObject));
  };

  const handleQuestions = (question, answers, correctAnswer, idx) => {
    //Put together the new question
    const newQuestion = {
      question,
      answers,
      answer: correctAnswer,
    };
    //Create a copy of our existing questions
    const existingQuestions = [...questionList];
    //Check if we're updating a question (if we are there will be an ID)
    if (idx === null) {
      //not updating
      existingQuestions.push(newQuestion);
    } else {
      //Updating
      existingQuestions[idx] = newQuestion;
    }

    //We have a new question

    //Finally, update the question list
    setQuestionList(existingQuestions);

    //Create local storage version so user can reload browser window
    localStorage.setItem('quizQuestions', JSON.stringify(existingQuestions));

    //Reset our edit state
    setEditingIdx(null);
  };

  const submitQuiz = () => {
    //Add correct number of questions to quiz details
    const finalDetails = quizDetails;
    quizDetails.questions = questionList.length;
    //Prepare whole thing as an object
    const quizObject = { details: finalDetails, questions: questionList };
    //call firebase
    db.collection('quizzes')
      .doc(uuidv4())
      .set(quizObject)
      .then(() => setSuccessState(true))
      .catch((e) => console.log(e));

    //Finally clear local storage of our quiz option
    localStorage.removeItem('quizDetails');
    localStorage.removeItem('quizQuestions');
  };

  const deleteQuestion = (idx) => {
    const newList = [...questionList];
    newList.splice(idx, 1);
    setQuestionList(newList);
    //Update local storage
    localStorage.setItem('quizQuestions', JSON.stringify(newList));
  };

  const editQuestion = (idx) => {
    const q = { question: questionList[idx] };
    setEditingIdx(idx);
    setQuestionToEdit(q);
  };

  const resetScreen = () => {
    //Function for when a user doesn't want to continue
    localStorage.removeItem('quizQuestions');
    localStorage.removeItem('quizDetails');
    setQuizDetails([]);
    setQuestionList([]);
    setQuestionToEdit(null);
    setEditingIdx(null);
  };

  return (
    <>
      <NavigationBar />
      {successState === true ? (
        <Success quizId={quizDetails.id} quizName={quizDetails.name} />
      ) : (
        <Container>
          <Row>
            <Col className="text-center">
              <h2 className="quiz-title">Create Your Own Quiz</h2>
              <p>To create your own quiz simple use the form below</p>
            </Col>
          </Row>
          <Row>
            <Col>
              {quizDetails.name ? (
                <QuizQuestions
                  questionCount={questionList.length}
                  handleQuestions={(question, answers, correctAnswer, idx) =>
                    handleQuestions(question, answers, correctAnswer, idx)
                  }
                  questionToEdit={questionToEdit}
                  idxToEdit={editingIdx}
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
                  : 'Questions in your quiz...'}
              </p>
              <ol>
                {questionList.map((q, idx) => {
                  return (
                    <li id={idx} key={idx}>
                      {q.question}
                      <p className="remove-answer-text">
                        <Button
                          className="inline-button"
                          onClick={() => editQuestion(idx)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="inline-button"
                          onClick={() => deleteQuestion(idx)}
                        >
                          Delete
                        </Button>
                      </p>
                    </li>
                  );
                })}
              </ol>
              <Button onClick={() => submitQuiz()} type="button" size="sm">
                Finished adding questions?
              </Button>
              <div className="reset-button-area">
                <OverlayTrigger
                  key="left"
                  placement="left"
                  overlay={
                    <Tooltip id="warning-tooltip">
                      Warning: This will delete your quiz
                    </Tooltip>
                  }
                >
                  <Button
                    onClick={() => resetScreen()}
                    type="button"
                    size="sm"
                    className="inline-button"
                  >
                    Reset Quiz
                  </Button>
                </OverlayTrigger>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default CreateQuizScreen;
