
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { auth } from './firebase/firebase-auth';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from 'expo-router';


const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigation()

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        nav.replace('Login')
        console.log(user.password);
      })
      .catch((error) => alert(error.message));
  };
  
  const onPress = () => {
    nav.replace('Login')
  }

  return (
    
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      
    >
      <ImageBackground source={require('./assets/copywriting_8049113.png')} style={styles.image} />
      <View style={styles.inputContainer}>
      
        <TextInput placeholder='Email' 
        value={email} onChangeText={text => setEmail(text)} 

        style={styles.input}></TextInput>
        <TextInput placeholder='Password' 
        value={password} onChangeText={text => setPassword(text)} 
        secureTextEntry
        style={styles.input}>

        </TextInput>
      </View>

      <View>
      
        <TouchableOpacity onPress={handleSignUp} style={styles.buttonContainer}>
          <Text style={styles.buttonReg}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPress} style={styles.buttonOutline}>
          <Text style={styles.buttonLog}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonReg: {
    backgroundColor: 'pink',
    width: '100%',
    padding: 15,
    borderRadius: 10
  },
  buttonLog: {
    backgroundColor: 'pink',
    width: '100%',
    padding: 15,
    borderRadius: 10
  },
  buttonOutline: {
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: 400,
    paddingBottom: 20
  }
})