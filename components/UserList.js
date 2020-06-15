import React from 'react';
import{
	StyleSheet,
	Text,
  View,
  ActivityIndicator,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
import configureStore from './store';
import firebase from '../elements/Firebase';
import Input from '../elements/Input';

export default class UserList extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         email: 'filler',
         password: '',
         list: [],
         courtName: this.props.navigation.getParam("courtName", "blank"),
         loading: false
       };
     }

  tempBridge=()=>{
    console.log("Tempbridge ", this.state.courtName)
    this.props.navigation.navigate("Setup", {courtName: this.state.courtName});  
  }


  componentDidMount(){
        console.log("COMPONENT DID MOUNT", this.state.courtName)
        let c = firebase.database().ref('courts/' + this.state.courtName + '/list')
        return c.once('value', snapshot => {
          console.log(snapshot)
            let x =  snapshot.val()
            let y = []
            for( i in x){
              console.log("FOR", i, snapshot.val()[i])
              // this.state.list.push(snapshot.val()[i])
              y.push(snapshot.val()[i])
            }
        // this.props.readCourts(y)
        this.setState({list: y});
        // this.setState({loading: false})
       
        });  
    }


  renderCurrentState(){
    let user = firebase.auth().currentUser;
    x = configureStore.getState().compListReducer
    console.log("LIST ",x) 
    if(this.state.loading){
      return(
        <View style={styles.waiting}>
          <ActivityIndicator size='large' color='blue'/>
        </View>
        )
    }
    if(user){
      this.state.email = user.providerData[0]['email']
      console.log(user.providerData)
      return(


      <KeyboardAvoidingView >
      <View >

          <View style={styles.info}>
          <Text style={styles.text}>
             EMAIL: 
              <Text style={{color:'black'}}> { user.providerData[0]['email'] }
              </Text>
          </Text>
          <Text style={styles.text}>
             HANDLE:
              <Text style={{color:'white'}}> { user.providerData[0]['displayName']} 
              </Text>
            </Text>

          </View>

          <TouchableOpacity style={styles.button} onPress={this.tempBridge.bind(this)}>
             <Text style={styles.login}> BRIDGE  </Text>
           </TouchableOpacity>


      <View>
        
        {this.state.list.map((item, key)=>(
           <Text  key={key} style={styles.listStyle}>
             {key+1} {item}
        </Text>)
   )}
 </View>

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
      {this.renderCurrentState()}
    </View>
    );
  }
}
  

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor:'gray',
    width: "100%"
  },
  info:{
    backgroundColor: 'lightgray',
    width: '50%',
  },
  text:{
    fontSize:24,
    textAlign:"left",
    color:'orange',
  },
  listStyle:{
    width:'100%',
    fontSize:18,
    marginBottom: 10,
    color: 'yellow',
    justifyContent: 'center',
    marginLeft : '20%',
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



