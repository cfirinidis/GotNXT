import React from 'react';
import{
	StyleSheet,
	Text,
	Alert,
	View,
	Button,
  Modal,
	FlatList,
  TouchableHighlight,
  ScrollView,
	KeyboardAvoidingView,
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
         completeList : this.props.navigation.getParam("compList", "blank"),
           modalVisible: false,
           modalPrefVisible: false,
           toRemove: [],
           prefCourt: [],
           prefPos: '',
           testList: [],
           title: '',
           position: 0,
           playerCount: 0,
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

  GoToEdits=()=>{
    // console.log("GoToEdits")
    this.props.navigation.navigate("EditNames", {arena: this.state.Arena,
     list: this.state.masterList, courtArr: this.state.courtArr, compList: this.state.completeList});  
  }


removePlayers = () =>{
  let removePlayer = [];
  let removeComp = [];


  for ( i in this.state.toRemove){
    removePlayer.push(this.state.toRemove[i]['label'])
    removeComp.push(this.state.toRemove[i]['label'].toLowerCase())
  }

  for (k in removeComp){
    if (removeComp[k] in this.state.completeList){
      delete this.state.completeList[removeComp[k]]
    }}

  for(i=0; i<this.state.masterList.length ; i++){
    for (j=0; j<this.state.masterList[i][1].length; j++){
      if (removePlayer.includes(this.state.masterList[i][1][j]['player'])){
        this.state.masterList[i][1].splice(j,1)
        j--;
    }}
    if (this.state.masterList[i][1].length == 0){
      this.state.masterList.splice(i,1);
      i--;
    }
  } 

  this.setState({masterList: this.state.masterList})
  this.setState({completeList: this.state.completeList})   
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
    c = 0;
     Object.values(this.state.masterList).map(function(val) {
        for (j in val[1]){
          r.push(val[1][j]['player']);
          c += 1;
        }
      });
     this.state.playerCount = c;
    return r
  }

  async setPref(names){
    let temp =  names.split(':')
    this.setModalPrefVisible(!this.state.modalPrefVisible, "Select Preferred Court: ")
    this.setState({prefPos: temp[0] - 1})
  }

setPrefMaster=()=>{
  if (this.state.prefCourt.length == 0){
    return 0
  } 
  var t = this.state.prefCourt[0]['value'] 
  this.state.masterList[this.state.prefPos][0]['pref'] = t[t.length - 1]
  this.setState({prefPos: '' })  
  this.setState({prefCourt:[] })
}

render() {
let currentList = Object.values(this.state.masterList).map(function(vals, i) {
      var t= {} ;
      for (val in vals[1]){
        if (t["key"] === undefined){
          t["key"] = " " + (i+1) + ": " + vals[1][val].player; }
        else{
          t["key"] += "\n" +" "+ vals[1][val].player; }
      }
      t["key"] += "\n [Court Pref: " + vals[0].pref + " ]" 
      return t
});

this.state.playerList = this.getNames()

return (
<ScrollView>
<View>  
    
<Text style={styles.header}>WAITING LIST: {this.state.playerCount}</Text>

<FlatList
    data={currentList} style={styles.textList}
    renderItem={({item}) => 
    <TouchableHighlight onPress={()=>{this.setPref(item.key)} } >
    <Text style={{fontSize:28, color:'#000bef', marginBottom: 12}} >{item.key}</Text>
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
    this.setModalVisible(!this.state.modalVisible, "Choose Player(s) To Remove"); }}
     style={styles.buttons}>  
    <Text style={{fontSize:28, color:"white"}}> - Remove </Text>  
</TouchableHighlight>

<TouchableHighlight onPress={()=> {
    this.GoToEdits()}} 
     style={styles.EditButtons}>  
    <Text style={{fontSize:33, color:"white"}}>Edit</Text>  
</TouchableHighlight>


<Modal 
    visible={this.state.modalPrefVisible}>
      <View style={styles.modalStyle}>
        <Text style={{fontSize:30, backgroundColor:'orange', color:'white'}}>{this.state.title} </Text>
        <SelectMultiple

          items={this.state.courtArr}
          maxSelect = {1}
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
  header: {
    fontSize:30,
    height: 60,
    padding: 8,
    backgroundColor:'gray',
    color: 'white',
    width:"100%",
    alignItems: 'center',
    justifyContent: 'center',
 },
  textList: {
		marginBottom: 10,
		backgroundColor: '#e6f0f7',
	},
  modalText: {
    fontSize:30,
    color: 'white',
  },
  buttons: {
    width: "40%",
    height: 45,
    backgroundColor:'red',
    marginBottom: "5%",
  },
  EditButtons: {
    width: "20%",
    position:'absolute',
    height: 45,
    top: 7,
    flexDirection: 'row',
    borderRadius: 50,
    alignSelf: 'flex-end',
    backgroundColor:'pink',
    right: "2%",
    alignItems: 'center',
  justifyContent: 'center',
  },
  modalStyle:{
    marginTop: 20,
    marginBottom:130,
  },
  modalButtons:{
    width: '40%',
    height: 60,
    left: '50%',
    backgroundColor: '#388fe7',
    justifyContent: 'center',
    alignItems: 'center',
  },

});	
