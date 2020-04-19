import React, { useContext } from "react";
import "./App.scss";
import { Context } from "./context/QuizContext";

//components
import Header from "./components/Header";

const App = () => {
  const { state } = useContext(Context);
  console.log(state);
  return (
    <>
      <Header />
    </>
  );
};

export default App;
