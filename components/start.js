import React from 'react';
import{
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	AsyncStorage,
	Image,
} from 'react-native';
//import Home from './Home';

export default class MainActivity extends React.Component {
 
  constructor(props) {
    
       super(props);
       this.state = {
         plist: [],
         ps: [],
         Name: [],
         SampleArray : [],
         masterList : [],

       };
    
     }
 
  AddItemsToArray=()=>{
 
      //Adding Items To Array.
      if (this.state.Name.length != 0 ){
       
      // Showing the complete Array on Screen Using Alert.
      // Alert.alert(SampleArray.toString());
      
      this.state.SampleArray.push(this.state.Name);
      console.log(this.state.SampleArray, this.state.SampleArray.length);
    }
    else{
      alert("enter name : ")
    }
    return this.state.SampleArray
  }

  AddMaster=()=>{
    console.log(this.state.SampleArray);

    this.state.masterList.push(this.state.SampleArray);
    this.state.SampleArray = []
    console.log("master LIST :", this.state.masterList );
    // Alert.alert(masterList.toString());   
    return this.state.masterList
  }
 
 render() {
 
   return (
 
      <KeyboardAvoidingView style={styles.MainContainer} behavior="padding" enabled>
      <View style={{paddingTop:10}}>
 
          <TextInput
              
              placeholder="Number of players"
    
              onChangeText={TextInputValue => this.setState({ Name: TextInputValue}) }
    
              style={{textAlign: 'center', marginBottom: 10, height: 45}}
          
          />
          <TextInput
              
              placeholder="Enter name in :"
    
              onChangeText={TextInputValue => this.setState({ Name: TextInputValue }) }
    
              style={{textAlign: 'center', marginBottom: 30, height: 45}}
          
          />
 
          < Button title="Click Here To Add Value To Array" onPress={this.AddItemsToArray}
          style={styles.Button}
           />
           <Text>"SOME GARBAGE HERE" </Text>

          <Button title="Click When Done" onPress={this.AddMaster}
            style={styles.Button}
          />

      </View>
      </KeyboardAvoidingView>

 
   );
 }
}
 
const styles = StyleSheet.create({
 
  MainContainer :{
 
    flex:1,
   	marginTop:100
  
 
  },
  Button :{
  	marginTop: 45,
  	marginVertical:100
  }
 
});

