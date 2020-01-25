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
import Dialog from "react-native-dialog";
import CustomPromptComponent from './Modal';
import Games from './currentGames';
import StartFunction from './function';
import SelectMultiple from 'react-native-select-multiple';

const STORAGE_KEY = '@save_arena'
export default class MainActivity extends React.Component { 
  constructor(props) {
       super(props);
       this.state = {
         hitShot: [],
         diff: 0,
         title: '',
         command: '',
         remPlayer: [],
         allAvailable: [],
         curPlayersA: {},
         curPlayersB: {},
         tempCourt: [],
         winnersW: [],
         completeList: new Set(),
         move: [], 
         team: '',
         tempNum: 0,
         repFlag: false,
         anotherCourt: [],
         selectedItems: [],
        modalVisible: false,
        modalPlayerVisible: false,
        modalRepPlayerVisible: false, 
        modalPrefVisible: false,
        restNum: 0,
         Name: '',
         shooters: [],
         prefCourt: [],
         totalPlayers:0,
         SampleArray : [],
        //  masterList : [
        //  [{pref:0}, [{player: "Lebron", replacement: false}, {player:"AntDavis", replacement: false}]],
        //  [{pref:0}, [{player:"Kyrie", replacement: true}, {player:"Durant", replacement: true}]],
        // [{pref:0}, [{player:"Majerle", replacement: false}]],
        // [{pref:0}, [{player:"Kawhi", replacement: false}, {player:"PG13", replacement: false}]],
        //  [{pref:0}, [{player:'Larry', replacement: false}, {player:'Parish', replacement: false}]], 
        //   [{pref:0}, [{player:'CONZ', replacement: false}]]
        //   ],  
         cap: this.props.navigation.getParam("cap", "blank"),
         Arena: this.props.navigation.getParam("arena", "blank"),
         courtsNum: this.props.navigation.getParam("courtsNum", "blank"),
         courtArr: this.props.navigation.getParam("courtArr", "blank"),
         courtArrPref: [],
         masterList: this.props.navigation.getParam("masterList", "blank"),
         current: 0,
         answer: 'none'
       };
     }
  
 checkDuplicate=(name)=>{

  console.log("Check Duplicates: ", this.state.completeList)
    let  x = name.toLowerCase() 
    console.log("LOWER CASE ",x)
    if (this.state.completeList.has(x)){
      Alert.alert("Name Already Exists ")
      return false

    }
    return true
}

  AddItemsToArray=()=>{
    let san = this.state.Name.replace(/\s/g, '').toLowerCase()
    if (this.checkDuplicate(san)){
      if (this.state.Name.length != 0 && this.state.Name.replace(/\s/g, '').length != 0 ){
        this.state.SampleArray.push({player: this.state.Name, replacement: false});
      }
      else{
        Alert.alert("Please Enter A Name")
      }
      // console.log("ALL avail: ", this.state.completeList)

      let noSpace = this.state.Name.replace(/\s/g, '')
      console.log("No space", noSpace)
      this.state.completeList.add(this.state.Name.replace(/\s/g, '').toLowerCase())
      this.setState({Name:''})
      this.setState({SampleArray: this.state.SampleArray})
      this.setState({totalPlayers: this.state.totalPlayers + 1})
  }//good
}
  clearList=()=>{
    this.setState({SampleArray:[]})
  }

  addToCurA=(list, n)=>{
    this.state.curPlayersA[n] = list;
  }

  addToCurB=(list, n)=>{
    this.state.curPlayersB[n] = list;
  }

  AddMaster=()=>{
    if (this.state.SampleArray.length === 0 ){
      Alert.alert("Please Enter a Name " )
    }
    else{
    this.state.masterList.push([{pref:0},this.state.SampleArray])
    this.setState({SampleArray : []})  
    this.saveData();
    }
  }//good

