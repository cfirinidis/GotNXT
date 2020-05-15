import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 
import MultiSelect from 'react-native-multiple-select';
import Setup from './Setup'
 
export default class PopUp extends Component {
  state = {
    dialogVisible: false
  };
 
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
 
  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };
 
  render() {
    return (
      <View>
        <TouchableOpacity
      
         onPress={this.showDialog}>
          <Text 
        style={ { fontSize:38 }}   >Show Dialog</Text>
        </TouchableOpacity>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Account delete</Dialog.Title>
          <Dialog.Description>

            Do you want to delete this account? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Delete" onPress={this.handleDelete} />
        </Dialog.Container>
      </View>
    );
  }
}

//startgame before i messed with it.

  //  async StartGame(){
 
  //     let delArray = [];
  //     let names = 0;
  //     AsyncAlert = (title, msg) => new Promise((resolve, reject) => {  
  //       Alert.alert(
  //                   title,
  //                   msg,
  //                   [ {text: "YES", onPress: () => { resolve('YES') }},
  //                     {text: "NO", onPress: () => { resolve('NO') }}  ],
  //                   { cancelable: false},
  //                   );
  //     });
  //         // console.log("ARENA TOPin startgame: ", this.state.Arena)
  //       for(let run = 0; run < this.state.masterList.length; run++){//add full contingency
  //               while(this.state.current < this.state.Arena.length && this.state.Arena[this.state.current]["teamANum"]  + this.state.Arena[this.state.current]["teamBNum"] == 2*this.state.cap){
  //                 // console.log(this.state.current)
  //                 this.state.current++;
  //                 }
  //                 if (this.state.current >= this.state.Arena.length){
  //                   this.setState({ current: this.state.current})
  //                  Alert.alert("GAMES FULL!")
  //                  break
  //               }
  //             if(this.state.current + 1 != this.state.masterList[names][0]['pref'] && this.state.masterList[names][0]['pref'] != 0 ){
  //                 names++;
  //               }
  //             else if(this.state.masterList[names][1].length + this.state.Arena[this.state.current]["teamANum"]  <= this.state.cap
  //               || this.state.masterList[names][1].length + this.state.Arena[this.state.current]["teamBNum"]  <= this.state.cap){
  //               // if(this.state.masterList[names][1].length + this.state.Arena[this.state.current]["teamANum"]  <= this.state.cap)
  //               let team = (this.state.masterList[names][1].length + this.state.Arena[this.state.current]["teamANum"]  <= this.state.cap)? "teamA":"teamB"
  //               let set = this.extractFromList(names);
  //               this.state.Arena[this.state.current][team+"Num"] += this.state.masterList[names][1].length;
  //               delArray += [names];
  //               for (i in set){
  //                 this.state.Arena[this.state.current][team].push([set[i]]);}
  //               names++;
  //               if (names == this.state.masterList.length){
  //                   names = 0
  //                   delArray = this.removeFromList(delArray)
  //               }}
  //               else  if( this.state.Arena[this.state.current]["teamANum"] + this.state.Arena[this.state.current]["teamBNum"] != 2*this.state.cap){
  //                 // console.log(this.state.Arena[this.state.current]["teamANum"] , this.state.Arena[this.state.current]["teamBNum"],  this.state.cap)
  //                 let s = '';
  //                 for (i in this.state.masterList[names][1]){
  //                   s += this.state.masterList[names][1][i]['player'] + '  '  
  //                   this.props.addShooter(this.state.masterList[names][1][i]['player'])
  //                 }

  //                 this.state.diff = (this.state.cap*2) - ( this.state.Arena[this.state.current]["teamANum"]  + 
  //                                   this.state.Arena[this.state.current]["teamBNum"] );
  //                 // console.log("shooter length   ",configureStore.getState().shooterReducer.length)
  //                 if ( this.state.diff >= configureStore.getState().shooterReducer.length ){
  //                   this.state.command = " Shoot for " + ( this.state.cap - this.state.Arena[this.state.current]["teamANum"] + 
  //                     " To Play On TEAM-A")
  //                   this.state.diff = ( this.state.cap - this.state.Arena[this.state.current]["teamANum"])
  //                 }
  //                 else{
  //                 this.state.command = "Shoot for " + this.state.diff
  //                 }
  //               let response = await AsyncAlert(this.state.command, s);
  //               if (response == "YES"){
  //                   delArray += [names]
  //                   this.state.restNum = names - (delArray.length - 1)
  //                   delArray = this.removeFromList(delArray)
  //                   this.setModalVisible( 'modalVisible',true,  "Select Player(s) That Hit");
  //                   break
  //               } 
  //                 else{this.setState({shooters: []});
  //               delArray = this.removeFromList(delArray)
  //             }
  //              names++;
  //              // console.log("names vs run: ",names, run)

  //               }
  //           // GAME READY
  //       if( this.state.Arena[this.state.current]["teamANum"] + this.state.Arena[this.state.current]["teamBNum"] == 2*this.state.cap){
  //         this.setState({ current: this.state.current+1 })
  //         this.removeFromList( delArray )
  //         break;
 
  //        }//if full        
  //         }//end of while
              
  //       this.setState({masterList: this.state.masterList});
  //       this.setState({Arena:this.state.Arena});
  //       // console.log("ARENA BOTTOM in startgame: ", this.state.Arena)
  //       this.saveData();
  // }

