import {
    Dimensions,
    TextInput,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    SafeAreaView,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React, {useState} from "react";
  import {authorisation} from '../firebase'
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth'
  import { useNavigation } from "expo-router";
  
  
  const Login = () => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
      const nav = useNavigation()
  
      const handleSignUp = () => {
        createUserWithEmailAndPassword(authorisation, email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            alert('Registered successfully! Please login to continue')
            console.log(user.email);
          })
          .catch((error) => alert(error.message));
      };
      
      const handleSignIn = () => {
        signInWithEmailAndPassword(authorisation, email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            nav.replace('recordScreen')
            console.log('yay!');
          })
          .catch((error) => alert(error.message));
      }
  
  
    return (
      <ImageBackground style={{ backgroundColor: "white" }}>
        {/*Top view */}
        <View style={styles.header}>
          <Image
            source={require("../app/assets/audio.jpg")}
            style={styles.image}
          />
        </View>
        {/*Bottom view */}
        <View style={styles.details}>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={text => setEmail(text)} ></TextInput>
            <TextInput placeholder="Password" style={styles.input1}  value={password} onChangeText={text => setPassword(text)} secureTextEntry></TextInput>
          </View>
          <View
            style={{
              backgroundColor: "white",
              marginTop: 60,
              height: "10%",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25,
              marginHorizontal: "24%",
            }}
          >
            <TouchableOpacity activeOpacity={0.1} onPress={handleSignUp}>
              <Text style={styles.title}>Register</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "white",
              marginTop: 10,
              height: "10%",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25,
              marginHorizontal: "24%",
            }}
          >
            <TouchableOpacity activeOpacity={0.1} onPress={handleSignIn}>
              <Text style={styles.title}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  };
  
  export default Login;
  
  const styles = StyleSheet.create({
    header: {
      justifyContent: "center",
      alignItems: "center",
      height: "80%",
    },
    image: {
      height: "100%",
      width: "100%",
    },
    details: {
    //   backgroundColor: "white",
      height: "40%",
      borderTopLeftRadius: 100,
      borderTopRightRadius: 100,
      top: -300,
    },
    inputContainer: {
      marginTop: 55,
      marginHorizontal: 40,
      width: "80%",
    },
    input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      borderWidth: 1,
    },
    input1: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      borderWidth: 1,
      marginTop: 5,
    },
    title: {
      justifyContent: "center",
      alignItems: "center",
      color: "black",
      fontWeight: "bold",
      fontSize: 18,
    },
  });