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
    for (var i = 0; i<this.state.CourtsNum; i++){
      courts['Num'] = i+1
      courts["teamNumA"] = 0
      courts["teamNumB"] = 0
      courts['teamA'] = new Array()
      courts['teamB'] = new Array()
      this.state.Arena.push(courts)
      courts={}
    }
    console.log("FINAL: ",this.state.Arena)

    this.setState({Arena:this.state.Arena}) 
       this.props.navigation.navigate("List", {arena: this.state.Arena, cap:this.state.Capacity, 
      courtsNum:this.state.CourtsNum });
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
		fontSize:24,
		color: "red",
		marginBottom: 25,
		backgroundColor: 'yellow',
	},

});	