  AddMaster2=()=>{
    // console.log("Add2: ", this.state.hitShot, this.state.shooters)
    // if (this.state.hitShot.length==0){
    //   console.log("Empty")
    //   this.state.masterList.splice(this.state.restNum, 0, [{pref:0}, this.state.shooters]);
    //   return 0
    // }
      var hit= [];
      var rest = [];
      var hitList = [];
      for  (i in this.state.hitShot){
            hit.push({player: this.state.hitShot[i]["label"], replacement: false});
            hitList.push(this.state.hitShot[i]["label"]);
    }
    for (i in this.state.shooters){
      if (!hitList.includes(this.state.shooters[i]) ){
      rest.push({player: this.state.shooters[i], replacement: false});
      }
    }
    this.state.masterList.splice(this.state.restNum, 0, [{pref:0}, rest])
    if (hit.length != 0){
      this.state.masterList.unshift([{pref:0}, hit])
    }
    this.setState({hitShot: [] });
    this.setState({restNum: 0 });
    this.state.shooters = [];
    this.setState({shooters: this.state.shooters });  
    this.setState({masterList: this.state.masterList});
    this.StartGame();
  }//good

  GoToLists=()=>{
    this.props.navigation.navigate("Show", {arena: this.state.Arena,
     list: this.state.masterList, courtArr: this.state.courtArr});  
  }
   
  GoToModal=()=>{
    this.props.navigation.navigate("Modal");
  }

  useInfo=()=>{
    if (this.state.remPlayer.length == 0){
      this.setState({ tempCourt:[] });
      this.setState({ remPlayer:[] });
      return 0
    }
            
    for (k in this.state.Arena[this.state.tempNum-1][this.state.team]){
        if (this.state.remPlayer[0]['label'] == this.state.Arena[this.state.tempNum-1][this.state.team][k][0]["player"]){
          this.state.Arena[this.state.tempNum-1][this.state.team].splice(k,1)
          this.state.Arena[this.state.tempNum-1][this.state.team+"Num"] -= 1
        }
      }
      let repP = [];
      Object.values(this.state.masterList).map(function(val) {
        for (j in val[1]){
          repP.push(val[1][j]['player']);
        }
      });
    this.state.masterList.unshift([{pref:"W"}, [{player: this.state.remPlayer[0]['label'], replacement: false}]] )
    this.setState({ tempCourt: [] });
    this.setState({ allAvailable: repP });   
    this.setState({ remPlayer:[] });
    this.setState({ Arena: this.state.Arena });
    this.setState({ current:this.state.tempNum-1 })

    if(this.state.repFlag == false){
    this.setModalRepPlayerVisible(!this.state.modalRepPlayerVisible, "Enter Correction");
    }
    else{
      this.setModalRepPlayerVisible(!this.state.modalRepPlayerVisible, "Enter Substitute");
    }
  }

  updateMaster=()=>{
    console.log(this.state.allAvailable)
    if (this.state.move.length == 0){
       Alert.alert("No one selected as replacement.")
       return 0
    }
    for(i in this.state.masterList){
      // console.log("test:: ", this.state.masterList[i][1].length)
      for (j = 0; j < this.state.masterList[i][1].length ; j++){
        if (this.state.masterList[i][1][j]['player'] == this.state.move[0]['value']){
          this.state.masterList[i][1].splice(j,1);
          j--;  
        if (this.state.masterList[i][1].length == 0){
            this.state.masterList.splice(i,1);
          }
          break;
    }}}
    this.state.masterList.unshift([{pref: 0},[{player:this.state.move[0]['value'], replacement: this.state.repFlag}]])
    this.setState( { move: [] } );
    this.setState( { repFlag: false } );
    this.StartGame();
  }

  onSelectionsChange = (hitShot) => {
    this.setState({ hitShot })
  }

  onSelectionsChangePlayerTop = (move) => {
    this.setState({ move })
  }

  onSelectionsChangePlayer =(remPlayer)=>{
    this.setState({ remPlayer })
  }

  setModalVisible=(visible, p)=> new Promise((resolve)=> {
    this.state.title = p
    this.setState({modalVisible: visible})
  });

  setModalPlayerVisible=(visible, p)=> new Promise((resolve)=> {
    this.state.title = p
    this.setState({modalPlayerVisible: visible})
  });

  setModalRepPlayerVisible=(visible, p)=> new Promise((resolve)=> {
    this.state.title = p
    this.setState({ modalRepPlayerVisible: visible})
  });

  removeFromList=(delArray)=>{
    for (i in delArray){
      this.state.masterList.splice(delArray[i]-i, 1)
    }
    // this.setState({restNum:0});
    return [];
  }

  extractFromList=(names)=>{
    var set = [];
    for (name in this.state.masterList[names][1]){ 
        set.push(this.state.masterList[names][1][name])
        }
    return set
  }

