import React from 'react';
import{
	StyleSheet,
	Text,
	Alert,
	View,
	KeyboardAvoidingView,
	TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../store/actions';
import { readCourts } from '../store/actions';
import Input from '../elements/Input';
import firebase from '../elements/Firebase';



class Login extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         email: 'a@aa.com',
         password: 'testing',
         authenticating:false,
         errorMessage: '',
         courts:[]
       };
     }

  GoToSignUp=()=>{
    this.props.navigation.navigate("SignUp");  
  }
 
  GoToUser=()=>{
    this.props.navigation.navigate("User");  
  }


  onPressSignIn(){
    // console.log("Button Pressed")
    if(this.state.email === '' && this.state.password === ''){
      Alert.alert("Enter Email And Password")
    }else{
      // console.log(this.state.email)
    this.setState({
      authenticating: true,
    });
    firebase
    .auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((res)=>{
    // console.log("USER LOGGED IN", res)
      this.setState({
        authenticating: false,
        email: '',
        password: ''
      })
      Promise.all([
        firebase.database().ref('users/').set({email: this.state.email}),
      this.props.loginUser(res['user']['email'], res['user']['appName'])
       ])
    }).then(()=>{this.props.navigation.navigate("User")})
    // console.log("TEST")
    

    .catch((error)=> {this.setState({ 
      errorMessage: error.message,
      email: '',
      password:'',
      authenticating: false
      })
        Alert.alert(this.state.errorMessage)
      })
  }
}


renderCurrentState(){
  if(this.state.authenticating){
    console.log("Thinking")
    return(
      <View style={styles.waiting}>
        <ActivityIndicator size='large' color='blue'/>
      </View>
      )
    }
    let test = {}    
    var courts = firebase.database().ref('/courts');
    // console.log( firebase.database().ref('courts/').once('value', snapshot) )
    courts.once('value', function (snapshot) {
      // console.log(snapshot.key, "*****", snapshot.val(), Object.keys(snapshot.val()))
      test = snapshot.val()
      // console.log("TEST", test)
  });
    // console.log("TEST", test)

    return(
      <KeyboardAvoidingView>
      <View>
          <Text style={styles.text}> GotNXT </Text>
          <Text style={styles.text}> LOGIN </Text>

          <Input
            placeholder= " EMAIL "
            onChangeText={(email) => this.setState({email}) }
            value={this.state.email}
              />
 
           <Input
            placeholder= " PASSWORD "
            onChangeText={password => this.setState({password}) }
            value={this.state.password}
              />

           <TouchableOpacity style={styles.button} onPress={this.onPressSignIn.bind(this)}>
             <Text style={styles.buttonText}>LOGIN</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.signUp} onPress={this.GoToSignUp.bind(this)}>
             <Text style={{fontSize:26, color:'#1c313a'}}>SIGN UP!</Text>
           </TouchableOpacity>

      </View>
      </KeyboardAvoidingView>
      )
    }
  

render(){
  return(
    <View style={styles.container}>
       {this.renderCurrentState()}
    </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container : {
    justifyContent:'center',
    height: '100%',
    backgroundColor:'gray',
  },
  waiting : {
    justifyContent:'center',
    backgroundColor:'yellow',
  },
  text:{
    fontSize:32,
    fontWeight: 'bold',
    textAlign:"center",
    color:'white',
  },
  signUp:{
    textAlign:"center",
    backgroundColor:'orange',
    width:"40%",
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor:'#1c313a',
    borderRadius: 50,
    left: '30%',
    top: 25,
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
        loginUser:(username, email)=>dispatch(loginUser(username, email)),
        readCourts:(courtName)=>dispatch(readCourts(courtName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);



