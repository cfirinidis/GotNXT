import React from 'react';
import{
	StyleSheet,
	Text,
	Alert,
	View,
	Button,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
  ActivityIndicator,
	AsyncStorage,
	Image,
} from 'react-native';
import configureStore from './store';

import { connect } from 'react-redux';
import { loginUser } from '../store/actions';
import { createStore, combineReducers } from 'redux';


import Input from '../elements/Input';
import firebase from '../elements/Firebase';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 


class Logo extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         email: '',
         password: '',
         authenticating:false,
         errorMessage: ''
       };
     }

  GoToSignUp=()=>{
    this.props.navigation.navigate("SignUp");  
  }
 

   dumbness=()=>{
    console.log("MORE TALKING")  
    
  }
  // componentWillMount() {
  //   const firebaseConfig = {
  //     apiKey: ' AIzaSyDNKMFfGnHZ9jANyVN0QJyD93lb35Q7Awo',
  //     authDomain: 'gotnxt.firebaseapp.com ',
  //   }
  //   firebase.initializeApp(firebaseConfig); 
  // }

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
      // console.log("USER LOGGED IN")
      this.setState({
        authenticating: false,
        email: '',
        password: ''
      })
      
      console.log("ANYTHING", this.state.email)
      this.dumbness()
      this.props.loginUser(this.state.email, this.state.password)
      this.props.navigation.navigate("Setup")
    })
    .catch((error)=> {this.setState({ 
      errorMessage: error.message,
      email:'',
      password:'',
      authenticating: false
      })
        Alert.alert(this.state.errorMessage)
      })
  }
}


renderCurrentState(){
  if(this.state.authenticating){
    return(
      <View style={styles.waiting}>
        <ActivityIndicator size='large' color='blue'/>
      </View>
      )
    }

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

           <TouchableOpacity style={styles.login} onPress={this.GoToSignUp.bind(this)}>
             <Text style={styles.login}>Don't Have an account?</Text>
             <Text style={styles.login}>SIGN UP!</Text>
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
    arenaRedux: state.arenaReducer.arenaRedux,
    // loginUser: state.userReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
        loginUser:(username, email)=>dispatch(loginUser(username, email))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logo);

