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
         waiting: [],
         masterList : this.props.navigation.getParam("list", "blank"),
         Arena: this.props.navigation.getParam("arena", "blank")
       };
     }

  ShowAddress=()=>{
    console.log("FUNCTION WORLED")
    // console.log(this.state.masterList)
    // console.log(this.state.Arena)
    masterList = this.state.masterList;
    arena = this.state.Arena;
    // console.log("MYTEST : ", arena[0]["teamA"]["player"])
    for( i in masterList){
      console.log("LENGTH: ", masterList[i].length)
      for(j in masterList[i]){
        if(masterList[i][j]['player'] == undefined ){
          console.log("UNDEFINED")
          for( deep in masterList[i][j]){
             this.state.waiting.push(masterList[i][j][deep]['player'])

          }
        }
        else{
      this.state.waiting.push(masterList[i][j]['player'])
      }
    }}
   console.log("total:", this.state.waiting);
   this.setState({waiting: this.state.waiting});
   return "HELLO"

  }
  test=()=>{
    console.log("TEST Fuunction")
  }
 
 render() {
 

console.log("RENDER: ", this.state.masterList[0])
let Game = Object.values(this.state.masterList).map(function(vals) {
      t={};
      console.log("vals", vals[0].player, vals.length); 
      for (val in vals){
        
      t["key"] = vals[val].player;
      console.log(t,"NEW",val, vals[val].player);
      }
      return t
                    
    
});

let Games = [{key:"test"}, {key:"test2"}, {key:"Test3"}];

console.log("GAME : ", Games)
   return (
    <View>
    <Text></Text>   
    
    <Text>WAITING LIST</Text>

 
 <FlatList
          data={Game} style={styles.textInput}
          renderItem={({item}) => <Text>{item.key}</Text>}
        />
    </View>


    );
    }}

 

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
		fontSize:48,
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
    fontSize: 46,
    height: 44,
  },
	SignUp: {
		//fontSize: 18,
		marginTop: 60,
		//color: '#fff',
		//fontWeight: 'bold',
		},
});	
