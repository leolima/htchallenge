import React, {useEffect, useCallback, useState} from 'react';
import {initializeApp} from 'firebase/app';
import {getDatabase, set, ref, onValue} from 'firebase/database';
import {signInWithEmailAndPassword, getAuth} from 'firebase/auth';
import {hashCode} from '../utils/common';

export const FirebaseContext = React.createContext({
  login: () => {},
  loading: false,
  user: undefined,
  userData: undefined,
  saveUserData: () => {},
});

export const FirebaseProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [auth, setAuthInstance] = useState(null);
  const [database, setDatabaseInstance] = useState(null);

  const initializeFirebase = useCallback(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyDjrJEzQLfRYneDMRsDOnvdN9cQoUB3aEE',
      authDomain: 'htchallenge-7d953.firebaseapp.com',
      projectId: 'htchallenge-7d953',
      storageBucket: 'htchallenge-7d953.appspot.com',
      messagingSenderId: '1072893099350',
      appId: '1:1072893099350:web:8e52a17b68e40bd56eaaf7',
      databaseURL: 'https://htchallenge-7d953-default-rtdb.firebaseio.com',
    };
    const app = initializeApp(firebaseConfig);
    setAuthInstance(getAuth());
    setDatabaseInstance(getDatabase(app));
  }, []);

  const login = useCallback(
    async (email, password) => {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password)
        .then(u => u?.user)
        .then(setUser)
        .catch(alert);
      setLoading(false);
    },
    [auth],
  );

  const loadUserData = useCallback(() => {
    if (user && database) {
      const data = ref(database, `userData/${hashCode(user?.email)}`);
      onValue(data, snapshot => {
        const value = snapshot.val();
        setUserData(value);
      });
    }
  }, [user, database]);

  const saveUserData = useCallback(
    colors => {
      if (user && database) {
        set(ref(database, `userData/${hashCode(user?.email)}`), colors);
      }
    },
    [user, database],
  );

  useEffect(() => {
    initializeFirebase();
  }, [initializeFirebase]);

  useEffect(() => {
    loadUserData();
  }, [user, database]);

  return (
    <FirebaseContext.Provider
      value={{
        login,
        loading,
        user,
        userData,
        saveUserData,
      }}>
      {children}
    </FirebaseContext.Provider>
  );
};
