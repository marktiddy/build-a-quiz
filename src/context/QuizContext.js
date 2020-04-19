import createDataContext from "./createDataContext";

//Our reducer to handle actions
const quizReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_QUIZ":
      return action.payload;
    default:
      return state;
  }
};

//Functions we need will go here eventually (such as adding a quiz)
//This passes through dispatch first so all arguments go second
const addQuiz = (dispatch) => () => {
  //check the format of our quiz
  //send a dispatch to add it to the state
  //This is an example
  dispatch({ type: "ADD_QUIZ_EXAMPLE", payload: "ourquiz" });
};
const loadQuizState = (dispatch) => (quiz) => {
  dispatch({ type: "LOAD_QUIZ", payload: quiz });
};

export const { Provider, Context } = createDataContext(
  quizReducer,
  //Our functions to access
  {
    addQuiz,
    loadQuizState,
  },
  //Our initial state - empty because we use firebase to populate
  {}
);
