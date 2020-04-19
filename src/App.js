import React, { useContext, useEffect } from "react";
import "./App.scss";
import { Context } from "./context/QuizContext";
import { Container, Row, Col } from "react-bootstrap";

//import firebase
import firebase from "./keys/firebase.js";

//Components
import Header from "./components/Header";
import Jumbo from "./components/Jumbo";
import QuizCard from "./components/QuizCard";

const App = () => {
  const { state, loadQuizState } = useContext(Context);

  useEffect(() => {
    //load firebase when we start and update the state
    var db = firebase.firestore();
    db.collection("quizzes").onSnapshot((querySnapshot) => {
      var quizzesToAdd = [];
      querySnapshot.forEach((doc) => {
        quizzesToAdd.push(doc.data());
      });
      loadQuizState(quizzesToAdd);
    });
  }, []);

  return (
    <>
      <Header />
      <Jumbo />
      <Container>
        <Row>
          {state[0]
            ? state.map((m) => (
                <Col>
                  <QuizCard
                    title={m.details.name}
                    description={m.details.description}
                  />
                </Col>
              ))
            : "Loading Quizzes"}
        </Row>
      </Container>
    </>
  );
};

export default App;
