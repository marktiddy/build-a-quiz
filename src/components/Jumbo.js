import React from "react";
import { Jumbotron } from "react-bootstrap";

const Jumbo = () => {
  return (
    <>
      <Jumbotron fluid className="top-area">
        <h1 className="top-area--title">Build-a-Quiz</h1>
        <p>Build your own quiz...invite others to join in</p>
      </Jumbotron>
      <div className="shape-divider"></div>
    </>
  );
};

export default Jumbo;
