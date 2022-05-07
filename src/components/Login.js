import { View,ScrollView, Text,TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import {useForm,Controller} from 'react-hook-form';
const bcrypt = require('bcryptjs');
//var salt = bcrypt.genSaltSync(10);
import axios from 'axios'
const Login = () => {

  const navigation =useNavigation();
  const {control,handleSubmit,formState:{errors}} = useForm();
  //console.log(errors);
  //const pwd = bcrypt.hashSync(this.state.password, salt);
  const loginAction = (data)=>{
    //const pwd = bcrypt.hashSync(data.password, salt);
    //console.log(pwd);
    axios.post('http://192.168.1.112:2000/login', {
      username: data.username,
      password: data.password,
    }).then((res) => {
      //console.log(res.data);
      //const token = await AsyncStorage.getItem(res.data.token)
      //AsyncStorage.setItem('token', res.data.token);
      navigation.navigate('Slot')
    }).catch(error => console.log(error))
  }
  const forgotPasswordAction=()=>{
    console.warn("Forgot Password")
    navigation.navigate('ForgotPassword')
  }
  const registerAction=()=>{
    //console.warn("Register")
    navigation.navigate('Register')
  }
  return (
    <ScrollView>
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
          render={({field:{value,onChange,onBlur},fieldState:{error}})=>  
          <>
          <View style={[styles.container, {borderColor: error ? 'red' : '#e8e8e8'}]}>
              <TextInput value={value} onChangeText={onChange} placeholder="Password" style={styles.input} 
              onBlur={onBlur} secureTextEntry/>
            </View>
             {error && (
              <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Please Enter Password'}</Text>
            )}
            </>
            }
          />
      <View style={styles.button_submit}>
        <Text pressable style={styles.text} onPress={handleSubmit(loginAction)}>Login</Text>
      </View>
      <View style={styles.button_forgot}>
        <Text pressable style={styles.textForgot} onPress={forgotPasswordAction}>Forgot Password?</Text>
      </View>
      <View style={styles.button_forgot}>
        <Text pressable style={styles.textForgot} onPress={registerAction}>New Register</Text>
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
export default Login