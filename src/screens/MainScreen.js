import React, { useContext, useEffect } from 'react';

//import store
import { Context } from '../context/Store';
import { AuthContext } from '../context/Auth';
//Routing imports
import { Switch, Route } from 'react-router-dom';

//Firebase
import firebase from '../keys/firebase.js';

//Components
import QuizPickerScreen from './QuizPickerScreen';
import ProfileScreen from './ProfileScreen';
import LoadingScreen from './LoadingScreen';
import WelcomeScreen from './WelcomeScreen';
import CreateQuizScreen from './CreateQuizScreen';
import Footer from './Footer';
import SignOutRoute from '../components/SignOutRoute';
import ErrorPage from '../screens/404';
import NavigationBar from '../components/NavigationBar'



const MainScreen = () => {
  const [state, dispatch] = useContext(Context);
  const { authenticated, currentUser } = useContext(AuthContext);

  useEffect(() => {
    //load firebase when we start and update the state
    var db = firebase.firestore();
    db.collection('quizzes').onSnapshot((querySnapshot) => {
      var quizzesToAdd = [];
      querySnapshot.forEach((doc) => {
        quizzesToAdd.push(doc.data());
      });
      dispatch({ type: 'SET_QUIZZES', payload: quizzesToAdd });
    });
  }, []);

  return (
    <>
    <NavigationBar />
      <Switch>
        <Route path="/play" component={QuizPickerScreen} />
        <Route path="/signout" component={SignOutRoute} />
        <Route exact path="/" component={WelcomeScreen} />
                       


        {authenticated ? (
          <>
            <Route path="/create" component={CreateQuizScreen} />
            <Route path="/profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Route path="/create" component={WelcomeScreen} />
            <Route path="/profile" component={LoadingScreen} />
          </>
        )}
 <Route path="*" component={ErrorPage} />
      </Switch>
      <Footer />
    </>
  );
};

export default MainScreen;
