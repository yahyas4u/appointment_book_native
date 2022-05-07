import React, { Component }from 'react';
import { View, StyleSheet ,Text, Button,TextInput } from 'react-native';
import { DataTable } from 'react-native-paper';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

export default class Appointment extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          search: '',
          date: '',
          appointments:[]
        }
      }
    
      componentDidMount = () => {
        // let token = localStorage.getItem('token');
           let token = '123';
           this.fetchData();
        
       }
     
       fetchData = async () => {
            this.setState({ loading: true });
            let query = '?';
           
            if (this.state.search) {
                query = `${query}&search=${this.state.search}`;
            }
           // alert(query)
           const response = await fetch(`http://192.168.1.112:2000/appointment/get-appointment${query}`);
            const json = await response.json();
            //console.log(json.slots)
            if(json.appointments){                
                this.setState({ appointments: json.appointments });
            }else{
                this.setState({ appointments: [] },()=>{});  
            }
            
        }
    
 render() {
  return (
    <View style={styles.container}>
      <View style={styles.button_submit}>
        <Text pressable style={styles.button_text} onPress={() => {this.props.navigation.navigate('Slot')}}>Add Slot</Text>
      </View>
    
     
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Service Name</DataTable.Title>
          <DataTable.Title>Appointment Date</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
        </DataTable.Header>
        { (this.state.appointments.map.length>0) ? this.state.appointments.map((row) => (
          
        <DataTable.Row  key={row._id}>
          <DataTable.Cell> {row.service_name}</DataTable.Cell>
          <DataTable.Cell>{Moment(row.appointment_date).format('DD-MM-YYYY')}</DataTable.Cell>
          <DataTable.Cell>{(row.status===true)? "Approved" : "Pending"}</DataTable.Cell>
        </DataTable.Row>
        )) :
        <Text>No Appointments</Text>
        }
      </DataTable>
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 1,
    borderColor: "grey",
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  text:{
    fontWeight: 'bold',
    color: 'white',
    backgroundColor:'white'
  },
  button_submit:{
    backgroundColor: "blue",
    width:'100%',
    padding: 15,
    marginVertical:5,
    alignItems:'center',
    borderRadius:5,
  },
  button_text:{
    fontWeight: 'bold',
    color: 'white',
  },
});