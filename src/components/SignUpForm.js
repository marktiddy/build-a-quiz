import React, { useCallback, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from '../keys/firebase';

const SignUpForm = ({ history }) => {
  const [error, setError] = useState('');

  const handleSignup = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        setError(error.message);
      }
    },
    [history]
  );

  return (
    <Form onSubmit={handleSignup}>
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required />
      </Form.Group>
      <Form.Group controlId="error-section">
        {error ? <p class="error-message">{error}</p> : null}
      </Form.Group>
      <Button variant="primary" type="submit">
        Create your account
      </Button>
    </Form>
  );
};

export default SignUpForm;
