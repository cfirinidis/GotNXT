import React, { Component }  from 'react';
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
import Setup from './Setup';
import PopUp from './PopUp';
import Dialog from "react-native-dialog";
import Modal from "react-native-modal";
import CustomPromptComponent from './Modal';


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
           [{player:'CONZ', replacement: false}],[{player: "Lebron", replacement: false}, {player:"AntDavis", replacement: false}], [{player:"Kyrie", replacement: false},
          {player:"Durant", replacement: false}], [{player:"Majerle", replacement: false}],[{player:"Kawhi", replacement: false},
           {player:"PG13", replacement: false}], [{player:'Larry', replacement: false}, {player:'Parish', replacement: false}], 
           [{player:'CONZ', replacement: false}],[{player: "Lebron", replacement: false}, {player:"AntDavis", replacement: false}], [{player:"Kyrie", replacement: false},
          {player:"Durant", replacement: false}], [{player:"Majerle", replacement: false}],[{player:"Kawhi", replacement: false},
           {player:"PG13", replacement: false}], [{player:'Larry', replacement: false}, {player:'Parish', replacement: false}], 
           [{player:'CONZ', replacement: false}],[{player: "Lebron", replacement: false}, {player:"AntDavis", replacement: false}], [{player:"Kyrie", replacement: false},
          {player:"Durant", replacement: false}], [{player:"Majerle", replacement: false}],[{player:"Kawhi", replacement: false},
           {player:"PG13", replacement: false}], [{player:'Larry', replacement: false}, {player:'Parish', replacement: false}], 
           [{player:'CONZ', replacement: false}] 

           ],
         cap: this.props.navigation.getParam("cap", "blank"),
         Arena: this.props.navigation.getParam("arena", "blank"),
         courtsNum: this.props.navigation.getParam("courtsNum", "blank"),
         current: 0,
         isModalVisible: false,
         conz: "CONZ",
         answer: 'none'
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
    console.log(this.state.cap)
    console.log(this.state.current)
    console.log(this.state.Arena)
    this.setState({current: this.state.current+1})
  }

   GoToLists=()=>{
    this.props.navigation.navigate("Show", {arena: this.state.Arena, list: this.state.masterList});
  }

  POP=()=>{
    console.log("POP")
    this.props.navigation.navigate("Test");
  }

    MOD=()=>{
    console.log("MOD")
    this.props.navigation.navigate("Modal");
  }

  endGame=()=>{
    console.log("EndGame: ", this.state.Arena)
    var courtNum = 1
    var loser = "teamB"
    var temp = []
    for(i in this.state.Arena[courtNum-1][loser][0]){
      console.log("FOR LOPP : ", this.state.Arena[courtNum-1][loser][0][i])
      temp.push(this.state.Arena[courtNum-1][loser][0][i])
    }   
    
     // arena[courtNum-1][loser][0].splice(0,arena[courtNum-1][loser][0].length)
    this.state.Arena[courtNum-1][loser] = new Array()
    this.state.masterList.push(temp)
    console.log("DELETE: ", this.state.Arena)
    var crash = 0;
    var teamNum = 0;
    var teamcap = (this.state.cap/2);
    var delArray = [];
    var names = 0;
    while(crash < this.state.masterList.length){//add full contingency
          // console.log("CRASH: ", crash, teamNumA, teamNumB, "Names: ", names, tempList[names].length, "max: ", tempList.length)
          if(this.state.masterList[names].length + teamNum <= teamcap){
              var set= []; 
              for (name in this.state.masterList[names]){ 
                console.log("Adding this to Team - Loser: ", this.state.masterList[names][name], this.state.Arena[0][loser])
                set.push(this.state.masterList[names][name])
                teamNum++;
                }
                delArray += [names];
                console.log("SET: ", set, "Team; ", this.state.Arena[0][loser])
                this.state.Arena[0][loser].push(set);
                names++;
              
                if (names == this.state.masterList.length){
                  names = 0
                  for (i in delArray){
                    this.state.masterList.splice(delArray[i]-i, 1);
                  }
                  delArray = []
              }
            }
            names++;
            if(teamNum == teamcap ){
               names = 0
                  for (i in delArray){
                    this.state.masterList.splice(delArray[i]-i, 1);
                  }
                  delArray = []
            }
            crash++;
          }//end of while
        this.setState({masterList: this.state.masterList});
        this.setState({Arena:this.state.Arena});
  }



  async StartGame(){
      console.log("START GAME TOP")
      let teamcap = (this.state.cap/2);
      let tempList = this.state.masterList;
      console.log("TempLength", tempList.length)
      let delArray = [];
      let teamNumA = 0;
      let teamNumB = 0;
      let names = 0;
      let crash = 0;
      console.log("START GAME ", this.state.current)

      AsyncAlert = (title, msg) => new Promise((resolve, reject) => {
  
      Alert.alert(
        title,
        msg,
            [
                 {text: "YES", onPress: () => { resolve('YES') }},
                 {text: "NO", onPress: () => { resolve('NO') }}
            ],
        { cancelable: false },
      );
    });
     
    
      while(crash < this.state.masterList.length-3){//add full contingency
          console.log("CRASH: ", crash, teamNumA, teamNumB, "Names: ", names, tempList[names].length, "max: ", tempList.length)
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
                    this.state.masterList.splice(delArray[i]-i, 1);
                  }
                  tempList = this.state.masterList;
                  delArray = []
              }}
            else if(tempList[names].length + teamNumB <=teamcap){
              var set = [];
              for (name in tempList[names]){
                set.push(tempList[names][name])
                teamNumB++;
              } 
              delArray += [names]
              this.state.Arena[this.state.current]["teamB"].push(set)
              names++
              if (names == tempList.length){
                names = 0
                for (i in delArray){
                  this.state.masterList.splice(delArray[i]-i, 1)
                }
              tempList = this.state.masterList;
              delArray = []
              }}
            else{
                console.log("SET TO TRUE", tempList[names]);
                let s = '';
                for (i in tempList[names]){
                  console.log(tempList[names][i]['player'])
                  s += tempList[names][i]['player'] +'  '
                } 

                let diff = (tempList[names].length + teamNumA) - teamcap
                let command = "Shoot for " + diff

                let response = await AsyncAlert(command, s);
                  console.log(response) 
                if (response == "Yes"){
                  console.log('Something has to happen')
                }
               
          
             names++; }
          // GAME READY
      if( teamNumA == teamcap && teamNumB == teamcap){
        this.setState({current: this.state.current+1})
        for (i in delArray){
            this.state.masterList.splice(delArray[i]-i, 1)
          }
          console.log("Break")
          break;
        }//if full
        // console.log(this.state.Arena, 'delete these: ', delArray)
        crash++;

        }//end of while
        console.log("Out of while: ", this.state.Arena, this.state.current)
        this.setState({masterList: this.state.masterList});
        this.setState({Arena:this.state.Arena});
  }
              
  toggleModal = () => {
    console.log("TOGGLE", this.state.answer)
    this.setState({ isModalVisible: !this.state.isModalVisible })
    for(var i =0; i<3; i++){
      console.log("WHILE: ", i)
    }
    
  };


 render() {
   return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding" enabled>
      <View>
          <TextInput
              placeholder="NAME"
              onChangeText={(Name) => this.setState({ Name}) }
              value={this.state.Name}
              style={styles.textInput} 
              placeholderTextColor='gray' />

    <TouchableOpacity  onPress={this.AddItemsToArray.bind(this)} style={styles.addButton} >
    <Text style={styles.addButtonText}>+ Name(s)</Text>
    </TouchableOpacity>       

    <TouchableOpacity  onPress={this.AddMaster.bind(this)} style={styles.addButton} >
    <Text style={styles.addButtonText}> +  LIST </Text>
    </TouchableOpacity>

    <TouchableOpacity  onPress={this.StartGame.bind(this)} style={styles.addStart } >
    <Text style={styles.addButtonText}> Start Game </Text>
    </TouchableOpacity>

        <TouchableOpacity  onPress={this.GoToLists.bind(this)} style={styles.list} >
    <Text style={styles.addButtonText}> List </Text>
    </TouchableOpacity>


          <Button color="red" style={{padding:80}} 
           title="End Game" onPress={this.endGame.bind(this)} />



      </View>
      </KeyboardAvoidingView>
   );
 }
}

       // <Text>"FILL THE COURTS "</Text>
       //   <Button title="Start" onPress={this.StartGame.bind(this)}
       //      style={styles.btn}/>

      //  <View>
      //   <Button color= 'black' 
      //   title="Show modal" onPress={this.toggleModal} />
      //   <Modal isVisible={this.state.isModalVisible}>
      //     <View style={{ flex: 1 }}>
      //       <Text>Hello!</Text>
      //       <Button title="Hide modal" onPress={this.toggleModal} />
      //       <Button title="SPLIT" onPress={(answer)=> this.setState({answer:"yes"})}/>
      //     </View>
      //   </Modal>
      // </View>

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'pink',
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
    color: 'white',
    fontSize: 18,
    justifyContent: 'center',
     alignItems: 'center',

  },
   addButton: {
    zIndex: 1,
    // right: 20,
    // bottom: 90,
    backgroundColor: '#E91E63',
    flexDirection:'column',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addStart: {
    position: 'absolute',
    zIndex: 11,
    backgroundColor: 'green',
    top: 80,
    width: 90,
    left: 130,
    flexDirection: 'row',
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  list: {
    position: 'absolute',
    zIndex: 11,
    backgroundColor: 'purple',
    width: 90,
    left: 130,
    top: 175,
    flexDirection: 'row',
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
 
}); 

