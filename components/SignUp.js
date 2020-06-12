import React from 'react';
import{
	StyleSheet,
	Text,
	Alert,
	View,
  ActivityIndicator,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
import Input from '../elements/Input';
import firebase from '../elements/Firebase';

export default class SignUp extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         email: '',
         password: 'testing',
         username:'',
         pw2:'testing',
         loading: false
       };
     }
 
  tempBridge=()=>{
    this.props.navigation.navigate("Setup");  
  }


// var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
// ref.createUser({
//   email    : emailAddress,
//   password : password
// }, function(error, authData) {
//   if (error) {
//     console.log("Error creating user:", error);
//   } else {
//     // save the user's profile into the database so we can list users,
//     // use them in Security and Firebase Rules, and show profiles
//     ref.child("users").child(authData.uid).set({
//       provider: authData.provider,
//       name: userName
//     });
//   }
// });



  registerUser=()=>{
    console.log("Top", this.state.email, this.state.username)
    if(this.state.email === '' && this.state.password === ''){
      Alert.alert("Enter Email And Password To Sign Up")
    }
    else if(this.state.password != this.state.pw2){
      Alert.alert("Passwords do not match")
    }
    else{
      // console.log("BUTTON PRESSED", this.state.email, this.state.password)
      this.setState({
        loading: true,
      })
      
      firebase
      .auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res)=>{
        res.user.updateProfile({
          displayName: this.state.username
        })
        console.log("User Registered")
        Promise.all([
        firebase.database().ref('users/'+ this.state.username.toString()).update({email: this.state.email}), 
        firebase.database().ref('users/'+ this.state.username).update({handle:this.state.username}) ]).then( ()=>{
        this.setState({
          loading: false,
          username: '',
          email: '',
          password: '',
          pw2: ''
        })
      
         this.props.navigation.navigate('User') 
      })
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



