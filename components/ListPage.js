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
	Image,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 
import Setup from './Setup'

export default class ShowList extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         masterList : this.props.navigation.getParam("list", "blank"),
         Arena: this.props.navigation.getParam("arena", "blank")
       };
     }


 render() {

let Game = Object.values(this.state.masterList).map(function(vals, i) {
      var t= {} ;
      for (val in vals){
        if (t["key"] === undefined){
          t["key"] = i+1 + " " + vals[val].player;
        }
        else{
          t["key"] += "  &  " + vals[val].player;
        }
      }
      return t
});

let Games = [{key:"test"}, {key:"test2"}, {key:"Test3"}];
console.log("GAME : ", Game)
   return (
    <View style={styles.TextInput} >  
    <Text style={{fontSize:40}}>WAITING LIST</Text>
    <FlatList
    data={Game} style={styles.textInput}
    renderItem={({item}) => <Text style={{fontSize:24, color:'white'}} >{item.key}</Text>}/>
    </View>
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
		backgroundColor: 'yellow',
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
		padding: 16,
		fontSize:38,
		color: "red",
		marginBottom: 25,
		backgroundColor: 'purple',
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
