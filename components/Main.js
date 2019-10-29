
import React from 'react';
import{
  StyleSheet,
  Text,
  Alert,
  View,
  Button,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 
import Setup from './Setup'
import PopUp from './PopUp'
import Dialog from "react-native-dialog";

export default class MainActivity extends React.Component { 

  constructor(props) {
       super(props);
       this.state = {
         plist: [],
         ps: [],
         Name: '',
         totalPlayers:10,
         SampleArray : [],
         masterList : [[{player: "Lebron", replacement: false}, {player:"AntDavis", replacement: false}], [{player:"Kyrie", replacement: false},
          {player:"Durant", replacement: false}], [{player:"Majerle", replacement: false}],[{player:"Kawhi", replacement: false},
           {player:"PG13", replacement: false}], [{player:'Larry', replacement: false}, {player:'Parish', replacement: false}], 
           [{player:'CONZ', replacement: false}]],
         cap: this.props.navigation.getParam("cap", "blank"),
         Arena: this.props.navigation.getParam("arena", "blank"),
         courtsNum: this.props.navigation.getParam("courtsNum", "blank"),
         current: 0
       };
     }
 
  AddItemsToArray=()=>{
      if (this.state.Name.length != 0 ){
      this.state.SampleArray.push({player: this.state.Name, replacement: false});
    }
    else{
      Alert.alert("Please Enter A Name")
    }
    this.setState({Name:''})
    this.setState({SampleArray: this.state.SampleArray})
    this.setState({totalPlayers: this.state.totalPlayers + 1})
    console.log(this.state.SampleArray, this.state.SampleArray.length, "total", this.state.totalPlayers);
  }//good

  AddMaster=()=>{
    console.log("ADD TO MASTer",this.state.SampleArray);
    this.state.masterList.push(this.state.SampleArray)
    this.setState({SampleArray : []})  
  }//good

  ShowAddress=()=>{
    console.log(this.state.masterList)
  }

   GoToLists=()=>{
    this.props.navigation.navigate("Show", {arena: this.state.Arena, list: this.state.masterList});
  }

  POP=()=>{
    console.log("POP")
    this.props.navigation.navigate("Test");
  }

  endGame=()=>{
    console.log("EndGame: ", this.state.Arena)
    // console.log("EndGame MASTER: ", this.state.masterList)
    var ml = this.state.masterList;
    var arena = this.state.Arena
    var courtNum = 1
    var loser = "teamB"
    var temp = []
    for(i in arena[courtNum-1][loser]){
      //console.log("FOR LOPP : ", arena[courtNum-1][loser][i])
      temp.push(arena[courtNum-1][loser][i])
    }   
    delete arena[courtNum-1][loser][0]
    ml.push(temp)
    this.setState({masterList:ml});
    console.log("Back on List", arena)
    this.setState({current: courtNum-1})


  }

  StartGame=()=>{

      var teamcap = (this.state.cap/2);
      var tempList = this.state.masterList;
      console.log("TempLength", tempList.length)
      var delArray = [];
      var teamNumA = 0;
      var teamNumB = 0;
      var names = 0;
      console.log("START GAME ", this.state.current)
        // NEED TO ADD - MAKE THEM SHOOT == if(tempList[names].length + teamNumA >= teamcap && TeamNUmA < teamsCap)
      while(this.state.cap - (teamNumA + teamNumB) <= tempList.length){//add full contingency
            console.log("LEAK")
            

            if(tempList[names].length + teamNumA <= teamcap){
              var set= []; 
              for (name in tempList[names]){ 
                //console.log("Adding this to Team - A: ", tempList[names][name])
                set.push(tempList[names][name])
                teamNumA++;
                }
                delArray += [names];
                this.state.Arena[this.state.current]["teamA"].push(set);
                names++;
              
                if (names == tempList.length){
                  names = 0
                  for (i in delArray){
                    this.state.masterList.splice(delArray[i]-i, 1)
                  }
                  tempList = this.state.masterList;
                  delArray = []
              }}
            else if(tempList[names].length + teamNumB <= teamcap){
              var set = [];
              for (name in tempList[names]){
              //console.log("(B) - Adding this to Team - B: ", tempList[names][name])
                set.push(tempList[names][name])
                teamNumB++;
              } 
              this.state.Arena[this.state.current]["teamB"].push(set)
             delArray += [names]
             names++
             
            if (names == tempList.length){
              names = 0
              for (i in delArray){
              this.state.masterList.splice(delArray[i]-i, 1)
              }
            tempList = this.state.masterList;
            delArray = []
            }}
        
          // GAME READY
      if(teamNumB == teamcap && teamNumA == teamcap){
        this.setState({current: this.state.current++})
          //console.log("GAME READY: ")
        for (i in delArray){
            //console.log(delArray[i],  i)
            this.state.masterList.splice(delArray[i]-i, 1)
          }
          //console.log(this.state.masterList)
          break;
        }//if full
        // console.log(this.state.Arena, 'delete these: ', delArray)
        }//end of while
        console.log("Out of while: ", this.state.Arena)
        this.setState({masterList: this.state.masterList});
        this.setState({Arena:this.state.Arena});

        // console.log("Out of while: ", this.state.current)
        // console.log("MASTER ", this.state.masterList)
  }


 render() {
   return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding" enabled>
      <View>

          <TextInput
              placeholder="NAME"
              onChangeText={(Name) => this.setState({ Name}) }
              value={this.state.Name}
              style={styles.textInput} 
              placeholderTextColor='gray'   
          />
 
    <TouchableOpacity  onPress={this.AddItemsToArray.bind(this)} style={styles.addButton} >
    <Text style={styles.addButtonText}>Add Name(s)</Text>
    </TouchableOpacity>
          

    <TouchableOpacity  onPress={this.AddMaster.bind(this)} style={styles.addButton} >
    <Text style={styles.addButtonText}> +  LIST </Text>
    </TouchableOpacity>

         <Button title="See List" onPress={this.ShowAddress}
            style={styles.btn}
          />

          <Text>"FILL THE COURTS "</Text>
         <Button title="Start" onPress={this.StartGame}
            style={styles.btn}
          />

          <Text> Go to List Page </Text>

          <Button color="gray" 
           title="Go To Lists" onPress={this.GoToLists}
           />

           <Text> End Game </Text>

          <Button color="red" 
           title="End Game" onPress={this.endGame}
           />


          <Button color="red" 
           title="POP" onPress={this.POP}
           />

      </View>
      </KeyboardAvoidingView>
   );
 }
}
 

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'pink',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 40,
    paddingRight: 40,
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    fontSize:20,
    color: "red",
    marginBottom: 25,
    backgroundColor: 'yellow',
  },
    addButtonText: {
    color: '#fff',
    fontSize: 17,
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: 'green',
    padding:2,
    marginBottom:50,
    alignItems: 'center',
  

  },
   addButton: {
    // position : 'absolute',
    zIndex: 11,
    // right: 20,
    // bottom: 90,
    backgroundColor: '#E91E63',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,

  },
    item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  SignUp: {
    //fontSize: 18,
    marginTop: 60,
    //color: '#fff',
    //fontWeight: 'bold',
    },
}); 

