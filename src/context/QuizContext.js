import createDataContext from "./createDataContext";

//Our reducer to handle actions
const quizReducer = (state, action) => {
  switch (action.type) {
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

export const { Provider, Context } = createDataContext(
  quizReducer,
  //Our functions to access
  {
    addQuiz,
  },
  //Our initial state
  {
    doc1: {
      details: {
        id: 1,
        name: "Test Quiz",
        questions: 2,
      },
      questions: [
        {
          number: 1,
          question: "Is this quiz a quiz?",
          answers: ["Yes", "No", "Not sure"],
          correct_answer: 1,
        },
        {
          number: 2,
          question: "Is this the real life...",
          answers: ["or are we pretending?", "or is it just fantasy?"],
          correct_answer: 2,
        },
      ],
    },
    doc2: {
      details: {
        id: 1,
        name: "Test Quiz",
        questions: 2,
      },
      questions: [
        {
          number: 1,
          question: "Is this quiz a quiz?",
          answers: ["Yes", "No", "Not sure"],
          correct_answer: 1,
        },
        {
          number: 2,
          question: "Is this the real life...",
          answers: ["or are we pretending?", "or is it just fantasy?"],
          correct_answer: 2,
        },
      ],
    },
  }
);
