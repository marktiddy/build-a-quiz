import React, { useState, useContext } from 'react';
import { Card, Button, Container, Col, Row } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
import { AuthContext } from '../context/Auth';

//import components for signing in/registering
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

const WelcomeScreen = ({ history }) => {
  const [cardToggle, setCardToggle] = useState('signin');
  const { authenticated } = useContext(AuthContext);
  const handleToggle = () => {
    if (cardToggle === 'signin') {
      setCardToggle('signup');
    } else {
      setCardToggle('signin');
    }
  };

  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col>
            <Card className="text-center welcome-card">
              <Card.Body>
                <Card.Text>
                  Welcome to Build-a-Quiz. The website that let's you play
                  quizzes and create your own to share with friends.
                </Card.Text>
              </Card.Body>
            </Card>
            <div style={{ height: '20px' }}></div>
            {authenticated ? (
              <Card className="text-center welcome-card">
                <Card.Body>
                  <Card.Title>Welcome back! </Card.Title>
                  <Card.Text>
                    Now you're logged in you can create a quiz, play quizzes,
                    favourite quizzes and update your profile
                  </Card.Text>
                </Card.Body>
              </Card>
            ) : (
              <Card className="text-center welcome-card">
                <Card.Body>
                  <Card.Title>
                    {cardToggle === 'signin'
                      ? 'Sign in to your account'
                      : 'Sign up for an account'}
                  </Card.Title>{' '}
                  <Card.Text>
                    {cardToggle === 'signin'
                      ? "Don't have an account yet?"
                      : 'Already have an account?'}
                    {cardToggle === 'signin' ? (
                      <p className="btn-toggle" onClick={() => handleToggle()}>
                        Click here to sign up
                      </p>
                    ) : (
                      <p className="btn-toggle" onClick={() => handleToggle()}>
                        Click here to sign in
                      </p>
                    )}
                  </Card.Text>
                  <Card.Text>
                    {cardToggle === 'signin' ? (
                      <SignInForm history={history} />
                    ) : (
                      <SignUpForm history />
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col>
            <Card className="text-center quiz-card">
              <Card.Body>
                <p className="quiz-card-title">Play Quizzes</p>
                <Card.Text>
                  Test out your knowledge and play one of our quizzes
                </Card.Text>
                <Button variant="primary" className="btn-white" href="/play">
                  Pick A Quiz
                </Button>
              </Card.Body>
            </Card>
            <Card className="text-center quiz-card">
              <Card.Body>
                <p className="quiz-card-title">Create a Quiz</p>
                <Card.Text>
                  Are you full of questions? Use our creator to make your own
                  quiz
                </Card.Text>
                {authenticated ? (
                  <Button
                    variant="primary"
                    className="btn-white"
                    href="/create"
                  >
                    Create a Quiz
                  </Button>
                ) : (
                  <Card.Text>You must be signed in to create a quiz</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WelcomeScreen;
