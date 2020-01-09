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
// console.log("Remove")
var rem = []
// console.log("NEXT FUNCTION : ",this.state.toRemove)
for ( i in this.state.toRemove){
  // console.log(this.state.toRemove[i]['label'][0])
  rem.push(this.state.toRemove[i]['label'][0])

}
// console.log("REM", rem, rem.length)

for (i in rem){
  // console.log("MS  ",this.state.masterList[rem[i]-1], i)
  this.state.masterList.splice(rem[i]-1-i, 1)
}
    // console.log("brefore", toRemove)
    // toRemove[0]['label'] = toRemove[0]['label'][0]
    // toRemove[0]['value'] = toRemove[0]['value'].substring(2,)
    // console.log("FINALLLLL:::", this.state.masterList)
}

  setModalVisible=(visible, p)=> new Promise((resolve)=> {
    this.state.title = p;
    this.setState({modalVisible: visible})
  });

  setModalPrefVisible=(visible, p)=> new Promise((resolve)=> {
    this.state.title = p;
    this.setState({modalPrefVisible: visible})
  });


  // setModal2Visible=(visible, p)=> new Promise((resolve)=> {
  //   console.log("MODAL 2")
  //   this.state.title = p;
  //   this.setState({modal2Visible: visible})
  // });



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
    // console.log("ans ", ans )
    var t = names.slice(2, names.length)
    this.setState({prefPos: names[0] - 1})

    // console.log("COURT ARRAY : ", this.state.courtArr,  "PRINTED THIS", names, "-- ", names[0], "TTT: ", t)
  }

setPrefMaster=()=>{
  // console.log("USEFULE INFO : ", this.state.prefPos, this.state.prefCourt[0]['value'])
  // console.log("MASTERLIST ",this.state.masterList[this.state.prefPos][0]['pref'] )
  var t = this.state.prefCourt[0]['value'] 
  // console.log("t:   ",t[t.length-1])
  this.state.masterList[this.state.prefPos][0]['pref'] = t[t.length - 1]
  this.setState({ masterList: this.state.masterList })
  this.setState({prefPos: '' })  
  this.setState({prefCourt:[] })

}

render() {
// console.log(this.state.masterList)
let currentList = Object.values(this.state.masterList).map(function(vals, i) {
    
      var t= {} ;
      for (val in vals[1]){
        // console.log("map vals", val, vals, ":: ", vals[1])
        if (t["key"] === undefined){
          t["key"] = i+1 + " " + vals[1][val].player; }
        else{
          t["key"] += "  &  " + vals[1][val].player; }
      }
      t["key"] += " ( " + vals[0].pref + " )"
        // console.log("Cur List", t, vals[0].pref)
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
    renderItem={({item}) => 
    <TouchableHighlight onPress={()=>{this.setPref(item.key)} }>
    <Text style={{fontSize:30, color:'yellow'}} >{item.key}</Text>
    </TouchableHighlight>

  }/>


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
            <Text style={{fontSize:28, width:115, height:45, backgroundColor:"red"}}>DONE</Text>
        </TouchableHighlight>
      </View>
</Modal>



<TouchableHighlight onPress={()=> {
    this.setModalVisible(!this.state.modalVisible, "Choose Player To Remove"); }}>  
    <Text style={styles.buttons}> - Remove </Text>  
</TouchableHighlight>


<Modal 
    visible={this.state.modalPrefVisible}>
      <View>
        <Text style={{fontSize:30}}>{this.state.title} </Text>
        <SelectMultiple
          items={this.state.courtArr}
          selectedItems={ this.state.prefCourt }
          onSelectionsChange={this.onSelectionsChangePref} />

        <TouchableHighlight   onPress={ () => {
            this.setModalPrefVisible(!this.state.modalPrefVisible, "something").then(this.setPrefMaster() ); }}>
            <Text style={{fontSize:28, width:115, height:45, backgroundColor:"red"}}>DONE</Text>
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
