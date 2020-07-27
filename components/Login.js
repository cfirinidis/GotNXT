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
         email: 'a@aa.com',
         password: 'testing',
         authenticating:true,
         errorMessage: '',
         courts:[]
       };
     }

    //  saveData=()=>{
    //   let ML = JSON.stringify(configureStore.getState().masterListReducer);
    //   let CL = JSON.stringify(configureStore.getState().compListReducer);
    //   let AR  = JSON.stringify(configureStore.getState().arenaReducer);
    //   let CAP = JSON.stringify(this.state.cap);
    //   let CN = JSON.stringify(this.state.courtsNum);
    //   let CARRAY = JSON.stringify(this.state.courtArr);
    //   AsyncStorage.setItem('compList', CL)
    //   AsyncStorage.setItem('masterList', ML);
    //   AsyncStorage.setItem('arena', AR);
    //   AsyncStorage.setItem('capacity', CAP);
    //   AsyncStorage.setItem('courtN', CN);
    //   AsyncStorage.setItem('courtA', CARRAY);
    // }


    //  loadData = async() =>{
    //   try{
    //     // let mas = await AsyncStorage.getItem('master');
    //     let are = await AsyncStorage.getItem('arena');
    //     let cap = await AsyncStorage.getItem('capacity');
    //     let cNum = await AsyncStorage.getItem('courtN');
    //     let cArray = await AsyncStorage.getItem('courtA');
    //     let mlr = await AsyncStorage.getItem('masterList');
    //     let cl = await AsyncStorage.getItem('compList')
    //     configureStore.getState().compListReducer = JSON.parse(cl)
    //     configureStore.getState().masterListReducer = JSON.parse(mlr);
    //     configureStore.getState().arenaReducer = JSON.parse(are);
    //     this.state.capacity = JSON.parse(cap);
    //     this.state.courtsNum = JSON.parse(cNum);
    //     this.state.courtArr = JSON.parse(cArray);
    //     this.setState({capacity:this.state.capacity});
    //     this.setState({courtsNum:this.state.courtsNum});
    //     this.setState({courtArr:this.state.courtArr});
    //     this.props.navigation.navigate("MainActivity", { cap:this.state.capacity, 
    //     courtsNum:this.state.courtsNum, courtArr: this.state.courtArr, courtName: this.state.courtName});
    //   }
    //   catch(error){
    //     console.log("ERROR")
    //     alert(error);
    //   }
    // }

  componentDidMount= async() =>{
    console.log("IT BEGINS")
    try{
      let username = await AsyncStorage.getItem('user')
      console.log(username, "INSIDE")

      if (usersname != null){
        this.setState({authenticating: false}) 
      }
    
      }  
    catch{
      console.log("CATCH")
        this.setState({authenticating: false}) 
      }
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



