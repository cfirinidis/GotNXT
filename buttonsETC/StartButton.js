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
    	backgroundColor: '#AFFAAB',
	    width: '35%',
	    alignSelf: 'flex-end',
	    borderWidth: 3,
	    borderColor: '#ff8c1d',
	    flexDirection: 'row-reverse',
	    borderRadius: 50,
	    height: 50,
	    bottom: 50,
	    alignItems: 'center',
	    justifyContent: 'center',
	  },
  	text:{
    	fontSize:32,
    	color:'grey',
  	}
});

export default  StartButton ;