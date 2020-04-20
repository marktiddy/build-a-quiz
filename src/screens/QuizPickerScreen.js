import React, { useContext } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import QuizCard from "../components/QuizCard";
import { Context } from "../context/QuizContext";

const QuizPickerScreen = () => {
  const { state } = useContext(Context);
  console.log(state);
  return (
    <Container>
      <Row>
        {state[0] ? (
          state.map((m) => (
            <Col key={m.details.id}>
              <QuizCard
                title={m.details.name}
                description={m.details.description}
                key={m.details.id}
              />
            </Col>
          ))
        ) : (
          <Col className="loading-class">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default QuizPickerScreen;
