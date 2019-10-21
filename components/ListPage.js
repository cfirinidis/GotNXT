import React from 'react';
import{
	StyleSheet,
	Text,
	Alert,
	View,
	Button,
	TextInput,
	FlatList,
  ScrollView,
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
         masterList : this.props.navigation.getParam("list", "blank"),
         Arena: this.props.navigation.getParam("arena", "blank")
       };
    
     }

  ShowAddress=()=>{
    console.log(this.state.masterList)
    console.log(this.state.Arena)
  }
 
 render() {
  // let test = this.state.Arena;
  // let test2 = this.state.masterList


    // render(){
  // let arena =  this.state.masterList.map((val, key)=>{
  //       return <ShowList key={key} keyval={val} val={val}
  //               deleteMethod={ ()=> this.deleteNote(key)} />
  //     });


   return (
    <View>
    <Text>"WAIT LIST"</Text>   
    
    <Button title="See List" onPress={this.ShowAddress}/> 
      {
        this.state.Arena.map((item)=>
        <Text>{item.teamA}
        "IT WORKED"
        {item.teamB}</Text>
        )
      }
   
    </View>
    );
    }}

    // <FlatList data={this.state.masterList} renderItem={
      // ({item})=><Text> {item}</Text>
      // }
      // />   

// <FlatList data={players} renderItem={({item})=> <Text> {item}</Text> }
    // />


    // <ScrollView>
    // {players}
    // </ScrollView> 
// render() {
//   var sampleList = [
//     {item: "A"},
//     {item: "B"},
//     {item: "C"}
//   ];
//    return ( <FlatList data={sampleList} renderItem={
//             ({item}) => <ListItem element={item}/>
//           }
//         />);
//     }
 

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
