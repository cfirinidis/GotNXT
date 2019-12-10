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

export default class Setup extends React.Component {
 
  constructor(props) {
       super(props);
       this.state = {
         Arena: [],
         CourtsNum: 0,
         Capacity: 0,
         masterList: []
       };
     }
 
  SetupCourts=()=>{
    var courts = {}
    console.log(this.state.Capacity % 2 )
    if (isNaN(this.state.CourtsNum) ){
      Alert.alert("Please enter the number of available Courts")
    }
    else if(this.state.Capacity % 2 != 0){
     Alert.alert("Please enter 'EVEN' Number Players") 
    }
    else if(this.state.Arena.length>0){
      Alert.alert("Already Setup, restart app. Restarting app will delete all data!")
      this.props.navigation.navigate("List", {arena: this.state.Arena, cap:this.state.Capacity, 
      courtsNum:this.state.CourtsNum });
    }
    else{
    
    for (var i=0; i<this.state.CourtsNum; i++){
      courts['Num'] = i+1
      courts["teamANum"] = 0
      courts["teamBNum"] = 0
      courts['teamA'] = new Array()
      courts['teamB'] = new Array()
      this.state.Arena.push(courts)
      courts={}
    }
    console.log("FINAL: ",this.state.Arena)

    this.setState({Arena:this.state.Arena}) 
       this.props.navigation.navigate("List", {arena: this.state.Arena, cap:this.state.Capacity, 
      courtsNum:this.state.CourtsNum });
  }}
 
 render() {
   return (    
   		<View style={styles.wrapper}>
      <KeyboardAvoidingView>    
      <Text style={styles.title}>GotNXT</Text>
            <TextInput
              placeholderTextColor= "red" 
              underlineColorAndroid="gray" 
              placeholder="Enter Number Of Courts "
              onChangeText={CourtsNum => this.setState({ CourtsNum: CourtsNum}) }
              style={styles.textInput}
              keyboardType={'numeric'}  
            />

            <TextInput 
              placeholderTextColor= "red" 
              underlineColorAndroid="gray"
              placeholder="Enter Num Of Players On Each Team"
              onChangeText={Capacity => this.setState({ Capacity: Capacity }) }
				      style={styles.textInput}    
              keyboardType={'numeric'}  
            />

    <TouchableOpacity  onPress={this.SetupCourts.bind(this)} style={styles.button} >
      <Text style={styles.text}> DONE </Text>
    </TouchableOpacity>
     </KeyboardAvoidingView>
      </View>
      
   );
 }
}
 

const styles = StyleSheet.create({
	wrapper: {
    flex: 1,
		backgroundColor: '#e8eae7',
    paddingTop: 10,
	},
  title: {
    fontSize: 38,
    paddingTop:15,
    marginBottom: 10,
    color: 'gray',
    fontWeight: 'bold',
    textAlign:'center',
    fontWeight: 'bold',
  },
	textInput: {
		padding: 18,
    marginBottom: 8,
		fontSize: 22,
		color: "red",
		backgroundColor: '#e8eae7',

	},
  text: {
    alignSelf: 'stretch',
    fontSize:28,
    color: "black",
    marginBottom: 15,
    fontWeight:'bold',
    textAlign:"center"

  },
    button: {
    fontSize: 26,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 2,
    marginBottom: 15,
    width: 200,
    height:50,
  },

});	
