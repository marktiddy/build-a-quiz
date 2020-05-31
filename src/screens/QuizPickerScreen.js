import React, { useContext } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import QuizCard from '../components/QuizCard';
import QuizContent from '../components/QuizContent';
import { Context } from '../context/Store';

import { useRouteMatch, Switch, Route } from 'react-router-dom';

const QuizPickerScreen = () => {
  const [state] = useContext(Context);
  let match = useRouteMatch();

  const quizList = state.quizzes;

  //function for assigning random colors:

  return (
    <>
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
                  <Col
                    md={6}
                    xs={12}
                    key={m.details.id}
                    className="quiz-picker-col"
                  >
                    <QuizCard content={m} key={m.details.id} />
                  </Col>
                ))
              ) : (
                <Col>
                  <p className="loading-quiz">Loading...</p>
                  <Spinner animation="grow" variant="primary" />
                </Col>
              )}
            </Route>
          </Switch>
        </Row>
      </Container>
    </>
  );
};

export default QuizPickerScreen;
