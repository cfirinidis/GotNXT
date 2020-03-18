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
         test:'',
         completeList: {},
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
      this.setState({completeList: {} });
    }
     else{return 0}
  }


  loadData = async() =>{
    try{
      let mas = await AsyncStorage.getItem('master');
      let are = await AsyncStorage.getItem('arena');
      let cap = await AsyncStorage.getItem('capacity');
      let cNum = await AsyncStorage.getItem('courtN');
      let cArray = await AsyncStorage.getItem('courtA');
      let cList = await AsyncStorage.getItem('completeList')

      this.state.masterList = JSON.parse(mas);
      this.state.Arena = JSON.parse(are);
      this.state.capacity = JSON.parse(cap);
      this.state.courtsNum = JSON.parse(cNum);
      this.state.courtArr = JSON.parse(cArray);
      this.state.completeList = JSON.parse(cList)
      this.setState({masterList:this.state.masterList})
      this.setState({Arena:this.state.Arena})
      this.setState({capacity:this.state.capacity});
      this.setState({courtsNum:this.state.courtsNum});
      this.setState({courtArr:this.state.courtArr});
      this.setState({completeList: this.state.completeList})

      this.props.navigation.navigate("List", {arena: this.state.Arena, cap:this.state.capacity, 
      courtsNum:this.state.courtsNum, courtArr: this.state.courtArr, masterList:this.state.masterList, 
      completeList:this.state.completeList });
    }
    catch(error){
      alert(error);
    }
  }

  async SetupCourt(){
    var courts = {}
    AsyncAlert = (title, msg) => new Promise((resolve, reject) => {  
        Alert.alert(
                    title,
                    msg,
                    [ {text: "YES", onPress: () => { resolve('YES') }},
                      {text: "NO", onPress: () => { resolve('NO') }}  ],
                    { cancelable: false},
                    );
      });
    if (isNaN(this.state.courtsNum ) || this.state.courtsNum.replace(/\s/g, '').length == 0) {
      Alert.alert("Enter # of available Courts")
    }
    else if(this.state.capacity.replace(/\s/g, '').length==0){
<<<<<<< HEAD
     Alert.alert("Please enter Number of Players PER TEAM") 
=======
     Alert.alert("Please enter 'EVEN' Number Players") 
>>>>>>> 4f3c4cd708120790e8e496bf37d16a32efbfbbf4
    }
    else if(this.state.Arena.length>0){
      Alert.alert("Already Setup, to erase press RESET")
      this.props.navigation.navigate("List", {arena: this.state.Arena, cap:this.state.capacity, 
      courtsNum:this.state.courtsNum, masterList:this.state.masterList, courtArr: this.state.courtArr,
      completeList:this.state.completeList });
    }
    else{
      let gameStart = await AsyncAlert("Have Games Started?", "")
        if (gameStart == "YES"){
          for (var i=0; i<this.state.courtsNum; i++){
            courts['Num'] = i+1
            courts["teamANum"] = parseInt(this.state.capacity)
            courts["teamBNum"] = parseInt(this.state.capacity)
            courts['teamA'] = new Array()
            courts['teamB'] = new Array()
            for (let j =0; j<2 * this.state.capacity; j++){
          courts['teamA'].push([{"player": "*PLYR"+j + "CRT" + courts['Num'], "replacement": false }])
          j++;
          courts['teamB'].push([{"player": "*PLYR"+j + "CRT" + courts['Num'], "replacement": false }])
        }
          this.state.Arena.push(courts)
          courts={}
          this.state.courtArr.push("Court : "+ (i+1))
        }
        }
  
      else{
        this.state.courtArr.push("NONE : "+ '0')
        for (var i=0; i<this.state.courtsNum; i++){
        courts['Num'] = i+1
        courts["teamANum"] = 0
        courts["teamBNum"] = 0
        courts['teamA'] = new Array()
        courts['teamB'] = new Array()
        this.state.Arena.push(courts)
        courts={}
        this.state.courtArr.push("Court : "+ (i+1))
      }}
      this.state.courtArr.push("Waiting : "+ 'W')
      this.setState({Arena:this.state.Arena}); 
      this.props.navigation.navigate("List", {arena: this.state.Arena, cap:this.state.capacity, 
        courtsNum:this.state.courtsNum, courtArr: this.state.courtArr, masterList:this.state.masterList,
        completeList:this.state.completeList });      
  }
}

 render() {
   return (    
   		<View style={styles.wrapper}>
      <KeyboardAvoidingView>    
      <Text style={styles.title}> GotNXT </Text>
            <TextInput
              placeholderTextColor= "purple" 
              underlineColorAndroid="gray" 
              placeholder=" Enter # Of Courts "
              onChangeText={(courtsNum) => this.setState({courtsNum: courtsNum }) }
              value={ this.state.courtsNum}
              style = {styles.textInput}
              keyboardType={'numeric'}  
            />

            <TextInput 
              placeholderTextColor= "purple" 
              underlineColorAndroid="gray"
<<<<<<< HEAD
              placeholder=" Total Players On Each TEAM "
=======
              type='numeric'
              placeholder="Total Players On Each Team: "
>>>>>>> 4f3c4cd708120790e8e496bf37d16a32efbfbbf4
              onChangeText={capacity => this.setState({ capacity: capacity}) }
				      style={styles.textInput}  
              value = {this.state.capacity} 
              keyboardType={'numeric'}  
            />

    <TouchableOpacity  onPress={this.SetupCourt.bind(this)} style={styles.doneButton} >
      <Text style={styles.text}> DONE </Text>
    </TouchableOpacity>


    <TouchableOpacity  onPress={this.resetAll.bind(this)} style={styles.button} >
      <Text style={styles.text}> RESET </Text>
    </TouchableOpacity>

    <TouchableOpacity  onPress={this.loadData.bind(this)} style={styles.loadButton} >
      <Text style={styles.text}> LOAD </Text>
    </TouchableOpacity>

    <Text style={styles.footer}>ConzStructions</Text>
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
    paddingLeft: 5,
    paddingRight: 5,
    height: '100%',
	},
  title: {
    fontSize: 40,
    paddingTop:18,
    marginBottom: 10,
    color: 'gray',
    fontWeight: 'bold',
    textAlign:'center',
    fontWeight: 'bold',
  },
  footer:{
    fontSize:14,
    position:'absolute',
    textAlign:'center',
    top: "100%",
    width:"100%",
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
    fontWeight:'bold',
    textAlign:"center"

  },
    button: {
    fontSize: 26,
    justifyContent: 'center',
    backgroundColor: '#ffe6e4',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 4,
    borderRadius: 50,
    marginBottom: "8%",
    width: "45%",
    height: 60,
  },
   doneButton: {
    fontSize: 26,
     justifyContent: 'center',
    backgroundColor: '#e8ffdd',
    borderColor: '#51ff00',
    borderWidth: 4,
    alignItems: 'center',
     borderRadius: 50,
    marginBottom: "8%",
    width: "45%",
    height: 60,
  },
   loadButton: {
    fontSize: 26,
    justifyContent: 'center',
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#fff2d3',
    borderColor: '#ffd800',
    borderWidth: 4,
    marginBottom: "8%",
    width: "45%",
    height: 60,
  },

});	
