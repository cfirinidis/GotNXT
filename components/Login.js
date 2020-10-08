import React from 'react';
import{
	Text,
	Alert,
	View,
	KeyboardAvoidingView,
	TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../store/actions';
import { readCourts } from '../store/actions';
import Input from '../elements/Input';
import styles from './generalStyle'
import firebase from '../elements/Firebase';



class Login extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         email: '',
         password: '',
         authenticating:false,
         errorMessage: '',
         courts:[]
       };
     }

     saveData=()=>{
       console.log('SAVESD DATA ', this.state.email)
      let EMAIL = JSON.stringify(this.state.email);
      let PASSWORD = JSON.stringify(this.state.password);
      AsyncStorage.setItem('email', EMAIL)
      AsyncStorage.setItem('password', PASSWORD);
    }


     loadData = async() =>{
       console.log("LOAD DATA")
      try{
        // let mas = await AsyncStorage.getItem('master');
        let pw = await AsyncStorage.getItem('password');
        let em = await AsyncStorage.getItem('email');

        console.log("EMMML:::", em)
        if (em != null){
          console.log("HOH ", em)
          this.state.email = JSON.parse(em);
          this.state.password = JSON.parse(pw);
          
          this.setState({email:this.state.email});
          this.setState({password:this.state.password});
        }
      

      }
      catch(error){
        console.log("ERROR")
        alert(error);
      }

      console.log("LOAD AFTER ", this.state.email)
      if(this.state.email != '' && this.state.password != ''){
        console.log("IN THE IF")
        this.onPressSignIn()
      }
    }

  componentDidMount= async() =>{
    this.loadData()
    console.log("IT BEGINS")
    console.log("DATE", this.state.email, "   ", this.state.password)
   
  
  
  
  
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
      console.log("EMAIL ", this.state.email)
    this.setState({
      authenticating: true,
    });
    firebase
    .auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((res)=>{
      this.saveData();
    // console.log("USER LOGGED IN", res)
      this.setState({
       
        authenticating: false,
        email: '',
        password: ''
      })
      Promise.all([
      this.props.loginUser( res['user']['displayName'], res['user']['email'])
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
          <Text style={styles.title}> GotNXT </Text>
          <Text style={styles.title}> LOGIN </Text>

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



