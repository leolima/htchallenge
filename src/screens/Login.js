import React, {useCallback, useState, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {FirebaseContext} from '../contexts/FirebaseContext';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const {login, loading} = useContext(FirebaseContext);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleLogin = useCallback(() => {
    login(email, password);
  }, [email, password]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.fieldset}>
            <Text style={styles.title}>HT-Challenge</Text>
          </View>

          <View style={styles.fieldset}>
            <Text>E-mail</Text>
            <TextInput style={styles.input} onChangeText={setEmail} />
          </View>
          <View style={styles.fieldset}>
            <Text>Password</Text>
            <TextInput style={styles.input} onChangeText={setPassword} />
          </View>
          {!loading && (
            <View style={styles.fieldset}>
              <TouchableOpacity onPress={handleLogin}>
                <View style={styles.button}>
                  <Text style={styles.buttonLabel}>Login</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {loading && <ActivityIndicator size="large" />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
  },
  fieldset: {
    display: 'flex',
    padding: 24,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  button: {
    backgroundColor: '#3b99fc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonLabel: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default App;
