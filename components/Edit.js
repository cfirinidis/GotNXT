import React from 'react';
import{
	StyleSheet,
	Text,
	Alert,
	View,
	TextInput,
  Modal,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import firebase from '../elements/Firebase';
import configureStore from './store';
import { connect } from 'react-redux';
import { editCompList, editMSRedux } from '../store/actions';


class EditNames extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
          courtArr: this.props.navigation.getParam("courtArr", "blank"),
          courtName: this.props.navigation.getParam("courtName", "blank"),
          modalInputVisible: false,
          title: '',
          name: '',
          wrongName: '',
          members:{}
       };
     }




     componentDidMount(){
      console.log("MAIN COMPONENT DID MOUNT")
          let c = firebase.database().ref('users')
          return c.once('value', snapshot => {
            // console.log(snapshot)
              let users =  snapshot.val()
              let names = {}
              for( handle in users){
                // console.log("FOR", handle)
                // this.state.list.push(snapshot.val()[i])
                names[handle.toLowerCase()]=handle
              }
              // console.log("NAMES:", names)
          this.setState({members: names});
          // this.setState({loading: false})
          });
    }

  setModalInputVisible=(visible, p, wrong)=> new Promise((resolve)=> {
    this.state.title = p;
    if (visible == true){ this.state.wrongName = wrong;}
      this.setState({modalInputVisible: visible})
  });

  getNames=()=>{
    r = [];
     Object.values(configureStore.getState().masterListReducer).map(function(val) {
        for (j in val[1]){
          r.push(val[1][j]['player']);
          c += 1;
        }
      });
    return r
  }

  GoToList=()=>{
      this.props.navigation.navigate("List", {courtArr: this.state.courtArr}); }


editName=()=>{
  let san = this.state.name.toLowerCase()
  let wrongSan = this.state.wrongName.toLowerCase()
  console.log("EDITNAME FUNC", san, configureStore.getState().compListReducer)
  if (san.length == 0 || san in configureStore.getState().compListReducer ){
    setTimeout(()=>{
      Alert.alert("Name Already Exists or No Name Entered")
    }, 1);
    this.setState({name:''})
    return 0
  }

  let mem = (san in this.state.members) ? true : false;


  // console.log("WRONGSAN", wrongSan)
  this.props.edit(san, wrongSan, this.state.courtName)
  this.props.editMSRedux(this.state.name, this.state.wrongName)
  let alertName = this.state.name
    setTimeout( ()=>{
      this.setState({name:''})
      Alert.alert("CHANGE: ", this.state.wrongName + '\n' + "\n TO \n" + '\n' +  alertName);
      this.GoToList();   
  },1);   
}

render() {
let playerList = this.getNames()
console.log(playerList)

return (
  <ScrollView>
  <View>  
      
  <Text style={styles.header}>EDIT NAMES</Text>
  <View style={{backgroundColor:'#feebff', marginBottom:25}}>
    { playerList.map((item, key)=>(
           <Text  key={key} style={{fontSize:30, marginBottom: 25, color: 'blue'}}
            onPress={()=>this.setModalInputVisible(!this.state.modalInputVisible, "EDIT  -  "+ item, item.toString() ) }>
           {key+1}   { item } </Text>)
           )}
  </View>
   
    <Modal visible={this.state.modalInputVisible}>
      <View style={styles.modalStyle}>
          <Text style={{fontSize:30, backgroundColor:'gray', color:'white', marginBottom:70, textAlign:'center'}}>
          EDIT NAMES </Text>        
        <TextInput
            placeholder= {this.state.title}
            onChangeText={(name) => this.setState({name}) }
            value={this.state.name}
            style={styles.textInput} 
            placeholderTextColor='red' />
        <TouchableHighlight onPress={ () =>{
            this.setModalInputVisible(!this.state.modalInputVisible, "something").then(this.editName())}} 
          style={styles.modalButtons}>
              <Text style={styles.modalText}>DONE</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  </View>
  </ScrollView>
    )};
}


const styles = StyleSheet.create({
   header: {
    fontSize:30,
    height: 60,
    padding: 8,
    backgroundColor:'gray',
    color: 'white',
    width:"100%",
    alignItems: 'center',
    justifyContent: 'center',
 },
   textInput: {
    fontSize: 28,
    color: "red",
    marginBottom: 60,
    width: '75%',
    borderWidth: 2,
    left:10,
    borderColor: 'black',
    height: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    textAlign: "center", 
    justifyContent: 'center', 
  },
  modalText: {
    fontSize:30,
    color: 'white',
  },
  modalStyle:{
    marginTop: 20,
    // marginBottom: 50,
    height:'100%',
    backgroundColor: '#fff0f0',
  },
  modalButtons:{
    width: '40%',
    height: 60,
    left:10,
    backgroundColor: '#fbdcf5',
    borderRadius: 50,
    borderWidth:5,
    justifyContent: 'center',
    alignItems: 'center',
  },

});	


const mapStateToProps = (state) => {
  // console.log("STATE : ", state);
  return{
    playerlists: state.compListReducer.origCompList,
    reduxMasterList: state.masterListReducer.reduxMasterList
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    edit:(right, wrong, courtName)=>dispatch(editCompList(right, wrong, courtName)),
    editMSRedux:(right, wrong)=>dispatch(editMSRedux(right, wrong))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditNames);
