import React, {useContext} from 'react';
import {FirebaseContext} from './contexts/FirebaseContext';
import Login from './screens/Login';
import Main from './screens/Main';

function Routes() {
  const {user} = useContext(FirebaseContext);

  return user ? <Main /> : <Login />;
}

export default Routes;
