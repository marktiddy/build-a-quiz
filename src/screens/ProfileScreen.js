import React, { useState, useContext, useEffect } from 'react';
import { Button, Container, Col, Row, Form } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
import { AuthContext } from '../context/Auth';
import avatar from '../img/avatar.png';
import firebase from '../keys/firebase';

const ProfileScreen = ({ history }) => {
  const { authenticated, currentUser, setCurrentUser } = useContext(
    AuthContext
  );
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [username, setUsername] = useState('');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (currentUser.displayName) {
      setUsername(currentUser.displayName);
    }
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (user) {
      user
        .updateProfile({
          displayName: username,
        })
        .then(() => {
          setCurrentUser(user);
          setFeedback('We have successfully updated your username');
          setTimeout(() => {
            setFeedback(null);
            history.push('/profile');
          }, 2000);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col>
            <h3>
              Welcome back{' '}
              {currentUser.displayName ? currentUser.displayName : null}
            </h3>
            <p>
              This is your profile area. Upload an avatar, change your username
              or update your password
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleUpdate}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Choose a username"
                  id="username-box"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                {feedback ? <p>{feedback}</p> : null}
              </Form.Group>

              <Button variant="primary" type="submit">
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileScreen;
