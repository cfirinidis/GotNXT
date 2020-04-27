import React from 'react';
import{
  StyleSheet,
  Text,
  Alert,
  View,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const NameBox=({onPress, AddMasterMethod, clearListMethod, value, data, child})=>{ 
  return(
    <View style={{bottom:65}}>

      <TouchableOpacity onPress={clearListMethod} style={styles.clearList} >
        <Text style={styles.textStyle}> CLEAR NAMES </Text>
      </TouchableOpacity>

      <View>
        <FlatList
          data={data}
          style={styles.sampleArrayStyle}
          renderItem={ ({item}) => <Text style={{color:'#e1a8ff', fontSize:24, alignItems:'center'}} >
            {item.key}
        </Text>}/>
      </View>  

      <TouchableOpacity  onPress={AddMasterMethod} style={styles.doneAdding} >
        < Text style={{color:'white', fontSize:20}}> DONE ADDING </Text>
      </TouchableOpacity>
  </View>
)}


const styles = StyleSheet.create({
  clearList: {
    position:'relative',
    backgroundColor:'white', 
    color:'black', 
    width:"50%",
    height:32, 
    fontSize:20, 
    bottom:30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle:{
    color:'gray', 
    fontSize:20
  },
    sampleArrayStyle: {
    width:"50%",
    alignSelf: 'stretch',
    backgroundColor: '#fffaf4',
    fontSize: 30,
    borderColor: 'red',
    borderWidth: 1,
    textAlign:'right',
    bottom: 30,
    // flex: 1,
    flexDirection: 'row',
  },
    doneAdding: {
    backgroundColor:'grey',  
    bottom:30,
    height: 32, 
    width: "50%",
    justifyContent: 'center',
    alignItems: 'center', 
  }

}); 


export default NameBox;
