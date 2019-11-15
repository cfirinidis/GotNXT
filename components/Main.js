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
    // console.log("ADD TO MASTer",this.state.SampleArray);
    this.state.masterList.push(this.state.SampleArray)
    this.setState({SampleArray : []})  
  }//good


  // ShowAddress=()=>{
  //   console.log(this.state.masterList)
  //   console.log(this.state.cap)
  //   console.log(this.state.current)
  //   console.log(this.state.Arena)
  //   this.setState({current: this.state.current+1})
  // }

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
    var courtNum = 1
    var loser = "teamB"
    var temp = []
    for(i in this.state.Arena[courtNum-1][loser][0]){
      temp.push(this.state.Arena[courtNum-1][loser][0][i])
    }   
    
    this.state.Arena[courtNum-1][loser] = new Array()
    this.state.masterList.push(temp)
    // console.log("DELETE: ", this.state.Arena)
    var crash = 0;
    var teamNum = 0;
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
            if('teamNum '== teamcap ){
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
      let teamcap = (this.state.cap/2);
      let delArray = [];
      let crash = 0;
      let names = 0;
      let numA = 0;
      let numB = 0;
      // console.log('Teamnuma :'  ,this.state.Arena, "NBUMM: ",this.state.Arena['teamNumA'], "NUM______", this.state.Arena['Num']  )
      this.state.Arena['teamNumA'] = "LAME";
      
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
        this.setState({teamNumA: numA})
        this.setState({teamNumA: numA})
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
              
  toggleModal = () => {
    console.log("TOGGLE", this.state.answer)
    this.setState({ isModalVisible: !this.state.isModalVisible })
    for(var i =0; i<3; i++){
      console.log("WHILE: ", i)
    }   
  };

   deleteGame = (x) => {
    console.log("I didnt press anything : ",x)   
  };


 render() {

  let Game = this.state.Arena.map((val, key)=> {
    let A = []
    let B = []
    let t = {}
    // console.log("TOP", val, key)
    for (keys in val){
      // console.log("key : ", keys, val )
      if (keys == "teamA"){
        console.log("tema A: ", val[keys])
        for (things in val[keys]){
          console.log("THONGS: ", things, val[keys][things].length)
          for (players in val[keys][things]){
            console.log("PLAYERS", val[keys][things][players]['player'])
            A += [val[keys][things][players]['player'] + ' ']
          }
        }
      }
      else{
        for (things in val[keys]){
          console.log("THONGS: ", things, val[keys][things].length)
          for (players in val[keys][things]){
            console.log("PLAYERS", val[keys][things][players]['player'])
            B += [val[keys][things][players]['player'] + ' ']
          }
        }



      }
     }
     t["key"] = val.Num
     t["key"] += A
     t["key"] += B
    console.log("AAAAAA : ", t)
       
      // console.log('TA:', val['teamA'], "TB: ", val['teamA'], val.teamA.player)  
      // return  ([val.Num, val.teamA, val.teamB]) 
    // return["NUM  : ", val.Num , "TeamA: ", A,  " TeamB : " ,B ]
  return t
}); 

      //  let Game =  this.state.Arena.map((val, key)=>{
      //   return <Games key={key} keyval={key} val={val}
      //            />
      // });

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
        <Text style={styles.addButtonText}>+ Name(s)</Text>
    </TouchableOpacity>       

    <TouchableOpacity  onPress={this.AddMaster.bind(this)} style={styles.addButton} >
        < Text style={styles.addButtonText}> +  LIST </Text>
    </TouchableOpacity>

    <TouchableOpacity  onPress={this.StartGame.bind(this)} style={styles.addStart } >
        <Text style={styles.addButtonText}>Start</Text>
    </TouchableOpacity>

    <TouchableOpacity  onPress={this.GoToLists.bind(this)} style={styles.list} >
        <Text style={styles.addButtonText}> List </Text>
    </TouchableOpacity>

          <Button color="red" style={{padding:80}} 
           title="End Game" onPress={this.endGame.bind(this)} />

    

     <View >  
    <Text style={{fontSize:40, backgroundColor:'orange'}}>Current Games</Text>
    <FlatList
    data={Game} style={styles.textInput}
    renderItem={({ item }) => (
    <View>
    <Text style={{fontSize:30, color:'black'}} >{item.key}</Text>
    <Button color='red' width="50%" flexDirection='row' onPress={()=>this.deleteGame(item.key)} title="TeamA Won"/>
     <Button color='red' width="25%" onPress={()=>this.deleteGame(item.key)} title="TeamB Won"/>

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


          // <FlatList
          //           horizontal={true}
          //           data={this.state.topPopularMovies}
          //           renderItem={({ item }) => (
          //           <View>

          //               <Text>{item.original_title}</Text>
          //               <Button onPress={this.mybuttonclick} title="hello"/>
          //           </View>
          //           )}
          //           keyExtractor={item => item.id}
          //       />
          //   </View>




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

    //    <Text style={{fontSize:24, color:'black'}}>
    // {Game}
    // </Text>

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
  endGame: {
    width: 90,
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
    color: 'yellow',
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

