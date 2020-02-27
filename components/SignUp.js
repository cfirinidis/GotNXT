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
	AsyncStorage,
	Image,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 

export default class Logo extends React.Component {
 
  constructor(props) {
       super(props);
       this.state = {
         login: '',
         password: '',
       };
     }
 

  tempBridge=()=>{
    this.props.navigation.navigate("Main");  
  }


  render(){
    return(
  
      <View style={styles.container}>
          <Text style={styles.text}> GotNXT </Text>
          <Text style={styles.text}> SIGN UP </Text>

          <TextInput style={styles.inputBox}
              placeholder="Email"
              placeholderTextColor = "black"
              selectionColor="#fff"
              keyboardType="email-address"
              onSubmitEditing={()=> this.password.focus()}
              />



          <TextInput style={styles.inputBox}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "black"
              ref={(input) => this.password = input}
              />

          <TextInput style={styles.inputBox}
              placeholder="Re-Enter Password"
              secureTextEntry={true}
              placeholderTextColor = "black"
              ref={(input) => this.password = input}
              />

          <TextInput style={styles.inputBox}
              placeholder="Username"
              placeholderTextColor = "black"
              selectionColor="#fff"
              onSubmitEditing={()=> this.password.focus()}
              />
           <TouchableOpacity style={styles.button} onPress={this.props.onAuthButtonPress}>
             <Text style={styles.buttonText}>SIGN UP</Text>
           </TouchableOpacity>


          <TouchableOpacity style={styles.login} onPress={this.tempBridge.bind(this)}>
             <Text style={styles.login}> BRIDGE  </Text>
             
           </TouchableOpacity>

      </View>
 
      )
  }
}
 



const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'gray',
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
  inputBox: {
    width:'75%',
    backgroundColor:'yellow',
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    height: 50,
    paddingHorizontal:16,
    fontSize:16,
    marginVertical: 20,
  },
  button: {
    width:'75%',
    color:'white',
    backgroundColor:'#1c313a',
     borderRadius: 50,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:18,
    fontWeight:'500',
    color:'white',
    textAlign:'center'
  }

});
