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

  
      printF=()=>{
        console.log("PRINT in aother class")
    }
    



  async StartGame(){

      let teamcap = (this.state.cap/2);
      let delArray = [];
      let crash = 0;
      let names = 0;
      let numA = 0;
      let numB = 0;
      // console.log('TeamAnum :'  ,this.state.Arena, "NBUMM: ",this.state.Arena['teamANum'], "NUM______", this.state.Arena['Num']  )
      this.state.Arena['teamANum'] = "LAME";
      
      AsyncAlert = (title, msg) => new Promise((resolve, reject) => {  
        Alert.alert(
                    title,
                    msg,
                    [ {text: "YES", onPress: () => { resolve('YES') }},
                      {text: "NO", onPress: () => { resolve('NO') }}  ],
                    { cancelable: false },
                    );
      });

        DsyncAlert = (title, msg) => new Promise((resolve, reject) => {  
        Alert.alert(
                    title,
                    msg,
                    


                    [ {text: "YES", onPress: () => { resolve('YES') }},
                      {text: "NO", onPress: () => { resolve('NO') }}  ],
                    { cancelable: false },
                    );
      });
    
      while(crash < this.state.masterList.length){//add full contingency
            if(this.state.masterList[names].length + numA <= teamcap){
              var set= []; 
              for (name in this.state.masterList[names]){ 
                set.push(this.state.masterList[names][name])
                numA++;
                this.state.Arena[this.state.current]["teamANum"]++; 
                console.log("Looking FOR NUMS",this.state.Arena[this.state.current]["teamANum"] ) 
                
                }
                delArray += [names];
                this.state.Arena[this.state.current]["teamA"].push(set);
                names++;
              
                if (names == this.state.masterList.length){
                  names = 0
                  for (i in delArray){
                    this.state.masterList.splice(delArray[i]-i, 1);
                  }
                  this.state.masterList = this.state.masterList;
                  delArray = []
              }}
            else if(this.state.masterList[names].length + numB <=teamcap){
              var set = [];
              for (name in this.state.masterList[names]){
                set.push(this.state.masterList[names][name])
                numB++;
                this.state.Arena[this.state.current]["teamBNum"]++;
              } 
              delArray += [names]
              this.state.Arena[this.state.current]["teamB"].push(set)
              names++
              if (names == this.state.masterList.length){
                names = 0
                for (i in delArray){
                  this.state.masterList.splice(delArray[i]-i, 1)
                }
              delArray = []
              }}
            else{
                if(numA + numB != this.state.cap){
                  // console.log("Totals: ", numA, numB, teamcap)
                let s = '';
                for (i in this.state.masterList[names]){
                  s += this.state.masterList[names][i]['player'] + '  '  } 
                let diff = this.state.cap - (numA + numB) ;
                let command = "Shoot for " + diff
                let response = await AsyncAlert(command, s);
                console.log("RESPONSE : ", response)
                if (response == "YES"){
                  console.log('Something has to happen')
                  let theyHit = await DsyncAlert("They will Shoot", 'players')

                } 
               
             names++; }}
          // GAME READY
      if( numA == teamcap && numB == teamcap){
        this.setState({current: this.state.current+1})
        console.log("teamNum : ", numA)
        this.setState({teamANum: numA})
        this.setState({teamANum: numA})
                this.setState({teamANum: numA})
        this.setState({teamANum: numA})
        for (i in delArray){
            this.state.masterList.splice(delArray[i]-i, 1)
          }
          console.log(" TEAMS FULL")
          break;
        }//if full
        crash++;

        }//end of while
        this.setState({masterList: this.state.masterList});
        this.setState({Arena:this.state.Arena});

  }


}