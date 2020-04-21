const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_QUIZZES":
      return {
        ...state,
        quizzes: action.payload,
      };

    case "ADD_QUIZ":
      //todo
      //something like return {...state,quizzes:state.quizzes.concat(action.payload)}
      return state;
    default:
      return state;
  }
};
export default Reducer;
