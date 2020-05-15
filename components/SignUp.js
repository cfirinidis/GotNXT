import React from 'react';
import{
	StyleSheet,
	Text,
	Alert,
	View,
	Button,
	TextInput,
  ActivityIndicator,
	KeyboardAvoidingView,
	TouchableOpacity,
	AsyncStorage,
	Image,
} from 'react-native';
import Input from '../elements/Input';
import firebase from '../elements/Firebase';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 

export default class Logo extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         email: '',
         password: '',
         username:'',
         pw2:'',
         laoding: false
       };
     }
 
  tempBridge=()=>{
    this.props.navigation.navigate("Setup");  
  }

  registerUser=()=>{

    if(this.state.email === '' && this.state.password === ''){
      Alert.alert("Enter Email And Password To Sign Up")
    }else{
      // console.log("BUTTON PRESSED", this.state.email, this.state.password)
      this.setState({
        loading: true,
      })
      firebase
      .auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res)=>{
        res.user.updateProfile({
          username: this.state.username
        })
        console.log("User Registered")
        this.setState({
          loading: false,
          username: '',
          email: '',
          password: '',
          pw2: ''
        })
        this.props.navigation.navigate('Main')
      })
      .catch(error=> {
        this.setState({ 
          errorMessage: error.message,
          loading: false,
          username: '',
          password: '',
          pw2: ''
        })
        Alert.alert(this.state.errorMessage)
      })
    }
  }

  renderCurrentState(){
    if(this.state.loading){
      return(
        <View style={styles.waiting}>
          <ActivityIndicator size='large' color='blue'/>
        </View>
        )
    }

    return(
      <KeyboardAvoidingView >
      <View >

          <Text style={styles.text}> GotNXT </Text>
          <Text style={styles.text}> SIGN UP </Text>

          <Input
            placeholder= " EMAIL "
            onChangeText={(email) => this.setState({email}) }
            value={this.state.email}
              />

          <Input
            placeholder= " PASSWORD "
            onChangeText={(password) => this.setState({password}) }
            value={this.state.password}
            />

          <Input
            placeholder= " RE-ENTER PWORD "
            onChangeText={(pw2) => this.setState({pw2}) }
            value={this.state.pw2}
              />

          <Input
            placeholder= " USERNAME "
            onChangeText={(username) => this.setState({username}) }
            value={this.state.username}
              />

           <TouchableOpacity style={styles.button} onPress={this.registerUser.bind(this)}>
             <Text style={styles.buttonText}>SIGN UP</Text>
           </TouchableOpacity>


          <TouchableOpacity style={styles.login} onPress={this.tempBridge.bind(this)}>
             <Text style={styles.login}> BRIDGE  </Text>
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



