import React, { useEffect, useState } from 'react';
import firebase from '../keys/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
    if (currentUser) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [currentUser, authenticated]);

  return (
    <AuthContext.Provider value={{ currentUser, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
