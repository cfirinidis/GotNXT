import React from 'react';
import{
	StyleSheet,
	Text,
	Alert,
	View,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
  TouchableHighlight,
	AsyncStorage,
  Modal,
} from 'react-native';
import configureStore from './store';
import { connect } from 'react-redux';
import { setupArena, addCourtToCompList } from '../store/actions';
import firebase from '../elements/Firebase';
import SelectMultiple from 'react-native-select-multiple';

class Setup extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         Arena: [],
         courtsNum: '',
         capacity: "",
         courtArr:[],
         test:'',
         completeList: {},
         numGamesModal: false,
         title:'',
         gamesStarted: [],
         numGamesStarted: [],
         courtName: this.props.navigation.getParam("courtName", "blank"),
       };
     }

  async resetAll(){
       AsyncAlert = (title, msg) => new Promise((resolve) => {  
        Alert.alert(
                    title,
                    msg,
                    [ {text: "YES", onPress: () => { resolve('YES') }},
                      {text: "NO", onPress: () => { resolve('NO') }}  ],
                    { cancelable: false},
                    );
      });
    var answer =  await AsyncAlert ('RESET ALL', "Are you sure?")
  
    if (answer == "YES"){
      this.setState({courtsNum : '' });
      this.setState({capacity : '' });
      this.setState({courtArr : [] });
      this.setState({numGamesStarted: [] });
      this.setState({gamesStarted: [] });
      configureStore.getState().compListReducer = {}
      configureStore.getState().masterListReducer = []
      configureStore.getState().arenaReducer = []
    }
     else{return 0}
  }

  loadData = async() =>{
    try{
      // let mas = await AsyncStorage.getItem('master');
      let are = await AsyncStorage.getItem('arena');
      let cap = await AsyncStorage.getItem('capacity');
      let cNum = await AsyncStorage.getItem('courtN');
      let cArray = await AsyncStorage.getItem('courtA');
      let mlr = await AsyncStorage.getItem('masterList');
      let cl = await AsyncStorage.getItem('compList')
      configureStore.getState().compListReducer = JSON.parse(cl)
      configureStore.getState().masterListReducer = JSON.parse(mlr);
      configureStore.getState().arenaReducer = JSON.parse(are);
      this.state.capacity = JSON.parse(cap);
      this.state.courtsNum = JSON.parse(cNum);
      this.state.courtArr = JSON.parse(cArray);
      this.setState({capacity:this.state.capacity});
      this.setState({courtsNum:this.state.courtsNum});
      this.setState({courtArr:this.state.courtArr});
      this.props.navigation.navigate("MainActivity", { cap:this.state.capacity, 
      courtsNum:this.state.courtsNum, courtArr: this.state.courtArr, courtName: this.state.courtName});
    }
    catch(error){
      console.log("ERROR")
      alert(error);
    }
  }

   onSelectionsChangeGamesStarted=(gamesStarted)=>{
    this.setState({ gamesStarted })
  }

  setModalGamesVisible=(visible, p)=> new Promise((resolve)=> {
    this.state.title = p
    this.setState({numGamesModal: visible})
  });

  createPlaceholders=(answer)=>{
    for (var i=0; i<parseInt(this.state.courtsNum)+1; i++){
          this.state.courtArr.push("Court : "+ (i))
      }//for loop
      this.state.courtArr.push("Waiting : "+ 'W')
      this.props.setupArena(this.state.courtsNum, this.state.capacity, this.state.gamesStarted, answer, this.state.courtName)
      this.props.addCourtToCompList(this.state.courtName);
      this.props.navigation.navigate("MainActivity", { cap:this.state.capacity, 
        courtsNum:this.state.courtsNum, courtArr: this.state.courtArr, courtName: this.state.courtName});     
  }//end of func

  async SetupCourt(){
    AsyncAlert = (title, msg) => new Promise((resolve, reject) => {  
        Alert.alert(
                    title,
                    msg,
                    [ {text: "YES", onPress: () => { resolve('YES') }},
                      {text: "NO", onPress: () => { resolve('NO') }}  ],
                    { cancelable: false},
                    );
      });
    if (isNaN(this.state.courtsNum ) || this.state.courtsNum.replace(/\s/g, '').length == 0) {
      Alert.alert("Enter # of available Courts")
    }
    else if(this.state.capacity.replace(/\s/g, '').length==0){
     Alert.alert("Please enter Number of Players PER TEAM") 
    }
    else if(configureStore.getState().arenaReducer.length>0){
      Alert.alert("Already Setup, to erase press RESET")
      this.props.navigation.navigate("MainActivity", { cap:this.state.capacity, 
      courtsNum:this.state.courtsNum, courtArr: this.state.courtArr, courtName: this.state.courtName });
    }
    else{
      let inProgress = await AsyncAlert("Have Games Started?", "")
      if (inProgress == "NO"){
        this.createPlaceholders(inProgress)
      }
      else{
        this.state.numGamesStarted.push('ALL')
        for (let i=1; i<=this.state.courtsNum; ++i){
           this.state.numGamesStarted.push((i).toString())
          }
        this.setModalGamesVisible(true, "Number Of Games Started" )
      }  
    }
  }

 render() {
  let user = firebase.auth().currentUser;
   return (    
   		<View style={styles.wrapper}>
      <KeyboardAvoidingView> 
      
      <View style={styles.info}>
      <Text style={styles.textBox}>
         COURT: 
          <Text style={{color:'black'}}> { this.state.courtName }
          </Text>
      </Text>
      <Text style={styles.textBox}>
         HANDLE:
          <Text style={{color:'white'}}> { user.providerData[0]['displayName']} 
          </Text>
        </Text>

      </View>
      <Text style={styles.title}> GotNXT </Text>
    
            <TextInput
              placeholderTextColor= "purple" 
              underlineColorAndroid="gray" 
              placeholder=" Enter # Of Courts "
              onChangeText={(courtsNum) => this.setState({courtsNum: courtsNum }) }
              // value={ this.state.courtsNum}
              value={ this.state.courtsNum}
              style = {styles.textInput}
              keyboardType={'numeric'}  
            />

            <TextInput 
              placeholderTextColor= "purple" 
              underlineColorAndroid="gray"
              placeholder=" Total Players On Each TEAM "
              onChangeText={capacity => this.setState({ capacity: capacity}) }
				      style={styles.textInput}  
              value = {this.state.capacity} 
              keyboardType={'numeric'}  
            />

    <TouchableOpacity  onPress={this.SetupCourt.bind(this)} style={styles.doneButton} >
      <Text style={styles.text}> DONE </Text>
    </TouchableOpacity>

    <TouchableOpacity  onPress={this.resetAll.bind(this)} style={styles.resetButton} >
      <Text style={styles.text}> RESET </Text>
    </TouchableOpacity>

    <TouchableOpacity  onPress={this.loadData.bind(this)} style={styles.loadButton} >
      <Text style={styles.text}> LOAD </Text>
    </TouchableOpacity>

    <Modal visible={this.state.numGamesModal}>
      <View  style={styles.modalStyle }>
        <Text style={{fontSize:30, backgroundColor:'green', color:'black'}}>{this.state.title} </Text>
        <SelectMultiple      
          items={ this.state.numGamesStarted }
          maxSelect={1}
          selectedItems={ this.state.gamesStarted }
          onSelectionsChange={this.onSelectionsChangeGamesStarted} />
          <TouchableHighlight   onPress={() => 
              this.setModalGamesVisible(!this.state.numGamesModal, "Replacements").then(this.createPlaceholders("YES"))} 
              style={styles.modalButtons}>
            <Text style={styles.modalText}>Done</Text>
          </TouchableHighlight>
           </View>
    </Modal>

    <Text style={styles.footer}>ConzStructions</Text>
     </KeyboardAvoidingView>
      </View>
   );
 }
}


