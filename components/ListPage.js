import React from 'react';
import{
	StyleSheet,
	Text,
	Alert,
	View,
	Button,
	TextInput,
	FlatList,
	KeyboardAvoidingView,
	TouchableOpacity,
	AsyncStorage,
	Image,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 
import Setup from './Setup'

export default class ShowList extends React.Component {

  constructor(props) {
    
       super(props);
       this.state = {
         plist: [],
         ps: [],
         Name: [],
         SampleArray : ["Jason", "Jim", "Ed"],
         masterList : JSON.stringify(this.props.navigation.getParam("list", "blank")),
         Arena: JSON.stringify(this.props.navigation.getParam("games", "blank"))

       };
    
     }
 
  AddItemsToArray=()=>{
 
      //Adding Items To Array.
      if (this.state.Name.length != 0 ){
       
      // Showing the complete Array on Screen Using Alert.
      // Alert.alert(SampleArray.toString());
      
      this.state.SampleArray.push(this.state.Name);
 
      console.log("WHYYYY", this.state.Arena)
      console.log(this.state.SampleArray, this.state.SampleArray.length);
    }
    else{
      Alert.alert("Please Enter A Name")
    }
    return this.state.SampleArray
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

  StartGame=()=>{
  	for (var i = 0; i<2; i++){
  		console.log(this.state.Arena[i], this.state.Arena.length)
  	}
  }

SampleFunction=(item)=>{
 
    Alert.alert(item);
 
  }
 render() {
 
   return (
 
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding" enabled>
   		<View>

      <Text> this.state.Arena </Text>
      <Text> this.state.masterList</Text>
 

      </View>
      </KeyboardAvoidingView>

 
   );
 }
}
 

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: 'pink',
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
	btn: {
		alignSelf: 'stretch',
		backgroundColor: 'green',
		padding:2,
		marginBottom:50,
		alignItems: 'center',
	

	},
	  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
	SignUp: {
		//fontSize: 18,
		marginTop: 60,
		//color: '#fff',
		//fontWeight: 'bold',
		},
});	
