import React from 'react';
import{
	StyleSheet,
	View,
	TextInput,
} from 'react-native';

const Input = ({onChangeText, placeholder,secureTextEntry, value})=>{
	return(
		<View style={styles.container}>
			<TextInput
				autocorrect={false}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor = "black"
				style={styles.inputBox}
				secureTextEntry={secureTextEntry}
				value={value}
				/>
		</View>
		)
}


const styles = StyleSheet.create({
	container:{
		width:"100%",
	},
  	inputBox: {
	    backgroundColor:'yellow',
	    textAlign:'center',
	    justifyContent: 'center',
	    alignItems: 'center',
	    left: '12%',
	    width: "75%",
	    height: 50,
	    paddingHorizontal:16,
	    fontSize:28,
	    marginVertical: 20,
  }
});

export default Input ;