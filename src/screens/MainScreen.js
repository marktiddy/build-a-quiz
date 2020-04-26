import React, { useContext, useEffect } from "react";

//import store
import { Context } from "../context/Store";
//Routing imports
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Firebase
import firebase from "../keys/firebase.js";

//Components
import NavigationBar from "../components/NavigationBar";
import Jumbo from "../components/Jumbo";
import QuizPickerScreen from "./QuizPickerScreen";
import WelcomeScreen from "./WelcomeScreen";
import CreateQuizScreen from "./CreateQuizScreen";
import Footer from "./Footer";

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
      <NavigationBar />
      <Jumbo />
      <Router>
        <Switch>
          <Route path="/play">
            <QuizPickerScreen />
          </Route>
          <Route path="/create">
            <CreateQuizScreen />
          </Route>
          <Route path="/">
            <WelcomeScreen />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </>
  );
};

export default MainScreen;
