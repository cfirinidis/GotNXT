import React from 'react';
import{
	StyleSheet,
	Text,
	Alert,
	View,
	Button,
	TextInput,
  Modal,
	FlatList,
  TouchableHighlight,
  ScrollView,
	KeyboardAvoidingView,
	TouchableOpacity,
	Image,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 
import Setup from './Setup'
import SelectMultiple from 'react-native-select-multiple';

export default class ShowList extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         masterList : this.props.navigation.getParam("list", "blank"),
           modalVisible: false,
  
           toRemove: [],
           testList: [],
           title: '',
           position: 0,
       };
     }

onSelectionsChange = (toRemove) => {
    // selectedFruits is array of { label, value }
    this.setState({ toRemove })
  }

temp =()=>{
  this.state.modalVisible = false;
}

AddPlayer=()=>{

}

removePlayers = () =>{
console.log("Remove")
var rem = []
console.log("NEXT FUNCTION : ",this.state.toRemove)
for ( i in this.state.toRemove){
  // console.log(this.state.toRemove[i]['label'][0])
  rem.push(this.state.toRemove[i]['label'][0])

}
console.log("REM", rem, rem.length)

for (i in rem){
  console.log("MS  ",this.state.masterList[rem[i]-1], i)
  this.state.masterList.splice(rem[i]-1-i, 1)
}
    // console.log("brefore", toRemove)
    // toRemove[0]['label'] = toRemove[0]['label'][0]
    // toRemove[0]['value'] = toRemove[0]['value'].substring(2,)
    console.log("FINALLLLL:::", this.state.masterList)
}

  setModalVisible=(visible, p)=> new Promise((resolve)=> {
    console.log("Modal 1")
    this.state.title = p;
    this.setState({modalVisible: visible})
  });

  setModal2Visible=(visible, p)=> new Promise((resolve)=> {
    console.log("MODAL 2")
    this.state.title = p;
    this.setState({modal2Visible: visible})
  });


render() {
console.log(this.state.masterList)
let currentList = Object.values(this.state.masterList).map(function(vals, i) {
      var t= {} ;
      for (val in vals){
        if (t["key"] === undefined){
          t["key"] = i+1 + " " + vals[val].player; }
        else{
          t["key"] += "  &  " + vals[val].player; }
      }
       console.log("Cur List", t)
      return t
});

this.state.playerList = Object.values(currentList).map(function(vals, i){
  var test = [];
  for (val in vals){
    // console.log("A val", vals[val], i)
    test+=(vals[val])
   
  }
  return test

});
 // console.log("GAME : ", this.state.playerList)
 // console.log("currentList", currentList)
return (
<ScrollView>
<View style={styles.TextInput} >  
    
<Text style={{fontSize:40, backgroundColor:'orange'}}>WAITING LIST</Text>

<FlatList
    data={currentList} style={styles.textInput}
    renderItem={({item}) => <Text style={{fontSize:30, color:'yellow'}} >{item.key}</Text>}/>

<Modal 
    visible={this.state.modalVisible}>
      <View>
        <Text style={{fontSize:30}}>{this.state.title} </Text>
        <SelectMultiple
          items={this.state.playerList}
          selectedItems={ this.state.toRemove }
          onSelectionsChange={this.onSelectionsChange} />

        <TouchableHighlight   onPress={ () => {
            this.setModalVisible(!this.state.modalVisible, "something").then( this.removePlayers() );}}>
            <Text style={{fontSize:28, width:115, height:45, backgroundColor:"red", top:25}}>DONE</Text>
        </TouchableHighlight>
      </View>
</Modal>



<TouchableHighlight onPress={()=> {
    this.setModalVisible(!this.state.modalVisible, "Choose Player To Remove"); }}>  
    <Text style={styles.buttons}> - Remove </Text>  
</TouchableHighlight>


  


</View>
</ScrollView>
    );
  }
}



const styles = StyleSheet.create({
	textInput: {
		fontSize:38,
		marginBottom: 50,
		backgroundColor: 'purple',
	},
  buttons: {
    width: 135,
    height: 40,
    borderWidth:2,
    color: 'white',
    backgroundColor:'black',
    fontSize: 28,
  },
  inputs:{
    padding: 18,
    marginBottom: 8,
    fontSize: 22,
    color: "red",
    backgroundColor: '#e8eae7',
  },
  list: {
    position: 'absolute',
    zIndex: 11,
    backgroundColor: 'white',
    width: 90,
    left: 130,
    top: 175,
    flexDirection: 'row',
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  }

});	