const styles = StyleSheet.create({
	wrapper: {
    flex: 1,
		backgroundColor: '#e8eae7',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    width: '100%',
    height: '100%',
	},
  title: {
    fontSize: 40,
    paddingTop:18,
    marginBottom: 10,
    color: 'gray',
    fontWeight: 'bold',
    textAlign:'center',
  },
  footer:{
    fontSize:14,
    position:'absolute',
    textAlign:'center',
    top: "100%",
    width:"100%",
  },
	textInput: {
		padding: 18,
    marginBottom: 10,
		fontSize: 24,
		color: "red",
		backgroundColor: '#e8eae7',
    textAlign:"center"
	},
  text: {
    fontSize:28,
    color: "black",
    fontWeight:'bold',
    textAlign:"center",
    // justifyContent: 'center',
    // alignItems:'center',
  },
  info:{
    backgroundColor: 'lightgray',
    width: '50%',
  },
  textBox:{
    fontSize:24,
    textAlign:"left",
    color:'orange',
  },
  resetButton: {
    fontSize: 26,
    justifyContent: 'center',
    backgroundColor: '#ffe6e4',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 4,
    borderRadius: 50,
    marginVertical: 12,
    width: "45%",
    height: 60,
  },
   doneButton: {
    fontSize: 26,
    justifyContent: 'center',
    backgroundColor: '#e8ffdd',
    borderColor: '#51ff00',
    borderWidth: 4,
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 12,
    width: "45%",
    height: 60,
  },
   loadButton: {
    fontSize: 26,
    justifyContent: 'center',
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#fff2d3',
    borderColor: '#ffd800',
    borderWidth: 4,
    marginVertical: 12,
    width: "45%",
    height: 60,
  },
    modalStyle:{
    marginTop: 20,
    marginBottom:130,
  },
  modalButtons:{
    width: '40%',
    height: 60,
    left: '50%',
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
   modalText: {
    fontSize:30,
    color: 'black',
  },
});	


const mapStateToProps = (state) => {
  // console.log("STATE : ", state);
  return{
    playerlists: state.compListReducer.origCompList,
    shooterRedux: state.shooterReducer.shooter,
    reduxMasterList: state.masterListReducer.reduxMasterList,
    arenaRedux: state.arenaReducer.arenaRedux
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    setupArena:(courtsNum, capacity, gameStarted, answer,courtName)=>dispatch(setupArena(courtsNum, capacity, gameStarted, answer, courtName)),
    addCourtToCompList:(courtName)=>dispatch(addCourtToCompList(courtName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);

