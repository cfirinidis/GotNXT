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
         courtArr: this.props.navigation.getParam("courtArr", "blank"),
           modalVisible: false,
           modalPrefVisible: false,
           toRemove: [],
           prefCourt: [],
           prefPos: '',
           testList: [],
           title: '',
           position: 0,
       };
     }

onSelectionsChange = (toRemove) => {
    // selectedFruits is array of { label, value }
    this.setState({ toRemove })
  }

onSelectionsChangePref = (prefCourt) => {
    // selectedFruits is array of { label, value }
    this.setState({ prefCourt })
  }

temp =()=>{
  this.state.modalVisible = false;
}

AddPlayer=()=>{

}

removePlayers = () =>{
  var removePlayer = [];
  var r = [];
  var tempML = [];

  for ( i in this.state.toRemove){
    removePlayer.push(this.state.toRemove[i]['label'])
  }
  Object.values(this.state.masterList).map(function(val) {
        for (j in val[1]){
          r.push(val[1][j]['player']);
        }
      });

  // console.log("removeplayer ",removePlayer)
  for (k in removePlayer){
    for(i in this.state.masterList){
      for (j in this.state.masterList[i][1]){
        // console.log("for loop", this.state.masterList[i][1][j]['player'])
        if (removePlayer.includes(this.state.masterList[i][1][j]['player'])){
          // console.log("remove: ", this.state.masterList[i][1][j]['player'] )
          this.state.masterList[i][1].splice(j,1)
        }}
          if (this.state.masterList[i][1].length == 0){
            // console.log("remove all: ", this.state.masterList[i][1] )
            this.state.masterList.splice(i,1);
          }
      }    
  }
}

  setModalVisible=(visible, p)=> new Promise((resolve)=> {
    this.state.title = p;
    this.setState({modalVisible: visible})
  });

  setModalPrefVisible=(visible, p)=> new Promise((resolve)=> {
    this.state.title = p;
    this.setState({modalPrefVisible: visible})
  });

  getNames=()=>{
    r = [];
     Object.values(this.state.masterList).map(function(val) {
        for (j in val[1]){
          r.push(val[1][j]['player']);
        }
      });
    return r
  }


  async setPref(names){
    var t = names.slice(2, names.length-5)
      prefAlert = (t) => new Promise((resolve, reject) => {  
        Alert.alert(
                    "Add Court Pref for: ",
                    t,
                    [ {text: "Yes", onPress: () => { resolve('YES') }},
                      {text: "NO", onPress: () => { resolve('NO') }}  ],
                    { cancelable: true},
                    );
        });
    ans = await prefAlert(t);
    if (ans == "YES"){
      this.setModalPrefVisible(!this.state.modalPrefVisible, "Select Preferred Court: ")

    }
    
    var t = names.slice(2, names.length)
    this.setState({prefPos: names[0] - 1})
  }

setPrefMaster=()=>{
  if (this.state.prefCourt.length == 0){
    return 0
  } 
  var t = this.state.prefCourt[0]['value'] 
  this.state.masterList[this.state.prefPos][0]['pref'] = t[t.length - 1]
  this.setState({ masterList: this.state.masterList })
  this.setState({prefPos: '' })  
  this.setState({prefCourt:[] })

}

render() {
let currentList = Object.values(this.state.masterList).map(function(vals, i) {
    
      var t= {} ;
      for (val in vals[1]){
        if (t["key"] === undefined){
          t["key"] = i+1 + " " + vals[1][val].player; }
        else{
          t["key"] += "  &  " + vals[1][val].player; }
      }
      t["key"] += " ( " + vals[0].pref + " )" 
      return t
});

this.state.playerList = this.getNames()

 // console.log("GAME : ", this.state.playerList)
 // console.log("currentList", currentList)
 // console.log("courtArr ", this.state.courtArr, this.state.masterList)
return (
<ScrollView>
<View>  
    
<Text style={{fontSize:40, backgroundColor:'orange'}}>WAITING LIST</Text>

<FlatList
    data={currentList} style={styles.textInput}
    renderItem={({item}) => 
    <TouchableHighlight onPress={()=>{this.setPref(item.key)} } >
    <Text style={{fontSize:30, color:'yellow', marginBottom: 12}} >{item.key}</Text>
    </TouchableHighlight>

  }/>


<Modal visible={this.state.modalVisible}>
      <View style={styles.modalStyle}>
        <Text style={{fontSize:30, backgroundColor:'red', color:'white'}}>{this.state.title} </Text>
        <SelectMultiple

          items={this.state.playerList}
          selectedItems={ this.state.toRemove }
          onSelectionsChange={this.onSelectionsChange} />

        <TouchableHighlight   onPress={ () => {
            this.setModalVisible(!this.state.modalVisible, "something").then( this.removePlayers() );}} 
        style={styles.modalButtons}>
            <Text style={styles.modalText}>DONE</Text>
        </TouchableHighlight>
      </View>
</Modal>



<TouchableHighlight onPress={()=> {
    this.setModalVisible(!this.state.modalVisible, "Choose Player To Remove"); }}
     style={styles.buttons}>  
    <Text style={{fontSize:28, color:"white"}}> - Remove </Text>  
</TouchableHighlight>


<Modal 
    visible={this.state.modalPrefVisible}>
      <View style={styles.modalStyle}>
        <Text style={{fontSize:30, backgroundColor:'orange', color:'white'}}>{this.state.title} </Text>
        <SelectMultiple

          items={this.state.courtArr}
          selectedItems={ this.state.prefCourt }
          onSelectionsChange={this.onSelectionsChangePref} />

        <TouchableHighlight   onPress={ () => {
            this.setModalPrefVisible(!this.state.modalPrefVisible, "something").then(this.setPrefMaster() ); 
          }} style={styles.modalButtons}>
            <Text style={styles.modalText} >DONE</Text>
        </TouchableHighlight>
      </View>
</Modal>



</View>
</ScrollView>
    );
  }
}



const styles = StyleSheet.create({
	textInput: {
		marginBottom: "10%",
		backgroundColor: 'purple',
	},
  modalText: {
    fontSize:30,
    color: 'white',
  },
  buttons: {
    width: "40%",
    height: 40,
    backgroundColor:'black',
    marginBottom: 10,
  },
  modalStyle:{
    marginBottom:120,
  },
  modalButtons:{
    width: '40%',
    height: 60,
    left: '50%',
    backgroundColor: '#388fe7',
    justifyContent: 'center',
    alignItems: 'center',
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
