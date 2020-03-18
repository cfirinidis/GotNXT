import React, { Component }  from 'react';
import{
  StyleSheet,
  Text,
  Alert,
  View,
  Button,
  TextInput,
  FlatList,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
  Modal,
  Image,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 
import Setup from './Setup';
import PopUp from './PopUp';
import ModalShoot from './Modal';
import StartFunction from './function';
import SelectMultiple from 'react-native-select-multiple';

export default class ListButton extends React.Component { 
    constructor(props) {
       super(props);
       this.state = {
         masterList : {},
         courtArr: [],
         completeList : [],
           modalVisible: false,
           modalPrefVisible: false,
           toRemove: [],
           SampleArray: [],
           prefCourt: [],
           prefPos: '',
           testList: [],
           title: '',
           position: 0,
           playerCount: 0,
       };
     }



printListButton=()=>{
  console.log("PRINT ")
}


 checkDuplicate=(name, compList)=>{
  console.log("checkDuplicate")
    if (name in compList){
      Alert.alert("Name Already Exists ")
      return false
    }
    return true
}

AddItemsToArray=(compList, name, SampleArray)=>{
 
    let san = name.replace(/\s/g, '').toLowerCase()
     console.log("AddItemsToArray", san, name, SampleArray)
    if (this.checkDuplicate(san, compList)){
      if (name != 0 && name.replace(/\s/g, '').length != 0 ){
        SampleArray.push({player: name, replacement: false});
      }
      else{
        Alert.alert("Please Enter A Name")
      }
      compList[name.replace(/\s/g, '').toLowerCase()]= 1
      this.setState({name:''})
      this.setState({SampleArray: SampleArray})
      // this.setState({totalPlayers: this.props.totalPlayers + 1})
  }//good
}


render(){

  let pending = Object.values([this.props.SampleArray]).map(function(vals) {
      var t= {} ;
      for (val in vals){
          if(vals[val] != false && vals[val] != true){
              t["key"] = vals[val]; 
        }}
      return t
  });

console.log("NEXT", this.state.SampleArray)

return (
  
<View>

 <Text style={{fontSize:40, marginBottom: 50}}> Names </Text>
    <TouchableOpacity  onPress={this.props.GoToListsMethod} style={styles.list} >
        <Text style={{color:'#ff8c1d', fontSize:32}}>  List  </Text>
    </TouchableOpacity> 

  

      <TouchableOpacity onPress={this.clearListMethod} style={styles.clearList} >
        <Text style={{color:'gray', fontSize:20}}> CLEAR NAMES </Text>
      </TouchableOpacity>

    <View>
      <FlatList
        data={pending}
        style={styles.sampleArrayStye}
        renderItem={({item}) => <Text style={{color:'#e1a8ff', fontSize:24, alignItems:'center'}}>{item.key}</Text>}/>
    </View>  


  
    <TouchableOpacity  onPress={this.props.AddMasterMethod} style={styles.doneAdding} >
        < Text style={{color:'white', fontSize:20}}> DONE ADDING </Text>
    </TouchableOpacity>








</View>

);}}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#e8eae7',
    padding: "2%",
  },

  sampleArrayStye: {
    width:150,
    alignSelf: 'stretch',
    backgroundColor: '#fffaf4',
    fontSize: 30,
    borderColor: 'red',
    borderWidth: 1,
    textAlign:'right',
    bottom: 40,
    flex: 1,
    flexDirection: 'row',
  },
  clearList: {
    backgroundColor:'white', 
    color:'black', 
    width:150, 
    fontSize:20, 
    bottom:40
  },
  modalButton:{
    width: 120,
    height: 60,
    left: '50%',
    backgroundColor: '#388fe7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalStyle:{
    marginBottom: 120 ,
    marginTop: 20,
    backgroundColor:'blue',
  },
  modalText:{
    fontSize: 22,
    color:'white', 
  },
  list:{
        position:'absolute',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
  },

  teamStyleA: {
    // position:'relative',
    backgroundColor: 'white',
    borderWidth:3,
    width: "45%",
  },
    teamStyleB: {
    position:'absolute',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderWidth:3,
    width: "45%",
  },

  teamAWonStyle:{
    // flexDirection: 'row',
    // flex:1,
    // position:'relative',
    // alignSelf:'flex-end',
    // marginTop: 5,
    backgroundColor:'gray',
    
    width:'45%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
  },
   teamBWonStyle:{
    position:'relative',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width:'45%',
    bottom: 50,
    backgroundColor:'red',
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    // alignSelf: '',
    fontSize:22,
    color: "red",
    marginBottom: 25,
    width: '80%',
    borderWidth: 2,
    borderColor: 'black',
    height: 65,
    backgroundColor: 'white',
    textAlign: "center", 
  },
  doneAdding: {
    backgroundColor:'grey',  
    bottom:40, 
    width:150, 
  },
    addButtonText: {
    color: 'white',
    fontSize: 18,
    justifyContent: 'center',
     alignItems: 'center',
    flexDirection: 'row-reverse',

  },

   gameBottonText: {
    fontSize:30,
    color:'green',
        alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',


  },
   addButton: {
    // zIndex: 1,
     position: 'absolute',
    backgroundColor: '#fcbf07',
    flexDirection:'row',
    width: '20%',
    height: 65,
    borderWidth: 2,
    alignSelf:'flex-end',
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
     position: 'absolute',
  },
  addStart: {
    position: 'absolute',
    backgroundColor: '#64e723',
    marginTop: 80,
    right: '10%',
    width: 100,
    height: 100,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
 
}); 

 
