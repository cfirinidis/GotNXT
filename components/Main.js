
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
         SampleArray : [["Jason"], ["Jim"], ["Ed", "TOM"], ["Jerry"], ["WILL"], ["Mo"], ['Larry'], ['Curley'], ['COnz']],
         masterList : [],
         cap: (this.props.navigation.getParam("cap", "blank")),
         Arena: this.props.navigation.getParam("arena", "blank"),
         courtsNum: this.props.navigation.getParam("courtsNum", "blank"),
         current: 0

       };
    
     }
 
  AddItemsToArray=()=>{
      //Adding Items To Array.
      if (this.state.Name.length != 0 ){
      this.state.SampleArray.push(this.state.Name);
      console.log("WHYYYY", this.state.Arena)
      console.log(this.state.SampleArray, this.state.SampleArray.length);
    }
    else{
      Alert.alert("Please Enter A Name")
    }
    this.setState({Name:''})
    this.setState({SampleArray: this.state.SampleArray})
  }//good

  AddMaster=()=>{
    console.log(this.state.SampleArray);
    for (i in this.state.SampleArray){
        this.state.masterList.push(this.state.SampleArray[i]);
      }
    this.setState({SampleArray : []})
    // console.log("WHY HAVE IT", this.state.SampleArray.length)
    // console.log("master LIST :", this.state.masterList );
    // Alert.alert(masterList.toString());   
  }//good

  ShowAddress=()=>{
    console.log(this.state.masterList)
    alert(this.state.masterList)
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
      var names = 0;
      //for (names in tempList){
      while(names< tempList.length  && tempList.length >= this.state.cap){//add full contingency
        console.log("names : ", names, this.state.masterList[names], this.state.Arena[this.state.current]["teamA"].length , tempList[names].length  )

        if (this.state.Arena[this.state.current]["teamA"].length + tempList[names].length <= teamcap){ 
            for (name in tempList[names]){ 
              // console.log("for name in names", tempList[names].length ,tempList[names], tempList[names][name])
              // console.log("mlist ", this.state.Arena[court]["teamA"].length ," + ", this.state.masterList[names].length, this.state.cap/2 )
              this.state.Arena[this.state.current]["teamA"].push(tempList[names][name]);
            }
            delArray += [names]
            names++;
            //this.state.masterList.splice(names, 1);
            // console.log("for name AFTER",this.state.masterList);
          }
          //console.log(this.state.Arena[this.state.current]["teamA"].length,  this.teamcap )
         if (this.state.Arena[this.state.current]["teamB"].length + tempList[names].length <= teamcap &&
            this.state.Arena[this.state.current]["teamA"].length == teamcap ){ 
            for (name in tempList[names]){ 
              console.log("for name in names", tempList[names].length ,tempList[names], tempList[names][name])
              // console.log("mlist ", this.state.Arena[court]["teamB"].length ," + ", this.state.masterList[names].length, this.state.cap/2 )
              this.state.Arena[this.state.current]["teamB"].push(tempList[names][name])
              // this.state.masterList[names].splice(name, 1)
              
            }
            delArray += [names]
            names++
             //this.state.masterList.splice(names, 1);
             
             // console.log("for name AFTER B: ",this.state.masterList)
        }

        if(this.state.Arena[this.state.current]["teamB"].length ==this.state.cap/2){
          this.setState({current: this.state.current++})
          console.log("Fuckin broke out")
          console.log(this.state.Arena, 'delete these: ', delArray)
          for (i in delArray){
            console.log(i)
            this.state.masterList.splice(0, 1)

          }
          console.log(this.state.masterList)
          break;
        }

        if(this.state.Arena[this.state.current]["teamA"].length ==this.state.cap/2){
          names++;
        }
        console.log(this.state.Arena, 'delete these: ', delArray)
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

