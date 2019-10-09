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
         CourtsNum: '',
         Capacity: '',
       };
    
     }
 
  SetupCourts=()=>{
    var courts = {}
    for (var i = 0; i<this.state.CourtsNum; i++){
      
      courts['teamA'] = new Array()
      courts['teamB'] = new Array()
      console.log("TEAMS: ", courts)
      console.log(courts, " I ",i)
      this.state.Arena.push(courts)
    }
    console.log("FINAL: ",this.state.Arena)
    this.props.navigation.navigate("List", {arena: this.state.Arena });
    console.log("HERE")
    return this.state.Arena
      
  }

  AddMaster=()=>{
    console.log(this.state.SampleArray);

    this.state.masterList.push(this.state.SampleArray);
    this.state.SampleArray = []
    console.log("master LIST :", this.state.masterList );
    // Alert.alert(masterList.toString());   
    return this.state.masterList
  }

  ShowAddress=()=>{
  	console.log(this.state.masterList)
  	alert(this.state.masterList)

  }
 
 render() {
 
   return (
 
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding" enabled>
   		<View>
 
          <TextInput
              placeholder="Number of courts "
              onChangeText={CourtsNum => this.setState({ CourtsNum: CourtsNum}) }
              style={styles.textInput}
          />
          <TextInput
              placeholder="Total Capacity (full court cap = 10):"
              onChangeText={Capacity => this.setState({ Capacity: Capacity }) }
				style={styles.textInput}    
          />
          < Button color="red" 
           title="Click When Done" onPress={this.SetupCourts}
           />

      </View>
      </KeyboardAvoidingView>

 
   );
 }
}
 

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: 'pink',
    paddingTop: 100,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		paddingLeft: 40,
		paddingRight: 40,
	},
	header: {
		fontSize: 24,
		marginBottom: 60,
		color: '#fff',
		fontWeight: 'bold',
	},
	textInput: {
		alignSelf: 'stretch',
		padding: 16,
		fontSize:20,
		color: "red",
		marginBottom: 25,
		backgroundColor: 'yellow',
	},

});	
