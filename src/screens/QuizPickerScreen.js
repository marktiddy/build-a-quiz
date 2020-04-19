import React, { useContext } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import QuizCard from "../components/QuizCard";
import { Context } from "../context/QuizContext";

const QuizPickerScreen = () => {
  const { state } = useContext(Context);
  return (
    <Container>
      <Row>
        {state[0] ? (
          state.map((m) => (
            <Col>
              <QuizCard
                title={m.details.name}
                description={m.details.description}
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
