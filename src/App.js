import React, { useContext, useEffect } from "react";
import "./App.scss";
import { Context } from "./context/QuizContext";

//Routing imports
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//import firebase
import firebase from "./keys/firebase.js";

//Components
import Header from "./components/Header";
import Jumbo from "./components/Jumbo";
import QuizPickerScreen from "./screens/QuizPickerScreen";

const App = () => {
  const { loadQuizState } = useContext(Context);

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

  // return (
  //   <>
  //     <Header />
  //     <Jumbo />
  //     <QuizPickerScreen />
  //   </>
  // );
  return (
    <>
      <Header />
      <Jumbo />
      <Router>
        <Switch>
          <Route path="/">
            <QuizPickerScreen />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
