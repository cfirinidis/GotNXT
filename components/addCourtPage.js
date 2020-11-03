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
import styles from './generalStyle'
import firebase from '../elements/Firebase';
import Input from '../elements/Input';

class addCourtPage extends React.Component {
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



  onPressAdd=()=>{
    console.log("ADD", this.state.newCourtName.replace(/\s/g, '').length)
    // firebase.database().ref('courts/' + "black" + '/list/').set([this.state.newName]) 
  }

  logOut=()=>{
    this.props.navigation.navigate('Login');
  }

  componentDidMount(){
     console.log("COMPONENT DID MOUNT - Add Courtt", this.state.loading)
    //   let c = firebase.database().ref('courts')
    //   let handle = firebase.auth().currentUser.displayName
    //   return c.once('value', snapshot => {
    //       let x =  snapshot.val()
    //       let all = []
    //       let y = []
    //       for( i in x){
    //         if(snapshot.child(i).val().owner === handle ){
    //           y.push(i)
    //         }
    //         all.push(i)
    //       }
    //   // adds all courts to database
    //   this.props.readCourts(all)
    //   this.setState({courts: y});
   
     
    //   });
      this.setState({loading: false})
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
    this.props.navigation.navigate("Setup", {courtName: this.state.newCourtName}); 
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
      <View style={styles.topPart}>
            <View style={styles.info}>
             
              <Text style={styles.infoKey}>
                  EMAIL: 
                  <Text style={styles.infoValue}> { user.providerData[0]['email'] }
                  </Text>
              </Text>
              <Text style={styles.infoKey}>
                HANDLE:
                <Text style={styles.infoValue}> {user.providerData[0]['displayName']} 
                </Text>
              </Text>
      
            </View>

              <View style={styles.logOut}>
                    <TouchableOpacity style={styles.logOutButton} onPress={this.logOut.bind(this)}>
                      <Text style={styles.logOutText}> Log Out  </Text>
                    </TouchableOpacity>
                </View>
          </View>
        <Input
            placeholder= " NEW COURT NAME "
            onChangeText={newCourtName => this.setState({newCourtName}) }
            value={this.state.newCourtName}
            />

            <TouchableOpacity style={styles.button} onPress={()=>this.onPressCreateCourt(handle)}>
                <Text style={styles.buttonText}>ADD COURT</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(addCourtPage);







