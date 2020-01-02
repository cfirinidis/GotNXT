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
         move: [], 
         team: '',
         tempNum: 0,
         repFlag: false,
         anotherCourt: [],
         selectedItems: [],
        modalVisible: false,
        modalPlayerVisible: false,
        modalRepPlayerVisible: false, 

         Name: '',
         shooters: [],
         totalPlayers:10,
         SampleArray : [],
         masterList : [[{player: "Lebron", replacement: false}, {player:"AntDavis", replacement: false}], [{player:"Kyrie", replacement: true},
          {player:"Durant", replacement: true}], [{player:"Majerle", replacement: false}],[{player:"Kawhi", replacement: false},
           {player:"PG13", replacement: false}], [{player:'Larry', replacement: false}, {player:'Parish', replacement: false}], 
           [{player:'CONZ', replacement: false}] ],
         cap: this.props.navigation.getParam("cap", "blank"),
         Arena: this.props.navigation.getParam("arena", "blank"),
         courtsNum: this.props.navigation.getParam("courtsNum", "blank"),
         current: 0,
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
    this.state.masterList.push(this.state.SampleArray)
    this.setState({SampleArray : []})  
  }
  }//good

  AddMaster2=()=>{
      var hit= [];
      var rest = [];
      var hitList = [];
      for  (i in this.state.hitShot){
            hit.push({player: this.state.hitShot[i]["label"], replacement: false});
            hitList.push(this.state.hitShot[i]["label"])
    }
    for (i in this.state.shooters){
      if (!hitList.includes(this.state.shooters[i]) ){
      rest.push({player: this.state.shooters[i], replacement: false});
      }
    }
    
    this.state.masterList.unshift(rest)
    this.state.masterList.unshift(hit)
    this.setState({hitShot: []})
    this.setState({shooters: []})  
    this.StartGame();
  }//good

  GoToLists=()=>{
    this.props.navigation.navigate("Show", {arena: this.state.Arena, list: this.state.masterList});  
  }
   
  GoToModal=()=>{
    this.props.navigation.navigate("Modal");
  }

  async replacePlayer(num, team, players){
      replaceAlert = (title, msg) => new Promise((resolve, reject) => {  
        Alert.alert(
                    title,
                    msg,
                    [ {text: "Subtitute", onPress: () => { resolve('YES') }},
                      {text: "Correction", onPress: () => { resolve('NO') }}  ],
                    { cancelable: true},
                    );
      });

      x = await replaceAlert("Replace Player", "Replacement / Correction")
      this.state.tempNum = num
      this.state.team = team
      if (x == "YES"){
        this.state.repFlag = true
        }
      else{
        this.state.repFlag = false
        }
    
    for(i in players[num]){
      this.state.tempCourt.push( players[num][i] )
    }
      this.setModalPlayerVisible(!this.state.modalPlayerVisible, "Remove Player");    
  };

  useInfo=()=>{
    if (this.state.remPlayer.length == 0){
      this.setState({ tempCourt:[] });
      this.setState({ remPlayer:[] });
      return 0
    }
            
    for (k in this.state.Arena[this.state.tempNum-1][this.state.team]){
        if (this.state.remPlayer[0]['label'] == this.state.Arena[this.state.tempNum-1][this.state.team][k][0]["player"]){
          delete this.state.Arena[this.state.tempNum-1][this.state.team][k]
          this.state.Arena[this.state.tempNum-1][this.state.team+"Num"] -= 1
        }
      }
      let repP = [];
      Object.values(this.state.masterList).map(function(val) { 
        for (j in val){
          repP.push(val[j]['player']);
        }
      });
    this.setState({ tempCourt: [] });
    this.setState({ allAvailable: repP });   
    this.setState({ remPlayer:[] });
    this.setState({ Arena: this.state.Arena });
    this.setState({ current:this.state.tempNum-1 })
    this.setModalRepPlayerVisible(!this.state.modalRepPlayerVisible, "Replacement !!!!");
  }

  updateMaster=()=>{
    for(i in this.state.masterList){
      for (j in this.state.masterList[i]){
        if (this.state.masterList[i][j]['player'] == this.state.move[0]['value']){
          this.state.masterList[i].splice(j,1)
          if (this.state.masterList[i].length == 0){
            this.state.masterList.splice(i,1);
          }
          break;
    }}}
    this.state.masterList.unshift([{player:this.state.move[0]['value'], replacement: this.state.repFlag}])
    this.setState({ move: [] });
    this.setState({ repFlag: false });
    this.StartGame();
  }

  onSelectionsChange = (hitShot) => {
    // selectedFruits is array of { label, value }
    this.setState({ hitShot })
  }

  onSelectionsChangePlayerTop = (move) => {
    // selectedFruits is array of { label, value }
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
  return [];
  }

  extractFromList=(names)=>{
    var set = [];
    for (name in this.state.masterList[names]){ 
        set.push(this.state.masterList[names][name])
        }
    return set
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
            // console.log("TOP : ", this.state.Arena[this.state.current]["teamANum"], this.state.masterList[names].length )
              if(this.state.masterList[names].length +  this.state.Arena[this.state.current]["teamANum"]  <= teamcap){
                var set = this.extractFromList(names);
                this.state.Arena[this.state.current]["teamANum"] += this.state.masterList[names].length;
                delArray += [names];
                for (i in set){
                  this.state.Arena[this.state.current]["teamA"].push([set[i]]);}
                names++;
                if (names == this.state.masterList.length){
                    names = 0
                    delArray = this.removeFromList(delArray)
                }}
              else if(this.state.masterList[names].length + this.state.Arena[this.state.current]["teamBNum"] <=teamcap){
                var set = this.extractFromList(names);
                this.state.Arena[this.state.current]["teamBNum"] += this.state.masterList[names].length;
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
                  for (i in this.state.masterList[names]){
                    s += this.state.masterList[names][i]['player'] + '  '  
                    this.state.shooters.push(this.state.masterList[names][i]['player'])
                  } 
                  this.state.diff = this.state.cap - ( this.state.Arena[this.state.current]["teamANum"]  + 
                                    this.state.Arena[this.state.current]["teamBNum"] );
                  if ( this.state.diff == this.state.shooters.length ){
                    this.state.command = " Shoot for " + ((this.state.cap/2) - this.state.Arena[this.state.current]["teamANum"] + 
                      "To Play On TEAM-A")
                    this.state.diff = ((this.state.cap/2) - this.state.Arena[this.state.current]["teamANum"])
                  }
                  else{
                  this.state.command = "Shoot for " + this.state.diff
                  }

                  let response = await AsyncAlert(this.state.command, s);
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
          break;
          }//if full
          crash++;          
          }//end of while
        this.setState({masterList: this.state.masterList});
        this.setState({Arena:this.state.Arena});
  }

  async endGame(courtNum, loser){
    var temp = []
    this.state.current = courtNum-1
    var tempC = 0;
    for (i in this.state.Arena[courtNum-1][loser]){
      if (this.state.Arena[courtNum-1][loser][i][0]['replacement'] == false){
          temp.push(this.state.Arena[courtNum-1][loser][i][0])
          delete this.state.Arena[courtNum-1][loser][i]
          tempC += 1            
      }
      else{
        this.state.Arena[courtNum-1][loser][i][0]['replacement'] = false  
      }
    } 
    this.state.Arena[courtNum-1][loser+"Num"] -= tempC;
    if (temp.length>0){ 
      this.state.masterList.push(temp)  
      this.setState({masterList: this.state.masterList});
    }
    this.setState({Arena:this.state.Arena});
    this.StartGame();
  }

 render() {
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
            A += [val[keys][things][players]['player'] + ' | ']
            currentPlayerA.push(val[keys][things][players]['player'])
      }}}
      else{
        for (things in val[keys]){
          for (players in val[keys][things]){
            B += [val[keys][things][players]['player'] + ' | ']
            currentPlayerB.push(val[keys][things][players]['player'])
      }}}
  }
     t["key"] =  val.Num.toString()
     t["valA"] = A 
     t["valB"] = B
  // console.log("this is each t: ", t['valA'].length, currentPlayer )
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
              placeholder="Enter One NAME at a Time : "
              onChangeText={(Name) => this.setState({ Name}) }
              value={this.state.Name}
              style={styles.textInput} 
              placeholderTextColor='gray' />

    <TouchableOpacity  onPress={this.AddItemsToArray.bind(this)} style={styles.addButton} >
        <Text style={{color:'black', fontSize:19}}>+Name(s)</Text>
    </TouchableOpacity>     

    <Text style={{fontSize:40, bottom: 50}}> Names </Text>
      <TouchableOpacity onPress={this.clearList.bind(this)} style={styles.clearList} >
        <Text style={{color:'gray', fontSize:20}}> CLEAR LIST</Text>
      </TouchableOpacity>

    <View>
      <FlatList
        data={pending}
        style={styles.temporary}
        renderItem={({item}) => <Text style={{color:'purple', fontSize:24, alignItems:'center'}}>{item.key}</Text>}/>
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
      <TouchableHighlight onPress={()=>this.replacePlayer(item.key, "teamA", this.state.curPlayersA) }>
        <Text style={{color:"gray", fontSize:28}}>{item.valA}</Text>
      </TouchableHighlight>
      <Text style={{color:"black", fontSize:34}}>- V S -</Text>
    <TouchableHighlight onPress={()=>this.replacePlayer(item.key, "teamB", this.state.curPlayersB) }>
      <Text style={{color:"red", fontSize:28}}>{item.valB}</Text>
    </TouchableHighlight>
    
    <Button color='gray' onPress={()=>this.endGame(item.key,  "teamB")} title="TeamA Won"/>
    <Button color='red' onPress={()=>this.endGame(item.key,  "teamA")} title="TeamB Won"/>
   
    </View>)}/>
    </View>

    <Modal 
    visible={this.state.modalVisible}>
      <View>
        <Text style={{fontSize:30}}>{this.state.title} </Text>
        <SelectMultiple
          maxSelect= {this.state.diff}
          items={this.state.shooters}
          selectedItems={ this.state.hitShot }
          onSelectionsChange={this.onSelectionsChange} />

        <TouchableHighlight   onPress={() => {
            this.setModalVisible(!this.state.modalVisible, "something").then(this.AddMaster2());}}>
            <Text style={{backgroundColor:'orange' , fontSize:32}}>Done</Text>
        </TouchableHighlight>
      </View>
    </Modal>

    <Modal 
    visible={this.state.modalPlayerVisible}>
      <View>
        <Text style={{fontSize:30}}>{this.state.title} </Text>
        <SelectMultiple
          maxSelect= {1}
          items={this.state.tempCourt}
          selectedItems={ this.state.remPlayer }
          onSelectionsChange={this.onSelectionsChangePlayer} />

        <TouchableHighlight   onPress={() => 
            this.setModalPlayerVisible(!this.state.modalPlayerVisible, "something").then(this.useInfo())}>
            <Text style={{backgroundColor:'green' , fontSize:32}}>Done</Text>
        </TouchableHighlight>
      </View>
    </Modal>

    <Modal 
      visible={this.state.modalRepPlayerVisible}>
        <View>
        <Text style={{fontSize:30}}>{this.state.title} </Text>
        <SelectMultiple
          maxSelect= {1}
          items={ this.state.allAvailable }
          selectedItems={ this.state.move }
          onSelectionsChange={this.onSelectionsChangePlayerTop} />

        <TouchableHighlight   onPress={() => 
            this.setModalRepPlayerVisible(!this.state.modalRepPlayerVisible, "Replacements").then(this.updateMaster())}>
            <Text style={{backgroundColor:'pink' , fontSize:32}}>Done</Text>
        </TouchableHighlight>
      </View>
    </Modal>

      </View>
       </ScrollView>
      </KeyboardAvoidingView>

   );
 }
}

    //     <TouchableOpacity  onPress={this.GoToModal.bind(this)}>
    //     <Text style={{color:'black', fontSize:32}}> Modal</Text>
    // </TouchableOpacity>


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#e8eae7',
    padding: 5,
  },
  temporary: {
    width:150,
    alignSelf: 'stretch',
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
  },

  endGame: {
    color:'red',
    margin: 30,
    borderWidth: 1,
    borderColor: "red",
   
  },
  doneAdding: {
    backgroundColor:'grey',  
    bottom:40, 
    width:150, 
  },
    addButtonText: {
    color: 'white',
    fontSize: 18,
    borderColor: 'red',
    justifyContent: 'center',
     alignItems: 'center',

  },
   addButton: {
    zIndex: 1,
    // right: 20,
    // bottom: 90,
    backgroundColor: 'orange',
    flexDirection:'column',
    width: 105,
    height: 60,
    bottom: 85,
    left: 295,
    borderWidth: 3,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addStart: {
    position: 'absolute',
    zIndex: 11,
    backgroundColor: '#64e723',
    color: 'black',
    top: 80,
    width: 90,
    left: 220,
    flexDirection: 'row',
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  list: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 130,
    left: 220,
    top: 200,
    borderWidth: 2,
    borderColor: 'orange',
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
 
}); 

