import React, { Component }  from 'react';
import{
  StyleSheet,
  Text,
  Alert,
  View,
  Button,
  TextInput,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 

export default class StartFunction extends React.Component { 
 constructor(props) {
       super(props);
       this.state = {
         hitShot: [],
         diff: 0,
         title: '',
         command: '',
         selectedItems: [],
         modalVisible: false,
         scrolledMultiPickerVisible: false,
        scrolledMultiPickerSelectedItems: [],
         Name: '',
         shooters: [],
         totalPlayers:10,
         SampleArray : [],
         masterList : [[{player: "Lebron", replacement: false}, {player:"AntDavis", replacement: false}], [{player:"Kyrie", replacement: false},
          {player:"Durant", replacement: false}], [{player:"Majerle", replacement: false}],[{player:"Kawhi", replacement: false},
           {player:"PG13", replacement: false}], [{player:'Larry', replacement: false}, {player:'Parish', replacement: false}], 
           [{player:'CONZ', replacement: false}] ],
      
         current: 0,
         answer: 'none'
       };
     }




  
      printF=()=>{
        console.log("PRINT in aother class")
    }
    



  async StartGame(){

     // this.func.printF();
      let teamcap = (this.state.cap/2);
      let delArray = [];
      let crash = 0;
      let names = 0;
      // console.log("START GAME TOP : WHAT GAME # - ", this.state.current)
      // console.log('TeamAnum :'  ,this.state.Arena, "NBUMM: ",this.state.Arena['teamANum'], "NUM______", this.state.Arena['Num']  )
      
      AsyncAlert = (title, msg) => new Promise((resolve, reject) => {  
        Alert.alert(
                    title,
                    msg,
                    [ {text: "YES", onPress: () => { resolve('YES') }},
                      {text: "NO", onPress: () => { resolve('NO') }}  ],
                    { cancelable: false },
                    );
      });

      // let start = await AsyncAlert("Pick teams from List", '')
      // if (start =="YES"){
      //   console.log(this.state.masterList)
      //   for(i in this.state.masterList){
      //     console.log("i", i, this.state.masterList[i].length)
      //     if (this.state.masterList[i].length > 1){
      //       for (j in this.state.masterList[i]){
      //         console.log("FOR j ", this.state.masterList[i][j]['player'])
      //         this.state.shooters.push(this.state.masterList[i][j]['player'])

      //       }
      //     }
      //     else{
      //       console.log("single player", this.state.masterList[i][0])
      //     this.state.shooters.push(this.state.masterList[i][0]['player'])
      //   }
      //   }
      //   // console.log("SHooter", this.state.shooters)
      //   this.setState({modalVisible: true});
      //   console.log(this.state.theyHit)

      // }

      // else{
        while(crash < this.state.masterList.length){//add full contingency
              if (this.state.current >= this.state.Arena.length){
                   Alert.alert("GAMES FULL!")
                   break
              }
            // console.log("TOP : ", this.state.Arena[this.state.current]["teamANum"], this.state.masterList[names].length )
              if(this.state.masterList[names].length +  this.state.Arena[this.state.current]["teamANum"]  <= teamcap){
                var set = this.extractFromList(names);
                this.state.Arena[this.state.current]["teamANum"] += this.state.masterList[names].length;
                delArray += [names];
                this.state.Arena[this.state.current]["teamA"].push(set);
                names++;
                if (names == this.state.masterList.length){
                    names = 0
                    delArray = this.removeFromList(delArray)
                }}
              else if(this.state.masterList[names].length + this.state.Arena[this.state.current]["teamBNum"] <=teamcap){
                var set = this.extractFromList(names);
                this.state.Arena[this.state.current]["teamBNum"] += this.state.masterList[names].length;
                delArray += [names]
                this.state.Arena[this.state.current]["teamB"].push(set)
                names++
                if (names == this.state.masterList.length){
                  names = 0
                  delArray = this.removeFromList(delArray)
                }}
              else{
                  if( this.state.Arena[this.state.current]["teamANum"] + this.state.Arena[this.state.current]["teamBNum"] != this.state.cap){
                  // If the number is EQUAL then the phrasing should be =choose num to of team a 
                  let s = '';
                  for (i in this.state.masterList[names]){
                    s += this.state.masterList[names][i]['player'] + '  '  
                    // console.log(" ADDED to Shooters list : ",this.state.masterList[names][i]['player'])
                    this.state.shooters.push(this.state.masterList[names][i]['player'])
                  } 

                  this.state.diff = this.state.cap - ( this.state.Arena[this.state.current]["teamANum"]  + 
                                    this.state.Arena[this.state.current]["teamBNum"] );
                  console.log("THis is the DIFF AND STUFF", this.state.diff, this.state.shooters.length)
                  if ( this.state.diff == this.state.shooters.length ){
                    this.state.command = " Shoot for " + ((this.state.cap/2) - this.state.Arena[this.state.current]["teamANum"] + 
                      "To Play On TEAM-A")
                    this.state.diff = ((this.state.cap/2) - this.state.Arena[this.state.current]["teamANum"])
                  }
                  else{
                  this.state.command = "Shoot for " + this.state.diff
                  }

                  let response = await AsyncAlert(this.state.command, s);
                  // console.log("RESPONSE : ", response)
                  if (response == "YES"){
                    delArray += [names]
                    delArray = this.removeFromList(delArray)
                    this.setModalVisible(!this.state.modalVisible,  "Select Player(s) That Hit");
                    break
                  } 
                  else{this.setState({shooters: []});}
                 
               names++; }}
            // GAME READY
        if( this.state.Arena[this.state.current]["teamANum"]  == teamcap && this.state.Arena[this.state.current]["teamBNum"] == teamcap){
          this.setState({current: this.state.current+1})
          this.removeFromList(delArray)
          // console.log(" TEAMS FULL: on to - ", this.state.current)
          break;
          }//if full
          crash++;          

          }//end of while
        //} select from list
        // console.log("SET THE ARENA AND LIST")
        this.setState({masterList: this.state.masterList});
        this.setState({Arena:this.state.Arena});
    
  }




}


// <Modal 
//     visible={this.state.modal2Visible}>
//   <View>
//     <Text style={{fontSize:30}}>{this.state.title} </Text>
//     <Button onPress={this.print} title="Print"> u</Button>
//     <TextInput 
//             placeholderTextColor= "red" 
//             underlineColorAndroid="gray"
//             placeholder="Enter position on list"
//             onChangeText={position => this.setState({ position: position }) }
//             style={styles.inputs}
//             keyboardType={'numeric'}  
//     />

//     <TextInput 
//               placeholderTextColor= "red" 
//               underlineColorAndroid="gray"
//               placeholder="Enter name"
//               onChangeText={position => this.setState({ position: position }) }
//               style={styles.inputs}
//               keyboardType={'numeric'}  
//     />
//     <TouchableHighlight   onPress={() => {
//       this.setModal2Visible(!this.state.modal2Visible, "something");}}>
//       <Text style={{fontSize:28, backgroundColor:"red"}}>DONE</Text>
//     </TouchableHighlight>
//   </View>
// </Modal>
  
// <TouchableHighlight   onPress={() => {
//   this.setModal2Visible(!this.state.modal2Visible, "something");}}>
//   <Text style={styles.addButton}> + Add </Text>
// </TouchableHighlight>