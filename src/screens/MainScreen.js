import React, { useContext, useEffect } from "react";

//import store
import { Context } from "../context/Store";
//Routing imports
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Firebase
import firebase from "../keys/firebase.js";

//Components
import Header from "../components/Header";
import Jumbo from "../components/Jumbo";
import QuizPickerScreen from "./QuizPickerScreen";
import WelcomeScreen from "./WelcomeScreen";

const MainScreen = () => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    //load firebase when we start and update the state
    var db = firebase.firestore();
    db.collection("quizzes").onSnapshot((querySnapshot) => {
      var quizzesToAdd = [];
      querySnapshot.forEach((doc) => {
        quizzesToAdd.push(doc.data());
      });
      dispatch({ type: "SET_QUIZZES", payload: quizzesToAdd });
    });
  }, []);

  return (
    <>
      <Header />
      <Jumbo />
      <Router>
        <Switch>
          <Route path="/play">
            <QuizPickerScreen />
          </Route>
          <Route path="/">
            <WelcomeScreen />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default MainScreen;
