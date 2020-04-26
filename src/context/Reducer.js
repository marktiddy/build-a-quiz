const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_QUIZZES":
      return {
        ...state,
        quizzes: action.payload,
      };
    case "ADD_QUIZ":
      return { ...state, quizzes: [...state.quizzes, action.payload] };
    default:
      return state;
  }
};
export default Reducer;
