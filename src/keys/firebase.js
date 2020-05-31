import * as firebase from 'firebase/app';
import 'firebase/auth';
require('firebase/firestore');

const config = {
  apiKey: 'AIzaSyBmwhK1NnjQt8sY751BmmP9yVkpJBm2fAc',
  authDomain: 'build-a-quiz-f88c7.firebaseapp.com',
  databaseURL: 'https://build-a-quiz-f88c7.firebaseio.com',
  projectId: 'build-a-quiz-f88c7',
  storageBucket: 'build-a-quiz-f88c7.appspot.com',
  messagingSenderId: '117527661424',
  appId: '1:117527661424:web:071235dfd9dba9ded9ddb5',
  measurementId: 'G-VGF1VVM62Q',
};

firebase.initializeApp(config);

export default firebase;
