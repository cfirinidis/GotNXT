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
          DUMB: [],
          wrong: ["blue", "pink", 'orange'],
          courtName: ''
       };
     }

  //    let courts = firebase.database().ref('/courts');
  //    // console.log( firebase.database().ref('courts/').once('value', snapshot) )
  //    courts.once('value').then(snapshot=> {
  //      // console.log(snapshot.key, "*****", snapshot.val(), Object.keys(snapshot.val()))
  //      this.setState({courts: Object.keys(snapshot.val())})
  //      console.log("courts ", Object.keys(snapshot.val()), this.state.courts)
       
  //  });     

  tempBridge=()=>{
    this.props.navigation.navigate("Setup");  
  }

  onPressCreateCourt=()=>{
    console.log("HERE PRESS", configureStore.getState().compListReducer)
    firebase.database().ref('courts/'+ this.state.newCourtName).set({list:configureStore.getState().compListReducer})
  }

  onPressAdd=()=>{
    console.log("ADD", this.state.newCourtName)
    firebase.database().ref('courts/' + "black" + '/list/').set([this.state.newName]) 
  }

  componentDidMount(){

  //   downloadBikeObj() {
  //     return Fb.staticBikes
  //       .child(String(this.bookedBikeNo))
  //       .once('value')
  //       .then(bikeObj => {
  //         this.bikeObj = bikeObj.val;
  //         console.log("Save object is: ");
  //         console.log(this.bikeObj);
  //       }); // return promise
  // }
    // this.state.loading = true;
    // x = configureStore.getState().readCourtReducer
      console.log("COMPONENT DID MOUNT", this.state.loading)
      let c = firebase.database().ref('courts')
      return c.once('value', snapshot => {
          let x =  snapshot.val()
          let y = []
          for( i in x){
           
            y.push(i)
          }
      this.props.readCourts(y)
      this.setState({courts: y});
      this.setState({loading: false})
     
      });
      this.state.loading = true;
   
    console.log("LODING BOTTOM",this.state.loading)
   
  }

// PRINTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
                print=()=>{
                  console.log("PRINT")
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
      console.log("USER PROVIDED", this.state.courts)
      // this.something();
      return(

      <KeyboardAvoidingView >
      <View >

          <Text style={styles.text}> EMAIL: {user.providerData[0]['email']}</Text>
          <Text style={styles.text}> HANDLE: {user.providerData[0]['displayName']} </Text>

          <Input
            placeholder= " NEW COURT NAME "
            onChangeText={newCourtName => this.setState({newCourtName}) }
            value={this.state.newCourtName}
          />

          <TouchableOpacity style={styles.button} onPress={this.onPressCreateCourt.bind(this)}>
             <Text style={styles.buttonText}>ADD COURT</Text>
           </TouchableOpacity>

           <Input
            placeholder= " NEW Player "
            onChangeText={newName => this.setState({newName}) }
            value={this.state.newName}
          />

           <TouchableOpacity style={styles.button} onPress={this.onPressAdd.bind(this)}>
             <Text style={styles.buttonText}>ADD NAMES</Text>
           </TouchableOpacity>

        <Text style={{fontSize:24, textAlign:'center'}}>OPEN COURTS</Text>
           <View>
             {this.state.courts.map((item, key)=>(
                <Text  key={key} style={{fontSize:22, marginBottom: 10, color: 'pink', marginLeft:'15%'}}
                  onPress={()=>this.courtSelected(item) }>
                  {item}
             </Text>)
        )}
      </View>


          <TouchableOpacity style={styles.login} onPress={this.tempBridge.bind(this)}>
             <Text style={styles.login}> BRIDGE  </Text>
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
  text:{
    fontSize:32,
    textAlign:"center",
    color:'white',
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