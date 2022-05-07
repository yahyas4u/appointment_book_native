import { View,ScrollView, Text,TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {useNavigation} from '@react-navigation/core';
import {Controller, useForm} from 'react-hook-form';
import axios from 'axios'

const Register = () => {

  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  //const EMAIL_REGEX =  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
 
  const registerAction=(data)=>{
    axios.post('http://192.168.1.112:2000/register', data)
    .then(res => console.log(res.data)).catch(error => {
      alert("Username Already Exist");
      //console.log(error)
      navigation.navigate('Register');
    }); 
    //console.log(data);
    navigation.navigate('Login');
  }
  const LoginAction=()=>{
    //console.warn("Register")
    navigation.navigate('Login')
  }
  return (
    <ScrollView>
        <Text style={styles.title}>New Register</Text>
        <Controller 
          control={control}
          name="username"
          rules={{required:'Please Enter Username'}}
          render={({field:{value,onChange,onBlur}, fieldState:{error}})=>  
          <>
            <View style={[styles.container, {borderColor: error ? 'red' : '#e8e8e8'}]}>
              <TextInput value={value} onChangeText={onChange} 
              placeholder="User Name" onBlur={onBlur} style={styles.input} 
              />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Please Enter Username'}</Text>
          )}
          </>
          }
          />
            <Controller 
          control={control}
          name="password"
          rules={{required:'Please Enter Password'}}
          render={({field:{value,onChange,onBlur}, fieldState:{error}})=>  
          <>
            <View style={[styles.container, {borderColor: error ? 'red' : '#e8e8e8'}]}>
              <TextInput value={value} onChangeText={onChange} 
              placeholder="Password" onBlur={onBlur} style={styles.input}   secureTextEntry
              />
              
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Please Enter Password'}</Text>
          )}
          </>
          }
          />
            <Controller 
          control={control}
          name="password-repeat"
          rules={{
            required: 'Repeat Password is required',
            validate: value => value === pwd || 'Password do not match',
          }}
          render={({field:{value,onChange,onBlur}, fieldState:{error}})=>  
          <>
            <View style={[styles.container, {borderColor: error ? 'red' : '#e8e8e8'}]}>
              <TextInput value={value} onChangeText={onChange} 
              placeholder="Repeat Password" onBlur={onBlur} style={styles.input}   secureTextEntry
              />
              
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Please Do not match'}</Text>
          )}
          </>
          }
          />
     
      <View style={styles.button_submit}>
        <Text pressable style={styles.text} onPress={handleSubmit(registerAction)}>Register</Text>
      </View>
      <View style={styles.button_submit}>
        <Text pressable style={styles.text} onPress={LoginAction}>Login</Text>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container :{
    backgroundColor: 'white',
    width : '100%',
    borderColor: 'e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical:10,
},
title:{
    fontSize: 24,
    fontWeight:'bold',
    color: '#051C60',
    margin: 10,    
},

button_submit:{
  backgroundColor: "blue",
  width:'100%',
  padding: 15,
  marginVertical:5,
  alignItems:'center',
  borderRadius:5,
},
button_forgot:{
  backgroundColor: "",
  width:'100%',
  padding: 15,
  marginVertical:5,
  alignItems:'center',
  borderRadius:5,
},
text:{
  fontWeight: 'bold',
  color: 'white',
},
textForgot:{
  fontWeight: 'bold',
  color: 'black',
},
input : {},
  root:{
   
  }
})
export default Register