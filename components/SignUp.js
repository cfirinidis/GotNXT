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
         email: 'c@conz.com',
         password: 'testing',
         handle:'',
         pw2:'testing',
         loading: false,
         date: '06-13-2020',
         loc: "SOME GYM",
         currentHandles: [],
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


// component did mount bring in all usernames

componentDidMount(){

  let c = firebase.database().ref('users')
  return c.once('value', snapshot => {
    // console.log(snapshot.val(), snapshot.key)
    for (i in snapshot.val()){
      console.log("for", i)
      this.state.currentHandles.push(i)
    }
      
      
  // this.props.readCourts(y)
   this.setState({currentHandles: this.state.currentHandles});
  // this.setState({loading: false})
 
  });  


}

database=()=>{

  if ( this.state.currentHandles.includes(this.state.handle ) ){
    console.log("taken")
    return 0
  }
  let x = this.state.email
  firebase.database().ref('users/'+ this.state.handle.toString()).set({
    email: this.state.email, handle:this.state.handle
  })
  firebase.database().ref('users/'+ this.state.handle.toString()+"/overall-record").set({
    win:0, loss:0
  })
  firebase.database().ref('users/'+ this.state.handle+"/historical record/"+ this.state.date+'/'+
  this.state.loc).set({
    win:0, loss:0
  })
  

  // firebase.database().ref('new/'+ "emailz").update({handle:this.state.password}) 
}



  registerUser=()=>{
    
    if(this.state.email === '' && this.state.password === ''){
      Alert.alert("Enter Email And Password To Sign Up")
    }
    else if(this.state.password != this.state.pw2){
      Alert.alert("Passwords do not match")
    }
    else if(this.state.currentHandles.contains(this.state.handle)){
      Alert.alert("HANDLE ALREADY TAKEN")
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
          displayName: this.state.handle
        })
        console.log("User Registered")
        Promise.all([
          firebase.database().ref('users/'+ this.state.handle).set({email: this.state.email}),
          firebase.database().ref('users/'+ this.state.handle+"/overall-record").set({
            win:0, loss:0
          })
      
      ]).then( ()=>{
        this.setState({
          loading: false,
          handle: '',
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
          handle: '',
          password: '',
          pw2: ''
        })
        Alert.alert(this.state.errorMessage)
      })
    }
  }

  renderCurrentState(){
    console.log("Top", this.state.email, this.state.handle, "CURRENT HNDLES",this.state.currentHandles)
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
            placeholder= " HANDLE "
            onChangeText={(handle) => this.setState({handle}) }
            value={this.state.handle}
              />

           <TouchableOpacity style={styles.button} onPress={this.registerUser.bind(this)}>
             <Text style={styles.buttonText}>SIGN UP</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.button} onPress={this.database.bind(this)}>
             <Text style={styles.buttonText}>DATABASE TEST</Text>
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



