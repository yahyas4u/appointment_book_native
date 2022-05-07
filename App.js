import React from 'react';
import {  SafeAreaView, StyleSheet, Text, useColorScheme, View,} from 'react-native';
import Navigation from './src/navigation';


const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.text} >Appointment Management System</Text>
      <Navigation/> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 root:{
   flex:1,
   backgroundColor: '#EEEAE9',
 },
 text:{
   fontSize:25,
 }
});

export default App;