  saveData(){
    let MS = JSON.stringify(this.state.masterList);
    let AR  = JSON.stringify(this.state.Arena);
    let CAP = JSON.stringify(this.state.cap);
    let CN = JSON.stringify(this.state.courtsNum);
    let CARRAY = JSON.stringify(this.state.courtArr);
    // console.log("MS: ", this.state.masterList)
    AsyncStorage.setItem('arena', AR);
    AsyncStorage.setItem('master', MS);
    AsyncStorage.setItem('capacity', CAP);
    AsyncStorage.setItem('courtN', CN);
    AsyncStorage.setItem('courtA', CARRAY);

  }

  async StartGame(){
    this.func = new StartFunction();
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
                    { cancelable: false},
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
              // console.log("The Cureenty place: ", this.state.current, this.state.masterList[names][0]['pref'], this.state.masterList[names])
            // console.log("TOP : ", this.state.Arena[this.state.current]["teamANum"],this.state.Arena[this.state.current]["teamBNum"],"names", names,  this.state.masterList[names][1].length, this.state.masterList.length )
              // console.log("TOP MS: ",this.state.masterList)
              if(this.state.current + 1 != this.state.masterList[names][0]['pref'] && this.state.masterList[names][0]['pref'] != 0 ){
                  // console.log("Wanted to be skipped")
                  names++;
              }
              else if(this.state.masterList[names][1].length + this.state.Arena[this.state.current]["teamANum"]  <= teamcap){
                let set = this.extractFromList(names);
                this.state.Arena[this.state.current]["teamANum"] += this.state.masterList[names][1].length;
                delArray += [names];
                for (i in set){
                  this.state.Arena[this.state.current]["teamA"].push([set[i]]);}
                names++;
                if (names == this.state.masterList.length){
                    names = 0
                    delArray = this.removeFromList(delArray)
                }}
              else if(this.state.masterList[names][1].length + this.state.Arena[this.state.current]["teamBNum"] <=teamcap){
                var set = this.extractFromList(names);
                this.state.Arena[this.state.current]["teamBNum"] += this.state.masterList[names][1].length;
                delArray += [names]
                for(i in set){
                  this.state.Arena[this.state.current]["teamB"].push([set[i]])}
                names++
                if (names == this.state.masterList.length){
                  names = 0
                  delArray = this.removeFromList(delArray)
                }}
              else{
                  if( this.state.Arena[this.state.current]["teamANum"] + this.state.Arena[this.state.current]["teamBNum"] != this.state.cap){
                  let s = '';
                  for (i in this.state.masterList[names][1]){
                    s += this.state.masterList[names][1][i]['player'] + '  '  
                    this.state.shooters.push(this.state.masterList[names][1][i]['player'])
                  } 
                  this.state.diff = this.state.cap - ( this.state.Arena[this.state.current]["teamANum"]  + 
                                    this.state.Arena[this.state.current]["teamBNum"] );
                  if ( this.state.diff >= this.state.shooters.length ){
                    this.state.command = " Shoot for " + ((this.state.cap/2) - this.state.Arena[this.state.current]["teamANum"] + 
                      "To Play On TEAM-A")
                    this.state.diff = ((this.state.cap/2) - this.state.Arena[this.state.current]["teamANum"])
                  }
                  else{
                  this.state.command = "Shoot for " + this.state.diff
                  }
                  // console.log("SHOOTERS BEFORE RESPONSE: ", this.state.shooters)
                let response = await AsyncAlert(this.state.command, s);
                if (response == "YES"){
                    delArray += [names]
                    this.state.restNum = names - (delArray.length - 1)
                    // console.log("START: ", names, " ", delArray.length)
                    delArray = this.removeFromList(delArray)
                  
                    
                    this.setModalVisible(!this.state.modalVisible,  "Select Player(s) That Hit");
                    break
                  } 
                  else{this.setState({shooters: []});}
               names++; }}
            // GAME READY
        if( this.state.Arena[this.state.current]["teamANum"]  == teamcap && this.state.Arena[this.state.current]["teamBNum"] == teamcap){
          this.setState({ current: this.state.current+1 })
          this.removeFromList( delArray )
          break;
          }//if full
          crash++;          
          }//end of while
        this.setState({masterList: this.state.masterList});
        this.setState({Arena:this.state.Arena});
        this.saveData();

  }


  onSelectionsChangePref = (prefCourt) => {
    // selectedFruits is array of { label, value }
    this.setState({ prefCourt })
  }

  setModalPrefVisible=(visible, p)=> new Promise((resolve)=> {
    this.state.title = p;
    this.setState({modalPrefVisible: visible})
  });

  async replacePlayer(num, team, players){
      replaceAlert = (title, msg) => new Promise((resolve) => {  
        Alert.alert(
                    title,
                    msg,
                    [ {text: "Winners / Winners", onPress: () => {resolve('WIN') }},  
                      {text: "Correction", onPress: () => { resolve('NO') }},
                      {text: "Subtitute", onPress: () => { resolve('YES') }} 
                      ],
                    { cancelable: true},
                    );
      });

      var sub = await replaceAlert("Replace Player", "Replacement / Correction")
      this.state.tempNum = num
      this.state.team = team
      if (sub =="WIN"){
        // alert("one day this will work")
        this.endGame(num, team, team, "win")
      }
      else{
        if (sub == "YES"){
          this.state.repFlag = true
          }
        else{
          this.state.repFlag = false
        } 
        for(i in players[num]){
          this.state.tempCourt.push( players[num][i] )
        }
        this.setModalPlayerVisible(!this.state.modalPlayerVisible, "Remove Player");    
      }
};


  async endGame(courtNum, loser, winner, status){
    if ( (this.state.Arena[courtNum-1]["teamBNum"] + this.state.Arena[courtNum-1]["teamANum"]) < this.state.cap){
      alert("Game has not started");
      return
    }
    
    makeSure = () => new Promise((resolve) => {  
            Alert.alert(
                    "Are you Sure: ",
                    winner + " WON?",
                    [ {text: "Yes", onPress: () => { resolve('YES') }},
                      {text: "NO", onPress: () => { resolve('NO') }}  ],
                    { cancelable: false},
                    );
            });
    let winnerConfirmation = await makeSure();
    if (winnerConfirmation== "NO"){
      return
    }
    // console.log('cn ', courtNum,'loser ', loser,'winner ', winner,'status ', status, this.state.Arena)
      var temp = [];
      var titleP = '';
      this.state.current = courtNum-1
      var tempC = 0;
      for (i in this.state.Arena[courtNum-1][winner]){
        this.state.Arena[courtNum-1][winner][i][0]['replacement'] = false 
      }
      for (i=0; i< this.state.Arena[courtNum-1][loser].length; i++){
        // console.log(this.state.Arena[courtNum-1][loser][i])
        if (this.state.Arena[courtNum-1][loser][i][0]['replacement'] == false){
            temp.push(this.state.Arena[courtNum-1][loser][i][0])
            titleP += " " + (this.state.Arena[courtNum-1][loser][i][0]['player'])
            this.state.Arena[courtNum-1][loser].splice(i, 1);
            i--;
            tempC += 1            
        }
        else{
          this.state.Arena[courtNum-1][loser][i][0]['replacement'] = false  
        }
      } 

      this.state.Arena[courtNum-1][loser+"Num"] -= tempC;
      if (temp.length>0){ 
        if (status == 'reg'){
          this.state.masterList.push([{pref:0}, temp])
        }
        else{
          prefAlert = () => new Promise((resolve) => {  
            Alert.alert(
                    "Add Court Pref for: ",
                    titleP,
                    [ {text: "Yes", onPress: () => { resolve('YES') }},
                      {text: "NO", onPress: () => { resolve('NO') }}  ],
                    { cancelable: true},
                    );
            });
          ans = await prefAlert();
          if (ans == "YES"){
            this.setModalPrefVisible(!this.state.modalPrefVisible, "Select Preferred Court: ")     
            this.setState({masterList: this.state.masterList});
            this.setState({Arena:this.state.Arena});
            this.setState({winnersW: temp})
           return 0
       }
        }}
      this.setState({Arena:this.state.Arena});
      // console.log("right before start", this.state.Arena)
      this.StartGame();  
}

