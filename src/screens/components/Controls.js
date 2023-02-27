import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export const Controls = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TextInput style={styles.input} placeholder="Cor do Cubo" />
        <TextInput style={styles.input} placeholder="Cor do Cone" />
        <TextInput style={styles.input} placeholder="Cor do Dodecaedro" />
      </View>
      <View>
        <TouchableOpacity onPress={() => {}}>
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
