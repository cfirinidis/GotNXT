import React from 'react';
import{
  StyleSheet,
  Text,
  Alert,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const EnterName=({placeholder, onPress, onChangeText, value, child})=>{ 
  return(
    <View>
        <View>
          <TextInput
              placeholder="Enter 1 Name At A Time"
              onChangeText={onChangeText }
              value={value}
              style={styles.textInput} 
              placeholderTextColor='gray' />
          </View>

    <TouchableOpacity  onPress={onPress} style={styles.addButton} >
        <Text style={styles.textStyle}>ADD +</Text>
    </TouchableOpacity>    
    </View>
    )
}


const styles = StyleSheet.create({
      textStyle:{
        color:'black', 
        fontSize: 21, 
        textAlign: 'center'
      },
 
  textInput: {
    fontSize:22,
    color: "red",
    marginBottom: 25,
    width: '80%',
    borderWidth: 2,
    borderColor: 'black',
    height: 65,
    backgroundColor: 'white',
    textAlign: "center", 
  },
   addButton: {
    // zIndex: 1,
     position: 'absolute',
    backgroundColor: '#fcbf07',
    flexDirection:'row',
    width: '20%',
    height: 65,
    borderWidth: 2,
    alignSelf:'flex-end',
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  }
}); 


export default EnterName ;
