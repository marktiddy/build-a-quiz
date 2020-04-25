import React, { useContext } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import QuizCard from "../components/QuizCard";
import QuizContent from "../components/QuizContent";
import { Context } from "../context/Store";

import {
  BrowserRouter as Router,
  useRouteMatch,
  Switch,
  Route,
} from "react-router-dom";

const QuizPickerScreen = () => {
  const [state, dispatch] = useContext(Context);
  let match = useRouteMatch();

  const quizList = state.quizzes;

  return (
    <Container>
      <Row>
        {/* Router for this component */}
        <Switch>
          <Route path={`${match.path}/:quizId`}>
            <QuizContent />
          </Route>
          <Route path={match.path}>
            {quizList ? (
              quizList.map((m) => (
                <Col key={m.details.id}>
                  <QuizCard content={m} key={m.details.id} />
                </Col>
              ))
            ) : (
              <Col className="loading-class">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </Col>
            )}
          </Route>
        </Switch>
      </Row>
    </Container>
  );
};

export default QuizPickerScreen;
