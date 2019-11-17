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
    else{
    for (var i = 0; i<this.state.CourtsNum; i++){
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
      <KeyboardAvoidingView style={styles.wrapper}>
   		<View>
      <Text style={styles.title}>GotNXT</Text>
      <Text style={styles.text}> Number of available COURTS</Text>
          <TextInput
             placeholderTextColor= "white" 
              placeholder="Number of courts "
              onChangeText={CourtsNum => this.setState({ CourtsNum: CourtsNum}) }
              style={styles.textInput}
          />
           <Text style={styles.text}> Number of Total players {'\n'}(5 on 5 = 10)</Text>
          <TextInput 
              placeholderTextColor= "white" 
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
		flex: 2,
		backgroundColor: '#cecece',
    paddingTop: 50,
	},
	header: {
		fontSize: 24,
		marginBottom: 20,
		color: '#fff',
		fontWeight: 'bold',
	},
  title: {
    fontSize: 38,
    marginBottom: 10,
    color: '#fff',
    fontWeight: 'bold',
    textAlign:'center',
    fontWeight: 'bold',
  },
	textInput: {
		alignSelf: 'stretch',
		padding: 16,
		fontSize:24,
		color: "red",
		marginBottom: 25,
		backgroundColor: '#ffd1dc',

	},
  text: {
    alignSelf: 'stretch',
    fontSize:28,
    color: "black",
    marginBottom: 5,
    fontWeight:'bold',
    textAlign:"center"

  },

});	
