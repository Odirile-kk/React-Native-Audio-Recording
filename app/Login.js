import { useNavigation } from 'expo-router';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { auth } from '../firebase-auth';
import { signInWithEmailAndPassword } from 'firebase/auth'


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const nav = useNavigation()

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        nav.replace('Home')
        console.log('yay!');
      })
      .catch((error) => alert(error.message));
  }

  const register = () => {
    nav.navigate("Register")
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="pading"
    >

    <View style={styles.inputContainer}>
    <ImageBackground source={require('./assets/copywriting_8049113.png')} style={styles.image} />
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
        <TouchableOpacity onPress={handleSignIn} style={styles.buttonContainer}>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Not registered?</Text>
        <TouchableOpacity onPress={register} >
          <Text style={styles.register}>Register</Text>
        </TouchableOpacity>
        
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    
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
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: 'pink',
    width: '100%',
    padding: 15,
    borderRadius: 10
  },
  register: {
    paddingTop: 5,
    color: '#1f75fe'
  },
  text: {
    paddingTop: 25
  },
  image: {
    width: '100%',
    height: 400,
    paddingBottom: 20
  }
})