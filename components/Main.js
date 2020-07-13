import React, { Component }  from 'react';
import{
  Text,
  Alert,
  View,
  FlatList,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableHighlight,
  AsyncStorage,
  Modal,
} from 'react-native';
import firebase from '../elements/Firebase';
import configureStore from './store';
import { connect } from 'react-redux';
import { addToCompList, delFromCompList , addToShooters, resetShooters, addToReduxMaster,
  shootML, correctOrSub, reduxUpdateMaster, removeFromMLRedux,
  endGameMLRedux, arenaCorOrSub, updatePlayerNums, addSet, winWinRedux, winLossResults} from '../store/actions';
import styles from './mainStyleFile'
import ListAndStartButton from '../elements/ListAndStartButton';
import EnterName from '../elements/EnterName';
import NameBox from '../elements/NameBox';
import SelectMultiple from 'react-native-select-multiple';


class MainActivity extends React.Component { 
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
        members:{},
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
        prefCourt: [],
        totalPlayers:0,
        tempNameArray : [], 
        cap: this.props.navigation.getParam("cap", "blank"),
        courtsNum: this.props.navigation.getParam("courtsNum", "blank"),
        courtArr: this.props.navigation.getParam("courtArr", "blank"),
        courtName: this.props.navigation.getParam("courtName", "blank"),
        courtArrPref: [],
        current: 0,
       };
     }

  AddItemsToArray(){
    // let san = this.state.Name.replace(/\s/g, '').toLowerCase()
    let san = this.state.Name.toLowerCase()
    console.log("SAN CUZ CRASH: ", san, this.state.courtName, configureStore.getState().compListReducer)
    // console.log(san, "TESTG", /\s/.test(san), configureStore.getState().compListReducer, this.state.members)
    if (!(configureStore.getState().compListReducer[this.state.courtName].hasOwnProperty(san))){
      if (san.length != 0 && !/\s/.test(san) ){

      // add if name is member: True
        if (san in this.state.members){
          this.state.tempNameArray.push({player: this.state.members[san], replacement: false, member:true});
          Alert.alert("HES A MEMBER")  
        }
        else{
          this.state.tempNameArray.push({player: this.state.Name, replacement: false, member:false});
        }
      }
      else{
        Alert.alert("Please Enter A Name Without ANY Spaces")
        return 
      }
      this.props.add(san, this.state.courtName, this.state.Name) 
      this.setState({Name:''})
      this.setState({tempNameArray: this.state.tempNameArray})
      this.setState({totalPlayers: this.state.totalPlayers + 1})
  }//good
  else{  Alert.alert("Name Already Exists " )}
}

  addToCurA=(list, n)=>{
    this.state.curPlayersA[n] = list;
  }

  addToCurB=(list, n)=>{
    this.state.curPlayersB[n] = list;
  }

   clearList=()=>{
      this.props.del(this.state.tempNameArray, this.state.courtName)
      this.setState({tempNameArray:[]})
    }

  doneAddingFunc=()=>{
    if (this.state.tempNameArray.length === 0 ){
      Alert.alert("Please Enter a Name " )
    }
    else{
    this.props.addToReduxMaster(this.state.tempNameArray)
    this.setState({tempNameArray : []})  
    this.saveData();
    }
  }//good

  componentDidMount(){
    console.log("MAIN COMPONENT DID MOUNT")
        let c = firebase.database().ref('users')
        return c.once('value', snapshot => {
          // console.log(snapshot)
            let users =  snapshot.val()
            let names = {}
            for( handle in users){
              console.log("FOR", handle)
              // this.state.list.push(snapshot.val()[i])
              names[handle.toLowerCase()]=handle
            }
            console.log("NAMES:", names)
        this.setState({members: names});
        // this.setState({loading: false})
        });
  }

  AddMaster2=()=>{
      let reduxShooter = configureStore.getState().shooterReducer
      this.props.shootML(this.state.restNum, this.state.hitShot, reduxShooter)
      this.setState({hitShot: [] });
      this.setState({restNum: 0 });
      this.props.resetShooters()
      if (Platform.OS == 'android'){
      this.StartGame();
        }
      else{
         setTimeout(()=>{
          this.StartGame();
      }, 100);
     }
    }//good

  GoToLists=()=>{
    this.props.navigation.navigate("List", {list: configureStore.getState().masterListReducer, courtArr: this.state.courtArr,
          courtName: this.state.courtName}); }
   
  GoToModal=()=>{
    this.props.navigation.navigate("Modal");
  }

  CorrectionOrSub=()=>{
    if (this.state.remPlayer.length == 0){
      this.setState({ tempCourt:[] });
      this.setState({ remPlayer:[] });
      return 0
    }
      this.props.arenaCorOrSub(this.state.remPlayer, this.state.tempNum, this.state.team, this.state.courtName);
      let repP = [];
      Object.values(configureStore.getState().masterListReducer).map(function(val) {
        for (j in val[1]){
          repP.push(val[1][j]['player']);
        }
      });

    if(this.state.remPlayer[0]['label'][0] != '*'){ 
      this.props.correctOrSub(this.state.remPlayer[0]['label'])
    }
    this.state.tempCourt = [];
    this.state.remPlayer = [];
    this.state.current = this.state.tempNum-1;
    this.state.allAvailable = repP
    if(this.state.repFlag == false){
      this.setModalVisible('modalRepPlayerVisible',!this.state.modalRepPlayerVisible, "Enter Correction");
    }
    else{
      this.setModalVisible('modalRepPlayerVisible', !this.state.modalRepPlayerVisible, "Enter Substitute");
    }
  }

