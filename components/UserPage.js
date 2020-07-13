import React from 'react';
import{
	StyleSheet,
	Text,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
	KeyboardAvoidingView,
	TouchableOpacity,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import {readCourts } from '../store/actions';
import configureStore from './store';
import firebase from '../elements/Firebase';
import Input from '../elements/Input';

class UserPage extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         email: '',
         password: '',
         newName:'',
         newCourtName:'',
         loading: 'true',
          courts: [],
          date: new Date(),
          DUMB: [],
          wrong: ["blue", "pink", 'orange'],
          courtName: '',
       };
     }

    // NEEDS :: ADD COURT FUNCTION  , STATS LINK to personalStats.js

  tempBridge=()=>{
    console.log("BRIDGE")
    this.props.navigation.navigate("activeCourts");  
  }

  goToAddCourt=()=>{
    this.props.navigation.navigate('addCourtPage');
  }


  onPressAdd=()=>{
    console.log("ADD", this.state.newCourtName.replace(/\s/g, '').length)
    // firebase.database().ref('courts/' + "black" + '/list/').set([this.state.newName]) 
  }

  componentDidMount(){
      console.log("COMPONENT DID MOUNT", this.state.loading)
      let c = firebase.database().ref('courts')
      let handle = firebase.auth().currentUser.displayName
      return c.once('value', snapshot => {
          let x =  snapshot.val()
          let all = []
          let y = []
          for( i in x){
            if(snapshot.child(i).val().owner === handle ){
              y.push(i)
            }
            all.push(i)
          }
      // adds all courts to database
      this.props.readCourts(all)
      this.setState({courts: y});
      this.setState({loading: false})
     
      });
  }

  onPressCreateCourt=(handle)=>{
    console.log("CREATE COURT PRESS", this.state.newCourtName, handle)
    if(this.state.newCourtName.replace(/\s/g, '').length==0){
      Alert.alert('Please Enter Court Name')
      return 
    }
    firebase.database().ref('courts/'+ this.state.newCourtName).set({
      owner:handle, updated:this.state.date.toLocaleString('en-US'), list:[]
    })
    this.componentDidMount();
  }

courtSelected=(item)=>{
console.log("coiurt selected ",item)
this.state.courtName = item
this.props.navigation.navigate("UserList", {courtName: this.state.courtName} )
}

//RENDER

  renderCurrentState(){
    console.log("RENDER CURRENT STATE")
    console.log(this.state.loading)
    let user = firebase.auth().currentUser;
    let handle = user.providerData[0]['displayName']
 
    if(this.state.loading){
      console.log("LOADING RENDER")
      // this.something()
      return(
        <View style={styles.waiting}>
          <ActivityIndicator size='large' color='blue'/>
        </View>
        )
    }

    else if(user){
      this.state.email = user.providerData[0]['email']
      
      console.log("USER PROVIDED ",handle, this.state.date.toLocaleString('en-US'), 
                  
                  this.state.courts, this.state.date.toLocaleDateString())
                  console.log(this.state.date.toLocaleTimeString()  )
      // this.something();
  return(
      <KeyboardAvoidingView >
      <View >
          <View style={styles.info}>
          <Text style={styles.text}>
             EMAIL: 
              <Text style={{color:'black'}}> { user.providerData[0]['email'] }
              </Text>
          </Text>
          <Text style={styles.text}>
             HANDLE:
              <Text style={{color:'white'}}> { handle} 
              </Text>
            </Text>
          </View>
        <Text style={{fontSize:24, textAlign:'center', backgroundColor:'white'}}>YOUR COURTS</Text>
           <View>
             {this.state.courts.map((item, key)=>(
                <Text  key={key} style={{fontSize:22, marginBottom: 10, color: 'pink', marginLeft:'15%'}}
                  onPress={()=>this.courtSelected(item) }>
                  {item}
             </Text>)
        )}
      </View>


          <TouchableOpacity style={styles.login} onPress={this.tempBridge.bind(this)}>
             <Text style={styles.login}> Active Court Lists  </Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.login} onPress={this.goToAddCourt.bind(this)}>
             <Text style={styles.login}> Add New Court  </Text>
           </TouchableOpacity>



      </View>
      </KeyboardAvoidingView>
      )
    }
    else{
      return(
      <Text>NO ACCOUNT Found</Text>
      )
    }
}

render(){
  return(
    <View style={styles.container}>
       <ScrollView>
          {this.renderCurrentState()}
      </ScrollView>
    </View>
    );
  }
}
  

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent:'center',
    backgroundColor:'gray',
    width: "100%"
  },
  info:{
    backgroundColor: 'lightgray',
    width: '50%',
  },
  text:{
    fontSize:24,
    textAlign:"left",
    color:'orange',
  },
  login:{
    fontSize:20,
    textAlign:"center",
    color:'white',
  },
  button: {
    backgroundColor:'#1c313a',
    borderRadius: 50,
    width: "75%",
    marginVertical: 10,
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center',
    left:"12%",

  },
  waiting : {
    justifyContent:'center',
    backgroundColor:'yellow',
  },
  buttonText: {
    fontSize:18,
    fontWeight:'500',
    color:'white',
    textAlign:'center'
  }
});




const mapStateToProps = (state) => {
  // console.log("STATE MAIN: ", state);
  return{
    playerlists: state.compListReducer.origCompList,
    shooterRedux: state.shooterReducer.shooter,
    reduxMasterList: state.masterListReducer.reduxMasterList,
    arenaRedux: state.arenaReducer.arenaReduxx,
    dbcourts: state.readCourtReducer.dbcourts,
    // loginUser: state.userReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      readCourts:(courtName)=>dispatch(readCourts(courtName))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);







// <Input
// placeholder= " NEW COURT NAME "
// onChangeText={newCourtName => this.setState({newCourtName}) }
// value={this.state.newCourtName}
// />


// <TouchableOpacity style={styles.button} onPress={()=>this.onPressCreateCourt(handle)}>
//  <Text style={styles.buttonText}>ADD COURT</Text>
// </TouchableOpacity>

// <Input
// placeholder= " NEW Player "
// onChangeText={newName => this.setState({newName}) }
// value={this.state.newName}
// />

// <TouchableOpacity style={styles.button} onPress={this.onPressAdd.bind(this)}>
//  <Text style={styles.buttonText}>ADD NAMES</Text>
// </TouchableOpacity>