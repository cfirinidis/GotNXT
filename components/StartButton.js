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

const StartButton = ({onPress, children})=>{
	return(
		<TouchableOpacity onPress={onPress} style={styles.button}>
			<Text style={styles.text}> {children} </Text>
		</TouchableOpacity>	

		)
}




const styles = StyleSheet.create({
	button: { 
		borderColor: '#51ff00', 
        width:"40%" ,
        bottom:50, 
        height:75, 
        borderWidth: 5, 
        margin: "3%"
    },
  	text:{
    	fontSize:32,
    	textAlign:"center",
    	color:'white',
  	}
});

export default  StartButton ;