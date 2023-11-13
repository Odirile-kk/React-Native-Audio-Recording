import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecordScreen from './RecordScreen';
import Login from './Login';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (

    <Stack.Navigator >
       <Stack.Screen options={{ headerShown: false}} name="login" component={Login}/>
       <Stack.Screen options={{ headerShown: false}} name="recordScreen" component={RecordScreen}/>
    </Stack.Navigator>

  
  );
}




