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
import Setup from './Setup';
import PopUp from './PopUp';
import Dialog from "react-native-dialog";
import Modal from "react-native-modal";
import CustomPromptComponent from './Modal';
import Games from './currentGames';

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
           [{player:'CONZ', replacement: false}] ],
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
    // console.log(this.state.SampleArray, this.state.SampleArray.length, "total", this.state.totalPlayers);
  }//good

  AddMaster=()=>{
    console.log("ADD TO MASTer",this.state.SampleArray.length);
    if (this.state.SampleArray.length === 0 ){
      Alert.alert("Please Enter a Name " )
    }
    else{
    this.state.masterList.push(this.state.SampleArray)
    this.setState({SampleArray : []})  
  }
  }//good

   GoToLists=()=>{
    this.props.navigation.navigate("Show", {arena: this.state.Arena, list: this.state.masterList});
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

        DsyncAlert = (title, msg, players) => new Promise((resolve, reject) => {  
        Alert.alert(
                    title,
                    msg,


                    [ {textInput: "YES", onPress: () => { resolve('YES') }},
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
                  let theyHit = await AsyncAlert("They will Shoot", s)

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
              

   deleteGame = (x, conz, T) => {
    console.log("I didnt press anything : ",x, " ", conz, " T ", T)
       console.log("Arena : ", this.state.Arena)
  };

  endGame=(courtNum, conz, loser)=>{
    // console.log("ENDGAME VALS ", courtNum, conz, loser)
    var loser = loser
    var temp = []
    for(i in this.state.Arena[courtNum-1][loser]){
      console.log("initial : ", this.state.Arena[courtNum-1][loser][i]) 
      if(this.state.Arena[courtNum-1][loser][i].length>1){
        for (j in this.state.Arena[courtNum-1][loser][i]){
          console.log("GRETAER ", this.state.Arena[courtNum-1][loser][i][j])
        temp.push(this.state.Arena[courtNum-1][loser][i][j])  
      }}
      else{
        console.log("else")
      temp.push(this.state.Arena[courtNum-1][loser][i][0])
      }
    }   
    console.log("Temp: ", temp)
    
    this.state.Arena[courtNum-1][loser] = new Array()
    // console.log("DOubt This will work ", this.state.Arena[courtNum-1][loser+'Num'] )
    this.state.masterList.push(temp)
    // console.log("DELETE: ", this.state.Arena, "LIST: ", this.state.masterList)
    var crash = 0;
    // this.state.Arena[courtNum-1][loser+'Num'] = 0;
    var teamNum = 0
    var teamcap = (this.state.cap/2);
    var delArray = [];
    var names = 0;
    while(crash < this.state.masterList.length){//add full contingency
          if(this.state.masterList[names].length + teamNum <= teamcap){
              var set= []; 
              for (name in this.state.masterList[names]){ 
                set.push(this.state.masterList[names][name])
                teamNum++;
                }
                delArray += [names];
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



 render() {

  let Game = this.state.Arena.map((val, key)=> {
    let A = []
    let B = []
    let t = {}
   
    for (keys in val){
      // console.log("key : ", keys, val )
      if (keys == "teamA"){
        // console.log("tema A: ", val[keys])
        for (things in val[keys]){
          // console.log("THONGS: ", things, val[keys][things].length)
          for (players in val[keys][things]){
            // console.log("PLAYERS", val[keys][things][players]['player'])
            A += [val[keys][things][players]['player'] + ' | ']
          }
        }
      }
      else{
        for (things in val[keys]){
          // console.log("THONGS: ", things, val[keys][things].length)
          for (players in val[keys][things]){
            // console.log("PLAYERS", val[keys][things][players]['player'])
            B += [val[keys][things][players]['player'] + ' | ']
          }
        }

      }
     }
      // console.log("TOP", val, val.Num.toString(), "NUM: ", val.Num)
     t["key"] =  val.Num.toString()
     t["valA"] = A 
     t["valB"] = B
    // console.log("AAAAAA : ", t)
       
  return t
}); 

   return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding" enabled>
      <ScrollView>
      <View>
          <TextInput
              placeholder="NAME"
              onChangeText={(Name) => this.setState({ Name}) }
              value={this.state.Name}
              style={styles.textInput} 
              placeholderTextColor='gray' />

    <TouchableOpacity  onPress={this.AddItemsToArray.bind(this)} style={styles.addButton} >
        <Text style={{color:'black', fontSize:20}}>+Name(s)</Text>
    </TouchableOpacity>       

    <TouchableOpacity  onPress={this.AddMaster.bind(this)} style={styles.addButton} >
        < Text style={{color:'black', fontSize:26}}> + LIST </Text>
    </TouchableOpacity>

    <TouchableOpacity  onPress={this.StartGame.bind(this)} style={styles.addStart } >
        <Text style={{color:'black', fontSize:32}}>Start</Text>
    </TouchableOpacity>

    <TouchableOpacity  onPress={this.GoToLists.bind(this)} style={styles.list} >
        <Text style={{color:'black', fontSize:32}}> List </Text>
    </TouchableOpacity>

     <View style={{padding:20}}>  
    <Text style={{fontSize:40, backgroundColor:'purple', color:'white', textAlign:'center'}}>Current Games</Text>
    <FlatList
    data={Game} style={styles.textInput}
    renderItem={({ item }) => (
    <View>
    <Text style={{fontSize:30, color:'black'}}>Game {item.key} : </Text>
      <Text style={{color:"black", fontSize:28}}>{item.valA}{"\n"}  - VS -</Text>
      <Text style={{color:"red", fontSize:28}}>{item.valB}</Text>
    <Button color='gray' style={styles.endGame} onPress={()=>this.endGame(item.key, "conz", "teamB")} title="TeamA Won"/>
    <Button color='black' onPress={()=>this.endGame(item.key, "conz", "teamA")} title="TeamB Won"/>
    </View>
    )}
    />
    </View>
     

      </View>
       </ScrollView>
      </KeyboardAvoidingView>

   );
 }
}



const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#bbbbbb',
    padding: 5,
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
    backgroundColor: 'white',

        justifyContent: "flex-end"
  },
  endGame: {
    color:'red',
    margin: 30,
   
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
    backgroundColor: '#ffffb1',
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
    backgroundColor: '#b1ffb1',
    color: 'black',
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
    backgroundColor: '#ffd589',
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

