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
    <Text style={{fontSize:40, backgroundColor:'orange'}}>WAITING LIST</Text>
    <FlatList
    data={Game} style={styles.textInput}
    renderItem={({item}) => <Text style={{fontSize:30, color:'yellow'}} >{item.key}</Text>}/>
    </View>
    );
    }

  }

const styles = StyleSheet.create({
	textInput: {
		fontSize:38,
		
		marginBottom: 50,
		backgroundColor: 'purple',

	},

});	
