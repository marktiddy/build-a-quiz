import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const QuizQuestions = ({
  handleQuestions,
  questionCount,
  questionToEdit,
  idxToEdit,
}) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    if (questionToEdit !== null) {
      const { question, answer, answers } = questionToEdit.question;
      setQuestion(question);
      setCorrectAnswer(answer);
      setAnswers(answers);
    }
  }, [questionToEdit]);

  const addAnswer = () => {
    const newAnswers = [...answers, ''];
    setAnswers(newAnswers);
  };

  const handleAnswerChange = (event) => {
    const updatedAnswers = [...answers];
    updatedAnswers[event.target.id] = event.target.value;
    setAnswers(updatedAnswers);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSelect = (event) => {
    setCorrectAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Check the question has a question Mark
    const sub = question.substr(question.length - 1);
    if (sub !== '?') {
      const questionToSubmit = question + '?';
      setQuestion(questionToSubmit);
    }
    //check our correct answer isn't blank
    var rightAnswer = '';
    if (correctAnswer === '') {
      const newAns = answers[0];
      rightAnswer = newAns;
    } else {
      rightAnswer = correctAnswer;
    }

    handleQuestions(question, answers, rightAnswer, idxToEdit);
    //Now clear all our questions
    setQuestion('');
    setAnswers(['', '']);
    setCorrectAnswer('');
  };

  const removeAnswerOption = (idx) => {
    const newAns = [...answers];
    newAns.splice(idx, 1);
    setAnswers(newAns);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <p className="purple-text">Let's add some questions...</p>
        <Form.Group controlId="questionForm.questionInput">
          <Form.Label>
            {idxToEdit === null
              ? `Question ${questionCount + 1}`
              : `Editing Question ${idxToEdit + 1}`}
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Your question"
            value={question}
            onChange={handleQuestionChange}
          />
        </Form.Group>
        {answers.map((a, idx) => {
          return (
            <Form.Group key={`${idx}`}>
              <Form.Control
                type="text"
                required
                placeholder={`Answer ${idx + 1}`}
                id={`${idx}`}
                data-idx={idx}
                value={answers[idx]}
                onChange={handleAnswerChange}
              />
              {idx > 1 ? (
                <p className="remove-answer-text">
                  <Button
                    onClick={() => removeAnswerOption(idx)}
                    className="inline-button"
                  >
                    Remove Answer
                  </Button>
                </p>
              ) : null}
            </Form.Group>
          );
        })}
        <Form.Group>
          <Button
            onClick={() => addAnswer()}
            type="button"
            size="sm"
            className="add-another-answer"
            variant="danger"
          >
            Add another answer
          </Button>
        </Form.Group>
        <Form.Group className="select-correct-answer">
          <Form.Label className="purple-text">
            Select the Correct Answer
          </Form.Label>
          <Form.Control
            as="select"
            id="answer-select"
            onChange={handleSelect}
            required
          >
            {answers.map((a, idx) => {
              return a === '' ? null : <option id={idx}>{a}</option>;
            })}
          </Form.Control>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="question-form--submit"
          size="sm"
        >
          {idxToEdit === null ? 'Submit Question' : 'Update Question'}
        </Button>

        <p className="orange-text divider-text">
          You'll add more questions next...
        </p>
      </Form>
    </>
  );
};

export default QuizQuestions;
