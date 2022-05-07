import React, { Component }from 'react';
import { View, StyleSheet ,Button,TextInput,Text} from 'react-native';
import { DataTable } from 'react-native-paper';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Moment from 'moment';
import axios from "axios";
export default class Slot extends Component {
    constructor(props) {
        super(props);
        this.state = {
          search: '',
          date: '',
          slots:[]
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
            const response = await fetch(`http://192.168.1.112:2000/slot/get-slot${query}`);
            const json = await response.json();
            //console.log(json.slots)
            if(json.slots){                
                this.setState({ slots: json.slots });
            }else{
                this.setState({ slots: [] },()=>{});  
            }
            
        };

       onChangeCal = (event, selectedDate) => {
        console.log(selectedDate)
        const file = {
          "slot_id": this.state.item._id,
          "service_id": this.state.item.service_id,
          "service_name": this.state.item.service_name,
          "appointment_date":selectedDate,
        }

        axios.post('http://192.168.1.112:2000/appointment/add-appointment', file)
        .then(res => {
          alert("Appointment Added Succefully!!");
         
        }
        ).catch(error => console.log(error)); 
       
      };

      bookApp = (item) => {
        this.setState({item:item});
        DateTimePickerAndroid.open({
          value: new Date(Date.now()),
          onChange:this.onChangeCal,
          //mode: currentMode,
          is24Hour: true
        }) 
        }

        onChange = (text) => {
            this.setState({ search: text });
            this.setState({ page: 1 }, () => {
                this.fetchData();
              });
          };
 render() {
  return (
    <View style={styles.container}>
        <View style={styles.button_submit}>
        <Text pressable style={styles.button_text} onPress={() => {this.props.navigation.navigate('Appointment')}}>Appointment Status</Text>
      </View>
       <View  style={styles.text}>
       <TextInput  
            id="standard-basic"
            type="search"
            autoComplete="off"
            name="search"
            value={this.state.search}
            onChangeText={(text) => this.onChange(text)}
            placeholder="Search by Service name"
            required/>
          </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Service</DataTable.Title>
          <DataTable.Title>From</DataTable.Title>
          <DataTable.Title>TO</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>
        {this.state.slots.map((row) => (
        <DataTable.Row  key={row._id}>
          <DataTable.Cell> {row.service_name}</DataTable.Cell>
          <DataTable.Cell>{Moment(row.from).format('DD-MM-YYYY')}</DataTable.Cell>
          <DataTable.Cell>{Moment(row.to).format('DD-MM-YYYY')}</DataTable.Cell>
          <DataTable.Cell>   <Button onPress={(e) => this.bookApp(row)} title="Book"  /></DataTable.Cell>
        </DataTable.Row>
        ))
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