updateMaster=()=>{
    if (this.state.move.length == 0){
      Alert.alert("No one selected as replacement.")
      this.setState( { move: [] } );
      this.setState( { repFlag: false } );
       return 0
    }

    this.props.reduxUpdateMaster(this.state.move, this.state.repFlag)
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
    // console.log("hit shot remPLayer: ", remPlayer)
    this.setState({ remPlayer })
  }

  setModalVisible=(prop, val, p)=> new Promise((resolve)=> {
    this.state.title = p
    const state = this.state;
    state[prop] = val;
    this.setState(state)
  });

  removeFromList=(delArray)=>{
    this.props.removeFromMLRedux(delArray)
    return [];
  }

  extractFromList=(names)=>{
    let set = [];
    for (name in configureStore.getState().masterListReducer[names][1]){ 
        set.push(configureStore.getState().masterListReducer[names][1][name])
        }
    return set
  }

  print=()=>{
    console.log("PRINT SOMETHING ***********************")
  }

  saveData=()=>{
    let ML = JSON.stringify(configureStore.getState().masterListReducer);
    let CL = JSON.stringify(configureStore.getState().compListReducer);
    let AR  = JSON.stringify(configureStore.getState().arenaReducer);
    let CAP = JSON.stringify(this.state.cap);
    let CN = JSON.stringify(this.state.courtsNum);
    let CARRAY = JSON.stringify(this.state.courtArr);
    AsyncStorage.setItem('compList', CL)
    AsyncStorage.setItem('masterList', ML);
    AsyncStorage.setItem('arena', AR);
    AsyncStorage.setItem('capacity', CAP);
    AsyncStorage.setItem('courtN', CN);
    AsyncStorage.setItem('courtA', CARRAY);
  }


  async StartGame(){
      let delArray = [];
      let names = 0;
      AsyncAlert = (title, msg) => new Promise((resolve, reject) => {  
        Alert.alert(
                    title,
                    msg,
                    [ {text: "YES", onPress: () => { resolve('YES') }},
                      {text: "NO", onPress: () => { resolve('NO') }}  ],
                    { cancelable: false},
                    );
      });
        let reduxML = configureStore.getState().masterListReducer
        let arenaReducer = configureStore.getState().arenaReducer[0]
        for(let run = 0; run < reduxML.length; run++){//add full contingency
          // console.log("ERROR in STARTGAME", configureStore.getState().arenaReducer[0][this.state.courtName].length)
          while(this.state.current < arenaReducer[this.state.courtName].length && 
                arenaReducer[this.state.courtName][this.state.current]["teamANum"] + arenaReducer[this.state.courtName][this.state.current]["teamBNum"]
                == 2*this.state.cap){
                  this.state.current++;
                  }
                  if (this.state.current >= arenaReducer[this.state.courtName].length){
                    this.setState({ current: this.state.current})
                   Alert.alert("GAMES FULL!")
                   break
                }
              if(this.state.current + 1 != reduxML[names][0]['pref'] && reduxML[names][0]['pref'] != 0 ){
                  names++;
                }
              else if(reduxML[names][1].length + arenaReducer[this.state.courtName][this.state.current]["teamANum"]  <= this.state.cap
                || reduxML[names][1].length + arenaReducer[this.state.courtName][this.state.current]["teamBNum"]  <= this.state.cap){
                let team = (reduxML[names][1].length + arenaReducer[this.state.courtName][this.state.current]["teamANum"]  <= this.state.cap) ? "teamA":"teamB"
                let sets = this.extractFromList(names);
                this.props.updatePlayerNums(this.state.current, team, reduxML[names][1].length, this.state.courtName )
                delArray += [names];
                this.props.addSet(this.state.current, team, sets, this.state.courtName);
                names++;
                if (names == reduxML.length){
                    names = 0
                    delArray = this.removeFromList(delArray)
                }}
              else  if( arenaReducer[this.state.courtName][this.state.current]["teamANum"] + 
                          arenaReducer[this.state.courtName][this.state.current]["teamBNum"] != 2*this.state.cap){
                        let s = '';
                        for (i in reduxML[names][1]){
                          s += reduxML[names][1][i]['player'] + '  '  
                          this.props.addShooter(reduxML[names][1][i]['player'])
                        }
                        this.state.diff = (this.state.cap*2) - ( arenaReducer[this.state.courtName][this.state.current]["teamANum"]  + 
                                    arenaReducer[this.state.courtName][this.state.current]["teamBNum"] );
                        if ( this.state.diff >= configureStore.getState().shooterReducer.length ){
                            this.state.command = " Shoot for " + ( this.state.cap - arenaReducer[this.state.courtName][this.state.current]["teamANum"] + 
                      " To Play On TEAM-A")
                    this.state.diff = ( this.state.cap - arenaReducer[this.state.courtName][this.state.current]["teamANum"])
                        }
                        else{
                          this.state.command = "Shoot for " + this.state.diff
                        }
                        let response = await AsyncAlert(this.state.command, s);
                        if (response == "YES"){
                            delArray += [names]
                            this.state.restNum = names - (delArray.length - 1)
                            delArray = this.removeFromList(delArray)
                            this.setModalVisible( 'modalVisible',true,  "Select Player(s) That Hit");
                            break
                          } 
                        else{this.setState({shooters: []});
                            delArray = this.removeFromList(delArray)
                            }
                names++;
                }
            // GAME READY
        if( arenaReducer[this.state.courtName][this.state.current]["teamANum"] + 
            arenaReducer[this.state.courtName][this.state.current]["teamBNum"] == 2*this.state.cap){
          this.setState({ current: this.state.current+1 })
          this.removeFromList( delArray )
          console.log("Inside if")
          break;
         }//if full        
        }//end of while
        this.saveData();
        console.log("ENMD OF STARTGAME ")
        this.setState({courtName: this.state.courtName})
  }


  onSelectionsChangePref = (prefCourt) => {
    this.setState({ prefCourt })
  }

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

      let sub = await replaceAlert("Replace Player", "Replacement / Correction")
      this.state.tempNum = num
      this.state.team = team
      if (sub =="WIN"){
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
        this.setModalVisible('modalPlayerVisible',!this.state.modalPlayerVisible, "Remove Player");    
      }
};


  async endGame(courtNum, loser, winner, status){
    if ( (configureStore.getState().arenaReducer[0][this.state.courtName][courtNum-1]["teamBNum"] +
         configureStore.getState().arenaReducer[0][this.state.courtName][courtNum-1]["teamANum"]) < (this.state.cap*2)) {
      alert("Game has not started");
      return
    }
    makeSure = () => new Promise((resolve) => {  
            Alert.alert(
                    "Are you Sure: ",
                    winner + " WON?",
                    [ {text: "Yes", onPress: () => { resolve('YES') }}, {text: "NO", onPress: () => { resolve('NO') }}  ],
                    { cancelable: false},
                    );
            });
    let winnerConfirmation = await makeSure();
    if (winnerConfirmation== "NO"){
      return
    }
      let temp = [];
      let titleP = '';
      let winLoss = {};
      this.state.current = courtNum-1
      let tempC = 0;
      let arenaRedx = configureStore.getState().arenaReducer[0]
      for (i in arenaRedx[this.state.courtName][courtNum-1][winner]){
        console.log("winnner", arenaRedx[this.state.courtName][courtNum-1][winner])
        console.log("WINNNNNN", arenaRedx[this.state.courtName][courtNum-1][winner][i][0]['player'])
        if (arenaRedx[this.state.courtName][courtNum-1][winner][i][0]['member'] == true){
           console.log("winloss: ", arenaRedx[this.state.courtName][courtNum-1][winner][i][0]['player'])
          winLoss[this.state.members[arenaRedx[this.state.courtName][courtNum-1][winner][i][0]['player'].toLowerCase()]] = 'won' 
        }
        // configureStore.getState().arenaReducer[courtNum-1][winner][i][0]['replacement'] = false 
        arenaRedx[this.state.courtName][courtNum-1][winner][i][0]['replacement'] = false
      }

      // console.log(arenaRedx)
      for (i=0; i< arenaRedx[this.state.courtName][courtNum-1][loser].length; i++){
        if (arenaRedx[this.state.courtName][courtNum-1][loser][i][0]['member'] == true){
          console.log("winloss: ", arenaRedx[this.state.courtName][courtNum-1][loser][i][0]['player'].toLowerCase())

          winLoss[this.state.members[arenaRedx[this.state.courtName][courtNum-1][loser][i][0]['player'].toLowerCase()]] = 'lost' 
        }
        if (arenaRedx[this.state.courtName][courtNum-1][loser][i][0]['replacement'] == false){
            temp.push(arenaRedx[this.state.courtName][courtNum-1][loser][i][0])
            titleP += " " + (arenaRedx[this.state.courtName][courtNum-1][loser][i][0]['player'])
            arenaRedx[this.state.courtName][courtNum-1][loser].splice(i, 1);
            i--;
            tempC += 1            
        }
        else{
          arenaRedx[this.state.courtName][courtNum-1][loser][i][0]['replacement'] = false  
        }



      } //end

      arenaRedx[this.state.courtName][courtNum-1][loser+"Num"] -= tempC;
      if (temp.length>0){ 
        if (status == 'reg'){
          this.props.endGameMLRedux(temp)
        }
        //winnerWinner
        else{
            this.setModalVisible('modalPrefVisible', !this.state.modalPrefVisible, "Select Preferred Court: ")     
            this.setState({current: 0});
            this.setState({winnersW: temp})
            this.saveData();
        }}


        console.log("SEND THIS TO FIREBASE", winLoss, this.state.courtName)
      this.props.winLossResults(winLoss, this.state.courtName)


      this.StartGame(); 


      







       
}