winnersWinners(){
  if (this.state.prefCourt.length == 0){
    this.state.masterList.unshift([{pref:"W"}, this.state.winnersW])
    return 0
  } 
  var t = this.state.prefCourt[0]['value']  
  this.state.masterList.unshift([{pref: t[t.length - 1]}, this.state.winnersW])
  this.setState({masterList: this.state.masterList});
  this.setState({prefCourt:[] })
}

 render() {
  // console.log("NUMMM: ", this.state.courtsNum)
  // console.log("MasterList : ", this.state.masterList)
  // console.log("RENDER THE ARENA : ", this.state.Arena, this.state.curPlayers, "TEMPO: ", this.state.tempCourt)
  let Game = this.state.Arena.map((val, key)=> {
    let A = []
    let B = []
    let t = {}
    let currentPlayerA = []
    let currentPlayerB = []
   
  for (keys in val){
      if (keys == "teamA"){
        for (things in val[keys]){
          for (players in val[keys][things]){
            A += [val[keys][things][players]['player'] + '    ']
            currentPlayerA.push(val[keys][things][players]['player'])
      }}}
      else{
        for (things in val[keys]){
          for (players in val[keys][things]){
            B += [val[keys][things][players]['player'] + '    ']
            currentPlayerB.push(val[keys][things][players]['player'])
      }}}
  }
     t["key"] =  val.Num.toString()
     t["valA"] = A 
     t["valB"] = B
  this.addToCurA(currentPlayerA, val.Num)
  this.addToCurB(currentPlayerB, val.Num)
  return t
}); 

  let pending = Object.values(this.state.SampleArray).map(function(vals) {
      var t= {} ;
      for (val in vals){
          if(vals[val] != false && vals[val] != true){
              t["key"] = vals[val]; 
        }}
      return t
  });


   return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding" enabled>
      <ScrollView>
      <View>
          <TextInput
              placeholder="Enter 1 NAME at a Time : "
              onChangeText={(Name) => this.setState({ Name}) }
              value={this.state.Name}
              style={styles.textInput} 
              placeholderTextColor='gray' />

    <TouchableOpacity  onPress={this.AddItemsToArray.bind(this)} style={styles.addButton} >
        <Text style={{color:'black', fontSize: 21, textAlign: 'center'}}>+ ADD</Text>
    </TouchableOpacity>     

    <Text style={{fontSize:40, marginBottom: 50}}> Names </Text>
      <TouchableOpacity onPress={this.clearList.bind(this)} style={styles.clearList} >
        <Text style={{color:'gray', fontSize:20}}> CLEAR NAMES </Text>
      </TouchableOpacity>

    <View>
      <FlatList
        data={pending}
        style={styles.sampleArrayStye}
        renderItem={({item}) => <Text style={{color:'#e1a8ff', fontSize:24, alignItems:'center'}}>{item.key}</Text>}/>
    </View>  

    <TouchableOpacity  onPress={this.AddMaster.bind(this)} style={styles.doneAdding} >
        < Text style={{color:'white', fontSize:20}}> DONE ADDING </Text>
    </TouchableOpacity>

    <TouchableOpacity  onPress={this.StartGame.bind(this)} style={styles.addStart } >
        <Text style={{color:'black', fontSize:32}}>Start</Text>
    </TouchableOpacity>

    <TouchableOpacity  onPress={this.GoToLists.bind(this)} style={styles.list} >
        <Text style={{color:'grey', fontSize:32}}>  List  </Text>
    </TouchableOpacity>

    <View style={{padding:20}}>  
    <Text style={{fontSize:40, backgroundColor:'black', color:'white', textAlign:'center',flexDirection:'row', justifyContent:'flex-end'}}>Current Games</Text>
    <FlatList
    data={Game} 
    renderItem={({ item }) => (
    <View>
    <Text style={{fontSize:30, color:'black'}}>Game {item.key} : </Text>

      <TouchableHighlight onPress={()=>this.replacePlayer(item.key, "teamA", this.state.curPlayersA) } style={styles.teamStyle}>  
        <Text style={{color:"gray", fontSize:28}}>TEAM A :{"\n"}{item.valA}</Text>
      </TouchableHighlight>

      <Text style={{color:"black", fontSize:34, textAlign: 'center'}}>- V S -</Text>

    <TouchableHighlight onPress={()=>this.replacePlayer(item.key, "teamB", this.state.curPlayersB) } style={styles.teamStyle}>
      <Text style={{color:"red", fontSize:28}}>TEAM B :{"\n"}{item.valB}</Text>
    </TouchableHighlight>

    <TouchableHighlight onPress={()=>this.endGame(item.key, "teamB", "teamA", 'reg')} style={styles.teamAWonStyle} >
      <Text style={{color:"white", fontSize:26}}>Team A Won</Text>
    </TouchableHighlight>

    <TouchableHighlight onPress={()=>this.endGame(item.key, "teamA", "teamB", 'reg') } style={styles.teamBWonStyle}>
      <Text style={{color:"white", fontSize:26}}>Team B Won</Text>
    </TouchableHighlight>
    
    </View>)}/>
    </View>

    <Modal 
    visible={this.state.modalVisible}>
      <View style={styles.modalStyle}>
        <Text style={{fontSize:30, backgroundColor:'gray', color:'white'}}>{this.state.title} </Text>
        <SelectMultiple
          maxSelect= {this.state.diff}
          items={this.state.shooters}
          style={styles.modalStyle}
          selectedItems={ this.state.hitShot }
          onSelectionsChange={this.onSelectionsChange} />
        <TouchableHighlight   onPress={() => 
            this.setModalVisible(!this.state.modalVisible, "something").then(this.AddMaster2())}
             style={styles.modalButton}>
            <Text style={styles.modalText}>Done</Text>
        </TouchableHighlight>
      </View>
    </Modal>

    <Modal 
    visible={this.state.modalPlayerVisible}>
      <View  style={styles.modalStyle }>
        <Text style={{fontSize:30, backgroundColor:'red', color:'white'}}>{this.state.title} </Text>
        <SelectMultiple
          maxSelect= {1}
          items={this.state.tempCourt}
          selectedItems={ this.state.remPlayer }
          onSelectionsChange={this.onSelectionsChangePlayer} />
        <TouchableHighlight   onPress={() => 
            this.setModalPlayerVisible(!this.state.modalPlayerVisible, "something").then(this.useInfo())}
             style={styles.modalButton}>
            <Text style={styles.modalText}>Done</Text>
        </TouchableHighlight>
      </View>
    </Modal>

    <Modal 
      visible={this.state.modalRepPlayerVisible}>
      <View  style={styles.modalStyle }>
        <Text style={{fontSize:30, backgroundColor:'yellow', color:'black'}}>{this.state.title} </Text>
        <SelectMultiple
          maxSelect= {1}        
          items={ this.state.allAvailable }
          selectedItems={ this.state.move }
          onSelectionsChange={this.onSelectionsChangePlayerTop} />
          <TouchableHighlight   onPress={() => 
              this.setModalRepPlayerVisible(!this.state.modalRepPlayerVisible, "Replacements").then(this.updateMaster())} 
              style={styles.modalButton}>
            <Text style={styles.modalText}>Done</Text>
          </TouchableHighlight>
           </View>
     
    </Modal>


<Modal 
    visible={this.state.modalPrefVisible}>
      <View style={styles.modalStyle}>
        <Text style={{fontSize:30, backgroundColor:'orange', color:'white'}}>{this.state.title} </Text>
        <SelectMultiple

          items={this.state.courtArr}
          maxSelect = {1}
          selectedItems={ this.state.prefCourt }
          onSelectionsChange={this.onSelectionsChangePref} />

        <TouchableHighlight   onPress={ () => {
            this.setModalPrefVisible(!this.state.modalPrefVisible, "something").then(this.winnersWinners()); 
          }} style={styles.modalButton}>
            <Text style={styles.modalText} >DONE</Text>
        </TouchableHighlight>
      </View>
</Modal>

      </View>
       </ScrollView>
      </KeyboardAvoidingView>

   );
 }
}



const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#e8eae7',
    padding: 5,
  },
  teamStyle: {
    backgroundColor: 'white',
    borderWidth:3,
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
  },
  modalText:{
    fontSize: 22,
    color:'white', 
  },
  
   teamAWonStyle:{
    marginTop: 5,
    backgroundColor:'gray',
    flexDirection: 'row',
    width:'45%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderWidth: 2,
    borderColor: 'black',
  },
  teamBWonStyle:{
    backgroundColor:'red',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width:'45%',
    bottom: 60,
    height: 60,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
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
    marginTop: 200,
    borderWidth: 2,
    borderColor: '#ff8c1d',
    flexDirection: 'row-reverse',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
}); 

