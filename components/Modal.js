import React, { Component } from 'react'
import { View, Button, Modal, TouchableHighlight, Text, StyleSheet} from 'react-native'
import SelectMultiple from 'react-native-select-multiple'

 export default class ModalShoot extends React.Component { 

 render(){
  // const { visible } = this.props;
  // const { items } = this.props;
  return(
    null)
  ;}}
//     items &&
//     <Modal visible={this.props.modalVisible}>
//       <View style={styles.modalStyle}>
//         <Text style={{fontSize:30, backgroundColor:'gray', color:'white'}}>this.props.title </Text>
//           <SelectMultiple
//           maxSelect= {this.props.diff}
//           items={this.props.shooters}
//           style={styles.modalStyle}
//           electedItems={ this.props.hitShot }
//           onSelectionsChange={this.props.onSelectionsMethod} />
//         <TouchableHighlight   onPress={() => 
//             this.props.setModalVisibleMethod.then(this.props.AddMasterAfterShootoutMethod)}
//              style={styles.modalButton}>
//             <Text style={styles.modalText}>Done</Text>
//         </TouchableHighlight>

//         </View>
//       </Modal>
  
//   );}
// }

  // AddMasterAfterShootout=()=>{
  //     let hit= [];
  //     let rest = [];
  //     let hitList = [];
  //     for  (i in this.state.hitShot){
  //           hit.push({player: this.state.hitShot[i]["label"], replacement: false});
  //           hitList.push(this.state.hitShot[i]["label"]);
  //   }




  //   for (i in this.state.shooters){
  //     if (!hitList.includes(this.state.shooters[i]) ){
  //     rest.push({player: this.state.shooters[i], replacement: false});
  //     }
  //   }
  //   this.state.masterList.splice(this.state.restNum, 0, [{pref:0}, rest])
  //   if (hit.length != 0){
  //     this.state.masterList.unshift([{pref:0}, hit])
  //   }
  //   this.setState({hitShot: [] });
  //   this.setState({restNum: 0 });
  //   this.state.shooters = [];
  //   // this.state.modalVisible = false;
  //   this.setState({shooters: this.state.shooters });  
  //   this.setState({masterList: this.state.masterList});

  //   if (Platform.OS == 'android'){
  //   this.StartGame();
  //     }
  //   else{
  //      setTimeout(()=>{
  //       this.StartGame();
  //   }, 100);

  //   }
    
  // }//good




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
  },
  modalText:{
    fontSize: 22,
    color:'white', 
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
  },

  list: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '35%',
    alignSelf: 'flex-end',
    marginTop: 150,
    borderWidth: 2,
    borderColor: '#ff8c1d',
    flexDirection: 'row-reverse',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
}); 

