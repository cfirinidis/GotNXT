
import React from 'react';
import{
  StyleSheet,
  Text,
  Alert,
  View,
  Button,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 
import Setup from './Setup'

export default class MainActivity extends React.Component { 

  constructor(props) {
    
       super(props);
       this.state = {
         plist: [],
         ps: [],
         Name: '',
         totalPlayers:10,
         SampleArray : [],
         masterList : [[{player: "Jason", replacement: false}], [{player:"Jim", replacement: false}], [{player:"Ed", replacement: false},
          {player:"TOM", replacement: false}], [{player:"Jerry", replacement: false}],[{player:"WILL", replacement: false}],
           [{player:"Mo", replacement: false}], [{player:'Larry', replacement: false}], [{player:'Curley', replacement: false}, 
           {player:'COnz', replacement: false}]],
         cap: this.props.navigation.getParam("cap", "blank"),
         Arena: this.props.navigation.getParam("arena", "blank"),
         courtsNum: this.props.navigation.getParam("courtsNum", "blank"),
         current: 0

       };
     }
 
  AddItemsToArray=()=>{
      //Adding Items To Array.
      if (this.state.Name.length != 0 ){
      this.state.SampleArray.push({player: this.state.Name, replacement: false});
    }
    else{
      Alert.alert("Please Enter A Name")
    }
    this.setState({Name:''})
    this.setState({SampleArray: this.state.SampleArray})
    this.setState({totalPlayers: this.state.totalPlayers + 1})
    console.log(this.state.SampleArray, this.state.SampleArray.length, "total", this.state.totalPlayers);
  }//good

  AddMaster=()=>{
    console.log("ADD TO MASTer",this.state.SampleArray);
    this.state.masterList.push(this.state.SampleArray)
    this.setState({SampleArray : []})  
  }//good

  ShowAddress=()=>{
    console.log(this.state.masterList)
  }

   GoToLists=()=>{
    this.props.navigation.navigate("Show", {arena: this.state.Arena, list: this.state.masterList});
  }

  StartGame=()=>{
    // console.log("WHY HAVE IT", this.state.SampleArray.length, "teamA ", this.state.Arena[0]['Num'] )
    // console.log('START GAME', this.state.Arena[1], "CAP:", this.state.cap, parseInt(this.state.cap))
      // console.log("for in :", court , this.state.Arena[court]["teamA"])
      // console.log("for in :", court , this.state.Arena[court]["teamB"])
      // no for loop increment as you go
      var teamcap = (this.state.cap/2);
      var tempList = this.state.masterList;
      var delArray = []
      var teamNumA = 0
      var teamNumB = 0
      var names = 0;
      console.log("START GAME ", tempList, this.state.totalPlayers)
      //for (names in tempList){
      while(names < tempList.length){//add full contingency
        // console.log("names : ", names, tempList[names], this.state.Arena[this.state.current]["teamA"].length , tempList[names].length, "END")

        if ( teamNumA < teamcap && teamNumB < teamcap){
            var set= []; 
            if(tempList[names].length + teamNumA <= teamcap){
            for (name in tempList[names]){ 
              // console.log("In A: ", tempList[names][name])
              set.push(tempList[names][name])
              teamNumA++;
              }
            }
            this.state.Arena[this.state.current]["teamA"].push(set);
            delArray += [names];
            names++;
            this.state.totalPlayers -= tempList[names].length;
            //this.state.masterList.splice(names, 1);
            // console.log("for name AFTER",this.state.masterList);
          }
          //console.log(this.state.Arena[this.state.current]["teamA"].length,  this.teamcap )
         else{
          //  (teamNumB< teamcap && teamNumA == teamcap ){ 
            var set = [];
            for (name in tempList[names]){
              set.push(tempList[names][name])
              teamNumB++;
              } 
            this.state.Arena[this.state.current]["teamB"].push(set)
            delArray += [names]
            names++
        }

        if(teamNumB == teamcap && teamNumA == teamcap){
          this.setState({current: this.state.current++})
          console.log("GAME READY: ")
          // console.log('delete these: ', delArray)
          for (i in delArray){
            console.log(i)
            this.state.masterList.splice(delArray[i]-i, 1)

          }
          console.log(this.state.masterList)
          break;
        }

        // console.log(this.state.Arena, 'delete these: ', delArray)
        }
        console.log("Out of while: ", this.state.Arena)
        this.setState({current: this.state.current++});
  }


 render() {
   return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding" enabled>
      <View>

          <TextInput
              placeholder="NAME"
              onChangeText={(Name) => this.setState({ Name}) }
              value={this.state.Name}
              style={styles.textInput} 
              placeholderTextColor='gray'   
          />
 
    <TouchableOpacity  onPress={this.AddItemsToArray.bind(this)} style={styles.addButton} >
    <Text style={styles.addButtonText}>Add Name(s)</Text>
    </TouchableOpacity>
          

    <TouchableOpacity  onPress={this.AddMaster.bind(this)} style={styles.addButton} >
    <Text style={styles.addButtonText}> +  LIST </Text>
    </TouchableOpacity>

         <Button title="See List" onPress={this.ShowAddress}
            style={styles.btn}
          />

          <Text>"FILL THE COURTS "</Text>
         <Button title="Start" onPress={this.StartGame}
            style={styles.btn}
          />

          <Text> Go to List Page </Text>

          <Button color="gray" 
           title="Go To Lists" onPress={this.GoToLists}
           />
          


      </View>
      </KeyboardAvoidingView>
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
    backgroundColor: 'white',
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
    alignSelf: 'stretch',
    padding: 16,
    fontSize:20,
    color: "red",
    marginBottom: 25,
    backgroundColor: 'yellow',
  },
    addButtonText: {
    color: '#fff',
    fontSize: 17,
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: 'green',
    padding:2,
    marginBottom:50,
    alignItems: 'center',
  

  },
   addButton: {
    // position : 'absolute',
    zIndex: 11,
    // right: 20,
    // bottom: 90,
    backgroundColor: '#E91E63',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,

  },
    item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  SignUp: {
    //fontSize: 18,
    marginTop: 60,
    //color: '#fff',
    //fontWeight: 'bold',
    },
}); 

