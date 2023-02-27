import React, {useEffect, useCallback, useState} from 'react';
import {initializeApp} from 'firebase/app';
import {
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';

export const FirebaseContext = React.createContext({
  login: () => {},
  loading: false,
  user: undefined,
});

export const FirebaseProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [auth, setAuthInstance] = useState(null);

  const initializeFirebase = useCallback(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyDjrJEzQLfRYneDMRsDOnvdN9cQoUB3aEE',
      authDomain: 'htchallenge-7d953.firebaseapp.com',
      projectId: 'htchallenge-7d953',
      storageBucket: 'htchallenge-7d953.appspot.com',
      messagingSenderId: '1072893099350',
      appId: '1:1072893099350:web:8e52a17b68e40bd56eaaf7',
    };
    initializeApp(firebaseConfig);
    setAuthInstance(getAuth());
    console.log('Firebase inicializado');
  }, []);

  const login = useCallback(
    async (email, password) => {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password)
        .then(setUser)
        .catch(console.error);
      setLoading(false);
    },
    [auth],
  );

  const startListeners = useCallback(() => {
    if (auth) {
      onAuthStateChanged(auth, u => {
        console.log('onAuthStateChanged', {u});
      });
    }
  }, [auth]);

  useEffect(() => {
    initializeFirebase();
  }, [initializeFirebase]);

  useEffect(() => {
    startListeners();
  }, [auth]);

  return (
    <FirebaseContext.Provider
      value={{
        login,
        loading,
        user,
      }}>
      {children}
    </FirebaseContext.Provider>
  );
};
