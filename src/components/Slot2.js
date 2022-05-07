import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableHead, TableWrapper, Row, Cell } from 'react-native-table-component';

export default class Slot2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Services', 'Form', 'To', ''],
      tableData: [
        ['1', '2', '3', '4']
      ],
      tbData:[],
      slots:[]
    }
  }

  componentDidMount = () => {
    // let token = localStorage.getItem('token');
       let token = '123';
       this.fetchData();
    
   }

   fetchData = async () => {
     //let data = '?';
     const response = await fetch(`http://192.168.1.112:2000/slot/get-slot`);
     const json = await response.json(); 
     //console.log(json.slots);
     this.setState({tbData:[json.slots.service_name, json.slots.from, json.slots.to, '']});
     this.setState({ slots: json.slots });
     console.log(this.state.slots);
     //console.log(this.state.tbData);
   };

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Book</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Table borderStyle={{borderColor: 'transparent'}}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
            {
            state.slots.map((rowData, index) => (
                <TableWrapper>
                  {console.log(rowData)}
                </TableWrapper>
                ))    
            }
        </Table>
        <View>
            <Text>Next Line</Text>
        </View>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            state.tableData.map((rowData, index) => (
               
              <TableWrapper key={index} style={styles.row}>
                { 
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});