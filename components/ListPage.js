import React from 'react';
import{
	StyleSheet,
	Text,
	View,
  Modal,
	FlatList,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import configureStore from './store';
import SelectMultiple from 'react-native-select-multiple';
import { connect } from 'react-redux';
import { addToCompList, delFromCompList, setPrefRedux, removeRedux } from '../store/actions';

class ShowList extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         courtArr: this.props.navigation.getParam("courtArr", "blank"),
         courtName: this.props.navigation.getParam("courtName", "blank"),
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

onSelectionsChange=(toRemove)=> {
    // selectedFruits is array of { label, value }
    this.setState({ toRemove })
  }

onSelectionsChangePref=(prefCourt)=> {
    this.setState({ prefCourt })
  }

temp =()=>{
  this.state.modalVisible = false;
}

GoToEdits=()=>{
    this.props.navigation.navigate("EditNames", { courtArr: this.state.courtArr, courtName: this.state.courtName});  }

removePlayers=()=>{
  let removePlayer = [];
  let removeComp = [];
  for ( i in this.state.toRemove){
    removePlayer.push(this.state.toRemove[i]['label'])
    removeComp.push(this.state.toRemove[i]['label'].toLowerCase())
  }
  this.props.del(removeComp)
  this.props.removeRedux(removePlayer)

  this.setState({completeList: this.state.completeList})  

   // console.log("CLIST",this.state.completeList)
}

  setModalVisible=(prop, val, p)=> new Promise((resolve)=> {
    this.state.title = p
    const state = this.state;
    state[prop] = val;
    this.setState(state)
  });

  getNames=()=>{
    r = [];
    c = 0;
     Object.values(configureStore.getState().masterListReducer).map(function(val) {
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
    this.setModalVisible('modalPrefVisible',!this.state.modalPrefVisible, "Select Preferred Court: ")
    this.setState({prefPos: temp[0] - 1})
  }

setPrefMaster=()=>{
  this.props.setPrefRedux(this.state.prefCourt, this.state.prefPos)
  this.setState({prefPos: '' })  
  this.setState({prefCourt:[] })
}

render() {
let currentList = Object.values(configureStore.getState().masterListReducer).map(function(vals, i) {
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
            this.setModalVisible('modalVisible',!this.state.modalVisible, "something").then( this.removePlayers() );}} 
        style={styles.modalButtons}>
            <Text style={styles.modalText}>DONE</Text>
        </TouchableHighlight>

      </View>
</Modal>

<TouchableHighlight onPress={()=> {
    this.setModalVisible('modalVisible',!this.state.modalVisible, "Choose Player(s) To Remove"); }}
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
            this.setModalVisible('modalPrefVisible',!this.state.modalPrefVisible, "something").then(this.setPrefMaster() ); 
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


const mapStateToProps = (state) => {
  // console.log("STATE : ", state);
  return{
    playerlists: state.compListReducer.origCompList,
    reduxMasterList: state.masterListReducer.reduxMasterList
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    add:(data)=>dispatch(addToCompList(data)),
    del:(data)=>dispatch(delFromCompList(data)),
    removeRedux:(removePlayer)=>dispatch(removeRedux(removePlayer)),
    setPrefRedux:(prefCourt, prefPos)=>dispatch(setPrefRedux(prefCourt, prefPos))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowList);

