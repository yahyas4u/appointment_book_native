import { View, Text } from 'react-native';
import React from 'react';
import Login from '../components/Login';
import Register  from '../components/Register';
import ForgotPassword from '../components/ForgotPassword';
import Home from '../components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Appointment from '../components/Appointment';
import Slot from '../components/Slot';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Slot" component={Slot}/> 
            <Stack.Screen name="Appointment" component={Appointment}/>
        </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default Navigation