winnersWinners(){
  this.props.winWinRedux(this.state.prefCourt, this.state.winnersW);
  this.setState({prefCourt:[] })
  this.saveData();
}

 render() {
  // console.log("RENDER MASTERLIST:",configureStore.getState().masterListReducer)
  // console.log("RENDER GAME ",configureStore.getState().arenaReducer[0][this.state.courtName]    )
  console.log("FRANK")
  let Game = configureStore.getState().arenaReducer[0][this.state.courtName].map((val, key)=> {
    let A = []
    let B = []
    let t = {}
    let currentPlayerA = []
    let currentPlayerB = []
   
  for (keys in val){
      if (keys == "teamA"){
        for (things in val[keys]){
          for (players in val[keys][things]){
            A += [val[keys][things][players]['player']+'\n']
            currentPlayerA.push(val[keys][things][players]['player'])
      }}
      if(A.length>1){
        A = A.replace(/\n$/, "") 
      }
    }
      else if(keys == "teamB"){
        for (things in val[keys]){
          for (players in val[keys][things]){
            B += [val[keys][things][players]['player']+'\n']
            currentPlayerB.push(val[keys][things][players]['player'])}
      }
      if(B.length>1){
        B = B.replace(/\n$/, "") 
      }
    }}
  
     t["key"] =  val.Num.toString()
     t["valA"] = A 
     t["valB"] = B
  this.addToCurA(currentPlayerA, val.Num)
  this.addToCurB(currentPlayerB, val.Num)
if (A.length > 0 ){
  return t 
}
}); 

  let pending = Object.values(this.state.tempNameArray).map(function(vals) {
      let t= {} ;
      for (val in vals){
          if(vals[val] != false && vals[val] != true){
              t["key"] = vals[val]; 
        }}
      return t
  });

Game = Game.filter(function(item){
    if (item != undefined){
      return item
    }
});

   return (
      <KeyboardAvoidingView style={styles.wrapper}>
      <ScrollView>
      <View >
          <Text style={styles.topInfo}> Court Name: 
          <Text style={{color: "black", fontSize:20}}> { this.state.courtName} </Text>
        </Text>
      </View>
      <View>
          <EnterName onPress={this.AddItemsToArray.bind(this)} 
              onChangeText={(Name) => this.setState({ Name})} value={this.state.Name}>ADD +</EnterName>
          <View>
              <ListAndStartButton GoToListMethod={this.GoToLists.bind(this)} StartMethod={this.StartGame.bind(this)} /> 
             <NameBox  data={pending} clearListMethod={this.clearList.bind(this)} AddMasterMethod={this.doneAddingFunc.bind(this)} />  
          </View>

          <Text style={styles.curGameStyle}>Current Games</Text>
    
           <FlatList
              data={Game} 
              renderItem={({ item }) => (
              <View>
                <Text style={styles.gameBottonText}> Game {item.key} </Text>
              <View>

            <TouchableHighlight onPress={()=>this.replacePlayer(item.key, "teamA", this.state.curPlayersA) } style={styles.teamStyleA}>  
              <Text style={{color:"gray", fontSize:28}}>{item.valA}</Text>
            </TouchableHighlight>

          <TouchableHighlight onPress={()=>this.endGame(item.key, "teamB", "teamA", 'reg')} style={styles.teamAWonStyle}>
            <Text style={{color:"white", fontSize:26}}>Team A Won</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={()=>this.replacePlayer(item.key, "teamB", this.state.curPlayersB) } style={styles.teamStyleB}>
            <Text style={{color:"red", fontSize:28}}>{item.valB}</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={()=>this.endGame(item.key, "teamA", "teamB", 'reg') } style={styles.teamBWonStyle}>
            <Text style={{color:"white", fontSize:26}}>Team B Won</Text>
          </TouchableHighlight>

      </View>
          
          </View>)}/>
          
      </View>
      <View>
          <Modal 
          visible={this.state.modalVisible}>
            <View style={styles.modalStyle}>
              <Text style={{fontSize:30, backgroundColor:'gray', color:'white'}}>{this.state.title} </Text>
              <SelectMultiple
                maxSelect= {this.state.diff}
                items={configureStore.getState().shooterReducer}
                style={styles.modalStyle}
                selectedItems={ this.state.hitShot }
                onSelectionsChange={this.onSelectionsChange} />
              <TouchableHighlight   onPress={() => 
                  this.setModalVisible( 'modalVisible', !this.state.modalVisible, "something").then(this.AddMaster2())}
                   style={styles.modalButton}>
                  <Text style={styles.modalText}>Done</Text>
              </TouchableHighlight>
            </View>
          </Modal>

          <Modal 
          visible={this.state.modalPlayerVisible}>
            <View  style={styles.modalStyle }>
              <Text style={{fontSize:30, backgroundColor:'red', color:'white'}} >{this.state.title} </Text>
              <SelectMultiple
                maxSelect= {1}
                items={this.state.tempCourt}
                selectedItems={ this.state.remPlayer }
                onSelectionsChange={this.onSelectionsChangePlayer} />
              <TouchableHighlight   onPress={() => 
                  this.setModalVisible('modalPlayerVisible',!this.state.modalPlayerVisible, "something").then(this.CorrectionOrSub())}
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
                    this.setModalVisible('modalRepPlayerVisible', !this.state.modalRepPlayerVisible, "Replacements").then(this.updateMaster())} 
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
                  this.setModalVisible('modalPrefVisible',!this.state.modalPrefVisible, "something").then(this.winnersWinners()); 
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


const mapStateToProps = (state) => {
  // console.log("STATE MAIN: ", state);
  return{
    playerlists: state.compListReducer.origCompList,
    shooterRedux: state.shooterReducer.shooter,
    reduxMasterList: state.masterListReducer.reduxMasterList,
    arenaRedux: state.arenaReducer.arenaRedux,
    recordsRedux: state.recordsReducer.recordsRedux
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    add:(data, courtName, displayName)=>dispatch(addToCompList(data, courtName, displayName)),
    del:(data, courtName)=>dispatch(delFromCompList(data, courtName)),
    addShooter:(data)=>dispatch(addToShooters(data)),
    resetShooters:()=>dispatch(resetShooters()),
    addToReduxMaster:(data)=>dispatch(addToReduxMaster(data)),
    shootML:(restNum, hitShot, shooters)=>dispatch(shootML(restNum, hitShot, shooters)),
    correctOrSub:(name)=>dispatch(correctOrSub(name)),
    reduxUpdateMaster:(move, flag)=>dispatch(reduxUpdateMaster(move, flag)),
    removeFromMLRedux:(delArray)=>dispatch(removeFromMLRedux(delArray)),
    endGameMLRedux:(temp)=>dispatch(endGameMLRedux(temp)),
    winWinRedux:(prefCourt, winWin)=>dispatch(winWinRedux(prefCourt, winWin)),
    arenaCorOrSub:(remplayer, tempNum, team, courtName)=>dispatch(arenaCorOrSub(remplayer, tempNum, team, courtName)),
    updatePlayerNums:(current, team, mlSize, courtName)=>dispatch(updatePlayerNums(current, team, mlSize, courtName)),
    addSet:(current, team, sets, courtName)=>dispatch(addSet(current, team, sets, courtName)),
    winLossResults:(winLoss, courtName)=>dispatch(winLossResults(winLoss, courtName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainActivity);

