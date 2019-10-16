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

export default class MainActivity extends React.Component {

  constructor(props) {
    
       super(props);
       this.state = {
         plist: [],
         ps: [],
         Name: '',
         SampleArray : ["Jason", "Jim", "Ed", "TOM", "Eric", "WILL"],
         masterList : [],
         cap: (this.props.navigation.getParam("cap", "blank")),
         Arena: this.props.navigation.getParam("arena", "blank"),
         courtsNum: this.props.navigation.getParam("courtsNum", "blank")

       };
    
     }
 
  AddItemsToArray=()=>{
      //Adding Items To Array.
      if (this.state.Name.length != 0 ){
      this.state.SampleArray.push(this.state.Name);
      console.log("WHYYYY", this.state.Arena)
      console.log(this.state.SampleArray, this.state.SampleArray.length);
    }
    else{
      Alert.alert("Please Enter A Name")
    }
    this.setState({Name:''})
    this.setState({SampleArray: this.state.SampleArray})
  }

  AddMaster=()=>{
    console.log(this.state.SampleArray);
    this.state.masterList.push(this.state.SampleArray);
    this.setState({SampleArray : []})
    console.log("master LIST :", this.state.masterList );
    // Alert.alert(masterList.toString());   
  }

  ShowAddress=()=>{
  	console.log(this.state.masterList)
  	alert(this.state.masterList)
  }

  StartGame=()=>{
    console.log('START GAME', this.state.Arena[1], "CAP:", this.state.cap, parseInt(this.state.cap))
  	for (var i = 0; i< this.state.courtsNum; i++){
  		console.log("inside FOR: ",this.state.Arena[i], this.state.Arena)
      // console.log(i, "i")
     // this.state.Arena
  	}
    for(i in this.state.Arena){
      console.log("for in :", i , this.state.Arena[i])
    }
  }

  GoToLists=()=>{
    this.props.navigation.navigate("Show", {list:this.state.masterList, games:this.state.Arena});
    console.log(" Gone to List screen")
   
      
  }
 render() {
 
   return (
 
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding" enabled>
   		<View>

          <TextInput
              placeholder="NAME"
              onChangeText={(Name) => this.setState({ Name}) }
              value={this.state.Name}
				      style={styles.textInput} 
              placeholderTextColor='gray'   
          />
 
    <TouchableOpacity  onPress={this.AddItemsToArray.bind(this)} style={styles.addButton} >
    <Text style={styles.addButtonText}>Add Name(s)</Text>
    </TouchableOpacity>
          

    <TouchableOpacity  onPress={this.AddMaster.bind(this)} style={styles.addButton} >
    <Text style={styles.addButtonText}> +  LIST </Text>
    </TouchableOpacity>

         <Button title="See List" onPress={this.ShowAddress}
            style={styles.btn}
          />

          <Text>"FILL THE COURTS "</Text>
         <Button title="Start" onPress={this.StartGame}
            style={styles.btn}
          />

          <Text> Go to List Page </Text>

          < Button color="gray" 
           title="Go To Lists" onPress={this.GoToLists}
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
    addButtonText: {
    color: '#fff',
    fontSize: 17,
  },
	btn: {
		alignSelf: 'stretch',
		backgroundColor: 'green',
		padding:2,
		marginBottom:50,
		alignItems: 'center',
	

	},
   addButton: {
    // position : 'absolute',
    zIndex: 11,
    // right: 20,
    // bottom: 90,
    backgroundColor: '#E91E63',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,

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
