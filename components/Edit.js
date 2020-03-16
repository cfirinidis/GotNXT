import React from 'react';
import{
	StyleSheet,
	Text,
	Alert,
	View,
	Button,
	TextInput,
  Modal,
  TouchableHighlight,
  ScrollView,
	KeyboardAvoidingView,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 
import Setup from './Setup'
import SelectMultiple from 'react-native-select-multiple';

export default class EditNames extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         masterList : this.props.navigation.getParam("list", "blank"),
         courtArr: this.props.navigation.getParam("courtArr", "blank"),
         completeList : this.props.navigation.getParam("compList", "blank"),
           modalInputVisible: false,
           title: '',
           name: '',
           wrongName: ''
       };
     }

  setModalInputVisible=(visible, p, wrong)=> new Promise((resolve)=> {
    this.state.title = p;
    if (visible == true){ this.state.wrongName = wrong;}
      this.setState({modalInputVisible: visible})
  });

  getNames=()=>{
    r = [];
     Object.values(this.state.masterList).map(function(val) {
        for (j in val[1]){
          r.push(val[1][j]['player']);
          c += 1;
        }
      });
    return r
  }

  GoToList=()=>{
      this.setState({masterList: this.state.masterList})
      this.setState({completeList: this.state.completeList})
      this.props.navigation.navigate("List", {arena: this.state.Arena,
      list: this.state.masterList, courtArr: this.state.courtArr, compList: this.state.completeList});  
  }


print=()=>{
  if (this.state.name.length == 0 || this.state.name in this.state.completeList){
    setTimeout(()=>{
      Alert.alert("No Name Was Entered")
      
    }, 1);
    this.setState({name:''})
    return 0
  }

  for (k in this.state.completeList){
    if (k == this.state.wrongName){
      // console.log(k)
        delete this.state.completeList[k] 
        this.state.completeList[this.state.name.replace(/\s/g, '').toLowerCase()] = 1
    }}

  for(i=0; i<this.state.masterList.length ; i++){
    for (j=0; j<this.state.masterList[i][1].length; j++){
      if ( this.state.wrongName == this.state.masterList[i][1][j]['player']){
        this.state.masterList[i][1][j]['player'] = this.state.name
    }}
  } 
  let alertName = this.state.name

    setTimeout( ()=>{
      this.setState({name:''})
      this.setState({masterList: this.state.masterList})
      this.setState({completeList: this.state.completeList})
      Alert.alert("CHANGE: ", this.state.wrongName + '\n' + "\n TO \n" + '\n' +  alertName);
      this.GoToList();   
  },1);   
}

render() {
this.state.playerList = this.getNames()

return (
<ScrollView>
<View>  
    
<Text style={styles.header}>EDIT NAMES</Text>
<View style={{backgroundColor:'#feebff', marginBottom:25}}>
  { this.state.playerList.map((item, key)=>(
         <Text  key={key} style={{fontSize:30, marginBottom: 25, color: 'blue'}}
          onPress={()=>this.setModalInputVisible(!this.state.modalInputVisible, "EDIT  -  "+ item, item.toString() ) }>
         {key+1}   { item } </Text>)
         )}
</View>
 
  <Modal visible={this.state.modalInputVisible}>
    <View style={styles.modalStyle}>
        <Text style={{fontSize:30, backgroundColor:'gray', color:'white', marginBottom:70, textAlign:'center'}}>
        EDIT NAMES </Text>
      
      <TextInput
          placeholder= {this.state.title}
          onChangeText={(name) => this.setState({name}) }
          value={this.state.name}
          style={styles.textInput} 
          placeholderTextColor='red' />
      <TouchableHighlight onPress={ () =>{
          this.setModalInputVisible(!this.state.modalInputVisible, "something").then(this.print())}} 
        style={styles.modalButtons}>
            <Text style={styles.modalText}>DONE</Text>
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
    fontSize:33,
    height: 75,
    padding: 8,
    backgroundColor:'gray',
    color: 'white',
    width:"100%",
    alignItems: 'center',
    textAlign: "center", 
    justifyContent: 'center',

 },
   textInput: {
    fontSize: 28,
    color: "red",
    marginBottom: 60,
    width: '75%',
    borderWidth: 2,
    left:10,
    borderColor: 'black',
    height: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    textAlign: "center", 
    justifyContent: 'center', 
  },
  modalText: {
    fontSize:30,
    color: 'white',
  },
  modalStyle:{
    marginTop: 20,
    // marginBottom: 50,
    height:'100%',
    backgroundColor: '#fff0f0',
  },
  modalButtons:{
    width: '40%',
    height: 60,
    left:10,
    backgroundColor: '#fbdcf5',
    borderRadius: 50,
    borderWidth:5,
    justifyContent: 'center',
    alignItems: 'center',
  },

});	
