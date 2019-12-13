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
         plist: [],
         ps: [],
         hitShot: [],
         res:'',
         diff: 0,
         title: '',
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

  AddMaster2=()=>{
      var hit= [];
      var rest = [];
      var hitList = [];
      console.log("HEREEEEEEEE", this.state.hitShot.length, this.state.diff)
      for  (i in this.state.hitShot){
            console.log("ADDMASTER @", i, this.state.hitShot[i]["label"])
            hit.push({player: this.state.hitShot[i]["label"], replacement: false});
            hitList.push(this.state.hitShot[i]["label"])
    }
    console.log("HitLIST", hitList, this.state.shooters)
    for (i in this.state.shooters){
      console.log("FOR LOPP", this.state.shooters[i])
      if (!hitList.includes(this.state.shooters[i]) ){
      console.log("in works",this.state.shooters[i] )
      rest.push({player: this.state.shooters[i], replacement: false});
    }
    }
    
    this.state.masterList.unshift(rest)
    this.state.masterList.unshift(hit)
    this.setState({hitShot: []})
    this.setState({shooters: []})
    console.log("ADMASTER 2 : current ", this.state.current)  
    this.StartGame();
  
  }//good

   GoToLists=()=>{
    this.props.navigation.navigate("Show", {arena: this.state.Arena, list: this.state.masterList});  
  }
   
   GoToModal=()=>{
    this.props.navigation.navigate("Modal");
  }

    onSelectionsChange = (hitShot) => {
    // selectedFruits is array of { label, value }
    this.setState({ hitShot })
    // console.log(this.state.hitShot.length, "len")
    // if (this.state.hitShot.length > this.state.diff ){
    //   console.log("select too many2")
    // }
  }

  print =()=>{
    console.log("PRINT")
    console.log(this.state.hitShot)
  }

  setModalVisible=(visible, p)=> new Promise((resolve)=> {
    this.state.title = p
    this.setState({modalVisible: visible})
  });

  removeFromList=(delArray)=>{
    console.log(delArray, this.state.masterList)
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
      console.log("START GAME TOP : WHAT GAME # - ", this.state.current)
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
            console.log("TOP : ", this.state.Arena[this.state.current]["teamANum"], this.state.masterList[names].length )
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
                  if( this.state.Arena[this.state.current]["teamANum"]+ this.state.Arena[this.state.current]["teamBNum"] != this.state.cap){
                  let s = '';
                  for (i in this.state.masterList[names]){
                    s += this.state.masterList[names][i]['player'] + '  '  
                    console.log(" ADDED to Shooters list : ",this.state.masterList[names][i]['player'])
                    this.state.shooters.push(this.state.masterList[names][i]['player'])
                  } 

                  this.state.diff = this.state.cap - (this.state.Arena[this.state.current]["teamANum"]  + this.state.Arena[this.state.current]["teamBNum"]) ;
                  let command = "Shoot for " + this.state.diff
                  let response = await AsyncAlert(command, s);
                  console.log("RESPONSE : ", response)
                  // They will shoot , Create slector from list
                  //
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
          console.log(" TEAMS FULL: on to - ", this.state.current)
          break;
          }//if full
          crash++;          

          }//end of while
        //} select from list
        console.log("SET THE ARENA AND LIST")
        this.setState({masterList: this.state.masterList});
        this.setState({Arena:this.state.Arena});
        console.log("SET THE ARENA AND LIST continued" )
  }


  async endGame(courtNum, loser){
    console.log("ENDGAME VALS ", courtNum,  loser)
    var temp = []
    this.state.current = courtNum-1
    for(i in this.state.Arena[courtNum-1][loser]){
      if(this.state.Arena[courtNum-1][loser][i].length>1){
        for (j in this.state.Arena[courtNum-1][loser][i]){
        temp.push(this.state.Arena[courtNum-1][loser][i][j])  
      }}
      else{
        console.log("else")
      temp.push(this.state.Arena[courtNum-1][loser][i][0])
      }
    }   
    console.log("Temp: ", temp)
    this.state.Arena[courtNum-1][loser] = new Array()
    this.state.Arena[courtNum-1][loser+"Num"] = 0;
    this.state.masterList.push(temp)
    this.setState({masterList: this.state.masterList});
    this.setState({Arena:this.state.Arena});
    console.log("END OF ENDGAME")
    this.StartGame();
  }

 render() {
  console.log("RENDER", this.state.Arena)
  let Game = this.state.Arena.map((val, key)=> {
    let A = []
    let B = []
    let t = {}
   
  for (keys in val){
      if (keys == "teamA"){
        for (things in val[keys]){
          for (players in val[keys][things]){
            A += [val[keys][things][players]['player'] + ' | ']
      }}}
      else{
        for (things in val[keys]){
          for (players in val[keys][things]){
            B += [val[keys][things][players]['player'] + ' | ']
      }}}
  }
     t["key"] =  val.Num.toString()
     t["valA"] = A 
     t["valB"] = B
      
  return t
}); 
console.log("SHOOTERS        HHHHHHHHHH", this.state.shooters)
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
        <Text style={{color:'black', fontSize:18}}>+Name(s)</Text>
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
    <Text style={{fontSize:40, backgroundColor:'black', color:'white', textAlign:'center'}}>Current Games</Text>
    <FlatList
    data={Game} 
    renderItem={({ item }) => (
    <View>
    <Text style={{fontSize:30, color:'black'}}>Game {item.key} : </Text>
      <Text style={{color:"gray", fontSize:28}}>{item.valA}</Text>
      <Text style={{color:"black", fontSize:34}}>- V S -</Text>
      <Text style={{color:"red", fontSize:28}}>{item.valB}</Text>
    <Button color='gray' onPress={()=>this.endGame(item.key,  "teamB")} title="TeamA Won"/>
    <Button color='red' onPress={()=>this.endGame(item.key,  "teamA")} title="TeamB Won"/>
    </View>
    )}
    />
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

        <Button onPress={this.print} title="Print"> u</Button>

        <TouchableHighlight   onPress={() => {
            this.setModalVisible(!this.state.modalVisible, "something").then(this.AddMaster2());}}>
              <Text style={{backgroundColor:'orange' , fontSize:32}}>Done</Text>
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
    borderWidth: 1,
    borderColor: "red",
   
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
    backgroundColor: '#ababab',
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
    backgroundColor: '#64e723',
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
    backgroundColor: 'white',
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

