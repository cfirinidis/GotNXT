import React from 'react';
import{
	StyleSheet,
	Text,
	Alert,
	View,
	Button,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	AsyncStorage,
	Image,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 

export default class Setup extends React.Component {
 
  constructor(props) {
       super(props);
       this.state = {
         Arena: [],
         courtsNum: '',
         capacity: '',
         masterList: [],
         courtArr:[],
         test:''
       };
     }

  async resetAll(){

       AsyncAlert = (title, msg) => new Promise((resolve) => {  
        Alert.alert(
                    title,
                    msg,
                    [ {text: "YES", onPress: () => { resolve('YES') }},
                      {text: "NO", onPress: () => { resolve('NO') }}  ],
                    { cancelable: false},
                    );
      });
    
    var answer =  await AsyncAlert ('RESET ALL', "Are you sure?")
  
    if (answer == "YES"){
      this.setState({Arena: []});
      this.setState({courtsNum : '' });
      this.setState({capacity : '' });
      this.setState({masterList : [] });
      this.setState({courtArr : [] });
  }
  else{return 0}
  }
 
  loadData = async() =>{
    try{
      let mas = await AsyncStorage.getItem('master');
      let are = await AsyncStorage.getItem('arena');
      this.state.masterList = JSON.parse(mas);
      this.state.Arena = JSON.parse(are);
      this.setState({masterList:this.state.masterList});
      this.setState({Arena:this.state.Arena});
    }
    catch(error){
      alert(error);
    }
  }

  loadData = async() =>{
    try{
      let mas = await AsyncStorage.getItem('master');
      let are = await AsyncStorage.getItem('arena');
      let cap = await AsyncStorage.getItem('capacity');
      let cNum = await AsyncStorage.getItem('courtN');
      let cArray = await AsyncStorage.getItem('courtA');
      this.state.masterList = JSON.parse(mas);
      this.state.Arena = JSON.parse(are);
      this.state.capacity = JSON.parse(cap);
      this.state.courtsNum = JSON.parse(cNum);
      this.state.courtArr = JSON.parse(cArray);
      this.setState({masterList:this.state.masterList})
      this.setState({Arena:this.state.Arena})
      this.setState({capacity:this.state.capacity});
      this.setState({courtsNum:this.state.courtsNum});
      this.setState({courtArr:this.state.courtArr});

      this.props.navigation.navigate("List", {arena: this.state.Arena, cap:this.state.capacity, 
      courtsNum:this.state.courtsNum, courtArr: this.state.courtArr, masterList:this.state.masterList });
    }
    catch(error){
      alert(error);
    }
  }

  SetupCourts=()=>{
    var courts = {}
    if (isNaN(this.state.courtsNum ) || this.state.courtsNum.replace(/\s/g, '').length == 0) {
      Alert.alert("Please enter the number of available Courts")
    }
    else if(this.state.capacity % 2 != 0 || this.state.capacity.replace(/\s/g, '').length==0){
     Alert.alert("Please enter 'EVEN' Number Players") 
    }
    else if(this.state.Arena.length>0){
      Alert.alert("Already Setup, restart app. Restarting app will delete all data!")
      this.props.navigation.navigate("List", {arena: this.state.Arena, cap:this.state.capacity, 
      courtsNum:this.state.courtsNum, masterList:this.state.masterList, courtArr: this.state.courtArr });
      // this.setState({courtsNum:''});
      // this.setState({capacity:''}); 
    }
    else{
    
    for (var i=0; i<this.state.courtsNum; i++){
      courts['Num'] = i+1
      courts["teamANum"] = 0
      courts["teamBNum"] = 0
      courts['teamA'] = new Array()
      courts['teamB'] = new Array()
      this.state.Arena.push(courts)
      courts={}
      this.state.courtArr.push("Court : "+ (i+1))
    }

    this.setState({Arena:this.state.Arena}); 
    this.props.navigation.navigate("List", {arena: this.state.Arena, cap:this.state.capacity, 
      courtsNum:this.state.courtsNum, courtArr: this.state.courtArr, masterList:this.state.masterList });      
  }}


  // backToGames=()=>{
  //   this.props.navigation.navigate("List", {arena: this.state.Arena, cap:this.state.capacity, 
  //     courtsNum:this.state.courtsNum, courtArr: this.state.courtArr, masterList:this.state.masterList });
  // }
 
 render() {
   return (    
   		<View style={styles.wrapper}>
      <KeyboardAvoidingView>    
      <Text style={styles.title}>GotNXT</Text>
            <TextInput
              placeholderTextColor= "red" 
              underlineColorAndroid="gray" 
              placeholder="Enter Number Of Courts "
              onChangeText={(courtsNum) => this.setState({courtsNum: courtsNum }) }
              value={ this.state.courtsNum}
              style = {styles.textInput}
              keyboardType={'numeric'}  
            />

            <TextInput 
              placeholderTextColor= "red" 
              underlineColorAndroid="gray"
              placeholder="Enter Num Of Players PER Team"
              onChangeText={capacity => this.setState({ capacity: capacity }) }
				      style={styles.textInput}  
              value = {this.state.capacity} 
              keyboardType={'numeric'}  
            />

    <TouchableOpacity  onPress={this.SetupCourts.bind(this)} style={styles.button} >
      <Text style={styles.text}> DONE </Text>
    </TouchableOpacity>


    <TouchableOpacity  onPress={this.resetAll.bind(this)} style={styles.button} >
      <Text style={styles.text}> RESET </Text>
    </TouchableOpacity>

    <TouchableOpacity  onPress={this.loadData.bind(this)} style={styles.button} >
      <Text style={styles.text}> LOAD DATA </Text>
    </TouchableOpacity>
     </KeyboardAvoidingView>
      </View>
      
   );
 }
}
 

const styles = StyleSheet.create({
	wrapper: {
    flex: 1,
		backgroundColor: '#e8eae7',
    paddingTop: 10,
	},
  title: {
    fontSize: 38,
    paddingTop:15,
    marginBottom: 10,
    color: 'gray',
    fontWeight: 'bold',
    textAlign:'center',
    fontWeight: 'bold',
  },
	textInput: {
		padding: 18,
    marginBottom: 10,
		fontSize: 24,
		color: "red",
		backgroundColor: '#e8eae7',
    textAlign:"center"

	},
  text: {
    alignSelf: 'stretch',
    fontSize:28,
    color: "black",
    marginBottom: 15,
    fontWeight:'bold',
    textAlign:"center"

  },
    button: {
    fontSize: 26,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 2,
    marginBottom: 15,
    width: 200,
    height:50,
  },

});	
