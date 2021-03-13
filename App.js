import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'

import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';

var charset = 'abcdefghijklmnopqerstuvxwyzABCDEFGHIJKLMNOPQERSTUVXWYZ1234567890#@&$^';

export default function App() {

  const [password, setPassword] = useState('');
  const [sliderValue, setSliderValue] = useState(10)

  function generatePass() {
    let pass = '';
    for (let i = 0, max = charset.length; i < sliderValue; i++) {
      pass += charset.charAt(Math.floor(Math.random() * (max - 0)) + 0)
    }
    setPassword(pass)
  }

  function copyPass() {
    Clipboard.setString(password);
    alert('Senha copiada!')
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('./src/assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>
        {sliderValue} Caracteres
      </Text>

      <View style={styles.area}>
        <Slider 
        style={{height: 50}}
        minimumValue={5}
        maximumValue={15}
        value={sliderValue}
        onValueChange={e => setSliderValue(Math.floor(e))}
        minimumTrackTintColor="#FF0000"
        maximumTrackTintColor="#000"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>
      
      {
        password !== '' && (
          <View style={styles.area}>
            <Text style={styles.password} onLongPress={copyPass}>{password}</Text>
          </View>
        )
      }
      
      

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3FF'
  },
  logo: {
    marginBottom: 60
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  area: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
    width: '80%',
    borderRadius: 7
  },
  button: {
    backgroundColor: '#FFA200',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 25
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  },
  password: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20
  }
});