import React from 'react';
import{
	Text,
  View,
  ScrollView,
  ActivityIndicator,
	KeyboardAvoidingView,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './generalStyle';
import {readCourts } from '../store/actions';
import firebase from '../elements/Firebase';

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

  logOut=()=>{
    this.props.navigation.navigate('Login');
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
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
      console.log("COMPONENET DID MOUNT   BAKCKCKCKCKCKC")
      });
  }

  componentWillUnmount() {
    console.log("WILL UNMOUNTTTTTT")
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {

    console.log("ONBACKPRESS")
    return true; 
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
      <View>
          <View style={styles.topPart}>
            <View style={styles.info}>
             
              <Text style={styles.infoKey}>
                  EMAIL: 
                  <Text style={styles.infoValue}> { user.providerData[0]['email'] }
                  </Text>
              </Text>
              <Text style={styles.infoKey}>
                HANDLE:
                <Text style={styles.infoValue}> { handle} 
                </Text>
              </Text>
      
            </View>

              <View style={styles.logOut}>
                    <TouchableOpacity style={styles.logOutButton} onPress={this.logOut.bind(this)}>
                      <Text style={styles.logOutText}> Log Out  </Text>
                    </TouchableOpacity>
                </View>
          </View>

              <View style={styles.body}>
                <Text style={styles.banner}>YOUR COURTS</Text>
                  {this.state.courts.map((item, key)=>(
                      <Text  key={key} style={styles.managedList}
                        onPress={()=>this.courtSelected(item) }>
                        {item}
                      </Text>)
                    )}
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity style={styles.addNewButton} onPress={this.goToAddCourt.bind(this)}>
                              <Text style={styles.addNewText}>  + Add Court   </Text>
                      </TouchableOpacity>
                  </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.tempBridge.bind(this)}>
                  <Text style={styles.login}> Active Court Lists  </Text>
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
    <View style={styles.containerNoTop}>
       <ScrollView>
          {this.renderCurrentState()}
      </ScrollView>
    </View>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    playerlists: state.compListReducer.origCompList,
    shooterRedux: state.shooterReducer.shooter,
    reduxMasterList: state.masterListReducer.reduxMasterList,
    arenaRedux: state.arenaReducer.arenaReduxx,
    dbcourts: state.readCourtReducer.dbcourts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      readCourts:(courtName)=>dispatch(readCourts(courtName))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
