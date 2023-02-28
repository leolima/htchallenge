import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {FirebaseContext} from '../../contexts/FirebaseContext';
import {isValidColor} from '../../utils/common';

export const Controls = () => {
  const [colors, setColors] = useState(undefined);
  const {userData, saveUserData} = useContext(FirebaseContext);

  const handleCuboColor = v => setColors({...colors, cubo: v});
  const handleConeColor = v => setColors({...colors, cone: v});
  const handleDodecaColor = v => setColors({...colors, dodecaedro: v});

  const applyColors = useCallback(colors => {
    if (
      isValidColor(colors?.cubo) &&
      isValidColor(colors?.cone) &&
      isValidColor(colors?.dodecaedro)
    ) {
      saveUserData(colors);
    } else {
      alert('There is an invalid Color');
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const obj = {
        cubo: userData?.cubo || 'red',
        cone: userData?.cone || 'yellow',
        dodecaedro: userData?.dodecaedro || 'green',
      };
      setColors(obj);
    }
  }, [userData]);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cor do Cubo"
          value={colors?.cubo}
          onChangeText={handleCuboColor}
        />
        <TextInput
          style={styles.input}
          placeholder="Cor do Cone"
          value={colors?.cone}
          onChangeText={handleConeColor}
        />
        <TextInput
          style={styles.input}
          placeholder="Cor do Dodecaedro"
          value={colors?.dodecaedro}
          onChangeText={handleDodecaColor}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => applyColors(colors)}>
          <View style={styles.button}>
            <Text style={styles.buttonLabel}>Aplicar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 8,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    borderColor: '#aaa',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#efefef',
    paddingVertical: 8,
    borderColor: '#aaa',
    borderWidth: 1,
  },
  buttonLabel: {
    color: '#000',
    textAlign: 'center',
  },
});
