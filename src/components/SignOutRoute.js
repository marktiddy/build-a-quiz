import { useCallback, useEffect } from 'react';
import firebase from '../keys/firebase';

const SignOutRoute = ({ history }) => {
  const handleSignOut = useCallback(async () => {
    try {
      await firebase.auth().signOut();
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [history]);

  useEffect(() => {
    handleSignOut();
  }, [handleSignOut]);

  return null;
};

export default SignOutRoute;
