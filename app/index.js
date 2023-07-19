import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Register';
import Login from './Login'
import Home from './Home'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase-auth';

const App = () => {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false)
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        
          <Stack.Navigator>
            {user ? (
              <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            ) : (
              <>
                <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
                <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
              </>
            )}
          </Stack.Navigator>
       
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;